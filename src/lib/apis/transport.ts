/**
 * Transport links data using the Overpass API (OpenStreetMap).
 * Finds railway stations within 2km and bus stops within 500m.
 */

export interface StationInfo {
  name: string;
  distance: number; // metres
}

export interface TransportData {
  nearestStation: StationInfo | null;
  stationsWithin2km: number;
  busStopsWithin500m: number;
  rating: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
  note: string;
}

interface OverpassElement {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
  center?: { lat: number; lon: number };
}

interface OverpassResponse {
  elements: OverpassElement[];
}

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export async function getTransportData(lat: number, lng: number): Promise<TransportData> {
  try {
    // Fetch stations and bus stops in a single Overpass query
    const query = `[out:json][timeout:10];(node["railway"="station"](around:2000,${lat},${lng});node["railway"="halt"](around:2000,${lat},${lng});node["station"="subway"](around:2000,${lat},${lng});node["highway"="bus_stop"](around:500,${lat},${lng}););out;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      throw new Error(`Overpass API returned ${res.status}`);
    }

    const data: OverpassResponse = await res.json();

    const stations: StationInfo[] = [];
    let busStopCount = 0;

    for (const el of data.elements) {
      const tags = el.tags || {};
      const elLat = el.lat ?? el.center?.lat ?? lat;
      const elLng = el.lon ?? el.center?.lon ?? lng;
      const dist = haversineDistance(lat, lng, elLat, elLng);

      if (tags.railway === 'station' || tags.railway === 'halt' || tags.station === 'subway') {
        if (tags.name) {
          stations.push({ name: tags.name, distance: dist });
        }
      } else if (tags.highway === 'bus_stop') {
        busStopCount++;
      }
    }

    // Deduplicate stations by name
    const seen = new Set<string>();
    const uniqueStations = stations
      .sort((a, b) => a.distance - b.distance)
      .filter((s) => {
        const key = s.name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    const nearestStation = uniqueStations.length > 0 ? uniqueStations[0] : null;
    const stationCount = uniqueStations.length;

    // Calculate rating
    let rating: TransportData['rating'];
    if (stationCount >= 2 && busStopCount >= 5) {
      rating = 'Excellent';
    } else if (stationCount >= 1 && busStopCount >= 3) {
      rating = 'Good';
    } else if (stationCount >= 1 || busStopCount >= 2) {
      rating = 'Moderate';
    } else {
      rating = 'Poor';
    }

    return {
      nearestStation,
      stationsWithin2km: stationCount,
      busStopsWithin500m: busStopCount,
      rating,
      note: 'Transport data from OpenStreetMap. Includes rail, tube, and bus stops.',
    };
  } catch {
    return {
      nearestStation: null,
      stationsWithin2km: 0,
      busStopsWithin500m: 0,
      rating: 'Poor',
      note: 'Unable to fetch transport data at this time.',
    };
  }
}

/**
 * Transport connectivity data using local LSOA-level transport scores.
 * Falls back to Overpass API only if no LSOA match is found.
 */

import transportRaw from '@/data/transport.json';
import { haversineDistance } from './haversine';
import { queryOverpass } from './overpass';

const transportScores = transportRaw as Record<string, number>;

export interface StationInfo {
  name: string;
  distance: number; // metres
}

export interface TransportData {
  nearestStation: StationInfo | null;
  stationsWithin2km: number;
  busStopsWithin500m: number;
  connectivityScore: number; // 0-100
  rating: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
  note: string;
}

function scoreToRating(score: number): TransportData['rating'] {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Moderate';
  return 'Poor';
}

export async function getTransportData(
  lat: number,
  lng: number,
  lsoaCode?: string
): Promise<TransportData> {
  // Try local data first using LSOA code
  if (lsoaCode && transportScores[lsoaCode] !== undefined) {
    const score = transportScores[lsoaCode];
    return {
      nearestStation: null,
      stationsWithin2km: 0,
      busStopsWithin500m: 0,
      connectivityScore: score,
      rating: scoreToRating(score),
      note: 'Transport connectivity score based on LSOA-level data. Higher scores indicate better public transport access.',
    };
  }

  // Fall back to Overpass if no LSOA match
  try {
    const query = `[out:json][timeout:10];(node["railway"="station"](around:2000,${lat},${lng});node["railway"="halt"](around:2000,${lat},${lng});node["station"="subway"](around:2000,${lat},${lng});node["highway"="bus_stop"](around:500,${lat},${lng}););out;`;
    const elements = await queryOverpass(query);

    const stations: StationInfo[] = [];
    let busStopCount = 0;

    for (const el of elements) {
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

    // Calculate a connectivity score from Overpass data
    let score = 0;
    if (stationCount >= 2) score += 50;
    else if (stationCount >= 1) score += 30;
    if (busStopCount >= 5) score += 40;
    else if (busStopCount >= 3) score += 25;
    else if (busStopCount >= 1) score += 10;
    // Bonus for very close station
    if (nearestStation && nearestStation.distance <= 500) score += 10;
    score = Math.min(100, score);

    return {
      nearestStation,
      stationsWithin2km: stationCount,
      busStopsWithin500m: busStopCount,
      connectivityScore: score,
      rating: scoreToRating(score),
      note: 'Transport data from OpenStreetMap. Includes rail, tube, and bus stops.',
    };
  } catch {
    return {
      nearestStation: null,
      stationsWithin2km: 0,
      busStopsWithin500m: 0,
      connectivityScore: 0,
      rating: 'Poor',
      note: 'Unable to fetch transport data at this time.',
    };
  }
}

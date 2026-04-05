/**
 * Healthcare facilities data using the Overpass API (OpenStreetMap).
 * Finds GP surgeries, pharmacies, hospitals, and dentists near a location.
 */

import { haversineDistance } from './haversine';

export interface HealthcareFacility {
  name: string;
  distance: number; // metres
}

export interface HealthcareData {
  gpSurgeries: HealthcareFacility[];
  pharmacies: HealthcareFacility[];
  hospitals: HealthcareFacility[];
  dentists: HealthcareFacility[];
  nearestGP: HealthcareFacility | null;
  nearestHospital: HealthcareFacility | null;
  healthcareRating: 'Excellent' | 'Good' | 'Adequate' | 'Poor';
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

function deduplicateByName(items: HealthcareFacility[]): HealthcareFacility[] {
  const seen = new Set<string>();
  return items
    .sort((a, b) => a.distance - b.distance)
    .filter((item) => {
      const key = item.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export async function getHealthcareData(
  lat: number,
  lng: number
): Promise<HealthcareData> {
  try {
    // Single Overpass query for all healthcare types
    // GPs/clinics within 2km, pharmacies within 1km, hospitals within 5km, dentists within 2km
    const query = `[out:json][timeout:10];(
      node["amenity"="doctors"](around:2000,${lat},${lng});
      way["amenity"="doctors"](around:2000,${lat},${lng});
      node["amenity"="clinic"]["healthcare"="doctor"](around:2000,${lat},${lng});
      way["amenity"="clinic"]["healthcare"="doctor"](around:2000,${lat},${lng});
      node["amenity"="pharmacy"](around:1000,${lat},${lng});
      way["amenity"="pharmacy"](around:1000,${lat},${lng});
      node["amenity"="hospital"](around:5000,${lat},${lng});
      way["amenity"="hospital"](around:5000,${lat},${lng});
      node["amenity"="dentist"](around:2000,${lat},${lng});
      way["amenity"="dentist"](around:2000,${lat},${lng});
    );out center;`;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      throw new Error(`Overpass API returned ${res.status}`);
    }

    const data: OverpassResponse = await res.json();

    const gpSurgeries: HealthcareFacility[] = [];
    const pharmacies: HealthcareFacility[] = [];
    const hospitals: HealthcareFacility[] = [];
    const dentists: HealthcareFacility[] = [];

    for (const el of data.elements) {
      const tags = el.tags || {};
      const elLat = el.lat ?? el.center?.lat ?? lat;
      const elLng = el.lon ?? el.center?.lon ?? lng;
      const dist = haversineDistance(lat, lng, elLat, elLng);
      const name = tags.name || 'Unnamed';

      if (tags.amenity === 'hospital') {
        hospitals.push({ name, distance: dist });
      } else if (tags.amenity === 'pharmacy') {
        pharmacies.push({ name, distance: dist });
      } else if (tags.amenity === 'dentist') {
        dentists.push({ name, distance: dist });
      } else if (
        tags.amenity === 'doctors' ||
        (tags.amenity === 'clinic' && tags.healthcare === 'doctor')
      ) {
        gpSurgeries.push({ name, distance: dist });
      }
    }

    const uniqueGPs = deduplicateByName(gpSurgeries);
    const uniquePharmacies = deduplicateByName(pharmacies);
    const uniqueHospitals = deduplicateByName(hospitals);
    const uniqueDentists = deduplicateByName(dentists);

    // Rating based on GP availability within walking distance
    const gpsWithin1km = uniqueGPs.filter((gp) => gp.distance <= 1000).length;
    const gpsWithin2km = uniqueGPs.length;

    let healthcareRating: HealthcareData['healthcareRating'];
    if (gpsWithin1km >= 3) {
      healthcareRating = 'Excellent';
    } else if (gpsWithin1km >= 2 || gpsWithin2km >= 3) {
      healthcareRating = 'Good';
    } else if (gpsWithin2km >= 1) {
      healthcareRating = 'Adequate';
    } else {
      healthcareRating = 'Poor';
    }

    return {
      gpSurgeries: uniqueGPs.slice(0, 8),
      pharmacies: uniquePharmacies.slice(0, 8),
      hospitals: uniqueHospitals.slice(0, 5),
      dentists: uniqueDentists.slice(0, 8),
      nearestGP: uniqueGPs[0] ?? null,
      nearestHospital: uniqueHospitals[0] ?? null,
      healthcareRating,
      note: 'Healthcare data from OpenStreetMap. Verify availability with your local NHS.',
    };
  } catch {
    return {
      gpSurgeries: [],
      pharmacies: [],
      hospitals: [],
      dentists: [],
      nearestGP: null,
      nearestHospital: null,
      healthcareRating: 'Poor',
      note: 'Unable to fetch healthcare data at this time.',
    };
  }
}

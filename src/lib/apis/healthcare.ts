/**
 * Healthcare facilities from local CQC directory JSON.
 * Contains ~23,000 GPs, dentists, hospitals, and pharmacies with coordinates.
 */

import healthcareRaw from '@/data/healthcare.json';
import { haversineDistance } from './haversine';

interface HealthcareEntry {
  n: string;
  t: string;
  la: number;
  lo: number;
}

export interface HealthcareFacility {
  name: string;
  type: string;
  distance: number;
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

const facilities = healthcareRaw as HealthcareEntry[];

function findNearby(lat: number, lng: number, type: string, radiusKm: number, limit: number): HealthcareFacility[] {
  const results: (HealthcareFacility & { _dist: number })[] = [];

  for (const f of facilities) {
    if (f.t !== type) continue;
    const dist = haversineDistance(lat, lng, f.la, f.lo);
    if (dist <= radiusKm) {
      results.push({ name: f.n, type: f.t, distance: Math.round(dist * 1000) / 1000, _dist: dist });
    }
  }

  results.sort((a, b) => a._dist - b._dist);
  return results.slice(0, limit).map(({ _dist, ...rest }) => rest);
}

export async function getHealthcareData(lat: number, lng: number): Promise<HealthcareData> {
  const gps = findNearby(lat, lng, 'gp', 2, 10);
  const pharmacies = findNearby(lat, lng, 'pharmacy', 1, 10);
  const hospitals = findNearby(lat, lng, 'hospital', 5, 5);
  const dentists = findNearby(lat, lng, 'dentist', 2, 10);

  const gpsWithin1km = gps.filter(g => g.distance <= 1).length;
  let healthcareRating: 'Excellent' | 'Good' | 'Adequate' | 'Poor';
  if (gpsWithin1km >= 3) healthcareRating = 'Excellent';
  else if (gpsWithin1km >= 2 || gps.length >= 3) healthcareRating = 'Good';
  else if (gps.length >= 1) healthcareRating = 'Adequate';
  else healthcareRating = 'Poor';

  return {
    gpSurgeries: gps,
    pharmacies,
    hospitals,
    dentists,
    nearestGP: gps[0] || null,
    nearestHospital: hospitals[0] || null,
    healthcareRating,
    note: 'Healthcare data from CQC directory. Includes GPs, dentists, hospitals, and pharmacies.',
  };
}

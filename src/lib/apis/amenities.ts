/**
 * Local amenities from OSM extract JSON.
 * Contains supermarkets and convenience stores with coordinates.
 */

import amenitiesRaw from '@/data/amenities.json';
import { haversineDistance } from './haversine';

interface AmenityEntry {
  n: string;
  la: number;
  lo: number;
}

interface AmenitiesFile {
  supermarkets: AmenityEntry[];
  convenience: AmenityEntry[];
}

export interface AmenityItem {
  name: string;
  brand?: string;
  distance: number;
}

export interface AmenitiesData {
  supermarkets: AmenityItem[];
  convenienceStores: number;
  restaurants: number;
  pubs: number;
  postOffices: number;
  banks: number;
  nearestSupermarket: AmenityItem | null;
  amenityScore: 'Excellent' | 'Good' | 'Average' | 'Poor';
  walkabilityNote: string;
  note: string;
}

const data = amenitiesRaw as AmenitiesFile;

function findNearby(entries: AmenityEntry[], lat: number, lng: number, radiusKm: number, limit: number): AmenityItem[] {
  const results: (AmenityItem & { _dist: number })[] = [];
  for (const e of entries) {
    const dist = haversineDistance(lat, lng, e.la, e.lo);
    if (dist <= radiusKm) {
      results.push({ name: e.n, distance: Math.round(dist * 1000) / 1000, _dist: dist });
    }
  }
  results.sort((a, b) => a._dist - b._dist);
  return results.slice(0, limit).map(({ _dist, ...rest }) => rest);
}

export async function getAmenitiesData(lat: number, lng: number): Promise<AmenitiesData> {
  const supermarkets = findNearby(data.supermarkets || [], lat, lng, 1.5, 10);
  const convenience = findNearby(data.convenience || [], lat, lng, 0.5, 20);
  const convenienceStores = convenience.length;

  const nearest = supermarkets[0] || null;
  const totalAmenities = supermarkets.length + convenienceStores;

  let amenityScore: 'Excellent' | 'Good' | 'Average' | 'Poor';
  if (totalAmenities >= 8) amenityScore = 'Excellent';
  else if (totalAmenities >= 4) amenityScore = 'Good';
  else if (totalAmenities >= 1) amenityScore = 'Average';
  else amenityScore = 'Poor';

  let walkabilityNote: string;
  if (nearest && nearest.distance <= 0.5) {
    walkabilityNote = 'Supermarket within a 5-minute walk. Great for daily shopping.';
  } else if (nearest && nearest.distance <= 1) {
    walkabilityNote = 'Supermarket within a 10-minute walk. Good for regular shopping.';
  } else if (nearest) {
    walkabilityNote = `Nearest supermarket is ${(nearest.distance * 1000).toFixed(0)}m away.`;
  } else {
    walkabilityNote = 'No supermarkets found within 1.5km. Coverage may be limited in this area.';
  }

  return {
    supermarkets,
    convenienceStores,
    restaurants: 0, // Not tracked in current data
    pubs: 0,
    postOffices: 0,
    banks: 0,
    nearestSupermarket: nearest,
    amenityScore,
    walkabilityNote,
    note: 'Amenity data from OpenStreetMap. Supermarkets and convenience stores.',
  };
}

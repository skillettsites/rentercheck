/**
 * Green space data from local OSM extract JSON.
 * Contains parks and nature reserves with coordinates.
 */

import greenRaw from '@/data/greenspaces.json';
import { haversineDistance } from './haversine';

interface GreenEntry {
  n: string;
  la: number;
  lo: number;
}

export interface GreenSpaceItem {
  name: string;
  distance: number;
}

export interface GreenSpaceData {
  parks: GreenSpaceItem[];
  playgrounds: number;
  natureReserves: GreenSpaceItem[];
  sportsFacilities: number;
  nearestPark: GreenSpaceItem | null;
  greenSpaceScore: 'Excellent' | 'Good' | 'Average' | 'Poor';
  totalGreenSpaces: number;
  note: string;
}

const greenSpaces = greenRaw as GreenEntry[];

export async function getGreenSpaceData(lat: number, lng: number): Promise<GreenSpaceData> {
  const nearby: (GreenSpaceItem & { _dist: number })[] = [];

  for (const g of greenSpaces) {
    const dist = haversineDistance(lat, lng, g.la, g.lo);
    if (dist <= 1.5) {
      nearby.push({ name: g.n, distance: Math.round(dist * 1000) / 1000, _dist: dist });
    }
  }

  nearby.sort((a, b) => a._dist - b._dist);
  const parks = nearby.slice(0, 10).map(({ _dist, ...rest }) => rest);
  const total = nearby.length;

  let greenSpaceScore: 'Excellent' | 'Good' | 'Average' | 'Poor';
  if (total >= 5) greenSpaceScore = 'Excellent';
  else if (total >= 3) greenSpaceScore = 'Good';
  else if (total >= 1) greenSpaceScore = 'Average';
  else greenSpaceScore = 'Poor';

  return {
    parks,
    playgrounds: 0, // Not tracked in current data
    natureReserves: [],
    sportsFacilities: 0,
    nearestPark: parks[0] || null,
    greenSpaceScore,
    totalGreenSpaces: total,
    note: 'Green space data from OpenStreetMap. Includes parks and nature reserves.',
  };
}

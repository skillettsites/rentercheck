/**
 * Nearby schools data using local pre-built JSON from Ofsted/DfE data.
 * Finds schools within 1.5km and returns phase, distance, and Ofsted rating.
 */

import schoolsRaw from '@/data/schools.json';
import { haversineDistance } from './haversine';

interface SchoolEntry {
  u: number;
  n: string;
  p: 'P' | 'S' | 'O';
  pc: string;
  la: number;
  lo: number;
  r?: 'O' | 'G' | 'R' | 'I';
}

const schools = schoolsRaw as SchoolEntry[];

const PHASE_MAP: Record<string, string> = {
  P: 'Primary',
  S: 'Secondary',
  O: 'All-through',
};

const RATING_MAP: Record<string, string> = {
  O: 'Outstanding',
  G: 'Good',
  R: 'Requires Improvement',
  I: 'Inadequate',
};

export interface SchoolInfo {
  name: string;
  type: string;
  distance: number; // metres
  rating?: string; // Ofsted rating (Outstanding, Good, etc.)
}

export interface RatingSummary {
  outstanding: number;
  good: number;
  requiresImprovement: number;
  inadequate: number;
  unrated: number;
}

export interface SchoolsData {
  totalWithin1km: number;
  schools: SchoolInfo[];
  density: 'High' | 'Moderate' | 'Low';
  familyFriendly: boolean;
  primaryCount: number;
  secondaryCount: number;
  nurseryCount: number;
  ratings: RatingSummary;
  note: string;
}

export async function getSchoolsData(lat: number, lng: number): Promise<SchoolsData> {
  const RADIUS = 1500; // 1.5km

  const nearby: { entry: SchoolEntry; distance: number }[] = [];

  for (const s of schools) {
    const dist = haversineDistance(lat, lng, s.la, s.lo);
    if (dist <= RADIUS) {
      nearby.push({ entry: s, distance: dist });
    }
  }

  // Sort by distance and take up to 15
  nearby.sort((a, b) => a.distance - b.distance);
  const top = nearby.slice(0, 15);

  const schoolInfos: SchoolInfo[] = top.map((item) => ({
    name: item.entry.n,
    type: PHASE_MAP[item.entry.p] || 'School',
    distance: item.distance,
    rating: item.entry.r ? RATING_MAP[item.entry.r] : undefined,
  }));

  // Count by phase (all nearby, not just top 15)
  const primaryCount = nearby.filter((s) => s.entry.p === 'P').length;
  const secondaryCount = nearby.filter((s) => s.entry.p === 'S').length;
  const nurseryCount = nearby.filter((s) => s.entry.p === 'O').length; // All-through treated as 'other'

  // Total schools (all phases)
  const total = nearby.length;

  // Density rating
  let density: SchoolsData['density'];
  if (total >= 8) density = 'High';
  else if (total >= 4) density = 'Moderate';
  else density = 'Low';

  // Family friendly: 3+ primaries within 1.5km
  const familyFriendly = primaryCount >= 3;

  // Ratings summary from all nearby
  const ratings: RatingSummary = {
    outstanding: nearby.filter((s) => s.entry.r === 'O').length,
    good: nearby.filter((s) => s.entry.r === 'G').length,
    requiresImprovement: nearby.filter((s) => s.entry.r === 'R').length,
    inadequate: nearby.filter((s) => s.entry.r === 'I').length,
    unrated: nearby.filter((s) => !s.entry.r).length,
  };

  return {
    totalWithin1km: total,
    schools: schoolInfos,
    density,
    familyFriendly,
    primaryCount,
    secondaryCount,
    nurseryCount,
    ratings,
    note: 'School data from DfE/Ofsted. Showing schools within 1.5km. Verify availability with local council.',
  };
}

/**
 * Nearby schools data using the Overpass API (OpenStreetMap).
 * Finds schools within 1km and nurseries within 1km of a given location.
 * Enriches with phase info (primary/secondary/nursery) from OSM tags.
 */

import { haversineDistance } from './haversine';
import { queryOverpass, type OverpassElement } from './overpass';

export interface SchoolInfo {
  name: string;
  type: string;
  distance: number; // metres
}

export interface SchoolsData {
  totalWithin1km: number;
  schools: SchoolInfo[];
  density: 'High' | 'Moderate' | 'Low';
  familyFriendly: boolean;
  primaryCount: number;
  secondaryCount: number;
  nurseryCount: number;
  note: string;
}

function classifySchool(tags: Record<string, string>): string {
  const name = (tags.name || '').toLowerCase();
  const level = tags['isced:level'] || '';
  const schoolType = tags['school:type'] || '';
  const grades = tags.grades || '';

  // Check ISCED levels first
  if (level.includes('0') || schoolType === 'nursery') return 'Nursery';
  if (level.includes('1') || schoolType === 'primary') return 'Primary';
  if (level.includes('2') || level.includes('3') || schoolType === 'secondary') return 'Secondary';

  // Fall back to name-based classification
  if (name.includes('nursery') || name.includes('pre-school') || name.includes('preschool')) return 'Nursery';
  if (name.includes('infant') || name.includes('junior') || name.includes('primary') || name.includes('first school')) return 'Primary';
  if (name.includes('secondary') || name.includes('high school') || name.includes('academy') || name.includes('college') || name.includes('grammar')) return 'Secondary';
  if (name.includes('sixth form')) return 'Secondary';

  // Check grades tag
  if (grades) {
    const nums = grades.split(/[;,-]/).map(Number).filter(Boolean);
    if (nums.length > 0 && nums[0] <= 6) return 'Primary';
    if (nums.length > 0 && nums[0] >= 7) return 'Secondary';
  }

  return 'School';
}

export async function getSchoolsData(lat: number, lng: number): Promise<SchoolsData> {
  try {
    // Query for schools and nurseries/kindergartens within 1km
    const query = `[out:json][timeout:10];(
      node["amenity"="school"](around:1000,${lat},${lng});
      way["amenity"="school"](around:1000,${lat},${lng});
      node["amenity"="kindergarten"](around:1000,${lat},${lng});
      way["amenity"="kindergarten"](around:1000,${lat},${lng});
    );out center;`;
    const elements = await queryOverpass(query);

    const schools: SchoolInfo[] = elements
      .filter((el) => el.tags?.name)
      .map((el) => {
        const elLat = el.lat ?? el.center?.lat ?? lat;
        const elLng = el.lon ?? el.center?.lon ?? lng;
        const dist = haversineDistance(lat, lng, elLat, elLng);
        const tags = el.tags || {};

        let schoolType: string;
        if (tags.amenity === 'kindergarten') {
          schoolType = 'Nursery';
        } else {
          schoolType = classifySchool(tags);
        }

        // Append gender info if available
        if (tags['school:gender'] === 'boys') schoolType += ' (Boys)';
        if (tags['school:gender'] === 'girls') schoolType += ' (Girls)';

        return {
          name: tags.name || 'Unnamed School',
          type: schoolType,
          distance: dist,
        };
      })
      .sort((a, b) => a.distance - b.distance);

    // Deduplicate by name (ways and nodes can represent the same school)
    const seen = new Set<string>();
    const unique = schools.filter((s) => {
      const key = s.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Count by phase
    const primaryCount = unique.filter((s) => s.type.startsWith('Primary')).length;
    const secondaryCount = unique.filter((s) => s.type.startsWith('Secondary')).length;
    const nurseryCount = unique.filter((s) => s.type.startsWith('Nursery')).length;

    // Only count actual schools (not nurseries) for the main total
    const schoolsOnly = unique.filter((s) => !s.type.startsWith('Nursery'));
    const total = schoolsOnly.length;

    let density: SchoolsData['density'];
    if (total >= 5) density = 'High';
    else if (total >= 2) density = 'Moderate';
    else density = 'Low';

    // Family friendly if good mix of schools and nurseries
    const familyFriendly = total >= 3 || (total >= 1 && nurseryCount >= 1 && primaryCount >= 1);

    return {
      totalWithin1km: total,
      schools: unique.slice(0, 10),
      density,
      familyFriendly,
      primaryCount,
      secondaryCount,
      nurseryCount,
      note: 'School locations from OpenStreetMap. Includes nurseries within 1km. Verify specific schools with local council.',
    };
  } catch {
    return {
      totalWithin1km: 0,
      schools: [],
      density: 'Low',
      familyFriendly: false,
      primaryCount: 0,
      secondaryCount: 0,
      nurseryCount: 0,
      note: 'Unable to fetch school data at this time.',
    };
  }
}

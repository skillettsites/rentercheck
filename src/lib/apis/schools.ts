/**
 * Nearby schools data using the Overpass API (OpenStreetMap).
 * Finds schools within 1km of a given location.
 */

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
  note: string;
}

interface OverpassElement {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
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
  const R = 6371000; // metres
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

export async function getSchoolsData(lat: number, lng: number): Promise<SchoolsData> {
  try {
    const query = `[out:json][timeout:10];(node["amenity"="school"](around:1000,${lat},${lng});way["amenity"="school"](around:1000,${lat},${lng}););out center;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      throw new Error(`Overpass API returned ${res.status}`);
    }

    const data: OverpassResponse = await res.json();

    const schools: SchoolInfo[] = data.elements
      .filter((el) => el.tags?.name)
      .map((el) => {
        const elLat = el.lat ?? (el as unknown as { center?: { lat: number } }).center?.lat ?? lat;
        const elLng = el.lon ?? (el as unknown as { center?: { lon: number } }).center?.lon ?? lng;
        const dist = haversineDistance(lat, lng, elLat, elLng);

        let schoolType = 'School';
        const tags = el.tags || {};
        if (tags['school:type'] || tags['isced:level']) {
          const level = tags['isced:level'] || '';
          if (level.includes('1')) schoolType = 'Primary';
          else if (level.includes('2') || level.includes('3')) schoolType = 'Secondary';
        }
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

    const total = unique.length;
    let density: SchoolsData['density'];
    if (total >= 5) density = 'High';
    else if (total >= 2) density = 'Moderate';
    else density = 'Low';

    return {
      totalWithin1km: total,
      schools: unique.slice(0, 8),
      density,
      familyFriendly: total >= 3,
      note: 'School locations from OpenStreetMap. Verify specific schools with local council.',
    };
  } catch {
    return {
      totalWithin1km: 0,
      schools: [],
      density: 'Low',
      familyFriendly: false,
      note: 'Unable to fetch school data at this time.',
    };
  }
}

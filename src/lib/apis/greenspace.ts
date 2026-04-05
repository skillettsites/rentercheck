/**
 * Green space and recreation data using the Overpass API (OpenStreetMap).
 * Finds parks, playgrounds, nature reserves, gardens, and sports facilities.
 */

import { haversineDistance } from './haversine';
import { queryOverpass } from './overpass';

export interface GreenSpaceItem {
  name: string;
  distance: number; // metres
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

function deduplicateByName(items: GreenSpaceItem[]): GreenSpaceItem[] {
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

export async function getGreenSpaceData(
  lat: number,
  lng: number
): Promise<GreenSpaceData> {
  try {
    // Parks within 1km, playgrounds within 500m, nature reserves within 2km,
    // gardens within 1km, sports facilities within 1km
    const query = `[out:json][timeout:10];(
      node["leisure"="park"](around:1000,${lat},${lng});
      way["leisure"="park"](around:1000,${lat},${lng});
      relation["leisure"="park"](around:1000,${lat},${lng});
      node["leisure"="playground"](around:500,${lat},${lng});
      way["leisure"="playground"](around:500,${lat},${lng});
      node["leisure"="nature_reserve"](around:2000,${lat},${lng});
      way["leisure"="nature_reserve"](around:2000,${lat},${lng});
      relation["leisure"="nature_reserve"](around:2000,${lat},${lng});
      node["leisure"="garden"](around:1000,${lat},${lng});
      way["leisure"="garden"](around:1000,${lat},${lng});
      node["leisure"="sports_centre"](around:1000,${lat},${lng});
      way["leisure"="sports_centre"](around:1000,${lat},${lng});
      node["sport"](around:1000,${lat},${lng});
      way["sport"](around:1000,${lat},${lng});
    );out center;`;

    const elements = await queryOverpass(query);

    const parks: GreenSpaceItem[] = [];
    const gardens: GreenSpaceItem[] = [];
    const natureReserves: GreenSpaceItem[] = [];
    let playgrounds = 0;
    let sportsFacilities = 0;
    const sportsSeen = new Set<number>();

    for (const el of elements) {
      const tags = el.tags || {};
      const elLat = el.lat ?? el.center?.lat ?? lat;
      const elLng = el.lon ?? el.center?.lon ?? lng;
      const dist = haversineDistance(lat, lng, elLat, elLng);
      const name = tags.name || 'Unnamed';

      if (tags.leisure === 'park') {
        parks.push({ name, distance: dist });
      } else if (tags.leisure === 'playground') {
        playgrounds++;
      } else if (tags.leisure === 'nature_reserve') {
        natureReserves.push({ name, distance: dist });
      } else if (tags.leisure === 'garden') {
        gardens.push({ name, distance: dist });
      } else if (tags.leisure === 'sports_centre' || tags.sport) {
        if (!sportsSeen.has(el.id)) {
          sportsSeen.add(el.id);
          sportsFacilities++;
        }
      }
    }

    const uniqueParks = deduplicateByName(parks);
    const uniqueGardens = deduplicateByName(gardens);
    const uniqueReserves = deduplicateByName(natureReserves);

    // Combine parks and gardens for total count
    const allGreenSpaces = uniqueParks.length + uniqueGardens.length + uniqueReserves.length;
    const parksWithin1km = uniqueParks.length + uniqueGardens.length;

    let greenSpaceScore: GreenSpaceData['greenSpaceScore'];
    if (parksWithin1km >= 5) {
      greenSpaceScore = 'Excellent';
    } else if (parksWithin1km >= 3) {
      greenSpaceScore = 'Good';
    } else if (parksWithin1km >= 1) {
      greenSpaceScore = 'Average';
    } else {
      greenSpaceScore = 'Poor';
    }

    return {
      parks: uniqueParks.slice(0, 8),
      playgrounds,
      natureReserves: uniqueReserves.slice(0, 5),
      sportsFacilities,
      nearestPark: uniqueParks[0] ?? uniqueGardens[0] ?? null,
      greenSpaceScore,
      totalGreenSpaces: allGreenSpaces,
      note: 'Green space data from OpenStreetMap. Includes parks, gardens, and nature reserves.',
    };
  } catch {
    return {
      parks: [],
      playgrounds: 0,
      natureReserves: [],
      sportsFacilities: 0,
      nearestPark: null,
      greenSpaceScore: 'Poor',
      totalGreenSpaces: 0,
      note: 'Unable to fetch green space data at this time.',
    };
  }
}

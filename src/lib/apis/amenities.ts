/**
 * Local amenities data using the Overpass API (OpenStreetMap).
 * Finds supermarkets, convenience stores, restaurants, pubs, post offices,
 * and banks/ATMs near a location.
 */

import { haversineDistance } from './haversine';

export interface AmenityItem {
  name: string;
  brand?: string;
  distance: number; // metres
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

function deduplicateSupermarkets(items: AmenityItem[]): AmenityItem[] {
  const seen = new Set<string>();
  return items
    .sort((a, b) => a.distance - b.distance)
    .filter((item) => {
      const key = (item.name || item.brand || '').toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export async function getAmenitiesData(
  lat: number,
  lng: number
): Promise<AmenitiesData> {
  try {
    // Supermarkets 1km, convenience 500m, restaurants 500m, pubs 500m,
    // post offices 1km, banks/ATMs 1km
    const query = `[out:json][timeout:10];(
      node["shop"="supermarket"](around:1000,${lat},${lng});
      way["shop"="supermarket"](around:1000,${lat},${lng});
      node["shop"="convenience"](around:500,${lat},${lng});
      way["shop"="convenience"](around:500,${lat},${lng});
      node["amenity"="restaurant"](around:500,${lat},${lng});
      way["amenity"="restaurant"](around:500,${lat},${lng});
      node["amenity"="pub"](around:500,${lat},${lng});
      way["amenity"="pub"](around:500,${lat},${lng});
      node["amenity"="post_office"](around:1000,${lat},${lng});
      way["amenity"="post_office"](around:1000,${lat},${lng});
      node["amenity"="bank"](around:1000,${lat},${lng});
      way["amenity"="bank"](around:1000,${lat},${lng});
      node["amenity"="atm"](around:1000,${lat},${lng});
    );out center;`;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      throw new Error(`Overpass API returned ${res.status}`);
    }

    const data: OverpassResponse = await res.json();

    const supermarkets: AmenityItem[] = [];
    let convenienceStores = 0;
    let restaurants = 0;
    let pubs = 0;
    let postOffices = 0;
    let banks = 0;

    for (const el of data.elements) {
      const tags = el.tags || {};
      const elLat = el.lat ?? el.center?.lat ?? lat;
      const elLng = el.lon ?? el.center?.lon ?? lng;
      const dist = haversineDistance(lat, lng, elLat, elLng);

      if (tags.shop === 'supermarket') {
        supermarkets.push({
          name: tags.name || tags.brand || 'Supermarket',
          brand: tags.brand,
          distance: dist,
        });
      } else if (tags.shop === 'convenience') {
        convenienceStores++;
      } else if (tags.amenity === 'restaurant') {
        restaurants++;
      } else if (tags.amenity === 'pub') {
        pubs++;
      } else if (tags.amenity === 'post_office') {
        postOffices++;
      } else if (tags.amenity === 'bank' || tags.amenity === 'atm') {
        banks++;
      }
    }

    const uniqueSupermarkets = deduplicateSupermarkets(supermarkets);

    // Total amenity count for scoring
    const totalNearby =
      uniqueSupermarkets.length +
      convenienceStores +
      restaurants +
      pubs +
      postOffices +
      banks;

    let amenityScore: AmenitiesData['amenityScore'];
    if (totalNearby >= 20) {
      amenityScore = 'Excellent';
    } else if (totalNearby >= 10) {
      amenityScore = 'Good';
    } else if (totalNearby >= 4) {
      amenityScore = 'Average';
    } else {
      amenityScore = 'Poor';
    }

    // Walkability note
    let walkabilityNote: string;
    if (uniqueSupermarkets.length > 0 && uniqueSupermarkets[0].distance <= 400) {
      walkabilityNote = 'Supermarket within a 5-minute walk. Very convenient for daily shopping.';
    } else if (uniqueSupermarkets.length > 0 && uniqueSupermarkets[0].distance <= 800) {
      walkabilityNote = 'Supermarket within a 10-minute walk. Good for regular shopping.';
    } else if (uniqueSupermarkets.length > 0) {
      walkabilityNote = 'Nearest supermarket is a longer walk. Consider driving for large shops.';
    } else {
      walkabilityNote = 'No supermarkets found within 1km. You may need a car for grocery shopping.';
    }

    return {
      supermarkets: uniqueSupermarkets.slice(0, 6),
      convenienceStores,
      restaurants,
      pubs,
      postOffices,
      banks,
      nearestSupermarket: uniqueSupermarkets[0] ?? null,
      amenityScore,
      walkabilityNote,
      note: 'Amenity data from OpenStreetMap. Counts may vary from current listings.',
    };
  } catch {
    return {
      supermarkets: [],
      convenienceStores: 0,
      restaurants: 0,
      pubs: 0,
      postOffices: 0,
      banks: 0,
      nearestSupermarket: null,
      amenityScore: 'Poor',
      walkabilityNote: 'Unable to assess walkability at this time.',
      note: 'Unable to fetch amenity data at this time.',
    };
  }
}

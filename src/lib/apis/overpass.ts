/**
 * Shared Overpass API helper. Uses POST method for reliability.
 * Falls back to kumi.systems mirror if the main server fails.
 */

const OVERPASS_MAIN = 'https://overpass-api.de/api/interpreter';
const OVERPASS_MIRROR = 'https://overpass.kumi.systems/api/interpreter';

export interface OverpassElement {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
  center?: { lat: number; lon: number };
}

export async function queryOverpass(query: string): Promise<OverpassElement[]> {
  // Try main server first with POST
  try {
    const res = await fetch(OVERPASS_MAIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`,
      signal: AbortSignal.timeout(12000),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('json')) {
        const data = await res.json();
        return data.elements ?? [];
      }
    }
  } catch {
    // fall through to mirror
  }

  // Try mirror
  try {
    const res = await fetch(OVERPASS_MIRROR, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`,
      signal: AbortSignal.timeout(12000),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('json')) {
        const data = await res.json();
        return data.elements ?? [];
      }
    }
  } catch {
    // both failed
  }

  return [];
}

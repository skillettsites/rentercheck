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
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'RenterCheck/1.0 (https://rentercheck.vercel.app)',
    'Accept': 'application/json',
  };
  const body = `data=${encodeURIComponent(query)}`;

  // Try main server first with POST
  for (const url of [OVERPASS_MAIN, OVERPASS_MIRROR]) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body,
        signal: AbortSignal.timeout(15000),
      });

      if (res.ok) {
        const text = await res.text();
        // Overpass sometimes returns HTML errors even with 200 status
        if (text.startsWith('{')) {
          const data = JSON.parse(text);
          if (Array.isArray(data.elements)) {
            return data.elements;
          }
        }
      }
    } catch {
      // try next server
      continue;
    }
  }

  return [];
}

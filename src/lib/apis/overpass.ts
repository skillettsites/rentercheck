/**
 * Shared Overpass API helper. Uses POST method for reliability.
 * Falls back to kumi.systems mirror if the main server fails.
 */

const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
  'https://overpass.nchc.org.tw/api/interpreter',
];

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

  // Try servers in order, first success wins
  for (const url of OVERPASS_SERVERS) {
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

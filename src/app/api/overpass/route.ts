import { NextRequest, NextResponse } from "next/server";

const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

// Proxy Overpass queries through our server for client-side lazy loading
// Accepts: type (parks|supermarkets|convenience|healthcare), lat, lng
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");
  const lat = req.nextUrl.searchParams.get("lat");
  const lng = req.nextUrl.searchParams.get("lng");

  if (!type || !lat || !lng) {
    return NextResponse.json({ error: "type, lat, lng required" }, { status: 400 });
  }

  const queries: Record<string, string> = {
    parks: `[out:json][timeout:10];(node["leisure"="park"](around:1500,${lat},${lng});way["leisure"="park"](around:1500,${lat},${lng}););out center;`,
    supermarkets: `[out:json][timeout:10];(node["shop"="supermarket"](around:1500,${lat},${lng});way["shop"="supermarket"](around:1500,${lat},${lng}););out center;`,
    convenience: `[out:json][timeout:10];node["shop"="convenience"](around:500,${lat},${lng});out;`,
    gp: `[out:json][timeout:10];(node["amenity"="doctors"](around:2000,${lat},${lng});node["amenity"="clinic"](around:2000,${lat},${lng});way["amenity"="doctors"](around:2000,${lat},${lng}););out center;`,
    pharmacy: `[out:json][timeout:10];node["amenity"="pharmacy"](around:1000,${lat},${lng});out;`,
    hospital: `[out:json][timeout:10];(node["amenity"="hospital"](around:5000,${lat},${lng});way["amenity"="hospital"](around:5000,${lat},${lng}););out center;`,
    dentist: `[out:json][timeout:10];node["amenity"="dentist"](around:2000,${lat},${lng});out;`,
  };

  const query = queries[type];
  if (!query) {
    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }

  for (const server of OVERPASS_SERVERS) {
    try {
      const res = await fetch(server, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'RenterCheck/1.0',
        },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(8000),
      });

      if (!res.ok) continue;
      const text = await res.text();
      if (!text.startsWith('{')) continue;

      const data = JSON.parse(text);
      const elements = (data.elements || [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((el: any) => {
          const elLat = el.lat || el.center?.lat;
          const elLon = el.lon || el.center?.lon;
          const name = el.tags?.name || el.tags?.brand || '';
          if (!elLat || !elLon || !name) return null;
          return { n: name, la: Math.round(elLat * 10000) / 10000, lo: Math.round(elLon * 10000) / 10000 };
        })
        .filter(Boolean);

      return NextResponse.json(
        { results: elements },
        { headers: { "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=2592000" } }
      );
    } catch {
      continue;
    }
  }

  return NextResponse.json({ results: [] });
}

import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.get-energy-performance-data.communities.gov.uk";

function cleanEnv(val: string | undefined): string {
  return (val || "").replace(/\\n/g, "").replace(/\n/g, "").trim();
}

// Search EPC register by address text (e.g. "505 cordage house")
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.length < 3) {
    return NextResponse.json({ results: [] });
  }

  const token = cleanEnv(process.env.EPC_API_TOKEN);
  if (!token) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/domestic/search?address=${encodeURIComponent(q)}&page_size=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();
    const records = data.data || [];

    // Deduplicate by address + postcode
    const seen = new Set<string>();
    const results: { address: string; postcode: string }[] = [];

    for (const rec of records) {
      const addr = rec.address || "";
      const pc = rec.postcode || "";
      if (!addr || !pc) continue;

      const key = `${addr.toLowerCase()}-${pc}`;
      if (seen.has(key)) continue;
      seen.add(key);

      // Title case the address
      const formatted = addr
        .toLowerCase()
        .replace(/\b\w/g, (c: string) => c.toUpperCase())
        .replace(/\s+/g, " ")
        .trim();

      results.push({ address: formatted, postcode: pc });
    }

    return NextResponse.json(
      { results },
      { headers: { "Cache-Control": "public, s-maxage=86400" } }
    );
  } catch {
    return NextResponse.json({ results: [] });
  }
}

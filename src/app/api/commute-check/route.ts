import { NextRequest, NextResponse } from "next/server";

function cleanEnv(val: string | undefined): string {
  return (val || "").replace(/\\n/g, "").replace(/\n/g, "").trim();
}

interface Destination {
  label: string;
  address: string;
}

interface ModeResult {
  duration: string;
  distance: string;
  durationMins: number;
  summary?: string;
}

interface DestinationResult {
  label: string;
  address: string;
  driving: ModeResult | null;
  transit: ModeResult | null;
  cycling: ModeResult | null;
  monthlyCost: {
    driving: number;
    transit: number;
    cycling: number;
  };
}

type DirectionsMode = "driving" | "transit" | "bicycling";

async function fetchDirections(
  origin: string,
  destination: string,
  mode: DirectionsMode,
  apiKey: string
): Promise<ModeResult | null> {
  try {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/directions/json"
    );
    url.searchParams.set("origin", origin);
    url.searchParams.set("destination", destination);
    url.searchParams.set("mode", mode);
    url.searchParams.set("key", apiKey);
    url.searchParams.set("region", "uk");

    const res = await fetch(url.toString(), {
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== "OK" || !data.routes?.length) return null;

    const leg = data.routes[0].legs[0];
    if (!leg) return null;

    const result: ModeResult = {
      duration: leg.duration.text,
      distance: leg.distance.text,
      durationMins: Math.round(leg.duration.value / 60),
    };

    // For transit, include a summary of the route steps
    if (mode === "transit" && data.routes[0].summary) {
      result.summary = data.routes[0].summary;
    } else if (mode === "transit" && leg.steps) {
      const transitSteps = leg.steps
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((s: any) => s.travel_mode === "TRANSIT")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((s: any) => {
          const line = s.transit_details?.line;
          if (!line) return null;
          const name = line.short_name || line.name || "";
          const vehicle = line.vehicle?.name || "";
          return name ? `${vehicle} ${name}`.trim() : vehicle;
        })
        .filter(Boolean);
      if (transitSteps.length > 0) {
        result.summary = transitSteps.join(" then ");
      }
    }

    return result;
  } catch {
    return null;
  }
}

function parseDistanceKm(distanceText: string): number {
  // Extract numeric km value from strings like "12.3 km" or "5.6 mi"
  const kmMatch = distanceText.match(/([\d.]+)\s*km/i);
  if (kmMatch) return parseFloat(kmMatch[1]);

  const miMatch = distanceText.match(/([\d.]+)\s*mi/i);
  if (miMatch) return parseFloat(miMatch[1]) * 1.609;

  return 0;
}

function estimateTransitMonthlyCost(distanceKm: number): number {
  // Estimate based on UK transit pricing
  const distanceMiles = distanceKm / 1.609;
  if (distanceMiles <= 3) return 70; // Bus pass
  if (distanceMiles <= 8) return 130; // Zone 1-2 equivalent
  if (distanceMiles <= 15) return 190; // Zone 1-3 equivalent
  if (distanceMiles <= 25) return 250; // Zone 1-5 equivalent
  // Longer distances: roughly £0.25/mile return, 22 working days
  return Math.round(distanceMiles * 0.25 * 2 * 22);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destinations } = body as {
      origin?: string;
      destinations?: Destination[];
    };

    if (!origin || typeof origin !== "string") {
      return NextResponse.json(
        { error: "origin postcode is required" },
        { status: 400 }
      );
    }

    if (
      !destinations ||
      !Array.isArray(destinations) ||
      destinations.length === 0
    ) {
      return NextResponse.json(
        { error: "At least one destination is required" },
        { status: 400 }
      );
    }

    if (destinations.length > 3) {
      return NextResponse.json(
        { error: "Maximum 3 destinations allowed" },
        { status: 400 }
      );
    }

    const apiKey = cleanEnv(process.env.GOOGLE_PLACES_API_KEY);
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google API key not configured" },
        { status: 500 }
      );
    }

    const originFormatted = `${origin.trim()}, UK`;

    const results: DestinationResult[] = await Promise.all(
      destinations.map(async (dest) => {
        const [driving, transit, cycling] = await Promise.all([
          fetchDirections(originFormatted, dest.address, "driving", apiKey),
          fetchDirections(originFormatted, dest.address, "transit", apiKey),
          fetchDirections(originFormatted, dest.address, "bicycling", apiKey),
        ]);

        // Calculate monthly costs based on actual distances
        const drivingDistKm = driving
          ? parseDistanceKm(driving.distance)
          : 0;
        const transitDistKm = transit
          ? parseDistanceKm(transit.distance)
          : drivingDistKm;

        const monthlyCost = {
          // distance_km * 2 (return) * 22 working days * £0.25/km
          driving: driving
            ? Math.round(drivingDistKm * 2 * 22 * 0.25)
            : 0,
          transit: transit
            ? estimateTransitMonthlyCost(transitDistKm)
            : 0,
          cycling: 10, // Maintenance only
        };

        return {
          label: dest.label,
          address: dest.address,
          driving,
          transit,
          cycling,
          monthlyCost,
        };
      })
    );

    return NextResponse.json(
      { results },
      {
        headers: {
          "Cache-Control": "public, s-maxage=604800",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to calculate commute data" },
      { status: 500 }
    );
  }
}

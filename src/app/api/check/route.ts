import { NextRequest } from "next/server";
import {
  getPropertyData,
  validatePostcode,
  type PropertyData,
} from "@/lib/apis";

// TODO: Implement proper rate limiting (e.g. using upstash/ratelimit or a Redis store).
// For now, check X-Forwarded-For to identify callers but do not enforce limits.

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}

/** Strip detailed fields for unauthenticated (free) requests. */
function toLimitedData(data: PropertyData) {
  return {
    postcode: data.postcode
      ? {
          postcode: data.postcode.postcode,
          region: data.postcode.region,
          country: data.postcode.country,
        }
      : null,
    epc: data.epc
      ? { summary: { averageRating: data.epc.summary.averageRating } }
      : null,
    crime: data.crime ? { totalCrimes: data.crime.totalCrimes } : null,
    flood: data.flood ? { riskLevel: data.flood.riskLevel } : null,
    broadband: null,
    safetyScore: data.safetyScore,
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postcode, apiKey } = body as {
      postcode?: string;
      apiKey?: string;
    };

    if (!postcode || typeof postcode !== "string") {
      return json({ error: "postcode is required" }, 400);
    }

    const cleaned = postcode.trim().toUpperCase();

    if (!validatePostcode(cleaned)) {
      return json({ error: "Invalid UK postcode format" }, 400);
    }

    // Identify caller for future rate limiting
    const _clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    const isAuthorised =
      !!apiKey &&
      !!process.env.COUNCIL_API_KEY &&
      apiKey === process.env.COUNCIL_API_KEY;

    const data = await getPropertyData(cleaned);

    if (!data.postcode) {
      return json({ error: "Postcode not found" }, 404);
    }

    return json({
      success: true,
      tier: isAuthorised ? "full" : "free",
      data: isAuthorised ? data : toLimitedData(data),
    });
  } catch (err) {
    console.error("[api/check] Error:", err);
    return json({ error: "Internal server error" }, 500);
  }
}

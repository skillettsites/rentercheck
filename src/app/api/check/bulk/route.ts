import { NextRequest } from "next/server";
import {
  getPropertyData,
  validatePostcode,
  type PropertyData,
} from "@/lib/apis";

// TODO: Implement proper rate limiting per API key (e.g. using upstash/ratelimit).

const MAX_POSTCODES = 50;

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

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postcodes, apiKey } = body as {
      postcodes?: string[];
      apiKey?: string;
    };

    // API key is required for bulk checks
    if (
      !apiKey ||
      !process.env.COUNCIL_API_KEY ||
      apiKey !== process.env.COUNCIL_API_KEY
    ) {
      return json({ error: "Valid apiKey is required for bulk checks" }, 401);
    }

    if (!Array.isArray(postcodes) || postcodes.length === 0) {
      return json(
        { error: "postcodes must be a non-empty array of strings" },
        400
      );
    }

    if (postcodes.length > MAX_POSTCODES) {
      return json(
        {
          error: `Maximum ${MAX_POSTCODES} postcodes per request. Received ${postcodes.length}.`,
        },
        400
      );
    }

    // Validate all postcodes upfront
    const cleaned: string[] = [];
    const invalid: string[] = [];

    for (const pc of postcodes) {
      if (typeof pc !== "string") {
        invalid.push(String(pc));
        continue;
      }
      const normalised = pc.trim().toUpperCase();
      if (!validatePostcode(normalised)) {
        invalid.push(pc);
      } else {
        cleaned.push(normalised);
      }
    }

    if (invalid.length > 0) {
      return json(
        { error: "Invalid postcodes detected", invalid },
        400
      );
    }

    // Fetch all in parallel
    const results = await Promise.allSettled(
      cleaned.map((pc) => getPropertyData(pc))
    );

    const data: { postcode: string; result: PropertyData | null }[] =
      results.map((r, i) => ({
        postcode: cleaned[i],
        result: r.status === "fulfilled" ? r.value : null,
      }));

    return json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.error("[api/check/bulk] Error:", err);
    return json({ error: "Internal server error" }, 500);
  }
}

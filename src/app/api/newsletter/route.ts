import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to Resend (or similar email service) for actual email list management.
// TODO: Store subscribers in a database (Supabase, etc.) instead of just logging.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body as { email?: string; source?: string };

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Log the subscription (replace with actual storage later)
    console.log(`[Newsletter] New subscriber: ${email} (source: ${source || "unknown"})`);

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RenterCheck - Is Your Rental Property Safe?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Shield icon */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l7 4v6c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginTop: 24,
          }}
        >
          RenterCheck
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            marginTop: 16,
            opacity: 0.95,
          }}
        >
          Is Your Rental Property Safe?
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            marginTop: 20,
            opacity: 0.8,
            fontWeight: 400,
          }}
        >
          Free Property Intelligence for UK Renters
        </div>
      </div>
    ),
    { ...size }
  );
}

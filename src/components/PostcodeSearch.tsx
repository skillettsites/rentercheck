"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function PostcodeSearch({ size = "lg" }: { size?: "lg" | "sm" }) {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cleaned = postcode.trim().toUpperCase().replace(/\s+/g, "");
      if (!cleaned) return;
      setLoading(true);
      router.push(`/check/${encodeURIComponent(cleaned)}`);
    },
    [postcode, router]
  );

  const isLg = size === "lg";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div
        className={`flex ${isLg ? "flex-col sm:flex-row" : "flex-row"} gap-3`}
      >
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter a UK postcode, e.g. SW1A 1AA"
            className={`w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all ${
              isLg ? "h-14 text-lg" : "h-12 text-base"
            }`}
            autoComplete="postal-code"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !postcode.trim()}
          className={`inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 font-semibold text-white shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer ${
            isLg
              ? "h-14 px-8 text-lg sm:w-auto w-full"
              : "h-12 px-6 text-base"
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          )}
          {loading ? "Checking..." : "Check Now"}
        </button>
      </div>
    </form>
  );
}

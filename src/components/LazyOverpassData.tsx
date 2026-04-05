"use client";

import { useState, useEffect } from "react";

interface OverpassResult {
  n: string;
  la: number;
  lo: number;
}

interface LazyOverpassDataProps {
  type: string; // parks, supermarkets, convenience, gp, pharmacy, hospital, dentist
  lat: number;
  lng: number;
  hasLocalData: boolean; // true if server already found results from local JSON
  children: (data: { results: OverpassResult[]; loading: boolean }) => React.ReactNode;
}

export function LazyOverpassData({ type, lat, lng, hasLocalData, children }: LazyOverpassDataProps) {
  const [results, setResults] = useState<OverpassResult[]>([]);
  const [loading, setLoading] = useState(!hasLocalData);

  useEffect(() => {
    if (hasLocalData) return; // Local data exists, no need to fetch

    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(`/api/overpass?type=${type}&lat=${lat}&lng=${lng}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.results) {
          setResults(data.results);
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [type, lat, lng, hasLocalData]);

  if (hasLocalData) return null; // Server already rendered the data
  return <>{children({ results, loading })}</>;
}

// Reusable loading skeleton for a data card
export function CardLoadingSkeleton({ label }: { label: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-4 w-4 rounded-full bg-slate-200" />
        <div className="h-3 w-24 rounded bg-slate-200" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-3/4 rounded bg-slate-200" />
      </div>
      <p className="mt-2 text-xs text-slate-400">Loading {label}...</p>
    </div>
  );
}

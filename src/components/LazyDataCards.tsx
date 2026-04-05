"use client";

import { useState, useEffect, useCallback } from "react";

interface OverpassResult {
  n: string;
  la: number;
  lo: number;
}

interface LazyDataCardsProps {
  lat: number;
  lng: number;
  hasParks: boolean;
  hasSupermarkets: boolean;
  hasHealthcare: boolean;
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sortByDistance(results: OverpassResult[], lat: number, lng: number) {
  return results
    .map((r) => ({ name: r.n, distance: Math.round(haversine(lat, lng, r.la, r.lo) * 1000) / 1000 }))
    .sort((a, b) => a.distance - b.distance);
}

async function fetchOverpass(type: string, lat: number, lng: number): Promise<OverpassResult[]> {
  try {
    const res = await fetch(`/api/overpass?type=${type}&lat=${lat}&lng=${lng}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

// Loading skeleton
function LoadingSkeleton({ label }: { label: string }) {
  return (
    <div className="animate-slide-up rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-slate-100 animate-pulse" />
        <div className="h-5 w-32 rounded bg-slate-100 animate-pulse" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-slate-100 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-slate-100 animate-pulse" />
      </div>
      <p className="mt-3 text-xs text-slate-400 flex items-center gap-2">
        <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Fetching {label} data...
      </p>
    </div>
  );
}

// Result card for lazy-loaded data
function ResultCard({
  title,
  icon,
  items,
  total,
  rating,
}: {
  title: string;
  icon: string;
  items: { name: string; distance: number }[];
  total: number;
  rating: string;
}) {
  const ratingColors: Record<string, { color: string; bg: string }> = {
    Excellent: { color: '#059669', bg: '#d1fae5' },
    Good: { color: '#10b981', bg: '#d1fae5' },
    Average: { color: '#d97706', bg: '#fef3c7' },
    Poor: { color: '#dc2626', bg: '#fee2e2' },
  };
  const rc = ratingColors[rating] || ratingColors.Poor;

  return (
    <div className="animate-fade-in rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        <span className="rounded-full px-3 py-1 text-sm font-semibold" style={{ backgroundColor: rc.bg, color: rc.color }}>
          {rating}
        </span>
      </div>

      {items.length > 0 ? (
        <ul className="space-y-2 mb-3">
          {items.slice(0, 5).map((item, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <span className="text-slate-700 truncate mr-2">{item.name}</span>
              <span className="text-slate-400 shrink-0">{(item.distance * 1000).toFixed(0)}m</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 mb-3">No data found nearby.</p>
      )}

      {total > 5 && (
        <p className="text-xs text-slate-400">+{total - 5} more within range</p>
      )}
      <p className="mt-2 text-xs text-slate-400">Live data from OpenStreetMap.</p>
    </div>
  );
}

export function LazyDataCards({ lat, lng, hasParks, hasSupermarkets, hasHealthcare }: LazyDataCardsProps) {
  const [parksData, setParksData] = useState<{ name: string; distance: number }[] | null>(null);
  const [supermarketsData, setSupermarketsData] = useState<{ name: string; distance: number }[] | null>(null);
  const [healthcareData, setHealthcareData] = useState<{ gps: { name: string; distance: number }[]; pharmacies: number; dentists: number; hospitals: number } | null>(null);
  const [loading, setLoading] = useState({ parks: !hasParks, supermarkets: !hasSupermarkets, healthcare: !hasHealthcare });

  const fetchMissing = useCallback(async () => {
    const promises: Promise<void>[] = [];

    if (!hasParks) {
      promises.push(
        fetchOverpass("parks", lat, lng).then((results) => {
          const sorted = sortByDistance(results, lat, lng);
          setParksData(sorted);
          setLoading((prev) => ({ ...prev, parks: false }));
        })
      );
    }

    if (!hasSupermarkets) {
      promises.push(
        fetchOverpass("supermarkets", lat, lng).then((results) => {
          const sorted = sortByDistance(results, lat, lng);
          setSupermarketsData(sorted);
          setLoading((prev) => ({ ...prev, supermarkets: false }));
        })
      );
    }

    if (!hasHealthcare) {
      promises.push(
        fetchOverpass("gp", lat, lng).then((results) => {
          const gps = sortByDistance(results, lat, lng);
          setHealthcareData({ gps, pharmacies: 0, dentists: 0, hospitals: 0 });
          setLoading((prev) => ({ ...prev, healthcare: false }));
        })
      );
    }

    await Promise.allSettled(promises);
  }, [lat, lng, hasParks, hasSupermarkets, hasHealthcare]);

  useEffect(() => {
    if (hasParks && hasSupermarkets && hasHealthcare) return;
    fetchMissing();
  }, [fetchMissing, hasParks, hasSupermarkets, hasHealthcare]);

  // Don't render anything if all local data exists
  if (hasParks && hasSupermarkets && hasHealthcare) return null;

  function getParksRating(count: number) {
    if (count >= 5) return 'Excellent';
    if (count >= 3) return 'Good';
    if (count >= 1) return 'Average';
    return 'Poor';
  }

  function getAmenityRating(count: number) {
    if (count >= 5) return 'Excellent';
    if (count >= 3) return 'Good';
    if (count >= 1) return 'Average';
    return 'Poor';
  }

  function getHealthcareRating(count: number) {
    if (count >= 3) return 'Excellent';
    if (count >= 2) return 'Good';
    if (count >= 1) return 'Average';
    return 'Poor';
  }

  return (
    <>
      {!hasParks && (
        loading.parks ? (
          <LoadingSkeleton label="green spaces" />
        ) : parksData ? (
          <ResultCard
            title="Green Spaces"
            icon="🌳"
            items={parksData}
            total={parksData.length}
            rating={getParksRating(parksData.length)}
          />
        ) : null
      )}

      {!hasSupermarkets && (
        loading.supermarkets ? (
          <LoadingSkeleton label="local amenities" />
        ) : supermarketsData ? (
          <ResultCard
            title="Local Amenities"
            icon="🛒"
            items={supermarketsData}
            total={supermarketsData.length}
            rating={getAmenityRating(supermarketsData.length)}
          />
        ) : null
      )}

      {!hasHealthcare && (
        loading.healthcare ? (
          <LoadingSkeleton label="healthcare" />
        ) : healthcareData ? (
          <ResultCard
            title="Healthcare"
            icon="🏥"
            items={healthcareData.gps}
            total={healthcareData.gps.length}
            rating={getHealthcareRating(healthcareData.gps.length)}
          />
        ) : null
      )}
    </>
  );
}

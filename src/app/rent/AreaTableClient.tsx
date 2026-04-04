"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface AreaRow {
  slug: string;
  name: string;
  region: string;
  twoBedRent: number;
  yield: number;
  growth: number;
  demandLevel: string;
}

type SortKey = "name" | "region" | "twoBedRent" | "yield" | "growth" | "demandLevel";
type SortDir = "asc" | "desc";

const demandOrder: Record<string, number> = {
  "Very High": 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

const demandColours: Record<string, string> = {
  "Very High": "bg-danger-100 text-danger-700",
  High: "bg-warning-100 text-warning-700",
  Medium: "bg-primary-100 text-primary-700",
  Low: "bg-slate-100 text-slate-600",
};

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return (
      <svg className="ml-1 h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      </svg>
    );
  }
  return dir === "asc" ? (
    <svg className="ml-1 h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  ) : (
    <svg className="ml-1 h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function AreaTableClient({ rows }: { rows: AreaRow[] }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("twoBedRent");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" || key === "region" ? "asc" : "desc");
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = rows;
    if (q) {
      result = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q)
      );
    }

    return [...result].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "region":
          cmp = a.region.localeCompare(b.region);
          break;
        case "twoBedRent":
          cmp = a.twoBedRent - b.twoBedRent;
          break;
        case "yield":
          cmp = a.yield - b.yield;
          break;
        case "growth":
          cmp = a.growth - b.growth;
          break;
        case "demandLevel":
          cmp = (demandOrder[a.demandLevel] || 0) - (demandOrder[b.demandLevel] || 0);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [rows, search, sortKey, sortDir]);

  const headers: { key: SortKey; label: string; align: string; hideOnMobile?: boolean }[] = [
    { key: "name", label: "City", align: "text-left" },
    { key: "region", label: "Region", align: "text-left", hideOnMobile: true },
    { key: "twoBedRent", label: "2-Bed Rent", align: "text-right" },
    { key: "yield", label: "Yield", align: "text-right", hideOnMobile: true },
    { key: "growth", label: "Growth", align: "text-right" },
    { key: "demandLevel", label: "Demand", align: "text-center", hideOnMobile: true },
  ];

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city or region..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 h-12 text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {filtered.length} of {rows.length} cities shown
        </p>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {headers.map((h) => (
                  <th
                    key={h.key}
                    className={`py-3 px-4 font-medium text-slate-600 cursor-pointer select-none hover:text-slate-900 transition-colors ${h.align} ${h.hideOnMobile ? "hidden sm:table-cell" : ""}`}
                    onClick={() => handleSort(h.key)}
                  >
                    <span className="inline-flex items-center">
                      {h.label}
                      <SortIcon
                        active={sortKey === h.key}
                        dir={sortDir}
                      />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.slug}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <Link
                      href={`/rent/${row.slug}`}
                      className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-slate-600 hidden sm:table-cell">
                    {row.region}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-slate-800">
                    £{row.twoBedRent.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700 hidden sm:table-cell">
                    {row.yield}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-medium ${row.growth > 5 ? "text-danger-600" : row.growth > 0 ? "text-warning-600" : "text-accent-600"}`}
                    >
                      {row.growth > 0 ? "+" : ""}
                      {row.growth}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${demandColours[row.demandLevel] || "bg-slate-100 text-slate-600"}`}
                    >
                      {row.demandLevel}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-400"
                  >
                    No cities match your search. Try a different term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

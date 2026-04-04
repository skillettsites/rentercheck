"use client";

import { useState } from "react";
import Link from "next/link";

/* -----------------------------------------------
   Mock Data
----------------------------------------------- */

const topStats = [
  { label: "Total PRS Properties", value: "12,847", icon: "building" },
  { label: "Compliance Rate", value: "73.2%", trend: "up", delta: "+2.1%", icon: "check" },
  { label: "Active Enforcement Cases", value: "234", icon: "alert" },
  { label: "Tenant Complaints This Month", value: "67", trend: "down", delta: "-8", icon: "message" },
];

const complianceBars = [
  { label: "Fully Compliant", pct: 73, color: "bg-accent-500" },
  { label: "Minor Issues", pct: 15, color: "bg-warning-400" },
  { label: "Serious Non-Compliance", pct: 9, color: "bg-danger-500" },
  { label: "Unknown / Unscreened", pct: 3, color: "bg-slate-400" },
];

type Ward = {
  name: string;
  properties: number;
  compliance: number;
  hmoRisk: "High" | "Medium" | "Low";
  activeCases: number;
  trend: "up" | "down" | "flat";
};

const wardData: Ward[] = [
  { name: "Northgate", properties: 1234, compliance: 68, hmoRisk: "High", activeCases: 12, trend: "down" },
  { name: "Eastfield", properties: 1876, compliance: 71, hmoRisk: "Medium", activeCases: 18, trend: "up" },
  { name: "Southwark Park", properties: 2103, compliance: 79, hmoRisk: "Low", activeCases: 9, trend: "up" },
  { name: "Westbourne", properties: 987, compliance: 65, hmoRisk: "High", activeCases: 22, trend: "down" },
  { name: "Highbury East", properties: 1543, compliance: 82, hmoRisk: "Low", activeCases: 5, trend: "up" },
  { name: "Finsbury Park", properties: 1678, compliance: 69, hmoRisk: "High", activeCases: 31, trend: "down" },
  { name: "Stoke Newington", properties: 1456, compliance: 74, hmoRisk: "Medium", activeCases: 14, trend: "flat" },
  { name: "De Beauvoir", properties: 970, compliance: 81, hmoRisk: "Low", activeCases: 7, trend: "up" },
];

const alerts = [
  { text: "Unlicensed HMO suspected at 47 Victoria Road, NW3", severity: "red" as const },
  { text: "EPC expired on 12 properties in Eastfield ward", severity: "amber" as const },
  { text: "Gas safety certificates expiring within 30 days: 23 properties", severity: "amber" as const },
  { text: "New tenant complaint: damp and mould at 8 Park Lane, SE1", severity: "blue" as const },
  { text: "Enforcement notice response overdue: 3 cases", severity: "red" as const },
];

const pipelineColumns = [
  {
    title: "Investigation",
    count: 8,
    cards: [
      { address: "14 Camden Road, N7", issue: "Suspected unlicensed HMO" },
      { address: "92 Mare Street, E8", issue: "No gas safety certificate" },
      { address: "7 Dalston Lane, E8", issue: "Overcrowding complaint" },
    ],
  },
  {
    title: "Notice Issued",
    count: 5,
    cards: [
      { address: "33 Kingsland Rd, E2", issue: "Improvement notice (damp)" },
      { address: "18 Stoke Newington High St", issue: "Prohibition notice" },
    ],
  },
  {
    title: "Appeal / Response",
    count: 3,
    cards: [
      { address: "55 Brick Lane, E1", issue: "Landlord appealing penalty" },
      { address: "21 Old Street, EC1", issue: "Compliance evidence submitted" },
    ],
  },
  {
    title: "Resolved",
    count: 12,
    cards: [
      { address: "8 Pembury Road, E5", issue: "EPC renewed, compliant" },
      { address: "41 Amhurst Road, E8", issue: "Penalty paid, works completed" },
      { address: "16 Lordship Park, N16", issue: "Licence granted" },
    ],
  },
];

const mockSearchResult = {
  address: "47 Victoria Road, London NW3 6PQ",
  landlord: "Greystone Properties Ltd",
  complianceScore: 34,
  lastInspected: "14 Nov 2025",
  issues: [
    "No valid HMO licence",
    "EPC rating F (below minimum E)",
    "Gas safety certificate expired",
    "No deposit protection evidence",
  ],
};

/* -----------------------------------------------
   Helper Components
----------------------------------------------- */

function TrendArrow({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") {
    return (
      <span className="inline-flex items-center text-accent-500 text-xs font-semibold">
        <svg className="h-3.5 w-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center text-danger-500 text-xs font-semibold">
        <svg className="h-3.5 w-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-slate-400 text-xs font-semibold">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
    </span>
  );
}

function HMORiskBadge({ risk }: { risk: "High" | "Medium" | "Low" }) {
  const colors = {
    High: "bg-danger-100 text-danger-700",
    Medium: "bg-warning-100 text-warning-700",
    Low: "bg-accent-100 text-accent-700",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[risk]}`}>
      {risk}
    </span>
  );
}

function AlertBadge({ severity }: { severity: "red" | "amber" | "blue" }) {
  const colors = {
    red: "bg-danger-500",
    amber: "bg-warning-500",
    blue: "bg-primary-500",
  };
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${colors[severity]} shrink-0 mt-1.5`} />;
}

/* -----------------------------------------------
   Page
----------------------------------------------- */

type SortKey = "name" | "properties" | "compliance" | "hmoRisk" | "activeCases";
type SortDir = "asc" | "desc";

export default function CouncilDemoPage() {
  const [sortKey, setSortKey] = useState<SortKey>("compliance");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResult, setShowResult] = useState(false);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const hmoRiskOrder = { High: 3, Medium: 2, Low: 1 };

  const sortedWards = [...wardData].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "name") cmp = a.name.localeCompare(b.name);
    else if (sortKey === "hmoRisk") cmp = hmoRiskOrder[a.hmoRisk] - hmoRiskOrder[b.hmoRisk];
    else cmp = a[sortKey] - b[sortKey];
    return sortDir === "asc" ? cmp : -cmp;
  });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      setShowResult(true);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Demo Banner */}
      <div className="bg-primary-900 text-primary-100 text-center py-2 px-4 text-sm font-medium">
        Demo Dashboard - Showing sample data for a London borough
      </div>

      {/* Dashboard Header */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="h-7 w-7 text-primary-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 4v6c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
            <div>
              <h1 className="text-lg font-bold">RenterCheck Council Dashboard</h1>
              <p className="text-xs text-slate-400">London Borough of Hackney (Demo)</p>
            </div>
          </div>
          <Link
            href="/councils"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
          >
            Get Your Own Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topStats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {stat.label}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                {stat.trend && stat.delta && (
                  <span className={`text-xs font-semibold ${stat.trend === "up" ? "text-accent-600" : "text-danger-600"}`}>
                    {stat.delta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Overview */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4">Compliance Overview</h2>

          {/* Stacked bar */}
          <div className="flex h-10 rounded-lg overflow-hidden mb-4">
            {complianceBars.map((bar) => (
              <div
                key={bar.label}
                className={`${bar.color} transition-all duration-500`}
                style={{ width: `${bar.pct}%` }}
                title={`${bar.label}: ${bar.pct}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {complianceBars.map((bar) => (
              <div key={bar.label} className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-sm ${bar.color}`} />
                <span className="text-slate-600">{bar.label}</span>
                <span className="font-semibold text-slate-900">{bar.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ward Breakdown + Alerts side by side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ward Table */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Ward Breakdown</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {([
                      ["name", "Ward"],
                      ["properties", "PRS Properties"],
                      ["compliance", "Compliance"],
                      ["hmoRisk", "HMO Risk"],
                      ["activeCases", "Active Cases"],
                    ] as [SortKey, string][]).map(([key, label]) => (
                      <th
                        key={key}
                        className="px-4 py-3 cursor-pointer hover:text-slate-700 select-none whitespace-nowrap"
                        onClick={() => handleSort(key)}
                      >
                        <span className="flex items-center gap-1">
                          {label}
                          {sortKey === key && (
                            <svg className={`h-3 w-3 transition-transform ${sortDir === "desc" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                          )}
                        </span>
                      </th>
                    ))}
                    <th className="px-4 py-3 whitespace-nowrap">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedWards.map((ward) => (
                    <tr key={ward.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{ward.name}</td>
                      <td className="px-4 py-3 text-slate-700">{ward.properties.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${ward.compliance >= 75 ? "bg-accent-500" : ward.compliance >= 65 ? "bg-warning-400" : "bg-danger-500"}`}
                              style={{ width: `${ward.compliance}%` }}
                            />
                          </div>
                          <span className="text-slate-700 font-medium">{ward.compliance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <HMORiskBadge risk={ward.hmoRisk} />
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-medium">{ward.activeCases}</td>
                      <td className="px-4 py-3">
                        <TrendArrow trend={ward.trend} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Recent Alerts</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {alerts.map((alert, i) => (
                <div key={i} className="px-5 py-4 flex gap-3">
                  <AlertBadge severity={alert.severity} />
                  <p className="text-sm text-slate-700 leading-relaxed">{alert.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Search */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4">Property Search</h2>
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length === 0) setShowResult(false);
              }}
              placeholder="Search by address or postcode..."
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
            />
            <button
              type="submit"
              className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
            >
              Search
            </button>
          </form>

          {showResult && (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">{mockSearchResult.address}</h3>
                  <p className="text-sm text-slate-500 mt-1">Landlord: {mockSearchResult.landlord}</p>
                  <p className="text-sm text-slate-500">Last inspected: {mockSearchResult.lastInspected}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className={`text-3xl font-extrabold ${mockSearchResult.complianceScore < 50 ? "text-danger-600" : mockSearchResult.complianceScore < 75 ? "text-warning-600" : "text-accent-600"}`}>
                      {mockSearchResult.complianceScore}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Compliance Score</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Issues Found</h4>
                <ul className="space-y-1.5">
                  {mockSearchResult.issues.map((issue) => (
                    <li key={issue} className="flex items-start gap-2 text-sm text-danger-700">
                      <svg className="h-4 w-4 shrink-0 mt-0.5 text-danger-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Enforcement Pipeline (Kanban) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4">Enforcement Pipeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipelineColumns.map((col) => (
              <div key={col.title} className="rounded-lg bg-slate-50 border border-slate-200 overflow-hidden">
                <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">{col.title}</h3>
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-300 px-2 text-xs font-bold text-slate-700">
                    {col.count}
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  {col.cards.map((card) => (
                    <div key={card.address} className="rounded-lg bg-white border border-slate-200 p-3 shadow-sm">
                      <p className="text-xs font-semibold text-slate-900">{card.address}</p>
                      <p className="text-xs text-slate-500 mt-1">{card.issue}</p>
                    </div>
                  ))}
                  {col.count > col.cards.length && (
                    <p className="text-xs text-center text-slate-400 py-1">
                      +{col.count - col.cards.length} more
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-xl bg-gradient-to-r from-primary-800 to-primary-900 p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            This is a demo dashboard. Contact us to set up your council&apos;s instance.
          </h2>
          <p className="mt-2 text-primary-200 text-sm">
            Includes full data integration, officer accounts, and custom ward configuration.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/councils#contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-800 hover:bg-primary-50 transition-colors"
            >
              Request a Demo
            </Link>
            <Link
              href="/councils"
              className="inline-flex items-center justify-center rounded-lg bg-primary-700 border border-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

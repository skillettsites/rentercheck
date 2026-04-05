import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPropertyData } from "@/lib/apis";
import type { PropertyData } from "@/lib/apis";
import PostcodeSearch from "@/components/PostcodeSearch";
import { AddressSelector } from "@/components/AddressSelector";

interface PageProps {
  params: Promise<{ postcode: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postcode } = await params;
  const decoded = decodeURIComponent(postcode).toUpperCase();
  return {
    title: `Property Check: ${decoded} | RenterCheck`,
    description: `Free rental property check for ${decoded}. EPC rating, crime data, flood risk, broadband speed, and area information.`,
    alternates: { canonical: `https://rentercheck.vercel.app/check/${postcode}` },
    openGraph: {
      title: `Property Check: ${decoded} | RenterCheck`,
      description: `Free rental property check for ${decoded}. EPC rating, crime data, flood risk, broadband speed, and area information.`,
      url: `https://rentercheck.vercel.app/check/${postcode}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Score circle component
// ---------------------------------------------------------------------------
function SafetyScoreCircle({ score, variant = "light" }: { score: number; variant?: "light" | "dark" }) {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const isDark = variant === "dark";

  let color: string;
  let bgColor: string;
  let label: string;

  if (score >= 70) {
    color = isDark ? "#ffffff" : "#10b981";
    bgColor = isDark ? "rgba(16,185,129,0.25)" : "#d1fae5";
    label = "Good";
  } else if (score >= 40) {
    color = isDark ? "#ffffff" : "#f59e0b";
    bgColor = isDark ? "rgba(245,158,11,0.25)" : "#fef3c7";
    label = "Fair";
  } else {
    color = isDark ? "#ffffff" : "#ef4444";
    bgColor = isDark ? "rgba(239,68,68,0.25)" : "#fee2e2";
    label = "Poor";
  }

  const trackColor = isDark ? "rgba(255,255,255,0.15)" : "#e2e8f0";
  const ringColor = isDark ? "#ffffff" : (score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444");

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {score}
          </span>
          <span className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-500"}`}>/100</span>
        </div>
      </div>
      <span
        className="mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold"
        style={{ backgroundColor: bgColor, color }}
      >
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EPC Rating Card
// ---------------------------------------------------------------------------
const EPC_COLORS: Record<string, string> = {
  A: "#059669",
  B: "#10b981",
  C: "#34d399",
  D: "#fbbf24",
  E: "#f59e0b",
  F: "#ef4444",
  G: "#b91c1c",
};

function EPCCard({ data }: { data: PropertyData }) {
  const epc = data.epc;
  if (!epc) {
    return (
      <CardShell title="EPC Rating" icon="bolt">
        <p className="text-slate-500">No EPC data available for this postcode.</p>
      </CardShell>
    );
  }

  const { summary, records } = epc;
  const ratingColor = EPC_COLORS[summary.averageRating] ?? "#6b7280";

  return (
    <CardShell title="EPC Rating" icon="bolt">
      <div className="flex items-start gap-6">
        {/* Large letter grade */}
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-white text-3xl font-extrabold shadow-md"
          style={{ backgroundColor: ratingColor }}
        >
          {summary.averageRating}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Average efficiency</p>
          <p className="text-2xl font-bold text-slate-800">
            {summary.averageEfficiency}
            <span className="text-base font-normal text-slate-400">/100</span>
          </p>
          <p className="text-sm text-slate-500">
            {summary.mostCommonPropertyType} &middot; {summary.totalRecords} properties found
          </p>
        </div>
      </div>

      {/* Band distribution */}
      <div className="mt-5 space-y-1.5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Band Distribution
        </p>
        <div className="flex gap-1">
          {Object.entries(summary.bandDistribution).map(([band, pct]) => (
            <div key={band} className="flex-1 text-center">
              <div
                className="mx-auto rounded-md"
                style={{
                  height: Math.max(4, pct * 0.6) + "px",
                  backgroundColor: EPC_COLORS[band] ?? "#cbd5e1",
                  width: "100%",
                  minHeight: 4,
                }}
              />
              <span className="mt-1 block text-xs font-medium text-slate-600">
                {band}
              </span>
              <span className="block text-xs text-slate-400">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Property list (first 5) */}
      {records.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Properties at this postcode
          </p>
          <ul className="space-y-2">
            {records.slice(0, 5).map((rec, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="text-slate-700 truncate max-w-[70%]">
                  {rec.address}
                </span>
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-white text-xs font-bold"
                  style={{
                    backgroundColor:
                      EPC_COLORS[rec.currentEnergyRating.toUpperCase()] ??
                      "#6b7280",
                  }}
                >
                  {rec.currentEnergyRating}
                </span>
              </li>
            ))}
          </ul>
          {records.length > 5 && (
            <p className="mt-2 text-xs text-slate-400 text-center">
              +{records.length - 5} more properties
            </p>
          )}
        </div>
      )}
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Crime Data Card
// ---------------------------------------------------------------------------
function CrimeCard({ data }: { data: PropertyData }) {
  const crime = data.crime;
  if (!crime) {
    return (
      <CardShell title="Crime Data" icon="shield">
        <p className="text-slate-500">No crime data available for this area.</p>
      </CardShell>
    );
  }

  let riskLevel: string;
  let riskColor: string;
  let riskBg: string;

  if (crime.totalCrimes <= 50) {
    riskLevel = "Low";
    riskColor = "#059669";
    riskBg = "#d1fae5";
  } else if (crime.totalCrimes <= 150) {
    riskLevel = "Medium";
    riskColor = "#d97706";
    riskBg = "#fef3c7";
  } else {
    riskLevel = "High";
    riskColor = "#dc2626";
    riskBg = "#fee2e2";
  }

  const maxCount =
    crime.topCategories.length > 0
      ? Math.max(...crime.topCategories.map((c) => c.count))
      : 1;

  return (
    <CardShell title="Crime Data" icon="shield">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-slate-800">
            {crime.totalCrimes.toLocaleString()}
          </p>
          <p className="text-sm text-slate-500">crimes reported ({crime.month})</p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: riskBg, color: riskColor }}
        >
          {riskLevel} Risk
        </span>
      </div>

      {/* Bar chart */}
      {crime.topCategories.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Top Categories
          </p>
          {crime.topCategories.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-600">{cat.label}</span>
                <span className="text-slate-800 font-medium">{cat.count}</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-2.5 rounded-full transition-all"
                  style={{
                    width: `${(cat.count / maxCount) * 100}%`,
                    backgroundColor:
                      riskLevel === "Low"
                        ? "#10b981"
                        : riskLevel === "Medium"
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Flood Risk Card
// ---------------------------------------------------------------------------
function FloodCard({ data }: { data: PropertyData }) {
  const flood = data.flood;
  if (!flood) {
    return (
      <CardShell title="Flood Risk" icon="water">
        <p className="text-slate-500">No flood risk data available.</p>
      </CardShell>
    );
  }

  const levelConfig = {
    low: { label: "Low Risk", color: "#059669", bg: "#d1fae5" },
    medium: { label: "Medium Risk", color: "#d97706", bg: "#fef3c7" },
    high: { label: "High Risk", color: "#dc2626", bg: "#fee2e2" },
  };

  const config = levelConfig[flood.riskLevel];

  return (
    <CardShell title="Flood Risk" icon="water">
      <div className="flex items-center justify-between mb-4">
        <span
          className="rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {config.label}
        </span>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-800">
            {flood.activeWarnings}
          </p>
          <p className="text-xs text-slate-500">active warnings</p>
        </div>
      </div>

      {flood.nearestFloodArea && (
        <div className="rounded-lg bg-slate-50 p-3 mt-2">
          <p className="text-sm font-medium text-slate-700">
            {flood.nearestFloodArea.label}
          </p>
          {flood.nearestFloodArea.description && (
            <p className="text-sm text-slate-500 mt-1">
              {flood.nearestFloodArea.description}
            </p>
          )}
          <p className="text-xs text-slate-400 mt-1">
            Severity: {flood.nearestFloodArea.severity}
          </p>
        </div>
      )}

      {!flood.nearestFloodArea && flood.riskLevel === "low" && (
        <p className="text-sm text-slate-500">
          No active flood warnings near this area. The location has a low risk of
          river and surface water flooding.
        </p>
      )}
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Broadband Card
// ---------------------------------------------------------------------------
function BroadbandCard({ data }: { data: PropertyData }) {
  const bb = data.broadband;
  if (!bb) {
    return (
      <CardShell title="Broadband" icon="wifi">
        <p className="text-slate-500">No broadband data available.</p>
      </CardShell>
    );
  }

  let speedColor: string;
  if (bb.estimatedAvgDownload >= 80) speedColor = "#10b981";
  else if (bb.estimatedAvgDownload >= 30) speedColor = "#f59e0b";
  else speedColor = "#ef4444";

  return (
    <CardShell title="Broadband" icon="wifi">
      <div className="mb-4">
        <p className="text-sm text-slate-500">Est. average download</p>
        <p className="text-3xl font-bold" style={{ color: speedColor }}>
          {bb.estimatedAvgDownload}
          <span className="text-base font-normal text-slate-400"> Mbps</span>
        </p>
        <div className="mt-2 h-3 w-full rounded-full bg-slate-100">
          <div
            className="h-3 rounded-full"
            style={{
              width: `${Math.min(100, (bb.estimatedAvgDownload / 100) * 100)}%`,
              backgroundColor: speedColor,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">
            {bb.superfastAvailability}%
          </p>
          <p className="text-xs text-slate-500">Superfast (30Mbps+)</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">
            {bb.ultrafastAvailability}%
          </p>
          <p className="text-xs text-slate-500">Ultrafast (100Mbps+)</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400">{bb.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Council Tax Card
// ---------------------------------------------------------------------------
function CouncilTaxCard({ data }: { data: PropertyData }) {
  const ct = data.councilTax;
  if (!ct) {
    return (
      <CardShell title="Council Tax" icon="banknote">
        <p className="text-slate-500">No council tax estimate available.</p>
      </CardShell>
    );
  }

  return (
    <CardShell title="Council Tax" icon="banknote">
      <div className="flex items-start gap-6 mb-4">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 text-3xl font-extrabold shadow-md"
        >
          {ct.estimatedBand}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Estimated Band</p>
          <p className="text-2xl font-bold text-slate-800">
            &pound;{ct.annualAmount.toLocaleString()}
            <span className="text-base font-normal text-slate-400">/year</span>
          </p>
          <p className="text-lg font-semibold text-slate-600">
            &pound;{ct.monthlyAmount}
            <span className="text-sm font-normal text-slate-400">/month</span>
          </p>
        </div>
      </div>
      <div className="rounded-lg bg-slate-50 p-3">
        <p className="text-sm text-slate-600">
          <span className="font-medium">Council:</span> {ct.councilName}
        </p>
      </div>
      <p className="mt-3 text-xs text-slate-400">{ct.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Schools Card
// ---------------------------------------------------------------------------
function SchoolsCard({ data }: { data: PropertyData }) {
  const schools = data.schools;
  if (!schools || schools.totalWithin1km === 0) {
    return (
      <CardShell title="Schools Nearby" icon="school">
        <p className="text-slate-500">No school data available for this area.</p>
      </CardShell>
    );
  }

  let densityColor: string;
  let densityBg: string;
  if (schools.density === 'High') {
    densityColor = '#059669';
    densityBg = '#d1fae5';
  } else if (schools.density === 'Moderate') {
    densityColor = '#d97706';
    densityBg = '#fef3c7';
  } else {
    densityColor = '#6b7280';
    densityBg = '#f1f5f9';
  }

  const ratingBadge = (rating?: string) => {
    if (!rating) return null;
    const colors: Record<string, { color: string; bg: string }> = {
      Outstanding: { color: '#059669', bg: '#d1fae5' },
      Good: { color: '#10b981', bg: '#d1fae5' },
      'Requires Improvement': { color: '#d97706', bg: '#fef3c7' },
      Inadequate: { color: '#dc2626', bg: '#fee2e2' },
    };
    const c = colors[rating] || { color: '#6b7280', bg: '#f1f5f9' };
    return (
      <span
        className="rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap"
        style={{ backgroundColor: c.bg, color: c.color }}
      >
        {rating === 'Requires Improvement' ? 'RI' : rating}
      </span>
    );
  };

  return (
    <CardShell title="Schools Nearby" icon="school">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-slate-800">{schools.totalWithin1km}</p>
          <p className="text-sm text-slate-500">schools within 1.5km</p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: densityBg, color: densityColor }}
        >
          {schools.density} Density
        </span>
      </div>

      {schools.familyFriendly && (
        <div className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 font-medium">
          Good for families
        </div>
      )}

      {/* Phase breakdown */}
      {(schools.primaryCount > 0 || schools.secondaryCount > 0 || schools.nurseryCount > 0) && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <p className="text-xl font-bold text-slate-800">{schools.primaryCount}</p>
            <p className="text-xs text-slate-500">Primary</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <p className="text-xl font-bold text-slate-800">{schools.secondaryCount}</p>
            <p className="text-xs text-slate-500">Secondary</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <p className="text-xl font-bold text-slate-800">{schools.nurseryCount}</p>
            <p className="text-xs text-slate-500">All-through</p>
          </div>
        </div>
      )}

      {/* Ofsted ratings summary */}
      {schools.ratings && (schools.ratings.outstanding > 0 || schools.ratings.good > 0 || schools.ratings.requiresImprovement > 0 || schools.ratings.inadequate > 0) && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="rounded-lg bg-emerald-50 p-2 text-center">
            <p className="text-lg font-bold text-emerald-700">{schools.ratings.outstanding}</p>
            <p className="text-[10px] text-emerald-600">Outstanding</p>
          </div>
          <div className="rounded-lg bg-green-50 p-2 text-center">
            <p className="text-lg font-bold text-green-700">{schools.ratings.good}</p>
            <p className="text-[10px] text-green-600">Good</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-2 text-center">
            <p className="text-lg font-bold text-amber-700">{schools.ratings.requiresImprovement}</p>
            <p className="text-[10px] text-amber-600">Requires Imp.</p>
          </div>
          <div className="rounded-lg bg-red-50 p-2 text-center">
            <p className="text-lg font-bold text-red-700">{schools.ratings.inadequate}</p>
            <p className="text-[10px] text-red-600">Inadequate</p>
          </div>
        </div>
      )}

      {schools.schools.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Nearest Schools
          </p>
          {schools.schools.slice(0, 5).map((school, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
            >
              <div className="truncate max-w-[50%]">
                <span className="text-slate-700">{school.name}</span>
                <span className="ml-1.5 text-xs text-slate-400">({school.type})</span>
              </div>
              <div className="flex items-center gap-2">
                {ratingBadge(school.rating)}
                <span className="text-slate-400 text-xs">{school.distance}m</span>
              </div>
            </div>
          ))}
          {schools.schools.length > 5 && (
            <p className="text-xs text-slate-400 text-center">
              +{schools.schools.length - 5} more
            </p>
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400">{schools.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Transport Card
// ---------------------------------------------------------------------------
function TransportCard({ data }: { data: PropertyData }) {
  const transport = data.transport;
  if (!transport) {
    return (
      <CardShell title="Transport Links" icon="train">
        <p className="text-slate-500">No transport data available.</p>
      </CardShell>
    );
  }

  const ratingConfig: Record<string, { color: string; bg: string }> = {
    Excellent: { color: '#059669', bg: '#d1fae5' },
    Good: { color: '#10b981', bg: '#d1fae5' },
    Moderate: { color: '#d97706', bg: '#fef3c7' },
    Poor: { color: '#dc2626', bg: '#fee2e2' },
  };

  const config = ratingConfig[transport.rating] || ratingConfig.Moderate;

  return (
    <CardShell title="Transport Links" icon="train">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-slate-800">{transport.connectivityScore}</p>
          <p className="text-sm text-slate-500">connectivity score /100</p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {transport.rating}
        </span>
      </div>

      {transport.nearestStation && (
        <div className="rounded-lg bg-slate-50 p-3 mb-3">
          <p className="text-sm font-medium text-slate-700">
            {transport.nearestStation.name}
          </p>
          <p className="text-xs text-slate-500">
            Nearest station, {transport.nearestStation.distance}m away
          </p>
        </div>
      )}

      {(transport.stationsWithin2km > 0 || transport.busStopsWithin500m > 0) && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <p className="text-xl font-bold text-slate-800">
              {transport.stationsWithin2km}
            </p>
            <p className="text-xs text-slate-500">Stations (2km)</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <p className="text-xl font-bold text-slate-800">
              {transport.busStopsWithin500m}
            </p>
            <p className="text-xs text-slate-500">Bus stops (500m)</p>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400">{transport.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Noise Level Card
// ---------------------------------------------------------------------------
function NoiseCard({ data }: { data: PropertyData }) {
  const noise = data.noise;
  if (!noise) {
    return (
      <CardShell title="Noise Level" icon="volume">
        <p className="text-slate-500">No noise data available.</p>
      </CardShell>
    );
  }

  const levelConfig = {
    Low: { color: '#059669', bg: '#d1fae5' },
    Moderate: { color: '#d97706', bg: '#fef3c7' },
    High: { color: '#dc2626', bg: '#fee2e2' },
  };

  const config = levelConfig[noise.level];

  return (
    <CardShell title="Noise Level" icon="volume">
      <div className="flex items-center justify-between mb-4">
        <span
          className="rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {noise.level}
        </span>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-800">{noise.score}</p>
          <p className="text-xs text-slate-500">noise score /100</p>
        </div>
      </div>

      {noise.sources.length > 0 && (
        <div className="space-y-2 mb-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Noise Sources
          </p>
          {noise.sources.map((source, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} />
              <span className="text-slate-600">{source.detail}</span>
            </div>
          ))}
        </div>
      )}

      {noise.mitigation.length > 0 && (
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
            Tips
          </p>
          {noise.mitigation.map((tip, i) => (
            <p key={i} className="text-sm text-slate-600">{tip}</p>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400">{noise.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Air Quality Card
// ---------------------------------------------------------------------------
function AirQualityCard({ data }: { data: PropertyData }) {
  const aq = data.airQuality;
  if (!aq || aq.aqi === 0) {
    return (
      <CardShell title="Air Quality" icon="wind">
        <p className="text-slate-500">No air quality data available.</p>
      </CardShell>
    );
  }

  const ratingConfig = {
    Good: { color: '#059669', bg: '#d1fae5' },
    Moderate: { color: '#d97706', bg: '#fef3c7' },
    Poor: { color: '#dc2626', bg: '#fee2e2' },
    'Very Poor': { color: '#b91c1c', bg: '#fee2e2' },
  };

  const config = ratingConfig[aq.rating];

  return (
    <CardShell title="Air Quality" icon="wind">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-slate-800">{aq.aqi}</p>
          <p className="text-sm text-slate-500">European AQI</p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {aq.rating}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-lg font-bold text-slate-800">{aq.pm25}</p>
          <p className="text-xs text-slate-500">PM2.5 (&mu;g/m&sup3;)</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-lg font-bold text-slate-800">{aq.pm10}</p>
          <p className="text-xs text-slate-500">PM10 (&mu;g/m&sup3;)</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-lg font-bold text-slate-800">{aq.no2}</p>
          <p className="text-xs text-slate-500">NO&sub2; (&mu;g/m&sup3;)</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-lg font-bold text-slate-800">{aq.ozone}</p>
          <p className="text-xs text-slate-500">Ozone (&mu;g/m&sup3;)</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400">{aq.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Planning Card
// ---------------------------------------------------------------------------
function PlanningCard({ data }: { data: PropertyData }) {
  const planning = data.planning;
  if (!planning || planning.totalRecent === 0) {
    return (
      <CardShell title="Planning Activity" icon="building">
        <p className="text-slate-500">No recent planning applications found nearby.</p>
      </CardShell>
    );
  }

  return (
    <CardShell title="Planning Activity" icon="building">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-slate-800">{planning.totalRecent}</p>
          <p className="text-sm text-slate-500">applications (last 3 months)</p>
        </div>
        {planning.hasMajorDevelopment && (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            Major Development
          </span>
        )}
      </div>

      {planning.types.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Application Types
          </p>
          <div className="flex flex-wrap gap-2">
            {planning.types.map((t) => (
              <span
                key={t.type}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {t.type} ({t.count})
              </span>
            ))}
          </div>
        </div>
      )}

      {planning.applications.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Recent Applications
          </p>
          {planning.applications.slice(0, 3).map((app, i) => (
            <div key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <p className="text-slate-700 line-clamp-2">{app.description}</p>
              <p className="text-xs text-slate-400 mt-1">
                {app.status} &middot; {app.dateReceived}
              </p>
            </div>
          ))}
          {planning.applications.length > 3 && (
            <p className="text-xs text-slate-400 text-center">
              +{planning.applications.length - 3} more applications
            </p>
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400">{planning.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Deprivation Card
// ---------------------------------------------------------------------------
function DeprivationCard({ data }: { data: PropertyData }) {
  const dep = data.deprivation;
  if (!dep) {
    return (
      <CardShell title="Area Deprivation (IMD)" icon="chart">
        <p className="text-slate-500">No deprivation data available for this area.</p>
      </CardShell>
    );
  }

  const decileConfig: Record<string, { color: string; bg: string }> = {
    'Very Deprived': { color: '#dc2626', bg: '#fee2e2' },
    'Deprived': { color: '#d97706', bg: '#fef3c7' },
    'Average': { color: '#6b7280', bg: '#f1f5f9' },
    'Affluent': { color: '#059669', bg: '#d1fae5' },
    'Very Affluent': { color: '#047857', bg: '#d1fae5' },
  };

  const config = decileConfig[dep.overallLabel] || decileConfig.Average;

  // Domain ranks (lower = more deprived, max 32,844)
  const maxRank = 32844;
  const domains = [
    { label: 'Income', rank: dep.incomeRank },
    { label: 'Employment', rank: dep.employmentRank },
    { label: 'Education', rank: dep.educationRank },
    { label: 'Health', rank: dep.healthRank },
    { label: 'Crime', rank: dep.crimeRank },
    { label: 'Housing', rank: dep.housingRank },
    { label: 'Living Environment', rank: dep.livingEnvironmentRank },
  ].filter((d) => d.rank > 0);

  return (
    <CardShell title="Area Deprivation (IMD)" icon="chart">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-slate-800">
            {dep.imdDecile}
            <span className="text-base font-normal text-slate-400">/10</span>
          </p>
          <p className="text-sm text-slate-500">IMD Decile</p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {dep.overallLabel}
        </span>
      </div>

      <div className="rounded-lg bg-slate-50 p-3 mb-4">
        <p className="text-sm text-slate-600">
          <span className="font-medium">LSOA:</span> {dep.lsoaName}
        </p>
        <p className="text-sm text-slate-600">
          <span className="font-medium">National rank:</span> {dep.imdRank.toLocaleString()} of 32,844
        </p>
      </div>

      {domains.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Domain Breakdown
          </p>
          {domains.map((d) => {
            const pct = Math.round((d.rank / maxRank) * 100);
            let barColor: string;
            if (pct >= 70) barColor = '#10b981';
            else if (pct >= 40) barColor = '#f59e0b';
            else barColor = '#ef4444';
            return (
              <div key={d.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600">{d.label}</span>
                  <span className="text-slate-400 text-xs">{d.rank.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: barColor }}
                  />
                </div>
              </div>
            );
          })}
          <p className="text-xs text-slate-400">Higher rank = less deprived</p>
        </div>
      )}
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Healthcare Card
// ---------------------------------------------------------------------------
function HealthcareCard({ data }: { data: PropertyData }) {
  const hc = data.healthcare;
  if (!hc) {
    return (
      <CardShell title="Healthcare" icon="heart">
        <p className="text-slate-500">No healthcare data available.</p>
      </CardShell>
    );
  }

  const ratingConfig: Record<string, { color: string; bg: string }> = {
    Excellent: { color: '#059669', bg: '#d1fae5' },
    Good: { color: '#10b981', bg: '#d1fae5' },
    Adequate: { color: '#d97706', bg: '#fef3c7' },
    Poor: { color: '#dc2626', bg: '#fee2e2' },
    Unknown: { color: '#6b7280', bg: '#f1f5f9' },
  };

  const config = ratingConfig[hc.healthcareRating] || ratingConfig.Unknown;

  return (
    <CardShell title="Healthcare" icon="heart">
      <div className="flex items-center justify-between mb-4">
        <span
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {hc.healthcareRating}
        </span>
      </div>

      {hc.nearestGP && (
        <div className="rounded-lg bg-slate-50 p-3 mb-3">
          <p className="text-sm font-medium text-slate-700">{hc.nearestGP.name}</p>
          <p className="text-xs text-slate-500">Nearest GP, {hc.nearestGP.distance}m away</p>
        </div>
      )}

      {hc.nearestHospital && (
        <div className="rounded-lg bg-slate-50 p-3 mb-3">
          <p className="text-sm font-medium text-slate-700">{hc.nearestHospital.name}</p>
          <p className="text-xs text-slate-500">Nearest hospital, {(hc.nearestHospital.distance / 1000).toFixed(1)}km away</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{hc.gpSurgeries.length}</p>
          <p className="text-xs text-slate-500">GP Surgeries</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{hc.pharmacies.length}</p>
          <p className="text-xs text-slate-500">Pharmacies</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{hc.dentists.length}</p>
          <p className="text-xs text-slate-500">Dentists</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{hc.hospitals.length}</p>
          <p className="text-xs text-slate-500">Hospitals</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400">{hc.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Green Space Card
// ---------------------------------------------------------------------------
function GreenSpaceCard({ data }: { data: PropertyData }) {
  const gs = data.greenSpace;
  if (!gs) {
    return (
      <CardShell title="Green Spaces" icon="tree">
        <p className="text-slate-500">No green space data available.</p>
      </CardShell>
    );
  }

  const scoreConfig: Record<string, { color: string; bg: string }> = {
    Excellent: { color: '#059669', bg: '#d1fae5' },
    Good: { color: '#10b981', bg: '#d1fae5' },
    Average: { color: '#d97706', bg: '#fef3c7' },
    Poor: { color: '#dc2626', bg: '#fee2e2' },
    Unknown: { color: '#6b7280', bg: '#f1f5f9' },
  };

  const config = scoreConfig[gs.greenSpaceScore] || scoreConfig.Unknown;

  return (
    <CardShell title="Green Spaces" icon="tree">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-slate-800">{gs.totalGreenSpaces}</p>
          <p className="text-sm text-slate-500">green spaces nearby</p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {gs.greenSpaceScore}
        </span>
      </div>

      {gs.nearestPark && (
        <div className="rounded-lg bg-slate-50 p-3 mb-3">
          <p className="text-sm font-medium text-slate-700">{gs.nearestPark.name}</p>
          <p className="text-xs text-slate-500">Nearest park, {gs.nearestPark.distance}m away</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{gs.parks.length}</p>
          <p className="text-xs text-slate-500">Parks</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{gs.playgrounds}</p>
          <p className="text-xs text-slate-500">Playgrounds</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{gs.sportsFacilities}</p>
          <p className="text-xs text-slate-500">Sports</p>
        </div>
      </div>

      {gs.natureReserves.length > 0 && (
        <div className="mt-3 space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Nature Reserves
          </p>
          {gs.natureReserves.slice(0, 3).map((nr, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-slate-600 truncate max-w-[70%]">{nr.name}</span>
              <span className="text-slate-400 text-xs">{(nr.distance / 1000).toFixed(1)}km</span>
            </div>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400">{gs.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Amenities Card
// ---------------------------------------------------------------------------
function AmenitiesCard({ data }: { data: PropertyData }) {
  const am = data.amenities;
  if (!am) {
    return (
      <CardShell title="Local Amenities" icon="shop">
        <p className="text-slate-500">No amenity data available.</p>
      </CardShell>
    );
  }

  const scoreConfig: Record<string, { color: string; bg: string }> = {
    Excellent: { color: '#059669', bg: '#d1fae5' },
    Good: { color: '#10b981', bg: '#d1fae5' },
    Average: { color: '#d97706', bg: '#fef3c7' },
    Poor: { color: '#dc2626', bg: '#fee2e2' },
    Unknown: { color: '#6b7280', bg: '#f1f5f9' },
  };

  const config = scoreConfig[am.amenityScore] || scoreConfig.Unknown;

  return (
    <CardShell title="Local Amenities" icon="shop">
      <div className="flex items-center justify-between mb-4">
        <span
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {am.amenityScore}
        </span>
      </div>

      {am.nearestSupermarket && (
        <div className="rounded-lg bg-slate-50 p-3 mb-3">
          <p className="text-sm font-medium text-slate-700">{am.nearestSupermarket.name}</p>
          <p className="text-xs text-slate-500">Nearest supermarket, {am.nearestSupermarket.distance}m away</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{am.restaurants}</p>
          <p className="text-xs text-slate-500">Restaurants</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{am.pubs}</p>
          <p className="text-xs text-slate-500">Pubs</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{am.convenienceStores}</p>
          <p className="text-xs text-slate-500">Convenience</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{am.postOffices}</p>
          <p className="text-xs text-slate-500">Post Offices</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xl font-bold text-slate-800">{am.banks}</p>
          <p className="text-xs text-slate-500">Banks / ATMs</p>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-3">
        <p className="text-sm text-blue-700">{am.walkabilityNote}</p>
      </div>

      <p className="mt-3 text-xs text-slate-400">{am.note}</p>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Area Info Card
// ---------------------------------------------------------------------------
function AreaInfoCard({ data }: { data: PropertyData }) {
  const pc = data.postcode;
  if (!pc) {
    return (
      <CardShell title="Area Information" icon="map">
        <p className="text-slate-500">No area data available.</p>
      </CardShell>
    );
  }

  const isUrban =
    pc.rural_urban?.toLowerCase().includes("urban") ||
    pc.rural_urban?.toLowerCase().includes("conurbation") ||
    pc.rural_urban?.toLowerCase().includes("city");

  return (
    <CardShell title="Area Information" icon="map">
      <div className="space-y-3">
        <InfoRow label="Region" value={pc.region} />
        <InfoRow label="Admin District" value={pc.admin_district} />
        <InfoRow label="Constituency" value={pc.parliamentary_constituency} />
        <InfoRow label="Country" value={pc.country} />
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-slate-500">Classification</span>
          <span
            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
              isUrban
                ? "bg-primary-50 text-primary-700"
                : "bg-accent-50 text-accent-700"
            }`}
          >
            {pc.rural_urban || (pc.region === "London" ? "Urban" : "Urban/Rural data unavailable")}
          </span>
        </div>
      </div>
    </CardShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value || "N/A"}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Premium Upsell Card (blurred)
// ---------------------------------------------------------------------------
function PremiumCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      {/* Blurred fake content */}
      <div className="p-6 select-none" style={{ filter: "blur(6px)" }}>
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        <div className="space-y-2">{children}</div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6">
        {/* Lock icon */}
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <svg
            className="h-6 w-6 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-700 mb-1">{title}</p>
        <p className="text-xs text-slate-500 mb-4 text-center">
          Available in the full report
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          Unlock Full Report &ndash; &pound;3.99
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reusable Card Shell
// ---------------------------------------------------------------------------
const CARD_ICONS: Record<string, React.ReactNode> = {
  bolt: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
      />
    </svg>
  ),
  shield: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  ),
  water: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558"
      />
    </svg>
  ),
  wifi: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
      />
    </svg>
  ),
  map: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  ),
  banknote: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
      />
    </svg>
  ),
  school: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
      />
    </svg>
  ),
  train: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-3m0 0V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v8.25m19.5 0h-1.5m-16.5 0H2.25"
      />
    </svg>
  ),
  volume: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
      />
    </svg>
  ),
  wind: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  building: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
      />
    </svg>
  ),
  chart: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    </svg>
  ),
  heart: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  ),
  tree: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21v-6m0 0c-3.5 0-6-2.5-6-5.5C6 6.5 8.5 3 12 3s6 3.5 6 6.5c0 3-2.5 5.5-6 5.5Z"
      />
    </svg>
  ),
  shop: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
      />
    </svg>
  ),
};

function CardShell({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-slide-up rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          {CARD_ICONS[icon]}
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default async function CheckPage({ params }: PageProps) {
  const { postcode } = await params;
  const decoded = decodeURIComponent(postcode).toUpperCase();

  const data = await getPropertyData(decoded);

  if (!data.postcode) {
    notFound();
  }

  const formatted = data.postcode.postcode;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Property Check: ${formatted}`,
    "description": `Free rental property check for ${formatted}. EPC rating, crime data, flood risk, broadband speed, and area information.`,
    "url": `https://rentercheck.vercel.app/check/${encodeURIComponent(formatted)}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rentercheck.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Property Check", "item": "https://rentercheck.vercel.app/check" },
        { "@type": "ListItem", "position": 3, "name": formatted },
      ],
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---- Dark Hero Section ---- */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          {/* Breadcrumbs */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">Home</a>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span>Property Check</span>
              </li>
              <li className="text-slate-600">/</li>
              <li className="text-slate-300">{formatted}</li>
            </ol>
          </nav>

          {/* Hero content: address info + score */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left: address info */}
            <div className="animate-fade-in">
              <p className="text-sm font-medium text-primary-400 uppercase tracking-wider mb-2">
                Property Check
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {formatted}
              </h1>
              {data.postcode && (
                <>
                  <p className="mt-3 text-lg text-slate-300">
                    {data.postcode.admin_district}, {data.postcode.region}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {data.postcode.parliamentary_constituency}
                  </p>
                </>
              )}
            </div>

            {/* Right: safety score */}
            {data.safetyScore !== null && (
              <div className="flex flex-col items-center shrink-0">
                <SafetyScoreCircle score={data.safetyScore} variant="dark" />
                <p className="mt-3 text-sm text-slate-400">Overall Safety Score</p>
              </div>
            )}
          </div>

          {/* Address selector dropdown */}
          <AddressSelector postcode={formatted} />
        </div>
      </section>

      {/* ---- Free Results ---- */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Free Report
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EPCCard data={data} />
          <CrimeCard data={data} />
          <FloodCard data={data} />
          <BroadbandCard data={data} />
          <CouncilTaxCard data={data} />
          <SchoolsCard data={data} />
          <TransportCard data={data} />
          <NoiseCard data={data} />
          <AirQualityCard data={data} />
          <PlanningCard data={data} />
          <DeprivationCard data={data} />
          <HealthcareCard data={data} />
          <GreenSpaceCard data={data} />
          <AmenitiesCard data={data} />
          <div className="md:col-span-2">
            <AreaInfoCard data={data} />
          </div>
        </div>
      </section>

      {/* ---- Premium Upsell ---- */}
      <section className="mt-14">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-slate-800">
            Full Report
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Unlock detailed checks to protect yourself before signing
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ownership & Landlord Check */}
          <PremiumCard
            title="Ownership & Landlord Check"
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
            }
          >
            <p className="text-sm text-slate-600">Registered owner: John Smith</p>
            <p className="text-sm text-slate-600">Title number: AB123456</p>
            <p className="text-sm text-slate-600">Licensed landlord: Yes</p>
            <p className="text-sm text-slate-600">Licensing scheme: Selective</p>
            <p className="text-sm text-slate-600">Last sold: March 2019</p>
          </PremiumCard>

          {/* Damp & Mould Risk */}
          <PremiumCard
            title="Damp & Mould Risk Assessment"
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-50 text-warning-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>
            }
          >
            <p className="text-sm text-slate-600">Damp risk score: 42/100</p>
            <p className="text-sm text-slate-600">Property age: Pre-1930</p>
            <p className="text-sm text-slate-600">Wall type: Solid brick</p>
            <p className="text-sm text-slate-600">Ventilation: Poor</p>
            <p className="text-sm text-slate-600">Local rainfall: Above average</p>
          </PremiumCard>

          {/* Total Monthly Cost */}
          <PremiumCard
            title="Total Monthly Cost Breakdown"
            icon={
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
              </div>
            }
          >
            <p className="text-sm text-slate-600">Council tax (Band C): £145/mo</p>
            <p className="text-sm text-slate-600">Energy estimate: £112/mo</p>
            <p className="text-sm text-slate-600">Water estimate: £38/mo</p>
            <p className="text-sm text-slate-600">Broadband avg: £32/mo</p>
            <p className="text-sm font-semibold text-slate-700">
              Total bills: ~£327/mo
            </p>
          </PremiumCard>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section className="mt-16 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-900 p-8 sm:p-12 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Check Another Property
        </h2>
        <p className="mt-2 text-primary-200">
          Enter a different postcode to run another free check.
        </p>
        <div className="mt-6">
          <PostcodeSearch size="lg" />
        </div>
      </section>
      </div>
    </div>
  );
}

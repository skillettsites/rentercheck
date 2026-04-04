import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPropertyData } from "@/lib/apis";
import type { PropertyData } from "@/lib/apis";
import PostcodeSearch from "@/components/PostcodeSearch";

interface PageProps {
  params: Promise<{ postcode: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postcode } = await params;
  const decoded = decodeURIComponent(postcode).toUpperCase();
  return {
    title: `Property Check: ${decoded} | RenterCheck`,
    description: `Free rental property check for ${decoded}. EPC rating, crime data, flood risk, broadband speed, and area information.`,
  };
}

// ---------------------------------------------------------------------------
// Score circle component
// ---------------------------------------------------------------------------
function SafetyScoreCircle({ score }: { score: number }) {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  let color: string;
  let bgColor: string;
  let label: string;

  if (score >= 70) {
    color = "#10b981";
    bgColor = "#d1fae5";
    label = "Good";
  } else if (score >= 40) {
    color = "#f59e0b";
    bgColor = "#fef3c7";
    label = "Fair";
  } else {
    color = "#ef4444";
    bgColor = "#fee2e2";
    label = "Poor";
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
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
          <span className="text-xs text-slate-500 font-medium">/100</span>
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
            {pc.rural_urban || "Unknown"}
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

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      {/* ---- Header ---- */}
      <header className="animate-fade-in text-center mb-12">
        <p className="text-sm font-medium text-primary-600 uppercase tracking-wider mb-2">
          Property Check
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {formatted}
        </h1>
        {data.postcode && (
          <p className="mt-2 text-slate-500">
            {data.postcode.admin_district}, {data.postcode.region}
          </p>
        )}

        {/* Safety Score */}
        {data.safetyScore !== null && (
          <div className="mt-8">
            <SafetyScoreCircle score={data.safetyScore} />
            <p className="mt-3 text-sm text-slate-500">Overall Safety Score</p>
          </div>
        )}
      </header>

      {/* ---- Free Results ---- */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Free Report
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EPCCard data={data} />
          <CrimeCard data={data} />
          <FloodCard data={data} />
          <BroadbandCard data={data} />
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
  );
}

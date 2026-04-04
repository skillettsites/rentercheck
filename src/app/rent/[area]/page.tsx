import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostcodeSearch from "@/components/PostcodeSearch";
import {
  getAllAreaSlugs,
  getAreaBySlug,
  getNearbyAreas,
  NATIONAL_AVERAGE_TWO_BED,
} from "@/data/areas";

interface PageProps {
  params: Promise<{ area: string }>;
}

export async function generateStaticParams() {
  return getAllAreaSlugs().map((area) => ({ area }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};

  const title = `Average Rent in ${area.name} 2026 | Rental Market Guide`;
  const description = `Average rent in ${area.name}: £${area.medianRent.twoBed.toLocaleString()}/mo for a 2-bed. Compare rents by property size, check rental yields, demand levels, and popular neighbourhoods in ${area.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rentercheck.vercel.app/rent/${area.slug}`,
    },
    alternates: {
      canonical: `https://rentercheck.vercel.app/rent/${area.slug}`,
    },
  };
}

function formatCurrency(amount: number): string {
  return `£${amount.toLocaleString()}`;
}

function DemandBadge({ level }: { level: string }) {
  const colours: Record<string, string> = {
    "Very High": "bg-danger-100 text-danger-700",
    High: "bg-warning-100 text-warning-700",
    Medium: "bg-primary-100 text-primary-700",
    Low: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${colours[level] || colours.Medium}`}
    >
      {level}
    </span>
  );
}

function RentBar({
  label,
  value,
  maxValue,
  isNational,
}: {
  label: string;
  value: number;
  maxValue: number;
  isNational?: boolean;
}) {
  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;

  return (
    <div className="flex items-center gap-4">
      <span className="w-20 text-sm text-slate-600 shrink-0">{label}</span>
      <div className="flex-1 h-7 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isNational ? "bg-slate-300" : "bg-primary-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-24 text-right font-semibold text-slate-800 text-sm">
        {formatCurrency(value)}/mo
      </span>
    </div>
  );
}

export default async function AreaPage({ params }: PageProps) {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) notFound();

  const nearby = getNearbyAreas(slug);

  const rentEntries: { label: string; value: number }[] = [
    { label: "Studio", value: area.medianRent.studio },
    { label: "1-bed", value: area.medianRent.oneBed },
    { label: "2-bed", value: area.medianRent.twoBed },
    { label: "3-bed", value: area.medianRent.threeBed },
    { label: "4-bed", value: area.medianRent.fourBed },
  ];

  const maxRent = Math.max(
    ...rentEntries.map((r) => r.value),
    NATIONAL_AVERAGE_TWO_BED
  );

  const vsNational = area.medianRent.twoBed - NATIONAL_AVERAGE_TWO_BED;
  const vsNationalPct = Math.round(
    (vsNational / NATIONAL_AVERAGE_TWO_BED) * 100
  );

  // Estimated total monthly cost (2-bed: rent + council tax/12 + energy + water + broadband)
  const monthlyCouncilTax = Math.round(area.councilTaxBandD / 12);
  const estimatedEnergy = 130;
  const estimatedWater = 70;
  const estimatedBroadband = 30;
  const totalMonthlyCost =
    area.medianRent.twoBed +
    monthlyCouncilTax +
    estimatedEnergy +
    estimatedWater +
    estimatedBroadband;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Average Rent in ${area.name} 2026`,
    description: `Rental market guide for ${area.name}, covering average rents, yields, and demand.`,
    url: `https://rentercheck.vercel.app/rent/${area.slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rentercheck.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Rent by City",
          item: "https://rentercheck.vercel.app/rent",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: area.name,
          item: `https://rentercheck.vercel.app/rent/${area.slug}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm text-primary-200">
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-1">/</span>
              </li>
              <li>
                <Link
                  href="/rent"
                  className="hover:text-white transition-colors"
                >
                  Rent
                </Link>
              </li>
              <li>
                <span className="mx-1">/</span>
              </li>
              <li className="text-white font-medium">{area.name}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Renting in {area.name}
            </h1>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-100 backdrop-blur-sm">
              {area.region}
            </span>
          </div>

          <p className="text-xl sm:text-2xl text-primary-100 font-medium">
            Average rent for a 2-bed in {area.name}:{" "}
            <span className="text-white font-bold">
              {formatCurrency(area.medianRent.twoBed)}/mo
            </span>
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-primary-200">
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-accent-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              Pop. {area.population.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-accent-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
              {area.averageYield}% yield
            </span>
            <span className="flex items-center gap-1.5">
              {area.rentGrowthYoY > 0 ? (
                <svg
                  className="h-4 w-4 text-accent-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 text-accent-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                  />
                </svg>
              )}
              {area.rentGrowthYoY > 0 ? "+" : ""}
              {area.rentGrowthYoY}% YoY
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Rent by Property Size */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Rent by Property Size
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Table */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-5 text-slate-600 font-medium">
                      Property Size
                    </th>
                    <th className="text-right py-3 px-5 text-slate-600 font-medium">
                      Monthly Rent
                    </th>
                    <th className="text-right py-3 px-5 text-slate-600 font-medium">
                      Annual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rentEntries.map((entry) => (
                    <tr
                      key={entry.label}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-3 px-5 text-slate-800 font-medium">
                        {entry.label}
                      </td>
                      <td className="py-3 px-5 text-right text-slate-800 font-semibold">
                        {formatCurrency(entry.value)}
                      </td>
                      <td className="py-3 px-5 text-right text-slate-500">
                        {formatCurrency(entry.value * 12)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual bar chart */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Visual Comparison
              </h3>
              {rentEntries.map((entry) => (
                <RentBar
                  key={entry.label}
                  label={entry.label}
                  value={entry.value}
                  maxValue={maxRent}
                />
              ))}
              <div className="pt-3 border-t border-slate-100">
                <RentBar
                  label="UK avg"
                  value={NATIONAL_AVERAGE_TWO_BED}
                  maxValue={maxRent}
                  isNational
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">
                {area.name} 2-bed rent is{" "}
                <span
                  className={`font-semibold ${vsNational > 0 ? "text-danger-600" : "text-accent-600"}`}
                >
                  {vsNational > 0 ? "+" : ""}
                  {formatCurrency(Math.abs(vsNational))} (
                  {vsNationalPct > 0 ? "+" : ""}
                  {vsNationalPct}%)
                </span>{" "}
                {vsNational > 0 ? "above" : "below"} the national average.
              </p>
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Market Overview
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Rental Yield</p>
              <p className="text-2xl font-bold text-primary-600">
                {area.averageYield}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Rent Growth</p>
              <p
                className={`text-2xl font-bold flex items-center justify-center gap-1 ${area.rentGrowthYoY > 0 ? "text-danger-600" : "text-accent-600"}`}
              >
                {area.rentGrowthYoY > 0 ? (
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
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
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
                      d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                    />
                  </svg>
                )}
                {area.rentGrowthYoY}%
              </p>
              <p className="text-xs text-slate-400 mt-0.5">year on year</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Demand</p>
              <div className="mt-1">
                <DemandBadge level={area.demandLevel} />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Avg Deposit</p>
              <p className="text-2xl font-bold text-slate-800">
                {formatCurrency(area.averageDeposit)}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">5 weeks rent</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm col-span-2 sm:col-span-1">
              <p className="text-sm text-slate-500 mb-1">Student Market</p>
              <p className="text-2xl font-bold text-slate-800">
                {area.studentPopulation ? (
                  <span className="text-accent-600">Yes</span>
                ) : (
                  <span className="text-slate-400">No</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 leading-relaxed">
              {area.description}
            </p>
          </div>
        </section>

        {/* Popular Rental Areas */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Popular Rental Areas in {area.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {area.topAreas.map((neighbourhood) => (
              <div
                key={neighbourhood}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {neighbourhood}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Popular neighbourhood in {area.name}
                    </p>
                  </div>
                  <svg
                    className="h-6 w-6 text-primary-400 shrink-0"
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
                </div>
                <Link
                  href={`/check/${area.postcodePrefix}`}
                  className="mt-3 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Check {neighbourhood} safety
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Transport */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Transport Links
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {area.transportLinks}
          </p>
        </section>

        {/* Cost of Renting */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            True Cost of Renting in {area.name}
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-center text-white">
              <p className="text-sm font-medium text-primary-200 uppercase tracking-wider">
                Estimated Total Monthly Cost (2-bed)
              </p>
              <p className="mt-1 text-4xl font-extrabold">
                {formatCurrency(totalMonthlyCost)}
              </p>
              <p className="mt-1 text-sm text-primary-200">
                {formatCurrency(totalMonthlyCost * 12)} per year
              </p>
            </div>
            <div className="p-6">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-600">Rent (2-bed)</td>
                    <td className="py-3 text-right font-semibold text-slate-800">
                      {formatCurrency(area.medianRent.twoBed)}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-600">
                      Council Tax (Band D / 12)
                    </td>
                    <td className="py-3 text-right font-semibold text-slate-800">
                      {formatCurrency(monthlyCouncilTax)}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-600">Energy (est.)</td>
                    <td className="py-3 text-right font-semibold text-slate-800">
                      {formatCurrency(estimatedEnergy)}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-600">Water (est.)</td>
                    <td className="py-3 text-right font-semibold text-slate-800">
                      {formatCurrency(estimatedWater)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Broadband (est.)</td>
                    <td className="py-3 text-right font-semibold text-slate-800">
                      {formatCurrency(estimatedBroadband)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-xs text-slate-400">
                Estimates based on UK averages. Use our{" "}
                <Link
                  href="/calculator"
                  className="text-primary-500 hover:text-primary-600 underline"
                >
                  Cost Calculator
                </Link>{" "}
                for a personalised breakdown.
              </p>
            </div>
          </div>
        </section>

        {/* Tenant Rights */}
        <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Tenant Rights in {area.name}
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            {area.region === "Scotland"
              ? "Scottish private residential tenancies give renters open-ended tenancy agreements with no fixed end date, along with rent increase protections. Landlords need specific grounds to end a tenancy."
              : area.region === "Wales"
                ? "Welsh renters benefit from the Renting Homes (Wales) Act 2016, which provides enhanced security of tenure and clearer rights around fitness for habitation. All occupation contracts must be in writing."
                : area.region === "Northern Ireland"
                  ? "Northern Ireland has its own tenancy legislation with different notice periods and deposit protection requirements compared to England. Private tenancies have specific rights around repairs and rent increases."
                  : "As a tenant in England, you have rights under the Housing Act 1988, the Deregulation Act 2015, and more recent Renters Reform legislation. Your landlord must protect your deposit, provide gas safety certificates, and maintain the property to a habitable standard."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/rights"
              className="inline-flex items-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Know Your Rights
            </Link>
            <Link
              href="/landlord-check"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Check Your Landlord
            </Link>
          </div>
        </section>

        {/* Nearby Areas */}
        {nearby.length > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              Nearby Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearby.map((nearbyArea) => (
                <Link
                  key={nearbyArea.slug}
                  href={`/rent/${nearbyArea.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-primary-200 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">
                      {nearbyArea.name}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {nearbyArea.region}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatCurrency(nearbyArea.medianRent.twoBed)}
                    <span className="text-sm font-normal text-slate-400">
                      /mo
                    </span>
                  </p>
                  <p className="text-sm text-slate-500 mt-1">2-bed average</p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                    View {nearbyArea.name} rents
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-primary-800 to-primary-900 p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Check a Property in {area.name}
          </h2>
          <p className="mt-3 text-primary-200 max-w-xl mx-auto">
            Enter a {area.name} postcode to get a free safety and quality report
            on any rental property.
          </p>
          <div className="mt-6 max-w-xl mx-auto">
            <PostcodeSearch size="lg" />
          </div>
        </section>
      </div>
    </>
  );
}

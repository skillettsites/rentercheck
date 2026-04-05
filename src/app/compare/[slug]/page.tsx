import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostcodeSearch from "@/components/PostcodeSearch";
import { getAreaBySlug } from "@/data/areas";
import { getAllComparisons, getComparison } from "@/data/comparisons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};

  const city1 = getAreaBySlug(comparison.city1Slug);
  const city2 = getAreaBySlug(comparison.city2Slug);
  if (!city1 || !city2) return {};

  const title = `Renting in ${city1.name} vs ${city2.name} | Which is Better for Renters?`;
  const description = `Compare renting in ${city1.name} (£${city1.medianRent.twoBed}/mo) vs ${city2.name} (£${city2.medianRent.twoBed}/mo). Side-by-side comparison of rents, yields, demand, council tax, deposits, and living costs.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rentercheck.vercel.app/compare/${slug}`,
    },
    alternates: {
      canonical: `https://rentercheck.vercel.app/compare/${slug}`,
    },
  };
}

function formatCurrency(amount: number): string {
  return `£${amount.toLocaleString()}`;
}

function WinnerCell({
  val1,
  val2,
  lowerWins = true,
}: {
  val1: number;
  val2: number;
  lowerWins?: boolean;
}) {
  const winner = lowerWins ? (val1 < val2 ? 1 : val1 > val2 ? 2 : 0) : (val1 > val2 ? 1 : val1 < val2 ? 2 : 0);
  return { winner };
}

function DemandBadge({ level }: { level: string }) {
  const colours: Record<string, string> = {
    "Very High": "bg-red-100 text-red-700",
    High: "bg-amber-100 text-amber-700",
    Medium: "bg-blue-100 text-blue-700",
    Low: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colours[level] || "bg-slate-100 text-slate-700"}`}
    >
      {level}
    </span>
  );
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const city1 = getAreaBySlug(comparison.city1Slug);
  const city2 = getAreaBySlug(comparison.city2Slug);
  if (!city1 || !city2) notFound();

  const rentTypes = [
    { label: "Studio", key: "studio" as const },
    { label: "1-Bed", key: "oneBed" as const },
    { label: "2-Bed", key: "twoBed" as const },
    { label: "3-Bed", key: "threeBed" as const },
    { label: "4-Bed", key: "fourBed" as const },
  ];

  // Calculate cost of living (monthly for 2-bed)
  const energyCost = 150; // average monthly energy
  const waterCost = 35; // average monthly water
  const cost1 = city1.medianRent.twoBed + Math.round(city1.councilTaxBandD / 12) + energyCost + waterCost;
  const cost2 = city2.medianRent.twoBed + Math.round(city2.councilTaxBandD / 12) + energyCost + waterCost;

  // Determine winners
  const affordabilityWinner = city1.medianRent.twoBed <= city2.medianRent.twoBed ? city1 : city2;
  const growthWinner = city1.rentGrowthYoY >= city2.rentGrowthYoY ? city1 : city2;
  const yieldWinner = city1.averageYield >= city2.averageYield ? city1 : city2;

  // Bar chart max
  const maxTwoBed = Math.max(city1.medianRent.twoBed, city2.medianRent.twoBed);

  // Verdict
  const cheaper = affordabilityWinner;
  const pricier = cheaper === city1 ? city2 : city1;
  const savings = Math.abs(city1.medianRent.twoBed - city2.medianRent.twoBed);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rentercheck.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Compare Cities", item: "https://rentercheck.vercel.app/compare" },
      { "@type": "ListItem", position: 3, name: `${city1.name} vs ${city2.name}`, item: `https://rentercheck.vercel.app/compare/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <nav className="mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{city1.name} vs {city2.name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Renting in {city1.name} vs {city2.name}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1">
              {city1.region}
            </span>
            <span className="text-slate-400 font-bold">vs</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1">
              {city2.region}
            </span>
          </div>
          <p className="mt-6 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Side-by-side comparison of rental costs, market conditions, and living expenses to help you decide where to rent.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-12">

        {/* Side-by-side Rent Comparison */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Rent Comparison by Property Size</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Property Type</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">{city1.name}</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">{city2.name}</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-600">Difference</th>
                </tr>
              </thead>
              <tbody>
                {rentTypes.map((rt) => {
                  const v1 = city1.medianRent[rt.key];
                  const v2 = city2.medianRent[rt.key];
                  const diff = v1 - v2;
                  const { winner } = WinnerCell({ val1: v1, val2: v2, lowerWins: true });
                  return (
                    <tr key={rt.key} className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium text-slate-700">{rt.label}</td>
                      <td className={`py-3 px-4 text-right font-semibold ${winner === 1 ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                        {formatCurrency(v1)}/mo
                      </td>
                      <td className={`py-3 px-4 text-right font-semibold ${winner === 2 ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                        {formatCurrency(v2)}/mo
                      </td>
                      <td className={`py-3 px-4 text-right text-sm ${diff > 0 ? "text-red-600" : diff < 0 ? "text-green-600" : "text-slate-500"}`}>
                        {diff > 0 ? "+" : ""}{formatCurrency(Math.abs(diff))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Bar Comparison */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">2-Bed Rent Comparison</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-700">{city1.name}</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(city1.medianRent.twoBed)}/mo</span>
              </div>
              <div className="h-8 rounded-lg bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-lg bg-primary-500 transition-all"
                  style={{ width: `${(city1.medianRent.twoBed / maxTwoBed) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-700">{city2.name}</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(city2.medianRent.twoBed)}/mo</span>
              </div>
              <div className="h-8 rounded-lg bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-lg bg-amber-500 transition-all"
                  style={{ width: `${(city2.medianRent.twoBed / maxTwoBed) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Market Stats Comparison */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Market Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Metric</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">{city1.name}</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">{city2.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-700">Average Yield</td>
                  <td className={`py-3 px-4 text-right font-semibold ${city1.averageYield >= city2.averageYield ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                    {city1.averageYield}%
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${city2.averageYield >= city1.averageYield ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                    {city2.averageYield}%
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-700">Rent Growth (YoY)</td>
                  <td className={`py-3 px-4 text-right font-semibold ${city1.rentGrowthYoY >= city2.rentGrowthYoY ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                    {city1.rentGrowthYoY}%
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${city2.rentGrowthYoY >= city1.rentGrowthYoY ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                    {city2.rentGrowthYoY}%
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-700">Demand Level</td>
                  <td className="py-3 px-4 text-right"><DemandBadge level={city1.demandLevel} /></td>
                  <td className="py-3 px-4 text-right"><DemandBadge level={city2.demandLevel} /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-700">Average Deposit</td>
                  <td className={`py-3 px-4 text-right font-semibold ${city1.averageDeposit <= city2.averageDeposit ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                    {formatCurrency(city1.averageDeposit)}
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${city2.averageDeposit <= city1.averageDeposit ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                    {formatCurrency(city2.averageDeposit)}
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-700">Council Tax (Band D)</td>
                  <td className={`py-3 px-4 text-right font-semibold ${city1.councilTaxBandD <= city2.councilTaxBandD ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                    {formatCurrency(city1.councilTaxBandD)}/yr
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${city2.councilTaxBandD <= city1.councilTaxBandD ? "text-green-600 bg-green-50" : "text-slate-900"}`}>
                    {formatCurrency(city2.councilTaxBandD)}/yr
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Winner Summary */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Verdict</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <p className="text-sm font-medium text-green-700 mb-1">For Affordability</p>
              <p className="text-lg font-bold text-green-900">{affordabilityWinner.name}</p>
              <p className="text-sm text-green-600 mt-1">{formatCurrency(savings)}/mo cheaper for a 2-bed</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700 mb-1">For Growth Potential</p>
              <p className="text-lg font-bold text-blue-900">{growthWinner.name}</p>
              <p className="text-sm text-blue-600 mt-1">{growthWinner.rentGrowthYoY}% year-on-year growth</p>
            </div>
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
              <p className="text-sm font-medium text-purple-700 mb-1">For Investment Yield</p>
              <p className="text-lg font-bold text-purple-900">{yieldWinner.name}</p>
              <p className="text-sm text-purple-600 mt-1">{yieldWinner.averageYield}% average yield</p>
            </div>
          </div>
        </section>

        {/* Cost of Living Comparison */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Monthly Cost of Living (2-Bed)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { city: city1, total: cost1 },
              { city: city2, total: cost2 },
            ].map(({ city, total }) => (
              <div key={city.slug} className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{city.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">2-Bed Rent</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(city.medianRent.twoBed)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Council Tax (monthly)</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(Math.round(city.councilTaxBandD / 12))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Energy (est.)</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(energyCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Water (est.)</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(waterCost)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                    <span className="font-bold text-slate-900">Total Monthly</span>
                    <span className="font-bold text-lg text-primary-600">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cost1 !== cost2 && (
            <p className="mt-4 text-sm text-slate-600 text-center">
              Living in {cost1 < cost2 ? city1.name : city2.name} saves you approximately{" "}
              <strong>{formatCurrency(Math.abs(cost1 - cost2))}/mo</strong> on core housing costs.
            </p>
          )}
        </section>

        {/* Transport Comparison */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Transport Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[city1, city2].map((city) => (
              <div key={city.slug} className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{city.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{city.transportLinks}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Areas */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Neighbourhoods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[city1, city2].map((city) => (
              <div key={city.slug} className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{city.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {city.topAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="rounded-2xl bg-slate-50 border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Verdict</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
            <p>
              {city1.name} and {city2.name} offer different rental experiences.{" "}
              {cheaper.name} is the more affordable option, with 2-bed rents averaging{" "}
              {formatCurrency(cheaper.medianRent.twoBed)}/mo compared to{" "}
              {formatCurrency(pricier.medianRent.twoBed)}/mo in {pricier.name}, saving renters{" "}
              {formatCurrency(savings)} per month.
            </p>
            <p className="mt-3">
              {growthWinner.name} is seeing stronger rent growth at {growthWinner.rentGrowthYoY}% year-on-year, which may indicate increasing demand in the area.{" "}
              {yieldWinner.name} offers better returns for landlords at {yieldWinner.averageYield}% average yield.
            </p>
            <p className="mt-3">
              {city1.studentPopulation && city2.studentPopulation
                ? `Both cities have significant student populations, which drives demand for house shares and smaller properties.`
                : city1.studentPopulation
                  ? `${city1.name} has a notable student population that adds to rental demand, while ${city2.name} has a more professional tenant base.`
                  : city2.studentPopulation
                    ? `${city2.name} has a notable student population that adds to rental demand, while ${city1.name} has a more professional tenant base.`
                    : `Neither city has a dominant student population, so the rental market is driven primarily by working professionals.`}
              {" "}Ultimately, the best choice depends on your work location, budget, and lifestyle priorities.
            </p>
          </div>
        </section>

        {/* CTAs */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Check a Property</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[city1, city2].map((city) => (
              <div key={city.slug} className="rounded-xl border border-slate-200 bg-white p-6 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Properties in {city.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Enter a postcode to check any rental property in {city.name}
                </p>
                <Link
                  href={`/rent/${city.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
                >
                  View {city.name} Rental Guide
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 text-center">
              Or check a specific property
            </h3>
            <PostcodeSearch size="sm" />
          </div>
        </section>
      </div>
    </>
  );
}

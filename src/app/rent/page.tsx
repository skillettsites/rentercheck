import type { Metadata } from "next";
import Link from "next/link";
import { getAllAreas, NATIONAL_AVERAGE_TWO_BED } from "@/data/areas";
import AreaTableClient from "./AreaTableClient";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Average Rent by City | UK Rental Market 2026 | RenterCheck",
  description:
    "Compare average rents across 50 UK cities. See 2-bed rents, rental yields, growth rates, and demand levels for London, Manchester, Birmingham, and more.",
  openGraph: {
    title: "Average Rent by City | UK Rental Market 2026",
    description:
      "Compare average rents across 50 UK cities. See 2-bed rents, rental yields, growth rates, and demand levels.",
    url: "https://rentercheck.vercel.app/rent",
  },
  alternates: {
    canonical: "https://rentercheck.vercel.app/rent",
  },
};

export default function RentHubPage() {
  const areas = getAllAreas();

  const avgRent =
    Math.round(
      areas.reduce((sum, a) => sum + a.medianRent.twoBed, 0) / areas.length
    );
  const avgYield =
    Math.round(
      (areas.reduce((sum, a) => sum + a.averageYield, 0) / areas.length) * 10
    ) / 10;
  const avgGrowth =
    Math.round(
      (areas.reduce((sum, a) => sum + a.rentGrowthYoY, 0) / areas.length) * 10
    ) / 10;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Average Rent by City | UK Rental Market 2026",
    description:
      "Compare average rents across 50 UK cities for 2026.",
    url: "https://rentercheck.vercel.app/rent",
    numberOfItems: areas.length,
  };

  // Serialise area data for the client component
  const areaRows = areas.map((a) => ({
    slug: a.slug,
    name: a.name,
    region: a.region,
    twoBedRent: a.medianRent.twoBed,
    yield: a.averageYield,
    growth: a.rentGrowthYoY,
    demandLevel: a.demandLevel,
  }));

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

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 text-center">
          <nav className="mb-6 text-sm text-primary-200">
            <ol className="flex items-center justify-center gap-2">
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
              <li className="text-white font-medium">Rent by City</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Average Rent by City
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-primary-100 leading-relaxed">
            UK rental market data for 2026. Compare rents, yields, and demand
            across {areas.length} cities.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="text-center">
              <p className="text-3xl font-extrabold">{areas.length}</p>
              <p className="text-sm text-primary-200">Cities covered</p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-primary-500" />
            <div className="text-center">
              <p className="text-3xl font-extrabold">
                £{avgRent.toLocaleString()}
              </p>
              <p className="text-sm text-primary-200">Avg 2-bed rent</p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-primary-500" />
            <div className="text-center">
              <p className="text-3xl font-extrabold">{avgYield}%</p>
              <p className="text-sm text-primary-200">Avg yield</p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-primary-500" />
            <div className="text-center">
              <p className="text-3xl font-extrabold">+{avgGrowth}%</p>
              <p className="text-sm text-primary-200">Avg growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AreaTableClient rows={areaRows} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <NewsletterSignup variant="inline" source="rent" />
        </div>
      </section>
    </>
  );
}

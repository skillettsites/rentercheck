import type { Metadata } from "next";
import Link from "next/link";
import { getAreaBySlug } from "@/data/areas";
import { getAllComparisons } from "@/data/comparisons";

export const metadata: Metadata = {
  title: "Compare UK Cities for Renting | Side-by-Side Rental Comparison",
  description:
    "Compare rental costs, yields, demand, and living expenses across 100 UK city pairs. Find out which city is better for renters with our side-by-side comparison tool.",
  openGraph: {
    title: "Compare UK Cities for Renting | Side-by-Side Rental Comparison",
    description:
      "Compare rental costs, yields, demand, and living expenses across 100 UK city pairs.",
    url: "https://rentercheck.vercel.app/compare",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://rentercheck.vercel.app/compare",
  },
};

function formatCurrency(amount: number): string {
  return `£${amount.toLocaleString()}`;
}

interface ComparisonGroup {
  title: string;
  slugs: string[];
}

function categoriseComparisons(): ComparisonGroup[] {
  const all = getAllComparisons();

  const londonVs: string[] = [];
  const northern: string[] = [];
  const southern: string[] = [];
  const university: string[] = [];
  const welshScottish: string[] = [];
  const midlands: string[] = [];

  const northRegions = new Set(["North West", "North East", "Yorkshire and the Humber"]);
  const southRegions = new Set(["South East", "South West", "East of England"]);
  const scottishWelshNI = new Set(["Scotland", "Wales", "Northern Ireland"]);
  const midlandRegions = new Set(["West Midlands", "East Midlands"]);

  for (const c of all) {
    if (c.city1Slug === "london") {
      londonVs.push(c.slug);
      continue;
    }

    const city1 = getAreaBySlug(c.city1Slug);
    const city2 = getAreaBySlug(c.city2Slug);
    if (!city1 || !city2) continue;

    // Scottish, Welsh, or NI involved
    if (scottishWelshNI.has(city1.region) || scottishWelshNI.has(city2.region)) {
      welshScottish.push(c.slug);
      continue;
    }

    // Both northern
    if (northRegions.has(city1.region) && northRegions.has(city2.region)) {
      northern.push(c.slug);
      continue;
    }

    // Both southern or London-adjacent
    if (
      (southRegions.has(city1.region) || city1.region === "London") &&
      (southRegions.has(city2.region) || city2.region === "London")
    ) {
      southern.push(c.slug);
      continue;
    }

    // Both midlands
    if (midlandRegions.has(city1.region) && midlandRegions.has(city2.region)) {
      midlands.push(c.slug);
      continue;
    }

    // University cities (both have student pop)
    if (city1.studentPopulation && city2.studentPopulation) {
      university.push(c.slug);
      continue;
    }

    // Default: put in southern or northern based on city1
    if (northRegions.has(city1.region) || northRegions.has(city2.region)) {
      northern.push(c.slug);
    } else {
      southern.push(c.slug);
    }
  }

  return [
    { title: "London vs...", slugs: londonVs },
    { title: "Northern Cities", slugs: northern },
    { title: "Southern Cities", slugs: southern },
    { title: "Midlands", slugs: midlands },
    { title: "University Cities", slugs: university },
    { title: "Welsh, Scottish & Northern Irish", slugs: welshScottish },
  ].filter((g) => g.slugs.length > 0);
}

export default function ComparePage() {
  const groups = categoriseComparisons();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Compare UK Cities for Renting
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Side-by-side rental comparisons across 100 UK city pairs. Compare rents, yields, demand levels, council tax, and total living costs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {groups.map((group) => (
          <section key={group.title} className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.slugs.map((slug) => {
                const all = getAllComparisons();
                const comp = all.find((c) => c.slug === slug);
                if (!comp) return null;

                const city1 = getAreaBySlug(comp.city1Slug);
                const city2 = getAreaBySlug(comp.city2Slug);
                if (!city1 || !city2) return null;

                return (
                  <Link
                    key={slug}
                    href={`/compare/${slug}`}
                    className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 transition-all hover:border-primary-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-semibold text-slate-900 truncate">{city1.name}</span>
                      <span className="text-xs text-slate-400 font-bold shrink-0">vs</span>
                      <span className="font-semibold text-slate-900 truncate">{city2.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="text-xs text-slate-500">
                        {formatCurrency(city1.medianRent.twoBed)}
                      </span>
                      <span className="text-xs text-slate-400">/</span>
                      <span className="text-xs text-slate-500">
                        {formatCurrency(city2.medianRent.twoBed)}
                      </span>
                      <svg
                        className="h-4 w-4 text-slate-400 group-hover:text-primary-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

"use client";

import { useState, useMemo } from "react";
import {
  regionRentData,
  getRegionFromPostcode,
  getMedianRent,
  type RegionRentData,
} from "@/data/rent-data";

/* ----------------------------------------------------------------
   SEO (injected via <title> and <meta> in "use client" pages)
---------------------------------------------------------------- */
const PAGE_TITLE = "Fair Rent Checker | Is Your Rent Fair? | RenterCheck";
const PAGE_DESCRIPTION =
  "Check if your rent is fair compared to the local median. Enter your postcode and rent to see where you stand, plus tips for negotiating a better deal.";

/* ----------------------------------------------------------------
   Constants
---------------------------------------------------------------- */
const PROPERTY_TYPES = ["Flat", "Terraced", "Semi-detached", "Detached"];
const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

// Property type multipliers (baseline is Flat at 1.0)
const PROPERTY_TYPE_ADJUSTMENT: Record<string, number> = {
  Flat: 1.0,
  Terraced: 1.02,
  "Semi-detached": 1.03,
  Detached: 1.05,
};

interface RentInputs {
  postcode: string;
  rent: number;
  bedrooms: number;
  propertyType: string;
  furnished: boolean;
}

type Verdict = "below" | "fair" | "above" | "significantly_above";

interface RentAnalysis {
  region: RegionRentData;
  medianRent: number;
  adjustedMedian: number;
  percentile25: number;
  percentile75: number;
  ratio: number;
  verdict: Verdict;
  annualDifference: number;
}

function analyseRent(inputs: RentInputs): RentAnalysis | null {
  const region = getRegionFromPostcode(inputs.postcode);
  if (!region) return null;

  const baseMedian = getMedianRent(region, inputs.bedrooms);

  // Adjustments
  let adjusted = baseMedian;
  if (inputs.furnished) {
    adjusted *= 1.1; // +10% for furnished
  }
  const typeMultiplier = PROPERTY_TYPE_ADJUSTMENT[inputs.propertyType] ?? 1.0;
  adjusted *= typeMultiplier;
  adjusted = Math.round(adjusted);

  const percentile25 = Math.round(adjusted * 0.75);
  const percentile75 = Math.round(adjusted * 1.25);
  const ratio = inputs.rent / adjusted;

  let verdict: Verdict;
  if (ratio <= 0.85) {
    verdict = "below";
  } else if (ratio <= 1.1) {
    verdict = "fair";
  } else if (ratio <= 1.4) {
    verdict = "above";
  } else {
    verdict = "significantly_above";
  }

  const annualDifference = (inputs.rent - adjusted) * 12;

  return {
    region,
    medianRent: baseMedian,
    adjustedMedian: adjusted,
    percentile25,
    percentile75,
    ratio,
    verdict,
    annualDifference,
  };
}

const VERDICT_CONFIG: Record<
  Verdict,
  { label: string; color: string; bgColor: string; textColor: string }
> = {
  below: {
    label: "Below Average",
    color: "#10b981",
    bgColor: "bg-accent-50",
    textColor: "text-accent-700",
  },
  fair: {
    label: "Fair",
    color: "#3b82f6",
    bgColor: "bg-primary-50",
    textColor: "text-primary-700",
  },
  above: {
    label: "Above Average",
    color: "#f59e0b",
    bgColor: "bg-warning-50",
    textColor: "text-warning-700",
  },
  significantly_above: {
    label: "Significantly Above Average",
    color: "#ef4444",
    bgColor: "bg-danger-50",
    textColor: "text-danger-700",
  },
};

const NEGOTIATION_TIPS = [
  "Research comparable listings on Rightmove and Zoopla for the same area and bedroom count.",
  "Point out any property issues (dated kitchen, no double glazing, poor EPC rating) as reasons for a lower rent.",
  "Offer to sign a longer tenancy (18 or 24 months) in exchange for a rent reduction.",
  "Highlight that you are a reliable tenant: references, steady income, no pets (if applicable).",
  "Ask for a rent review clause so both sides can revisit the figure annually.",
  "If the property has been listed for more than 3 weeks, the landlord may be more willing to negotiate.",
  "Consider asking for the first month free instead of a lower monthly rate; landlords sometimes prefer this.",
];

function RentGauge({
  analysis,
  rent,
}: {
  analysis: RentAnalysis;
  rent: number;
}) {
  const { percentile25, adjustedMedian, percentile75 } = analysis;

  // Gauge range: from 0.5x median to 1.8x median
  const minVal = Math.round(adjustedMedian * 0.5);
  const maxVal = Math.round(adjustedMedian * 1.8);
  const range = maxVal - minVal;

  const clamp = (v: number) =>
    Math.max(0, Math.min(100, ((v - minVal) / range) * 100));

  const rentPos = clamp(rent);
  const p25Pos = clamp(percentile25);
  const medianPos = clamp(adjustedMedian);
  const p75Pos = clamp(percentile75);

  return (
    <div className="space-y-3">
      <div className="relative h-8 rounded-full overflow-hidden bg-slate-100">
        {/* Green zone: below p25 */}
        <div
          className="absolute top-0 bottom-0 bg-accent-200"
          style={{ left: "0%", width: `${p25Pos}%` }}
        />
        {/* Blue zone: p25 to median */}
        <div
          className="absolute top-0 bottom-0 bg-primary-200"
          style={{ left: `${p25Pos}%`, width: `${medianPos - p25Pos}%` }}
        />
        {/* Blue zone: median to p75 */}
        <div
          className="absolute top-0 bottom-0 bg-primary-100"
          style={{ left: `${medianPos}%`, width: `${p75Pos - medianPos}%` }}
        />
        {/* Amber/red zone: above p75 */}
        <div
          className="absolute top-0 bottom-0 bg-warning-200"
          style={{ left: `${p75Pos}%`, width: `${100 - p75Pos}%` }}
        />

        {/* Rent marker */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-slate-900 z-10"
          style={{ left: `${rentPos}%` }}
        >
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
            £{rent}
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="relative h-6 text-xs text-slate-500">
        <span
          className="absolute -translate-x-1/2"
          style={{ left: `${p25Pos}%` }}
        >
          25th: £{percentile25}
        </span>
        <span
          className="absolute -translate-x-1/2 font-semibold text-slate-700"
          style={{ left: `${medianPos}%` }}
        >
          Median: £{adjustedMedian}
        </span>
        <span
          className="absolute -translate-x-1/2"
          style={{ left: `${p75Pos}%` }}
        >
          75th: £{percentile75}
        </span>
      </div>
    </div>
  );
}

export default function FairRentPage() {
  const [inputs, setInputs] = useState<RentInputs>({
    postcode: "",
    rent: 0,
    bedrooms: 2,
    propertyType: "Flat",
    furnished: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const analysis = useMemo(() => {
    if (!submitted || !inputs.postcode || !inputs.rent) return null;
    return analyseRent(inputs);
  }, [inputs, submitted]);

  const update = (field: Partial<RentInputs>) => {
    setInputs((prev) => ({ ...prev, ...field }));
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const verdictInfo = analysis
    ? VERDICT_CONFIG[analysis.verdict]
    : null;

  return (
    <>
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <meta property="og:title" content={PAGE_TITLE} />
      <meta property="og:description" content={PAGE_DESCRIPTION} />
      <meta
        property="og:url"
        content="https://rentercheck.vercel.app/fair-rent"
      />
      <link
        rel="canonical"
        href="https://rentercheck.vercel.app/fair-rent"
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Is Your Rent Fair?
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Enter your details below to see how your rent compares to the
              local median. Based on ONS and VOA rental data by region and
              bedroom count.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Postcode */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Postcode
                </label>
                <input
                  type="text"
                  required
                  value={inputs.postcode}
                  onChange={(e) => update({ postcode: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                  placeholder="e.g. M1 4BT"
                />
              </div>

              {/* Rent */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Monthly Rent Being Asked (£)
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={inputs.rent || ""}
                  onChange={(e) => update({ rent: Number(e.target.value) })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                  placeholder="1200"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Number of Bedrooms
                </label>
                <select
                  value={inputs.bedrooms}
                  onChange={(e) =>
                    update({ bedrooms: Number(e.target.value) })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                >
                  {BEDROOM_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n} bedroom{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Property Type
                </label>
                <select
                  value={inputs.propertyType}
                  onChange={(e) => update({ propertyType: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Furnished toggle */}
              <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={inputs.furnished}
                  onClick={() => update({ furnished: !inputs.furnished })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 ${
                    inputs.furnished ? "bg-primary-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
                      inputs.furnished ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-sm text-slate-700">
                  Furnished (+10% on median estimate)
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            >
              Check My Rent
            </button>
          </form>

          {/* Results */}
          {submitted && !analysis && inputs.postcode && (
            <div className="mt-8 rounded-2xl border border-warning-200 bg-warning-50 p-6 text-center">
              <p className="text-warning-700 font-medium">
                We could not match your postcode to a region. Please check the
                postcode and try again.
              </p>
            </div>
          )}

          {analysis && verdictInfo && (
            <div className="mt-8 space-y-8">
              {/* Verdict card */}
              <div
                className={`rounded-2xl border p-6 sm:p-8 ${verdictInfo.bgColor}`}
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Your Rent Verdict
                  </p>
                  <p
                    className={`mt-2 text-3xl font-extrabold ${verdictInfo.textColor}`}
                  >
                    {verdictInfo.label}
                  </p>
                  <p className="mt-2 text-slate-600">
                    Your rent of{" "}
                    <strong className="text-slate-800">
                      £{inputs.rent}/mo
                    </strong>{" "}
                    is{" "}
                    <strong className="text-slate-800">
                      {Math.round(analysis.ratio * 100)}%
                    </strong>{" "}
                    of the adjusted median for{" "}
                    <strong className="text-slate-800">
                      {inputs.bedrooms}-bed{" "}
                      {inputs.propertyType.toLowerCase()}s
                    </strong>{" "}
                    in{" "}
                    <strong className="text-slate-800">
                      {analysis.region.region}
                    </strong>
                    .
                  </p>
                </div>

                {/* Gauge */}
                <div className="mt-8">
                  <RentGauge analysis={analysis} rent={inputs.rent} />
                </div>

                {/* Annual difference */}
                <div className="mt-6 flex justify-center">
                  <div className="rounded-xl bg-white/80 px-6 py-4 text-center">
                    {analysis.annualDifference > 0 ? (
                      <>
                        <p className="text-sm text-slate-500">
                          You are paying above the adjusted median
                        </p>
                        <p className="mt-1 text-2xl font-bold text-danger-600">
                          +£{Math.abs(analysis.annualDifference).toLocaleString()}/year
                        </p>
                        <p className="text-xs text-slate-400">
                          £{Math.abs(Math.round(analysis.annualDifference / 12))}/month
                          more than expected
                        </p>
                      </>
                    ) : analysis.annualDifference < 0 ? (
                      <>
                        <p className="text-sm text-slate-500">
                          You are saving compared to the adjusted median
                        </p>
                        <p className="mt-1 text-2xl font-bold text-accent-600">
                          £{Math.abs(analysis.annualDifference).toLocaleString()}/year
                        </p>
                        <p className="text-xs text-slate-400">
                          £{Math.abs(Math.round(analysis.annualDifference / 12))}/month
                          less than expected
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-semibold text-primary-600">
                        Your rent matches the adjusted median exactly.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  How We Calculated This
                </h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span>Region detected</span>
                    <span className="font-medium text-slate-800">
                      {analysis.region.region}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span>
                      Base median ({inputs.bedrooms}-bed)
                    </span>
                    <span className="font-medium text-slate-800">
                      £{analysis.medianRent}/mo
                    </span>
                  </div>
                  {inputs.furnished && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span>Furnished adjustment</span>
                      <span className="font-medium text-slate-800">
                        +10%
                      </span>
                    </div>
                  )}
                  {inputs.propertyType !== "Flat" && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span>{inputs.propertyType} adjustment</span>
                      <span className="font-medium text-slate-800">
                        +
                        {Math.round(
                          ((PROPERTY_TYPE_ADJUSTMENT[inputs.propertyType] ??
                            1) -
                            1) *
                            100
                        )}
                        %
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span>Adjusted median</span>
                    <span className="font-bold text-slate-900">
                      £{analysis.adjustedMedian}/mo
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span>25th percentile</span>
                    <span className="font-medium text-slate-800">
                      £{analysis.percentile25}/mo
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>75th percentile</span>
                    <span className="font-medium text-slate-800">
                      £{analysis.percentile75}/mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Negotiation tips (shown if above average) */}
              {(analysis.verdict === "above" ||
                analysis.verdict === "significantly_above") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Tips for Negotiating a Lower Rent
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Your rent appears to be above the local median. Here are some
                    strategies that may help you negotiate a better rate:
                  </p>
                  <ul className="space-y-3">
                    {NEGOTIATION_TIPS.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                          {i + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Regional data table */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Median Rents by Region
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Based on ONS and VOA private rental market statistics. Your
                  region ({analysis.region.region}) is highlighted.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-3 text-slate-600 font-medium">
                          Region
                        </th>
                        {BEDROOM_OPTIONS.map((b) => (
                          <th
                            key={b}
                            className="text-right py-2 px-3 text-slate-600 font-medium"
                          >
                            {b}-bed
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {regionRentData.map((r) => (
                        <tr
                          key={r.region}
                          className={`border-b border-slate-50 ${
                            r.region === analysis.region.region
                              ? "bg-primary-50 font-semibold"
                              : ""
                          }`}
                        >
                          <td className="py-2 px-3 text-slate-700">
                            {r.region}
                          </td>
                          {BEDROOM_OPTIONS.map((b) => (
                            <td
                              key={b}
                              className="py-2 px-3 text-right text-slate-700"
                            >
                              £{r.rents[b].toLocaleString()}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

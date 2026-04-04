"use client";

import { useState, useMemo } from "react";
import type { Metadata } from "next";

/* ----------------------------------------------------------------
   SEO metadata (exported from a separate generateMetadata or
   placed in a layout; Next 15 "use client" pages cannot export
   metadata directly, so we use a head component workaround below)
---------------------------------------------------------------- */

const PAGE_TITLE =
  "Total Monthly Rent Cost Calculator | RenterCheck";
const PAGE_DESCRIPTION =
  "Calculate the true total cost of renting in the UK. Includes rent, council tax, energy bills, water, broadband, and more. Compare two properties side by side.";

/* ----------------------------------------------------------------
   Constants
---------------------------------------------------------------- */
const COUNCIL_TAX_ANNUAL: Record<string, number> = {
  A: 1200,
  B: 1400,
  C: 1600,
  D: 1800,
  E: 2200,
  F: 2600,
  G: 3000,
  H: 3600,
};

const EPC_ENERGY_MONTHLY: Record<string, number> = {
  A: 80,
  B: 100,
  C: 130,
  D: 160,
  E: 200,
  F: 250,
  G: 300,
};

const WATER_PER_PERSON = 35;
const BROADBAND_MONTHLY = 30;
const TV_LICENCE_MONTHLY = 13.25;
const CONTENTS_INSURANCE = 15;

const COUNCIL_TAX_BANDS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const EPC_RATINGS = ["A", "B", "C", "D", "E", "F", "G"];
const PROPERTY_TYPES = ["Flat", "Terraced", "Semi-detached", "Detached"];
const OCCUPANT_OPTIONS = [1, 2, 3, 4, 5, 6];
const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

interface PropertyInputs {
  rent: number;
  councilTaxBand: string;
  occupants: number;
  propertyType: string;
  bedrooms: number;
  epcRating: string;
  postcode: string;
  hasTV: boolean;
}

interface CostBreakdown {
  rent: number;
  councilTax: number;
  energy: number;
  water: number;
  broadband: number;
  tvLicence: number;
  insurance: number;
  total: number;
}

const defaultInputs: PropertyInputs = {
  rent: 1200,
  councilTaxBand: "C",
  occupants: 2,
  propertyType: "Flat",
  bedrooms: 2,
  epcRating: "D",
  postcode: "",
  hasTV: true,
};

function calculateCosts(inputs: PropertyInputs): CostBreakdown {
  const rent = inputs.rent;

  // Council tax: annual / 12, with 25% discount for single occupant
  let councilTax =
    (COUNCIL_TAX_ANNUAL[inputs.councilTaxBand] ?? 1800) / 12;
  if (inputs.occupants === 1) {
    councilTax *= 0.75;
  }

  // Energy: base from EPC, +20% for houses (not flats), +15% per extra bedroom
  let energy = EPC_ENERGY_MONTHLY[inputs.epcRating] ?? 160;
  if (inputs.propertyType !== "Flat") {
    energy *= 1.2;
  }
  if (inputs.bedrooms > 1) {
    energy *= 1 + 0.15 * (inputs.bedrooms - 1);
  }

  const water = WATER_PER_PERSON * inputs.occupants;
  const broadband = BROADBAND_MONTHLY;
  const tvLicence = inputs.hasTV ? TV_LICENCE_MONTHLY : 0;
  const insurance = CONTENTS_INSURANCE;

  const total =
    rent + councilTax + energy + water + broadband + tvLicence + insurance;

  return {
    rent: Math.round(rent * 100) / 100,
    councilTax: Math.round(councilTax * 100) / 100,
    energy: Math.round(energy * 100) / 100,
    water: Math.round(water * 100) / 100,
    broadband: Math.round(broadband * 100) / 100,
    tvLicence: Math.round(tvLicence * 100) / 100,
    insurance: Math.round(insurance * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

const COST_COLORS: Record<string, string> = {
  rent: "#2563eb",
  councilTax: "#7c3aed",
  energy: "#f59e0b",
  water: "#06b6d4",
  broadband: "#10b981",
  tvLicence: "#ec4899",
  insurance: "#8b5cf6",
};

const COST_LABELS: Record<string, string> = {
  rent: "Rent",
  councilTax: "Council Tax",
  energy: "Energy Bills",
  water: "Water Rates",
  broadband: "Broadband",
  tvLicence: "TV Licence",
  insurance: "Contents Insurance",
};

function PieChart({ costs }: { costs: CostBreakdown }) {
  const items = Object.entries(COST_LABELS)
    .map(([key, label]) => ({
      key,
      label,
      value: costs[key as keyof CostBreakdown] as number,
      color: COST_COLORS[key],
    }))
    .filter((item) => item.value > 0);

  const total = items.reduce((sum, item) => sum + item.value, 0);
  let cumulative = 0;
  const segments = items.map((item) => {
    const start = (cumulative / total) * 360;
    cumulative += item.value;
    const end = (cumulative / total) * 360;
    return { ...item, start, end };
  });

  const gradient = segments
    .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="h-48 w-48 rounded-full shadow-lg"
        style={{ background: `conic-gradient(${gradient})` }}
      />
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((item) => (
          <div key={item.key} className="flex items-center gap-1.5 text-sm">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-600">
              {item.label} ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CostBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="w-36 text-sm text-slate-600 shrink-0">{label}</span>
      <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-20 text-right font-semibold text-slate-800 text-sm">
        £{value.toFixed(2)}
      </span>
    </div>
  );
}

function PropertyForm({
  inputs,
  onChange,
  label,
}: {
  inputs: PropertyInputs;
  onChange: (inputs: PropertyInputs) => void;
  label: string;
}) {
  const update = (field: Partial<PropertyInputs>) =>
    onChange({ ...inputs, ...field });

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-slate-800">{label}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rent */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Monthly Rent (£)
          </label>
          <input
            type="number"
            min={0}
            value={inputs.rent || ""}
            onChange={(e) => update({ rent: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            placeholder="1200"
          />
        </div>

        {/* Council Tax Band */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Council Tax Band
          </label>
          <select
            value={inputs.councilTaxBand}
            onChange={(e) => update({ councilTaxBand: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
          >
            {COUNCIL_TAX_BANDS.map((band) => (
              <option key={band} value={band}>
                Band {band} (~£{COUNCIL_TAX_ANNUAL[band].toLocaleString()}/yr)
              </option>
            ))}
          </select>
        </div>

        {/* Occupants */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Number of Occupants
          </label>
          <select
            value={inputs.occupants}
            onChange={(e) => update({ occupants: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
          >
            {OCCUPANT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person (25% council tax discount)" : "people"}
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

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Number of Bedrooms
          </label>
          <select
            value={inputs.bedrooms}
            onChange={(e) => update({ bedrooms: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
          >
            {BEDROOM_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} bedroom{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* EPC Rating */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            EPC Rating
          </label>
          <select
            value={inputs.epcRating}
            onChange={(e) => update({ epcRating: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
          >
            {EPC_RATINGS.map((rating) => (
              <option key={rating} value={rating}>
                {rating} (~£{EPC_ENERGY_MONTHLY[rating]}/mo base energy)
              </option>
            ))}
          </select>
        </div>

        {/* Postcode */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Postcode (optional)
          </label>
          <input
            type="text"
            value={inputs.postcode}
            onChange={(e) => update({ postcode: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            placeholder="e.g. SW1A 1AA"
          />
        </div>

        {/* TV Licence */}
        <div className="flex items-center gap-3 pt-6">
          <input
            id={`tv-${label}`}
            type="checkbox"
            checked={inputs.hasTV}
            onChange={(e) => update({ hasTV: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          />
          <label
            htmlFor={`tv-${label}`}
            className="text-sm text-slate-700"
          >
            Has TV (include TV licence, £{TV_LICENCE_MONTHLY}/mo)
          </label>
        </div>
      </div>
    </div>
  );
}

function ResultsPanel({
  costs,
  label,
}: {
  costs: CostBreakdown;
  label: string;
}) {
  const maxCost = Math.max(
    costs.rent,
    costs.councilTax,
    costs.energy,
    costs.water,
    costs.broadband,
    costs.tvLicence,
    costs.insurance
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">{label}</h3>

      {/* Total */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-center text-white">
        <p className="text-sm font-medium text-primary-200 uppercase tracking-wider">
          Total Monthly Cost
        </p>
        <p className="mt-1 text-4xl font-extrabold">
          £{costs.total.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-primary-200">
          £{(costs.total * 12).toFixed(0)} per year
        </p>
      </div>

      {/* Bar breakdown */}
      <div className="space-y-3">
        {Object.entries(COST_LABELS).map(([key, lbl]) => {
          const val = costs[key as keyof CostBreakdown] as number;
          if (val === 0) return null;
          return (
            <CostBar
              key={key}
              label={lbl}
              value={val}
              max={maxCost}
              color={COST_COLORS[key]}
            />
          );
        })}
      </div>

      {/* Pie chart */}
      <div className="pt-4">
        <PieChart costs={costs} />
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const [property1, setProperty1] = useState<PropertyInputs>({
    ...defaultInputs,
  });
  const [property2, setProperty2] = useState<PropertyInputs>({
    ...defaultInputs,
    rent: 1400,
    councilTaxBand: "D",
    propertyType: "Semi-detached",
    bedrooms: 3,
  });
  const [comparing, setComparing] = useState(false);

  const costs1 = useMemo(() => calculateCosts(property1), [property1]);
  const costs2 = useMemo(() => calculateCosts(property2), [property2]);

  return (
    <>
      {/* SEO head tags */}
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <meta property="og:title" content={PAGE_TITLE} />
      <meta property="og:description" content={PAGE_DESCRIPTION} />
      <meta
        property="og:url"
        content="https://rentercheck.vercel.app/calculator"
      />
      <link
        rel="canonical"
        href="https://rentercheck.vercel.app/calculator"
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Total Monthly Rent Cost Calculator
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Rent is only part of the story. Calculate the true total monthly
              cost of any UK rental property, including council tax, energy,
              water, broadband, and more.
            </p>
          </div>

          <div
            className={`grid gap-10 ${comparing ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-2xl mx-auto"}`}
          >
            {/* Property 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <PropertyForm
                inputs={property1}
                onChange={setProperty1}
                label={comparing ? "Property 1" : "Your Property"}
              />
              <hr className="my-8 border-slate-200" />
              <ResultsPanel
                costs={costs1}
                label={comparing ? "Property 1 Costs" : "Your Monthly Costs"}
              />
            </div>

            {/* Property 2 */}
            {comparing && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <PropertyForm
                  inputs={property2}
                  onChange={setProperty2}
                  label="Property 2"
                />
                <hr className="my-8 border-slate-200" />
                <ResultsPanel costs={costs2} label="Property 2 Costs" />
              </div>
            )}
          </div>

          {/* Compare toggle */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setComparing(!comparing)}
              className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            >
              {comparing ? (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  Hide Comparison
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                  Compare Two Properties
                </>
              )}
            </button>
          </div>

          {/* Comparison summary */}
          {comparing && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 text-center">
                Side-by-Side Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-slate-600 font-medium">
                        Cost
                      </th>
                      <th className="text-right py-3 px-4 text-primary-700 font-semibold">
                        Property 1
                      </th>
                      <th className="text-right py-3 px-4 text-primary-700 font-semibold">
                        Property 2
                      </th>
                      <th className="text-right py-3 px-4 text-slate-600 font-medium">
                        Difference
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(COST_LABELS).map(([key, label]) => {
                      const v1 = costs1[key as keyof CostBreakdown] as number;
                      const v2 = costs2[key as keyof CostBreakdown] as number;
                      const diff = v2 - v1;
                      return (
                        <tr
                          key={key}
                          className="border-b border-slate-100"
                        >
                          <td className="py-3 px-4 text-slate-700">
                            {label}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-slate-800">
                            £{v1.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-slate-800">
                            £{v2.toFixed(2)}
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-semibold ${
                              diff > 0
                                ? "text-danger-600"
                                : diff < 0
                                  ? "text-accent-600"
                                  : "text-slate-400"
                            }`}
                          >
                            {diff > 0 ? "+" : ""}£{diff.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-slate-50 font-bold">
                      <td className="py-3 px-4 text-slate-900">
                        Total Monthly
                      </td>
                      <td className="py-3 px-4 text-right text-slate-900">
                        £{costs1.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-900">
                        £{costs2.total.toFixed(2)}
                      </td>
                      <td
                        className={`py-3 px-4 text-right ${
                          costs2.total - costs1.total > 0
                            ? "text-danger-600"
                            : costs2.total - costs1.total < 0
                              ? "text-accent-600"
                              : "text-slate-400"
                        }`}
                      >
                        {costs2.total - costs1.total > 0 ? "+" : ""}£
                        {(costs2.total - costs1.total).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-3 px-4 text-slate-700 font-medium">
                        Total Annual
                      </td>
                      <td className="py-3 px-4 text-right text-slate-700">
                        £{(costs1.total * 12).toFixed(0)}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-700">
                        £{(costs2.total * 12).toFixed(0)}
                      </td>
                      <td
                        className={`py-3 px-4 text-right font-semibold ${
                          costs2.total - costs1.total > 0
                            ? "text-danger-600"
                            : costs2.total - costs1.total < 0
                              ? "text-accent-600"
                              : "text-slate-400"
                        }`}
                      >
                        {costs2.total - costs1.total > 0 ? "+" : ""}£
                        {((costs2.total - costs1.total) * 12).toFixed(0)}/yr
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Explainer */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              How We Calculate These Costs
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-500">&#9679;</span>
                <span>
                  <strong>Council Tax</strong> uses national average bands (A
                  through H). Single occupants get a 25% discount.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-500">&#9679;</span>
                <span>
                  <strong>Energy</strong> estimates are based on EPC rating, with
                  a 20% uplift for houses (compared to flats) and 15% per
                  additional bedroom.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-500">&#9679;</span>
                <span>
                  <strong>Water</strong> is estimated at £{WATER_PER_PERSON} per
                  person per month (UK average metered rate).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-500">&#9679;</span>
                <span>
                  <strong>Broadband</strong> uses a £{BROADBAND_MONTHLY}/month
                  UK average. <strong>TV Licence</strong> is £
                  {TV_LICENCE_MONTHLY}/month if applicable.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-500">&#9679;</span>
                <span>
                  <strong>Contents Insurance</strong> is estimated at £
                  {CONTENTS_INSURANCE}/month for a standard renter policy.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-400">
              These are estimates based on UK national averages. Actual costs
              vary by location, provider, and usage.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

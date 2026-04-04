"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [properties, setProperties] = useState(10000);
  const [teamSize, setTeamSize] = useState(5);

  const nonCompliant = Math.round(properties * 0.15);
  const enforcedCases = Math.round(nonCompliant * 0.1);
  const penaltyIncome = enforcedCases * 5000;

  // Determine tier cost
  let annualCost: number;
  if (properties <= 5000) {
    annualCost = 500 * 12;
  } else if (properties <= 25000) {
    annualCost = 1500 * 12;
  } else {
    annualCost = 3000 * 12; // estimate for enterprise
  }

  const roi = annualCost > 0 ? (penaltyIncome / annualCost).toFixed(1) : "0";

  return (
    <section className="py-20 sm:py-24 bg-slate-900 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            ROI Calculator
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            See the potential return on investment for your council.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Inputs */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                PRS properties in your borough
              </label>
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={properties}
                onChange={(e) => setProperties(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700 accent-primary-500"
              />
              <div className="mt-2 text-2xl font-bold text-primary-400">
                {properties.toLocaleString()}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current enforcement team size
              </label>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700 accent-primary-500"
              />
              <div className="mt-2 text-2xl font-bold text-primary-400">
                {teamSize} officers
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
              <p className="text-sm text-slate-400 uppercase tracking-wide font-medium">
                Estimated non-compliant properties identified
              </p>
              <p className="mt-1 text-3xl font-bold text-warning-400">
                {nonCompliant.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
              <p className="text-sm text-slate-400 uppercase tracking-wide font-medium">
                Potential civil penalty income
              </p>
              <p className="mt-1 text-3xl font-bold text-accent-400">
                £{penaltyIncome.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Based on £5,000 avg penalty, 10% enforcement rate on flagged properties
              </p>
            </div>
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
              <p className="text-sm text-slate-400 uppercase tracking-wide font-medium">
                ROI on annual subscription
              </p>
              <p className="mt-1 text-3xl font-bold text-primary-400">
                {roi}x
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

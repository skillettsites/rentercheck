"use client";

import { useState } from "react";
import Link from "next/link";
import {
  generateCommuteReport,
  type CommuteReport,
  type TransportMode,
  type ModeEstimate,
} from "@/lib/apis/commute";

// ── Icons ────────────────────────────────────────────────────────────────────

function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H21a.75.75 0 0 0 .75-.75V12a3 3 0 0 0-3-3h-1.372c-.86 0-1.61-.586-1.819-1.42l-1.09-4.36a1.125 1.125 0 0 0-1.094-.87H9.625a1.125 1.125 0 0 0-1.094.87L7.44 7.58A1.875 1.875 0 0 1 5.621 9H4.5a3 3 0 0 0-3 3v5.25a.75.75 0 0 0 .75.75h1.5" />
    </svg>
  );
}

function TrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
    </svg>
  );
}

function BikeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      <circle cx="5.5" cy="17.5" r="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18.5" cy="17.5" r="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 17.5 9 9h3l3 8.5M15 9h2.5l1 8.5" />
    </svg>
  );
}

function WalkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function modeIcon(mode: TransportMode, className?: string) {
  switch (mode) {
    case "driving":
      return <CarIcon className={className} />;
    case "publicTransport":
      return <TrainIcon className={className} />;
    case "cycling":
      return <BikeIcon className={className} />;
    case "walking":
      return <WalkIcon className={className} />;
  }
}

function modeColour(mode: TransportMode): string {
  switch (mode) {
    case "driving":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "publicTransport":
      return "bg-purple-50 text-purple-600 border-purple-200";
    case "cycling":
      return "bg-green-50 text-green-600 border-green-200";
    case "walking":
      return "bg-amber-50 text-amber-600 border-amber-200";
  }
}

// ── Form Constants ───────────────────────────────────────────────────────────

const startTimes = [
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
];

const modeOptions: { value: TransportMode; label: string }[] = [
  { value: "driving", label: "Driving" },
  { value: "publicTransport", label: "Public Transport" },
  { value: "cycling", label: "Cycling" },
  { value: "walking", label: "Walking" },
];

// ── Formatters ───────────────────────────────────────────────────────────────

function formatMins(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatGBP(amount: number): string {
  return `£${amount.toLocaleString("en-GB")}`;
}

// ── Page Component ───────────────────────────────────────────────────────────

export default function CommutePage() {
  const [homePostcode, setHomePostcode] = useState("");
  const [workPostcode, setWorkPostcode] = useState("");
  const [startTime, setStartTime] = useState("9:00 AM");
  const [selectedModes, setSelectedModes] = useState<TransportMode[]>([
    "driving",
    "publicTransport",
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<CommuteReport | null>(null);

  function toggleMode(mode: TransportMode) {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!homePostcode.trim() || !workPostcode.trim()) {
      setError("Please enter both postcodes.");
      return;
    }
    if (selectedModes.length === 0) {
      setError("Please select at least one transport mode.");
      return;
    }

    setError(null);
    setLoading(true);
    setReport(null);

    try {
      const result = await generateCommuteReport(
        homePostcode.trim(),
        workPostcode.trim(),
        selectedModes
      );
      if (!result) {
        setError(
          "Could not find one or both postcodes. Please check and try again."
        );
      } else {
        setReport(result);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Find the driving estimate for savings comparison
  const drivingEstimate = report?.estimates.find((e) => e.mode === "driving");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Commute Calculator
          </h1>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
            Calculate commute time, cost, and carbon emissions from your home to
            your workplace. Compare transport options side by side.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 -mt-8 relative z-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Home postcode */}
            <div>
              <label
                htmlFor="home-postcode"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Home postcode
              </label>
              <input
                id="home-postcode"
                type="text"
                placeholder="e.g. SW1A 1AA"
                value={homePostcode}
                onChange={(e) => setHomePostcode(e.target.value.toUpperCase())}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                required
              />
            </div>

            {/* Work postcode */}
            <div>
              <label
                htmlFor="work-postcode"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Workplace postcode
              </label>
              <input
                id="work-postcode"
                type="text"
                placeholder="e.g. EC2R 8AH"
                value={workPostcode}
                onChange={(e) => setWorkPostcode(e.target.value.toUpperCase())}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                required
              />
            </div>

            {/* Start time */}
            <div>
              <label
                htmlFor="start-time"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                What time do you start work?
              </label>
              <select
                id="start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
              >
                {startTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Transport modes */}
            <div>
              <span className="block text-sm font-medium text-slate-700 mb-1.5">
                How do you travel?
              </span>
              <div className="flex flex-wrap gap-3">
                {modeOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                      selectedModes.includes(opt.value)
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedModes.includes(opt.value)}
                      onChange={() => toggleMode(opt.value)}
                      className="sr-only"
                    />
                    {modeIcon(opt.value, "h-4 w-4")}
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-danger-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full sm:w-auto rounded-lg bg-primary-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Calculating..." : "Calculate Commute"}
          </button>
        </form>
      </section>

      {/* Loading */}
      {loading && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-10 text-center">
          <div className="inline-flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
            <svg
              className="h-5 w-5 animate-spin text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-sm text-slate-600">
              Analysing your commute...
            </span>
          </div>
        </div>
      )}

      {/* Report */}
      {report && !loading && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 mt-10 pb-20 space-y-10">
          {/* Header */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Commute Report: {report.home.postcode} to{" "}
              {report.work.postcode}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {report.straightLineMiles} miles (straight line)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                <CarIcon className="h-4 w-4" />
                ~{report.estimatedDrivingMiles} miles by road
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-sm font-medium text-accent-700">
                {report.home.region} to {report.work.region}
              </span>
            </div>
          </div>

          {/* Journey Option Cards */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Journey Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {report.estimates.map((est) => (
                <JourneyCard
                  key={est.mode}
                  estimate={est}
                  drivingAnnual={drivingEstimate?.annualCost}
                />
              ))}
            </div>
          </div>

          {/* Cost Comparison Table */}
          {report.estimates.length > 1 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Cost Comparison
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        &nbsp;
                      </th>
                      {report.estimates.map((est) => (
                        <th
                          key={est.mode}
                          className="px-4 py-3 text-center font-semibold text-slate-700"
                        >
                          <span className="flex items-center justify-center gap-1.5">
                            {modeIcon(est.mode, "h-4 w-4")}
                            {est.label}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">
                        Monthly cost
                      </td>
                      {report.estimates.map((est) => (
                        <td
                          key={est.mode}
                          className="px-4 py-3 text-center text-slate-900"
                        >
                          {formatGBP(est.monthlyCost)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">
                        Annual cost
                      </td>
                      {report.estimates.map((est) => (
                        <td
                          key={est.mode}
                          className="px-4 py-3 text-center text-slate-900"
                        >
                          {formatGBP(est.annualCost)}
                        </td>
                      ))}
                    </tr>
                    {drivingEstimate && (
                      <tr className="border-b border-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-700">
                          Annual savings vs driving
                        </td>
                        {report.estimates.map((est) => {
                          const saving =
                            drivingEstimate.annualCost - est.annualCost;
                          return (
                            <td
                              key={est.mode}
                              className={`px-4 py-3 text-center font-medium ${
                                saving > 0
                                  ? "text-accent-600"
                                  : "text-slate-400"
                              }`}
                            >
                              {est.mode === "driving"
                                ? "-"
                                : saving > 0
                                ? `${formatGBP(saving)}`
                                : formatGBP(saving)}
                            </td>
                          );
                        })}
                      </tr>
                    )}
                    <tr className="border-b border-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">
                        Daily journey time
                      </td>
                      {report.estimates.map((est) => (
                        <td
                          key={est.mode}
                          className="px-4 py-3 text-center text-slate-900"
                        >
                          {est.practical
                            ? formatMins(est.journeyMinutes)
                            : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-700">
                        CO2 per year
                      </td>
                      {report.estimates.map((est) => (
                        <td
                          key={est.mode}
                          className="px-4 py-3 text-center text-slate-900"
                        >
                          {est.co2PerYear > 0
                            ? `${est.co2PerYear.toLocaleString("en-GB")} kg`
                            : "0 kg"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Verdict */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Our Verdict
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {report.verdict.bestValue && (
                <VerdictCard
                  label="Best Value"
                  emoji="💰"
                  mode={report.verdict.bestValue}
                  detail={
                    drivingEstimate &&
                    report.verdict.bestValue.mode !== "driving"
                      ? `Saves ${formatGBP(
                          drivingEstimate.annualCost -
                            report.verdict.bestValue.annualCost
                        )}/year vs driving`
                      : `${formatGBP(report.verdict.bestValue.monthlyCost)}/month`
                  }
                />
              )}
              {report.verdict.fastest && (
                <VerdictCard
                  label="Fastest"
                  emoji="⚡"
                  mode={report.verdict.fastest}
                  detail={`${formatMins(report.verdict.fastest.journeyMinutes)} each way`}
                />
              )}
              {report.verdict.bestBalance && (
                <VerdictCard
                  label="Best Balance"
                  emoji="⚖️"
                  mode={report.verdict.bestBalance}
                  detail={`${formatMins(report.verdict.bestBalance.journeyMinutes)}, ${formatGBP(report.verdict.bestBalance.monthlyCost)}/month`}
                />
              )}
            </div>
          </div>

          {/* Impact on Rent Budget */}
          {report.estimates.length > 0 && (
            <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-3">
                Impact on Your Rent Budget
              </h3>
              {(() => {
                const cheapestPractical = report.estimates
                  .filter((e) => e.practical)
                  .reduce((a, b) =>
                    a.monthlyCost < b.monthlyCost ? a : b
                  );
                return (
                  <div className="space-y-3 text-sm text-primary-800">
                    <p>
                      Your commute costs{" "}
                      <strong>
                        {formatGBP(cheapestPractical.monthlyCost)}/month
                      </strong>{" "}
                      by {cheapestPractical.label.toLowerCase()}.
                    </p>
                    {drivingEstimate &&
                      drivingEstimate.mode !== cheapestPractical.mode && (
                        <p>
                          That is equivalent to{" "}
                          <strong>
                            {formatGBP(
                              Math.round(
                                (drivingEstimate.monthlyCost -
                                  cheapestPractical.monthlyCost)
                              )
                            )}{" "}
                            more rent
                          </strong>{" "}
                          you could afford if you switched from driving.
                        </p>
                      )}
                    <p>
                      A property £100/month more expensive but 10 minutes
                      closer could save you{" "}
                      <strong>
                        {formatGBP(
                          Math.round(
                            (cheapestPractical.monthlyCost * 0.3) * 12
                          )
                        )}
                        /year
                      </strong>{" "}
                      in commute costs.
                    </p>
                    <Link
                      href="/calculator"
                      className="inline-flex items-center gap-1 text-primary-700 font-medium hover:text-primary-900 transition-colors"
                    >
                      Factor this into your total cost
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Nearby Stations */}
          {(report.homeStations.length > 0 ||
            report.workStations.length > 0) && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Nearby Stations
              </h3>
              {report.homeStations.length > 0 &&
                report.workStations.length > 0 && (
                  <p className="text-sm text-accent-600 font-medium mb-4">
                    Good rail links between home and work.
                  </p>
                )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Home stations */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Near your home ({report.home.postcode})
                  </h4>
                  {report.homeStations.length > 0 ? (
                    <ul className="space-y-1.5">
                      {report.homeStations.slice(0, 5).map((s) => (
                        <li
                          key={s.name}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-slate-700">{s.name}</span>
                          <span className="text-slate-500">
                            {s.distance < 1000
                              ? `${s.distance}m`
                              : `${(s.distance / 1000).toFixed(1)}km`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500">
                      No stations found within 2km.
                    </p>
                  )}
                </div>

                {/* Work stations */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Near your workplace ({report.work.postcode})
                  </h4>
                  {report.workStations.length > 0 ? (
                    <ul className="space-y-1.5">
                      {report.workStations.slice(0, 5).map((s) => (
                        <li
                          key={s.name}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-slate-700">{s.name}</span>
                          <span className="text-slate-500">
                            {s.distance < 1000
                              ? `${s.distance}m`
                              : `${(s.distance / 1000).toFixed(1)}km`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500">
                      No stations found within 1km.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Map Placeholder */}
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-8 sm:p-12 text-center">
            <div className="flex items-center justify-center gap-4 text-slate-400 mb-3">
              <span className="flex items-center gap-1">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {report.home.postcode}
              </span>
              <span className="text-slate-300">- - - - - - -</span>
              <span className="flex items-center gap-1">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {report.work.postcode}
              </span>
            </div>
            <p className="text-sm text-slate-500">Map coming soon</p>
          </div>

          {/* Bottom CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={`/check/${report.home.postcode.replace(/\s+/g, "+")}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-6 py-4 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              Check your rental property
            </Link>
            <Link
              href="/calculator"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008H15.75v-.008Zm0 2.25h.008v.008H15.75V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
              </svg>
              Calculate total monthly cost
            </Link>
          </div>
        </div>
      )}

      {/* Empty state before search */}
      {!report && !loading && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
          <div className="mx-auto max-w-md">
            <svg className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-700">
              Enter your postcodes above
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              We will calculate journey time, monthly costs, and CO2 emissions
              for each transport option so you can make the best decision.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function JourneyCard({
  estimate,
  drivingAnnual,
}: {
  estimate: ModeEstimate;
  drivingAnnual?: number;
}) {
  const colour = modeColour(estimate.mode);

  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
        !estimate.practical ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${colour}`}>
          {modeIcon(estimate.mode, "h-5 w-5")}
          <span className="text-sm font-semibold">{estimate.label}</span>
        </div>
        {!estimate.practical && (
          <span className="text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
            Not practical
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Journey time
          </p>
          <p className="text-lg font-bold text-slate-900">
            {estimate.practical
              ? formatMins(estimate.journeyMinutes)
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Monthly cost
          </p>
          <p className="text-lg font-bold text-slate-900">
            {formatGBP(estimate.monthlyCost)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Annual cost
          </p>
          <p className="text-sm font-medium text-slate-700">
            {formatGBP(estimate.annualCost)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            CO2 per year
          </p>
          <p className="text-sm font-medium text-slate-700">
            {estimate.co2PerYear > 0
              ? `${estimate.co2PerYear.toLocaleString("en-GB")} kg`
              : "0 kg"}
          </p>
        </div>
      </div>

      {drivingAnnual &&
        estimate.mode !== "driving" &&
        estimate.practical &&
        drivingAnnual > estimate.annualCost && (
          <p className="text-xs font-medium text-accent-600 mb-3">
            Saves {formatGBP(drivingAnnual - estimate.annualCost)}/year vs
            driving
          </p>
        )}

      <p className="text-xs text-slate-500 mb-3">{estimate.note}</p>

      {estimate.practical && (
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-semibold text-accent-700 mb-1">Pros</p>
            <ul className="space-y-0.5 text-slate-600">
              {estimate.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-accent-500 mt-0.5">+</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-danger-700 mb-1">Cons</p>
            <ul className="space-y-0.5 text-slate-600">
              {estimate.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-danger-500 mt-0.5">-</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function VerdictCard({
  label,
  emoji,
  mode,
  detail,
}: {
  label: string;
  emoji: string;
  mode: ModeEstimate;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
      <p className="text-2xl mb-1">{emoji}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-slate-900">{mode.label}</p>
      <p className="mt-0.5 text-xs text-slate-600">{detail}</p>
    </div>
  );
}

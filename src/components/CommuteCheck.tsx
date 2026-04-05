"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ── Types ───────────────────────────────────────────────────────────────────

interface CommuteCheckProps {
  postcode: string;
}

interface ModeResult {
  duration: string;
  distance: string;
  durationMins: number;
  summary?: string;
}

interface DestinationResult {
  label: string;
  address: string;
  driving: ModeResult | null;
  transit: ModeResult | null;
  cycling: ModeResult | null;
  monthlyCost: {
    driving: number;
    transit: number;
    cycling: number;
  };
}

interface DestinationInput {
  id: string;
  label: string;
  address: string;
}

interface PlaceSuggestion {
  text: string;
  main: string;
  secondary: string;
  placeId: string;
  postcode: string;
}

// ── Icons ───────────────────────────────────────────────────────────────────

function CarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H21a.75.75 0 0 0 .75-.75V12a3 3 0 0 0-3-3h-1.372c-.86 0-1.61-.586-1.819-1.42l-1.09-4.36a1.125 1.125 0 0 0-1.094-.87H9.625a1.125 1.125 0 0 0-1.094.87L7.44 7.58A1.875 1.875 0 0 1 5.621 9H4.5a3 3 0 0 0-3 3v5.25a.75.75 0 0 0 .75.75h1.5"
      />
    </svg>
  );
}

function TrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
      />
    </svg>
  );
}

function BikeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.5 17.5 9 9h3l3 8.5M15 9h2.5l1 8.5"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className || ""}`}
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
  );
}

// ── Address Autocomplete Input ──────────────────────────────────────────────

function AddressInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `/api/places?q=${encodeURIComponent(query)}`
      );
      if (!res.ok) return;
      const data = await res.json();
      setSuggestions(data.suggestions || []);
      setShowDropdown(true);
      setHighlightIndex(-1);
    } catch {
      // Silently fail
    }
  }, []);

  function handleInputChange(val: string) {
    onChange(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  }

  function selectSuggestion(s: PlaceSuggestion) {
    onChange(s.text);
    setShowDropdown(false);
    setSuggestions([]);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) =>
        i < suggestions.length - 1 ? i + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) =>
        i > 0 ? i - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {suggestions.map((s, i) => (
            <li
              key={s.placeId || i}
              className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                i === highlightIndex
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onMouseDown={() => selectSuggestion(s)}
              onMouseEnter={() => setHighlightIndex(i)}
            >
              <span className="font-medium">{s.main}</span>
              {s.secondary && (
                <span className="ml-1 text-gray-400">{s.secondary}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatGBP(amount: number): string {
  return `£${amount.toLocaleString("en-GB")}`;
}

function findCheapestMode(
  result: DestinationResult
): "driving" | "transit" | "cycling" {
  const costs = [
    { mode: "driving" as const, cost: result.monthlyCost.driving, available: !!result.driving },
    { mode: "transit" as const, cost: result.monthlyCost.transit, available: !!result.transit },
    { mode: "cycling" as const, cost: result.monthlyCost.cycling, available: !!result.cycling },
  ].filter((c) => c.available && c.cost > 0);

  if (costs.length === 0) return "cycling";
  return costs.reduce((a, b) => (a.cost <= b.cost ? a : b)).mode;
}

let nextId = 1;
function makeId(): string {
  return `dest-${nextId++}`;
}

// ── Main Component ──────────────────────────────────────────────────────────

export default function CommuteCheck({ postcode }: CommuteCheckProps) {
  const [destinations, setDestinations] = useState<DestinationInput[]>([
    { id: makeId(), label: "", address: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DestinationResult[] | null>(null);
  const [animateResults, setAnimateResults] = useState(false);

  function updateDestination(
    id: string,
    field: "label" | "address",
    value: string
  ) {
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  }

  function addDestination() {
    if (destinations.length >= 3) return;
    setDestinations((prev) => [
      ...prev,
      { id: makeId(), label: "", address: "" },
    ]);
  }

  function removeDestination(id: string) {
    if (destinations.length <= 1) return;
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  }

  async function handleCalculate() {
    const valid = destinations.filter((d) => d.address.trim());
    if (valid.length === 0) {
      setError("Please enter at least one destination address.");
      return;
    }

    setError(null);
    setLoading(true);
    setResults(null);
    setAnimateResults(false);

    try {
      const res = await fetch("/api/commute-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: postcode,
          destinations: valid.map((d) => ({
            label: d.label.trim() || "Destination",
            address: d.address.trim(),
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to calculate commutes. Please try again.");
        return;
      }

      const data = await res.json();
      setResults(data.results);
      // Trigger animation after a brief delay
      setTimeout(() => setAnimateResults(true), 50);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  // Summary calculations
  const totalCheapestMonthlyCost = results
    ? results.reduce((sum, r) => {
        const cheapest = findCheapestMode(r);
        return sum + r.monthlyCost[cheapest];
      }, 0)
    : 0;

  const weeklyMinutes = results
    ? {
        driving: results.reduce(
          (sum, r) => sum + (r.driving?.durationMins || 0) * 2 * 5,
          0
        ),
        transit: results.reduce(
          (sum, r) => sum + (r.transit?.durationMins || 0) * 2 * 5,
          0
        ),
        cycling: results.reduce(
          (sum, r) => sum + (r.cycling?.durationMins || 0) * 2 * 5,
          0
        ),
      }
    : null;

  const drivingTotal = results
    ? results.reduce((s, r) => s + r.monthlyCost.driving, 0)
    : 0;
  const transitTotal = results
    ? results.reduce((s, r) => s + r.monthlyCost.transit, 0)
    : 0;
  const savingsVsDriving =
    drivingTotal > transitTotal ? drivingTotal - transitTotal : 0;

  function formatWeeklyTime(mins: number): string {
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  // ── Label placeholders ────────────────────────────────────────────────────

  const labelPlaceholders = ["Work", "School", "Gym"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
          <CarIcon className="h-5 w-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Commute from {postcode}
          </h3>
          <p className="text-sm text-gray-500">
            Check travel times and costs to your regular destinations
          </p>
        </div>
      </div>

      {/* Destination Inputs */}
      <div className="space-y-3">
        {destinations.map((dest, idx) => (
          <div
            key={dest.id}
            className="flex items-start gap-2"
          >
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={dest.label}
                onChange={(e) =>
                  updateDestination(dest.id, "label", e.target.value)
                }
                placeholder={labelPlaceholders[idx] || "Label"}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none sm:w-32"
              />
              <AddressInput
                value={dest.address}
                onChange={(val) =>
                  updateDestination(dest.id, "address", val)
                }
                placeholder="Search for an address..."
              />
            </div>
            {destinations.length > 1 && (
              <button
                type="button"
                onClick={() => removeDestination(dest.id)}
                className="mt-2.5 flex-shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                aria-label="Remove destination"
              >
                <XIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Destination + Calculate */}
      <div className="flex flex-wrap items-center gap-3">
        {destinations.length < 3 && (
          <button
            type="button"
            onClick={addDestination}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
          >
            <PlusIcon className="h-4 w-4" />
            Add destination
          </button>
        )}
        <button
          type="button"
          onClick={handleCalculate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <SpinnerIcon className="h-4 w-4" />
              Calculating...
            </>
          ) : (
            "Calculate Commutes"
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-danger-200 bg-danger-50 p-4 text-sm text-danger-700">
          {error}
        </div>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <div
          className={`space-y-4 transition-all duration-500 ${
            animateResults
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          {results.map((result, idx) => {
            const cheapest = findCheapestMode(result);

            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Destination Header */}
                <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
                  <h4 className="font-semibold text-gray-900">
                    {result.label}
                  </h4>
                  <p className="text-sm text-gray-500">{result.address}</p>
                </div>

                {/* Mode Grid */}
                <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {/* Driving */}
                  <ModeColumn
                    icon={<CarIcon className="h-5 w-5" />}
                    title="Driving"
                    data={result.driving}
                    cost={result.monthlyCost.driving}
                    isCheapest={cheapest === "driving"}
                    colorClass="text-blue-600 bg-blue-50"
                  />

                  {/* Transit */}
                  <ModeColumn
                    icon={<TrainIcon className="h-5 w-5" />}
                    title="Public Transport"
                    data={result.transit}
                    cost={result.monthlyCost.transit}
                    isCheapest={cheapest === "transit"}
                    colorClass="text-purple-600 bg-purple-50"
                    summary={result.transit?.summary}
                  />

                  {/* Cycling */}
                  <ModeColumn
                    icon={<BikeIcon className="h-5 w-5" />}
                    title="Cycling"
                    data={result.cycling}
                    cost={result.monthlyCost.cycling}
                    isCheapest={cheapest === "cycling"}
                    colorClass="text-green-600 bg-green-50"
                  />
                </div>
              </div>
            );
          })}

          {/* Summary Section */}
          <div className="rounded-2xl border border-primary-200 bg-primary-50/50 p-5">
            <h4 className="mb-3 font-semibold text-gray-900">
              Commute Summary
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Total cheapest cost */}
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Cheapest Monthly Cost
                </p>
                <p className="mt-1 text-2xl font-bold text-accent-600">
                  {formatGBP(totalCheapestMonthlyCost)}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Using the cheapest mode per destination
                </p>
              </div>

              {/* Weekly commute time */}
              {weeklyMinutes && (
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Weekly Commute Time
                  </p>
                  <div className="mt-1 space-y-1 text-sm">
                    {weeklyMinutes.driving > 0 && (
                      <p>
                        <span className="font-medium text-blue-600">
                          Driving:
                        </span>{" "}
                        {formatWeeklyTime(weeklyMinutes.driving)}
                      </p>
                    )}
                    {weeklyMinutes.transit > 0 && (
                      <p>
                        <span className="font-medium text-purple-600">
                          Transit:
                        </span>{" "}
                        {formatWeeklyTime(weeklyMinutes.transit)}
                      </p>
                    )}
                    {weeklyMinutes.cycling > 0 && (
                      <p>
                        <span className="font-medium text-green-600">
                          Cycling:
                        </span>{" "}
                        {formatWeeklyTime(weeklyMinutes.cycling)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Savings recommendation */}
              {savingsVsDriving > 0 && (
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Potential Savings
                  </p>
                  <p className="mt-1 text-2xl font-bold text-accent-600">
                    {formatGBP(savingsVsDriving)}
                    <span className="text-sm font-normal text-gray-500">
                      /mo
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Public transport vs driving
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Mode Column Sub-component ───────────────────────────────────────────────

function ModeColumn({
  icon,
  title,
  data,
  cost,
  isCheapest,
  colorClass,
  summary,
}: {
  icon: React.ReactNode;
  title: string;
  data: ModeResult | null;
  cost: number;
  isCheapest: boolean;
  colorClass: string;
  summary?: string;
}) {
  if (!data) {
    return (
      <div className="flex flex-col items-center px-5 py-4 text-center">
        <div
          className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg opacity-40 ${colorClass}`}
        >
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="mt-1 text-xs text-gray-400">Route not available</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center px-5 py-4 text-center">
      {isCheapest && (
        <span className="absolute right-2 top-2 rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-700">
          Best value
        </span>
      )}
      <div
        className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${colorClass}`}
      >
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="mt-2 text-xl font-bold text-gray-900">{data.duration}</p>
      <p className="text-xs text-gray-500">{data.distance}</p>
      {summary && (
        <p className="mt-1 text-[11px] leading-tight text-gray-400">
          via {summary}
        </p>
      )}
      <div className="mt-3 rounded-lg bg-gray-50 px-3 py-1.5">
        <p className="text-xs text-gray-500">Monthly cost</p>
        <p className="text-sm font-semibold text-gray-900">
          {formatGBP(cost)}
        </p>
      </div>
    </div>
  );
}

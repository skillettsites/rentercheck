"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PostcodeSearchProps {
  size?: "lg" | "sm";
  showLabel?: boolean;
}

const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const PARTIAL_POSTCODE_REGEX = /^[A-Z]{1,2}\d/i;

export default function PostcodeSearch({
  size = "lg",
  showLabel = false,
}: PostcodeSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLg = size === "lg";

  // Close dropdown when clicking outside
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

  const navigate = useCallback(
    (postcode: string) => {
      const cleaned = postcode.trim().toUpperCase().replace(/\s+/g, "");
      if (!cleaned) return;
      setLoading(true);
      setShowDropdown(false);
      setSuggestions([]);
      router.push(`/check/${encodeURIComponent(cleaned)}`);
    },
    [router]
  );

  const fetchSuggestions = useCallback(
    async (partial: string) => {
      const trimmed = partial.trim();
      if (trimmed.length < 2) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      // If it looks like a complete postcode, don't autocomplete
      if (POSTCODE_REGEX.test(trimmed)) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      // Only autocomplete if it looks like a partial postcode
      if (!PARTIAL_POSTCODE_REGEX.test(trimmed)) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setFetching(true);
      setError("");
      try {
        const encoded = encodeURIComponent(trimmed);
        const res = await fetch(
          `https://api.postcodes.io/postcodes/${encoded}/autocomplete`
        );
        if (!res.ok) {
          setSuggestions([]);
          setShowDropdown(false);
          return;
        }
        const json = await res.json();
        const results: string[] = json.result ?? [];
        setSuggestions(results);
        setShowDropdown(results.length > 0);
        setHighlightIndex(-1);
      } catch {
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setFetching(false);
      }
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      setError("");

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(val);
      }, 250);
    },
    [fetchSuggestions]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;

      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        navigate(suggestions[highlightIndex]);
        return;
      }

      // If it looks like a valid postcode, navigate directly
      if (POSTCODE_REGEX.test(trimmed)) {
        navigate(trimmed);
        return;
      }

      // If there are suggestions, pick the first one
      if (suggestions.length > 0) {
        navigate(suggestions[0]);
        return;
      }

      // Try navigating anyway; the page will 404 if invalid
      setError("Please enter a valid UK postcode, e.g. SW1A 1AA");
    },
    [query, highlightIndex, suggestions, navigate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown || suggestions.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "Escape") {
        setShowDropdown(false);
        setHighlightIndex(-1);
      }
    },
    [showDropdown, suggestions.length]
  );

  const handleSuggestionClick = useCallback(
    (postcode: string) => {
      setQuery(postcode);
      navigate(postcode);
    },
    [navigate]
  );

  return (
    <div ref={wrapperRef} className="w-full max-w-xl mx-auto">
      {showLabel && (
        <p className="text-sm font-semibold text-slate-600 mb-2">
          Check a rental property
        </p>
      )}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex ${isLg ? "flex-col sm:flex-row" : "flex-row"} gap-3`}
        >
          <div className="relative flex-1">
            {/* Search icon or spinner */}
            {fetching ? (
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-500 pointer-events-none animate-spin"
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
            ) : (
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            )}
            <input
              type="text"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) setShowDropdown(true);
              }}
              placeholder="Enter a postcode or address, e.g. SW1A 1AA"
              className={`w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all ${
                isLg ? "h-14 text-lg" : "h-12 text-base"
              }`}
              autoComplete="off"
              role="combobox"
              aria-expanded={showDropdown}
              aria-autocomplete="list"
              aria-haspopup="listbox"
            />

            {/* Dropdown suggestions */}
            {showDropdown && suggestions.length > 0 && (
              <ul
                role="listbox"
                className="absolute z-50 top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg overflow-hidden"
              >
                {suggestions.map((s, i) => (
                  <li
                    key={s}
                    role="option"
                    aria-selected={i === highlightIndex}
                    className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors ${
                      i === highlightIndex
                        ? "bg-primary-50 text-primary-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSuggestionClick(s);
                    }}
                    onMouseEnter={() => setHighlightIndex(i)}
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className={`inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 font-semibold text-white shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer ${
              isLg
                ? "h-14 px-8 text-lg sm:w-auto w-full"
                : "h-12 px-6 text-base"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5"
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            )}
            {loading ? "Checking..." : "Check Now"}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
}

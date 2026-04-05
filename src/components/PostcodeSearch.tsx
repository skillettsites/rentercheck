"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PostcodeSearchProps {
  size?: "lg" | "sm";
  showLabel?: boolean;
}

interface Suggestion {
  label: string;
  postcode: string;
  type: "postcode" | "address";
}

const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const PARTIAL_POSTCODE_REGEX = /^[A-Z]{1,2}\d/i;

export default function PostcodeSearch({
  size = "lg",
  showLabel = false,
}: PostcodeSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
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
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useCallback(
    async (postcode: string) => {
      let cleaned = postcode.trim().toUpperCase().replace(/\s+/g, "");
      if (!cleaned) return;
      setLoading(true);
      setShowDropdown(false);
      setSuggestions([]);

      // If it doesn't look like a postcode, try to resolve it via postcodes.io
      if (!/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(cleaned)) {
        try {
          // Try as a place name lookup
          const res = await fetch(
            `https://api.postcodes.io/places?q=${encodeURIComponent(postcode.trim())}&limit=1`
          );
          if (res.ok) {
            const data = await res.json();
            const place = data.result?.[0];
            if (place?.postcode) {
              cleaned = place.postcode.replace(/\s+/g, "");
            } else {
              // No postcode found, show error
              setError("Could not find a postcode for this location. Try entering a postcode directly.");
              setLoading(false);
              return;
            }
          }
        } catch {
          setError("Could not resolve this address. Try entering a postcode directly.");
          setLoading(false);
          return;
        }
      }

      router.push(`/check/${encodeURIComponent(cleaned)}`);
    },
    [router]
  );

  const fetchSuggestions = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setFetching(true);
    setError("");

    try {
      // If it looks like a complete postcode, fetch addresses at that postcode
      if (POSTCODE_REGEX.test(trimmed)) {
        const res = await fetch(`/api/addresses?postcode=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          const postcode = data.postcode || trimmed.toUpperCase();
          const items: Suggestion[] = [];

          // Always show the postcode itself first
          items.push({
            label: `${postcode} (all properties)`,
            postcode: postcode,
            type: "postcode",
          });

          // Then show individual addresses
          if (Array.isArray(data.addresses)) {
            for (const addr of data.addresses.slice(0, 20)) {
              items.push({
                label: addr,
                postcode: postcode,
                type: "address",
              });
            }
          }

          setSuggestions(items);
          setShowDropdown(items.length > 0);
          setHighlightIndex(-1);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      }
      // If it looks like a partial postcode, autocomplete postcodes
      else if (PARTIAL_POSTCODE_REGEX.test(trimmed)) {
        const encoded = encodeURIComponent(trimmed);
        const res = await fetch(
          `https://api.postcodes.io/postcodes/${encoded}/autocomplete`
        );
        if (res.ok) {
          const json = await res.json();
          const results: string[] = json.result ?? [];
          const items: Suggestion[] = results.map((pc) => ({
            label: pc,
            postcode: pc,
            type: "postcode" as const,
          }));
          setSuggestions(items);
          setShowDropdown(items.length > 0);
          setHighlightIndex(-1);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      }
      // For any other text, use Google Places Autocomplete
      else if (trimmed.length >= 3) {
        const encoded = encodeURIComponent(trimmed);
        const res = await fetch(`/api/places?q=${encoded}`);
        if (res.ok) {
          const data = await res.json();
          const items: Suggestion[] = (data.suggestions || []).map(
            (s: { text: string; main: string; secondary: string }) => {
              // Try to extract a postcode from the secondary text (e.g. "Wapping, London E1W 3AS")
              const pcMatch = s.text.match(/[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}/i);
              const postcode = pcMatch ? pcMatch[0].toUpperCase().replace(/\s+/g, '') : '';
              return {
                label: s.text,
                postcode: postcode || s.main,
                type: "address" as const,
              };
            }
          );
          setSuggestions(items.slice(0, 8));
          setShowDropdown(items.length > 0);
          setHighlightIndex(-1);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    } catch {
      setSuggestions([]);
      setShowDropdown(false);
    } finally {
      setFetching(false);
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      setError("");

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(val);
      }, 300);
    },
    [fetchSuggestions]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;

      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        navigate(suggestions[highlightIndex].postcode);
        return;
      }

      // If it looks like a valid postcode, navigate directly
      if (POSTCODE_REGEX.test(trimmed)) {
        navigate(trimmed);
        return;
      }

      // If there are suggestions with a postcode, pick the first one
      if (suggestions.length > 0 && suggestions[0].postcode) {
        navigate(suggestions[0].postcode);
        return;
      }

      setError("Enter a UK postcode to check a property");
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
    (suggestion: Suggestion) => {
      setQuery(suggestion.label);
      navigate(suggestion.postcode);
    },
    [navigate]
  );

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl mx-auto relative" style={{ zIndex: 50 }}>
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
              placeholder="Postcode or address"
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
                className="absolute z-[9999] top-full left-0 right-0 mt-2 rounded-xl border border-slate-200 shadow-2xl max-h-80 overflow-y-auto"
                style={{ backgroundColor: "#ffffff", isolation: "isolate", opacity: 1 }}
              >
                {suggestions.map((s, i) => (
                  <li
                    key={`${s.type}-${s.label}-${i}`}
                    role="option"
                    aria-selected={i === highlightIndex}
                    className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors ${
                      i === highlightIndex
                        ? "bg-primary-50 text-primary-700"
                        : "bg-white text-slate-700 hover:bg-slate-50"
                    } ${i > 0 ? "border-t border-slate-100" : ""}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSuggestionClick(s);
                    }}
                    onMouseEnter={() => setHighlightIndex(i)}
                  >
                    {s.type === "postcode" ? (
                      <svg
                        className="h-4 w-4 shrink-0 text-primary-500"
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
                    ) : (
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
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    )}
                    <div className="min-w-0">
                      <span className={`block truncate ${s.type === "postcode" ? "font-semibold" : ""}`}>
                        {s.label}
                      </span>
                      {s.type === "address" && (
                        <span className="block text-xs text-slate-400 truncate">{s.postcode}</span>
                      )}
                    </div>
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
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}

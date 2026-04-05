"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface AddressSelectorProps {
  postcode: string;
}

interface AddressEntry {
  label: string;
  postcode: string;
}

export function AddressSelector({ postcode }: AddressSelectorProps) {
  const [addresses, setAddresses] = useState<AddressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const router = useRouter();

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/addresses?postcode=${encodeURIComponent(postcode)}`);
      if (!res.ok) {
        setError("Could not load addresses for this postcode.");
        setAddresses([]);
        return;
      }
      const data = await res.json();
      if (!data.addresses || data.addresses.length === 0) {
        setAddresses([]);
        return;
      }
      setAddresses(
        data.addresses.map((addr: string) => ({
          label: addr,
          postcode: data.postcode || postcode,
        }))
      );
    } catch {
      setError("Could not load addresses.");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [postcode]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSelect = useCallback(
    (addr: string) => {
      setSelectedAddress(addr);
    },
    []
  );

  const handleCheck = useCallback(() => {
    if (!selectedAddress) return;
    const cleaned = postcode.replace(/\s+/g, "");
    router.push(`/check/${encodeURIComponent(cleaned)}`);
  }, [selectedAddress, postcode, router]);

  // Don't render anything if no addresses found
  if (!loading && addresses.length === 0 && !error) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2 mb-1">
          <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <h3 className="text-base font-semibold text-slate-900">
            Check nearby addresses
          </h3>
        </div>
        <p className="text-sm text-slate-600">
          Select a specific address at {postcode} to check
        </p>
      </div>

      <div className="p-5 sm:p-6">
        {loading ? (
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading addresses...
          </div>
        ) : error ? (
          <p className="text-sm text-slate-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {addresses.map((addr, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(addr.label)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                    selectedAddress === addr.label
                      ? "bg-primary-100 text-primary-800 ring-1 ring-primary-300 font-medium"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {addr.label}
                </button>
              ))}
            </div>
            {selectedAddress && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{selectedAddress}</p>
                  <p className="text-xs text-slate-500">{postcode}</p>
                </div>
                <button
                  onClick={handleCheck}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  Check this address
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

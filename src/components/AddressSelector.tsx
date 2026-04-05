"use client";

import { useState, useEffect, useCallback } from "react";

interface AddressSelectorProps {
  postcode: string;
}

export function AddressSelector({ postcode }: AddressSelectorProps) {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("");

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/addresses?postcode=${encodeURIComponent(postcode)}`);
      if (!res.ok) {
        setAddresses([]);
        return;
      }
      const data = await res.json();
      setAddresses(data.addresses ?? []);
    } catch {
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [postcode]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Show nothing while loading or if no addresses
  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <p className="text-sm text-slate-400">Loading addresses...</p>
        </div>
        <div className="h-12 rounded-xl bg-white/10 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <label htmlFor="address-select" className="flex items-center gap-2 mb-2">
        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <span className="text-sm font-medium text-slate-300">Select your address</span>
        {addresses.length > 0 && (
          <span className="text-xs text-slate-500">({addresses.length} properties found)</span>
        )}
      </label>
      <select
        id="address-select"
        value={selectedAddress}
        onChange={(e) => setSelectedAddress(e.target.value)}
        className="w-full h-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white px-4 text-sm appearance-none cursor-pointer hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          backgroundSize: "20px",
          paddingRight: "40px",
        }}
      >
        {addresses.length === 0 ? (
          <option value="" className="bg-slate-800 text-white">No addresses found at {postcode}</option>
        ) : (
          <>
            <option value="" className="bg-slate-800 text-white">Choose an address at {postcode}...</option>
            {addresses.map((addr, i) => (
              <option key={i} value={addr} className="bg-slate-800 text-white">
                {addr}
              </option>
            ))}
          </>
        )}
      </select>
      {selectedAddress && (
        <p className="mt-2 text-xs text-slate-400">
          Showing area data for {postcode}. Address-specific reports coming soon.
        </p>
      )}
    </div>
  );
}

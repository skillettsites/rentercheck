import type { Metadata } from "next";
import PostcodeSearch from "@/components/PostcodeSearch";

export const metadata: Metadata = {
  title: "Check a Rental Property | Free UK Property Report | RenterCheck",
  description:
    "Enter any UK postcode or address to get a free rental property report. EPC ratings, crime data, flood risk, broadband speeds, schools, transport, and more from 15 data sources.",
  alternates: { canonical: "https://rentercheck.vercel.app/check" },
  openGraph: {
    title: "Check a Rental Property | RenterCheck",
    description:
      "Enter any UK postcode or address for a free rental property report with 15 data sources.",
    url: "https://rentercheck.vercel.app/check",
  },
};

export default function CheckPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Check a Rental Property
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            Enter any UK postcode or address to get a free report covering EPC ratings, crime, flood risk, broadband, schools, transport, and more.
          </p>
          <div className="mt-10 relative" style={{ zIndex: 100 }}>
            <PostcodeSearch size="lg" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <h2 className="text-xl font-bold text-slate-800 mb-6">What We Check</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { icon: "⚡", label: "EPC Rating" },
            { icon: "🔒", label: "Crime Data" },
            { icon: "🌊", label: "Flood Risk" },
            { icon: "🌐", label: "Broadband" },
            { icon: "🏫", label: "Schools" },
            { icon: "🚂", label: "Transport" },
            { icon: "💷", label: "Council Tax" },
            { icon: "🏥", label: "Healthcare" },
            { icon: "🌳", label: "Green Spaces" },
            { icon: "🛒", label: "Amenities" },
            { icon: "📊", label: "Deprivation" },
            { icon: "💨", label: "Air Quality" },
            { icon: "🔊", label: "Noise Level" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 p-3 shadow-sm"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            All data is sourced from official government databases and open data APIs. Free, instant, no sign-up required.
          </p>
        </div>
      </div>
    </div>
  );
}

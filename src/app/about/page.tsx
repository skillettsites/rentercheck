import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About RenterCheck | Free UK Rental Property Reports",
  description:
    "RenterCheck provides free, instant reports on UK rental properties. Check EPC ratings, crime data, flood risk, broadband speeds, and more before you sign a lease.",
};

const dataSources = [
  { name: "EPC Register", desc: "Energy performance certificates for domestic properties across England and Wales." },
  { name: "Police.uk API", desc: "Street-level crime data and neighbourhood safety statistics." },
  { name: "Environment Agency", desc: "Flood risk assessments covering river, surface water, and coastal flooding." },
  { name: "Ofcom", desc: "Broadband speed and availability data by postcode." },
  { name: "VOA (Valuation Office Agency)", desc: "Council tax band information for every domestic property." },
  { name: "Department for Education", desc: "School performance data and Ofsted ratings." },
  { name: "ONS (Office for National Statistics)", desc: "Demographic and deprivation indices by neighbourhood." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        About RenterCheck
      </h1>

      <div className="mt-8 space-y-6 text-lg text-slate-700 leading-relaxed">
        <p>
          RenterCheck is a free property intelligence tool built for UK renters. We pull data
          from over 20 official sources and combine it into a single, easy-to-read report so
          you can make informed decisions before signing a lease.
        </p>

        <p>
          Whether you are checking energy efficiency ratings, local crime statistics, flood
          risk, broadband speeds, or nearby school quality, RenterCheck gives you the full
          picture in seconds.
        </p>
      </div>

      <h2 className="mt-14 text-2xl font-bold text-slate-900">Our Mission</h2>
      <p className="mt-4 text-lg text-slate-700 leading-relaxed">
        Every year, over 2 million people move to a new rental property in the UK. Many sign
        leases without knowing the true condition of the home or the surrounding area. Our
        mission is simple: give every UK renter the information they need to avoid unsafe
        homes, hidden costs, and unpleasant surprises.
      </p>

      <h2 className="mt-14 text-2xl font-bold text-slate-900">Data Sources</h2>
      <p className="mt-4 text-lg text-slate-700 leading-relaxed">
        We aggregate data from trusted government and public sources, including:
      </p>

      <ul className="mt-6 space-y-4">
        {dataSources.map((source) => (
          <li key={source.name} className="flex gap-3">
            <svg
              className="mt-1 h-5 w-5 shrink-0 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <div>
              <span className="font-semibold text-slate-900">{source.name}</span>
              <span className="text-slate-600"> &ndash; {source.desc}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-slate-900">
          Ready to check a property?
        </h3>
        <p className="mt-2 text-slate-600">
          Enter any UK postcode and get your free report in seconds.
        </p>
        <Link
          href="/check"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-primary-700"
        >
          Check a Property
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "Rent Repayment Order Case Management | RenterCheck",
  description:
    "Maximise rent repayment order recovery. The Renters' Rights Act 2025 doubled the maximum to 24 months and added new offences. Case management, evidence compilation, and outcome tracking for councils.",
  alternates: { canonical: "https://rentercheck.vercel.app/councils/rent-repayment" },
  openGraph: {
    title: "Rent Repayment Order Case Management | RenterCheck",
    description:
      "RRO case management for local authorities. Doubled maximum to 24 months under RRA 2025. Evidence compilation, amount calculation, and outcome tracking.",
    url: "https://rentercheck.vercel.app/councils/rent-repayment",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
};

const existingOffences = [
  "Operating an unlicensed HMO (Housing Act 2004, s.72)",
  "Operating an unlicensed property in a selective licensing area (Housing Act 2004, s.95)",
  "Breach of a banning order (Housing and Planning Act 2016, s.21)",
  "Violence for securing entry to premises (Criminal Law Act 1977, s.6)",
  "Illegal eviction or harassment of occupiers (Protection from Eviction Act 1977, s.1)",
];

const newOffences = [
  {
    offence: "Misusing possession grounds",
    desc: "Using a Section 8 ground (such as landlord moving in or sale) dishonestly. If the landlord does not follow through on the stated ground within the required period, the tenant can apply for an RRO.",
    act: "Renters' Rights Act 2025, s.22",
  },
  {
    offence: "PRS Database violations",
    desc: "Failing to register on the PRS Database, providing false information, or letting a property while unregistered. Each violation is a separate offence eligible for an RRO.",
    act: "Renters' Rights Act 2025, s.98-101",
  },
  {
    offence: "Letting or marketing restrictions",
    desc: "Letting or marketing a property when prohibited from doing so (for example, due to a banning order or failure to register). Advertising agents are also liable.",
    act: "Renters' Rights Act 2025, s.102",
  },
  {
    offence: "Superior landlord liability",
    desc: "For the first time, superior landlords (freeholders, head lessees) can be liable for RROs where they have knowingly permitted an offence by a tenant-landlord below them in the chain.",
    act: "Renters' Rights Act 2025, s.60",
  },
];

const keyChanges = [
  { change: "Maximum period doubled", before: "12 months", after: "24 months", impact: "Doubles potential recovery per case" },
  { change: "Time limit extended", before: "12 months from offence", after: "24 months from offence", impact: "More time to identify and pursue cases" },
  { change: "New offences added", before: "5 offences", after: "9+ offences", impact: "Much wider scope for RRO applications" },
  { change: "Superior landlords liable", before: "Only direct landlord", after: "Superior landlords included", impact: "Can pursue freeholders and head lessees" },
];

const faqs = [
  {
    q: "What is a rent repayment order?",
    a: "A rent repayment order (RRO) is a First-tier Tribunal order requiring a landlord to repay rent to the tenant or local authority. RROs were introduced by the Housing and Planning Act 2016 and have been significantly expanded by the Renters' Rights Act 2025.",
  },
  {
    q: "Can councils apply for rent repayment orders?",
    a: "Yes. Both tenants and local housing authorities can apply to the First-tier Tribunal for an RRO. Councils can apply where rent has been paid through Housing Benefit or the housing element of Universal Credit. The repaid rent goes to the council.",
  },
  {
    q: "How much can be recovered through an RRO?",
    a: "Under the Renters' Rights Act 2025, the maximum period has been doubled from 12 months to 24 months. The tribunal determines the amount based on the severity of the offence, the landlord's conduct, the tenant's circumstances, and whether the landlord has been convicted of a similar offence previously.",
  },
  {
    q: "Are RROs self-funding for councils?",
    a: "Yes. The recovered rent (where Housing Benefit was paid) goes directly to the local authority. The costs of investigation and tribunal application are typically recovered through the RRO itself or through parallel civil penalty proceedings. Many councils find that RRO enforcement generates net revenue.",
  },
  {
    q: "What evidence is needed for an RRO application?",
    a: "The council needs to prove that a relevant housing offence has been committed and that rent was paid during the period. RenterCheck compiles evidence including licensing records, PRS Database registration status, property compliance data, and rent payment records into a tribunal-ready case file.",
  },
];

export default function RentRepaymentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rentercheck.vercel.app" },
          { "@type": "ListItem", position: 2, name: "For Councils", item: "https://rentercheck.vercel.app/councils" },
          { "@type": "ListItem", position: 3, name: "Rent Repayment Orders" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="bg-slate-50 border-b border-slate-200" aria-label="Breadcrumb">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="hover:text-primary-600 transition-colors">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li><Link href="/councils" className="hover:text-primary-600 transition-colors">For Councils</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-slate-900 font-medium">Rent Repayment Orders</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 border border-primary-500/20 px-4 py-1.5 text-sm font-medium text-primary-300 mb-6">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
              Rent Repayment Orders
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Maximise Rent Repayment Order Recovery
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              The Renters&apos; Rights Act 2025 doubled the maximum RRO period to 24 months and added new offences. RROs are self-funding enforcement. Each case recovers costs and generates revenue.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/councils/demo"
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-500"
              >
                Book a Demo
              </Link>
              <Link
                href="/councils"
                className="inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/20 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/20"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Changed */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            What Changed Under the Renters&apos; Rights Act 2025
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            The RRA 2025 made four significant changes to rent repayment orders, making them a far more powerful enforcement tool for local authorities.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-slate-200 bg-white">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Change</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Before (HPA 2016)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">After (RRA 2025)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Impact</th>
                </tr>
              </thead>
              <tbody>
                {keyChanges.map((row) => (
                  <tr key={row.change} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.change}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.before}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary-600">{row.after}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Existing Offences */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Existing RRO Offences
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            These offences were eligible for RROs under the Housing and Planning Act 2016 and continue to apply.
          </p>

          <div className="space-y-3">
            {existingOffences.map((offence) => (
              <div key={offence} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5">
                <svg className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-slate-700">{offence}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Offences */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            New Offences Added by the Renters&apos; Rights Act 2025
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            The RRA 2025 significantly expands the scope of RROs by adding new offences specific to the reformed tenancy regime.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {newOffences.map((item) => (
              <div
                key={item.offence}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7"
              >
                <h3 className="text-lg font-bold text-slate-900">{item.offence}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{item.desc}</p>
                <p className="mt-3 text-xs font-medium text-primary-600">{item.act}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <RegisterInterestCTA variant="inline" />
        </div>
      </section>

      {/* How RenterCheck Helps */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            How RenterCheck Supports RRO Enforcement
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            End-to-end case management for rent repayment order applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Case Identification",
                desc: "Automated screening identifies properties where an RRO-eligible offence has occurred. Unlicensed HMOs, unregistered PRS Database properties, and banning order breaches are detected through routine compliance screening.",
              },
              {
                title: "Evidence Compilation",
                desc: "All evidence needed for a tribunal application is compiled automatically: licensing records, PRS Database registration status, rent payment records, property compliance data, and landlord communication history.",
              },
              {
                title: "Amount Calculation",
                desc: "RenterCheck calculates the potential RRO amount based on the rent paid during the offence period (up to 24 months), applying tribunal guidance on proportionality and aggravating factors.",
              },
              {
                title: "Outcome Tracking",
                desc: "Track every RRO case from identification through tribunal application to outcome. Monitor success rates, recovery amounts, and average case timelines to optimise your enforcement strategy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all hover:shadow-lg hover:border-primary-200"
              >
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Self-Funding Enforcement
            </h2>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed max-w-3xl">
              Rent repayment orders are one of the few enforcement tools that directly generates revenue for the local authority. Where Housing Benefit or Universal Credit housing element has been paid, the recovered rent goes to the council.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-primary-600">£15,000</p>
                <p className="mt-2 text-sm text-slate-600">Average RRO recovery per case (12 months at typical HB rate)</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-primary-600">£30,000</p>
                <p className="mt-2 text-sm text-slate-600">Potential recovery per case under 24-month maximum (RRA 2025)</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-accent-600">Net positive</p>
                <p className="mt-2 text-sm text-slate-600">Each successful RRO more than covers investigation and tribunal costs</p>
              </div>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              Figures are illustrative. Actual recovery amounts depend on rent levels, offence period, and tribunal determination.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-lg font-semibold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Council Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/councils/hmo-detection", title: "HMO Detection", desc: "Find unlicensed HMOs eligible for RROs" },
              { href: "/councils/selective-licensing", title: "Selective Licensing", desc: "Detect unlicensed properties in designated areas" },
              { href: "/councils/enforcement-tools", title: "Enforcement Software", desc: "Full enforcement platform with case management" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-primary-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">{link.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <RegisterInterestCTA variant="banner" />
    </>
  );
}

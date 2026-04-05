import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "Automated HMO Detection for Local Authorities | RenterCheck",
  description:
    "Find every unlicensed HMO in your borough. Cross-reference council tax, EPC data, and licensing records to detect suspected HMOs. Typical penalty: £17,000 starting amount per unlicensed property.",
  alternates: { canonical: "https://rentercheck.vercel.app/councils/hmo-detection" },
  openGraph: {
    title: "Automated HMO Detection for Local Authorities | RenterCheck",
    description:
      "Automated HMO detection software for councils. Cross-reference data sources to identify unlicensed HMOs and recover civil penalties.",
    url: "https://rentercheck.vercel.app/councils/hmo-detection",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
};

const detectionSignals = [
  {
    title: "Multiple EPC Certificates",
    desc: "Multiple EPC certificates at one address suggest the property has been subdivided into separate letting units, a strong indicator of HMO conversion.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.5a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
      </svg>
    ),
  },
  {
    title: "Council Tax Discrepancy",
    desc: "Single-occupancy council tax discount claimed on a property where EPC and other records suggest multiple occupants. Indicates potential undisclosed multi-occupancy.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    title: "Missing HMO Licence",
    desc: "Property occupied by 5 or more people forming 2 or more households requires a mandatory HMO licence. Occupancy indicators without a corresponding licence triggers detection.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    title: "Property Type Mismatch",
    desc: "A property registered as a single dwelling on council tax but listed as flats or bedsits in EPC records. Suggests conversion without proper licensing.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    title: "High Utility Consumption",
    desc: "Where utility data is available, abnormally high energy consumption relative to the property type can indicate higher occupancy than declared.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Planning Permission Gaps",
    desc: "Change of use from C3 (dwelling) to C4 (HMO) or sui generis (large HMO) requires planning permission. Properties without the correct planning class trigger alerts.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
];

const penalties = [
  { offence: "Operating an unlicensed HMO", penalty: "Unlimited fine (magistrates) or civil penalty up to £30,000", starting: "£17,000" },
  { offence: "Failure to comply with HMO management regulations", penalty: "Fine up to £5,000 per breach", starting: "£2,000" },
  { offence: "Overcrowding in HMO", penalty: "Fine up to £20,000 or civil penalty", starting: "£7,000" },
  { offence: "Failure to comply with improvement notice", penalty: "Unlimited fine or civil penalty up to £30,000", starting: "£10,000" },
];

const faqs = [
  {
    q: "How accurate is automated HMO detection?",
    a: "RenterCheck identifies suspected HMOs based on multiple data signals. Typical hit rates are 40% to 50% of flagged properties confirming as unlicensed HMOs on inspection. This is significantly more efficient than manual door-to-door surveys.",
  },
  {
    q: "What data sources does the detection engine use?",
    a: "The engine cross-references EPC Register data, council tax records (single-occupancy discounts, property bands), licensing databases, planning permission records, and where available, utility consumption data.",
  },
  {
    q: "What happens when a suspected HMO is detected?",
    a: "The property is flagged with a confidence score and the specific signals that triggered detection. It enters your enforcement pipeline for investigation. All evidence is compiled automatically so officers can proceed directly to inspection.",
  },
  {
    q: "Can we use the revenue from HMO penalties to fund the platform?",
    a: "Yes. Civil penalty income from unlicensed HMOs can be retained by the local authority and reinvested in housing enforcement activities, as confirmed by Section 126 of the Housing and Planning Act 2016.",
  },
];

export default function HMODetectionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rentercheck.vercel.app" },
          { "@type": "ListItem", position: 2, name: "For Councils", item: "https://rentercheck.vercel.app/councils" },
          { "@type": "ListItem", position: 3, name: "HMO Detection" },
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
            <li className="text-slate-900 font-medium">HMO Detection</li>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              HMO Detection
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Find Every Unlicensed HMO in Your Borough
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Thousands of unlicensed HMOs operate undetected across England. Manual detection is impossible with small teams. Automated cross-referencing finds them in hours, not years.
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

      {/* The Problem */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                The Hidden HMO Problem
              </h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Government estimates suggest there are over 500,000 HMOs in England, but only a fraction hold the correct licence. In many boroughs, 30% to 50% of HMOs operate without mandatory licensing.
              </p>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Unlicensed HMOs are disproportionately likely to have serious safety hazards: no fire doors, inadequate escape routes, overcrowding, and missing smoke alarms. Tenants in unlicensed HMOs are at significantly higher risk.
              </p>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Manual detection through door-to-door surveys costs councils thousands of pounds per confirmed HMO. Automated cross-referencing reduces detection costs by over 80%.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="space-y-6">
                {[
                  { stat: "500,000+", label: "Estimated HMOs in England" },
                  { stat: "30-50%", label: "Operating without correct licence (typical borough)" },
                  { stat: "£17,000", label: "Starting civil penalty per unlicensed HMO" },
                  { stat: "24 months", label: "Maximum rent repayment order (Renters' Rights Act 2025)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline gap-4">
                    <span className="text-3xl font-extrabold text-primary-600 whitespace-nowrap">{item.stat}</span>
                    <span className="text-slate-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Signals */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Detection Signals
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            RenterCheck analyses six categories of data to identify properties with a high probability of being unlicensed HMOs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {detectionSignals.map((signal) => (
              <div
                key={signal.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:shadow-lg hover:border-primary-200"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  {signal.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{signal.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{signal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens When Detected */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-12">
            What Happens When an HMO Is Detected
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Automated Alert",
                desc: "The property is flagged with a confidence score based on the number and strength of detection signals. High-confidence detections are prioritised for immediate investigation.",
              },
              {
                step: "2",
                title: "Risk Scoring",
                desc: "Each suspected HMO receives a risk score factoring in property age, area deprivation, complaint history, and proximity to other known HMOs. Higher-risk properties are investigated first.",
              },
              {
                step: "3",
                title: "Enforcement Recommendation",
                desc: "RenterCheck generates a recommended enforcement action: inspection, warning letter, or immediate civil penalty notice. All supporting evidence is compiled automatically for the officer.",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{item.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <RegisterInterestCTA variant="inline" />
        </div>
      </section>

      {/* Penalties */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Penalties Councils Can Levy
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            The Housing Act 2004 and Renters&apos; Rights Act 2025 give councils significant penalty powers. Under the RRA 2025, rent repayment orders have been doubled to a maximum of 24 months.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-slate-200 bg-white">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Offence</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Maximum Penalty</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Typical Starting Amount</th>
                </tr>
              </thead>
              <tbody>
                {penalties.map((p) => (
                  <tr key={p.offence} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4 text-sm text-slate-700">{p.offence}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{p.penalty}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-danger-600">{p.starting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 mb-6">
              Case Study Format
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What This Looks Like in Practice
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-5xl font-extrabold text-primary-600">200</p>
                <p className="mt-2 text-slate-600">Suspected unlicensed HMOs identified by RenterCheck in the first quarter</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-primary-600">85</p>
                <p className="mt-2 text-slate-600">Confirmed as unlicensed after officer inspection (42.5% hit rate)</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-danger-600">£1.4M</p>
                <p className="mt-2 text-slate-600">In civil penalties issued, funding the entire enforcement team budget</p>
              </div>
            </div>
            <p className="mt-8 text-sm text-slate-500">
              Illustrative example based on typical borough outcomes. Actual results vary by local authority area and enforcement capacity.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 sm:py-24 bg-slate-50">
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
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Council Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/councils/enforcement-tools", title: "Enforcement Software", desc: "Full enforcement platform with case management" },
              { href: "/councils/selective-licensing", title: "Selective Licensing", desc: "Manage licensing schemes and detect unlicensed properties" },
              { href: "/councils/rent-repayment", title: "Rent Repayment Orders", desc: "Recover up to 24 months rent from unlicensed landlords" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-primary-300 hover:shadow-md"
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

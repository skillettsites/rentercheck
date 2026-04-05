import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "Awaab's Law Compliance Monitoring for Councils | RenterCheck",
  description:
    "Monitor Awaab's Law compliance across your private rented sector. Damp risk screening, tenant complaint tracking, response time monitoring, and structured reporting for council enforcement teams.",
  alternates: { canonical: "https://rentercheck.vercel.app/councils/awaabs-law" },
  openGraph: {
    title: "Awaab's Law Compliance Monitoring for Councils | RenterCheck",
    description:
      "Damp risk screening, response time monitoring, and structured tenant reporting. Ensure your PRS landlords comply with Awaab's Law timescales.",
    url: "https://rentercheck.vercel.app/councils/awaabs-law",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
};

const timescales = [
  {
    category: "Emergency hazards",
    requirement: "Begin remedial action within 24 hours of being notified",
    applies: "Social housing (live). PRS timescales pending consultation.",
  },
  {
    category: "Investigation",
    requirement: "Investigate within 14 calendar days of tenant report",
    applies: "Social housing (live). Expected to apply to PRS.",
  },
  {
    category: "Non-emergency repairs",
    requirement: "Complete repairs within 7 calendar days of investigation",
    applies: "Social housing (live). PRS timescales pending consultation.",
  },
  {
    category: "Complex works",
    requirement: "Begin works within 7 calendar days, complete within reasonable timeframe, provide written schedule",
    applies: "Social housing (live). PRS timescales pending consultation.",
  },
];

const dampRiskFactors = [
  "Solid wall construction (no cavity insulation)",
  "Single glazed windows",
  "Property built before 1945",
  "EPC rating D or below",
  "No mechanical ventilation in bathrooms or kitchens",
  "Flat roof sections",
  "Basement or ground floor flat",
  "North-facing primary elevation",
];

const faqs = [
  {
    q: "What is Awaab's Law?",
    a: "Awaab's Law was introduced following the death of two-year-old Awaab Ishak from prolonged exposure to mould in a social housing property in Rochdale. The law, enacted through the Social Housing (Regulation) Act 2023 and extended by the Renters' Rights Act 2025, sets strict timescales for landlords to investigate and repair damp and mould hazards.",
  },
  {
    q: "Does Awaab's Law apply to private landlords?",
    a: "Yes. The Renters' Rights Act 2025 extends Awaab's Law principles to the private rented sector. Exact timescales for PRS are subject to consultation, but the government has confirmed that private landlords will face equivalent requirements. Social housing timescales (24 hours for emergencies, 14 days for investigation, 7 days for repairs) are expected to serve as the baseline.",
  },
  {
    q: "What happens if a landlord fails to comply?",
    a: "Councils can take enforcement action including improvement notices, prohibition orders, and civil penalties. Under the Renters' Rights Act 2025, tenants can also apply for rent repayment orders of up to 24 months if a landlord fails to address a hazard. Repeated non-compliance can result in banning orders.",
  },
  {
    q: "How does RenterCheck help councils monitor compliance?",
    a: "RenterCheck screens properties for damp risk using EPC data, property age, construction type, and local climate data. When tenants report damp or mould through our reporting tool, the complaint is timestamped and tracked against the required response timescales. Councils can see which landlords are meeting deadlines and which are not.",
  },
  {
    q: "Can tenants report damp and mould through RenterCheck?",
    a: "Yes. Tenants can use the RenterCheck damp checker tool to assess their property and submit a structured report. This report includes property data, photos, and a severity assessment. The data flows directly to the council dashboard with response time tracking activated.",
  },
];

export default function AwaabsLawPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rentercheck.vercel.app" },
          { "@type": "ListItem", position: 2, name: "For Councils", item: "https://rentercheck.vercel.app/councils" },
          { "@type": "ListItem", position: 3, name: "Awaab's Law Compliance" },
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
            <li className="text-slate-900 font-medium">Awaab&apos;s Law Compliance</li>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Awaab&apos;s Law
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Monitor Awaab&apos;s Law Compliance Across Your PRS
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Strict timescales for investigating and repairing damp and mould are coming to the private rented sector. RenterCheck helps councils screen for damp risk and monitor landlord response times.
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

      {/* Background */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The Awaab Ishak Case
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              In December 2020, two-year-old Awaab Ishak died from a respiratory condition caused by prolonged exposure to mould in his family&apos;s social housing flat in Rochdale. His parents had reported the mould repeatedly over several years. The landlord failed to act.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              The coroner&apos;s ruling led directly to Awaab&apos;s Law, first enacted through the Social Housing (Regulation) Act 2023 for social housing. The Renters&apos; Rights Act 2025 extends these protections to the private rented sector, where damp and mould affect an estimated 7% of PRS homes.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Councils are responsible for enforcing compliance. This means monitoring thousands of private landlords against strict timescales for the first time.
            </p>
          </div>
        </div>
      </section>

      {/* Timescales */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Required Timescales
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            Social housing timescales are now live. PRS timescales are subject to consultation but are expected to follow the same framework.
          </p>

          <div className="space-y-4">
            {timescales.map((t) => (
              <div
                key={t.category}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{t.category}</h3>
                    <p className="mt-1 text-slate-700">{t.requirement}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-warning-50 px-3 py-1 text-xs font-semibold text-warning-700 whitespace-nowrap">
                    {t.applies}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How RenterCheck Helps */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-12">
            How RenterCheck Helps
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Damp Risk Screening
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                RenterCheck analyses property characteristics to score damp and mould risk before tenants report problems. Properties scoring in the high-risk category are flagged for proactive engagement with the landlord.
              </p>
              <h4 className="font-semibold text-slate-900 mb-3">Risk factors assessed:</h4>
              <ul className="space-y-2">
                {dampRiskFactors.map((factor) => (
                  <li key={factor} className="flex items-start gap-3 text-sm text-slate-700">
                    <svg className="h-4 w-4 text-warning-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Tenant Complaint Tracking
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                When a tenant reports damp or mould, the clock starts. RenterCheck tracks response times against the required timescales and alerts your team when a landlord is approaching or exceeding the deadline.
              </p>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                {[
                  { label: "Report received", time: "Day 0", color: "bg-primary-500" },
                  { label: "Investigation deadline", time: "Day 14", color: "bg-warning-500" },
                  { label: "Repair deadline", time: "Day 21", color: "bg-danger-500" },
                  { label: "Compliance confirmed", time: "Ongoing", color: "bg-accent-500" },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <div className={`h-3 w-3 rounded-full ${step.color} flex-shrink-0`} />
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-sm text-slate-700">{step.label}</span>
                      <span className="text-sm font-semibold text-slate-900">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <RegisterInterestCTA variant="inline" />
        </div>
      </section>

      {/* Tenant Reporting Integration */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Integration with Tenant Reporting
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            RenterCheck provides tenant-facing tools that feed structured data directly into your council dashboard. No more unstructured emails or phone calls.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                <Link href="/damp-check" className="text-primary-600 hover:text-primary-700 underline">Damp Checker Tool</Link>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Tenants answer structured questions about their property to generate a damp risk assessment. The results include severity classification, affected areas, and photographic evidence. This data flows to your dashboard with the complaint clock already running.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                <Link href="/report-issue" className="text-primary-600 hover:text-primary-700 underline">Report Issue Tool</Link>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Tenants generate formal escalation letters with all required information. The report is sent to the landlord and simultaneously flagged to the council for monitoring. If the landlord fails to respond within the required timescale, the council is automatically notified.
              </p>
            </div>
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
              { href: "/councils/decent-homes", title: "Decent Homes Standard", desc: "Screen properties against all five DHS criteria" },
              { href: "/councils/enforcement-tools", title: "Enforcement Software", desc: "Full enforcement platform with case management" },
              { href: "/councils/rent-repayment", title: "Rent Repayment Orders", desc: "Recover rent when landlords fail to act on hazards" },
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

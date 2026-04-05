import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "PRS Enforcement Software for Council Housing Teams | RenterCheck",
  description:
    "Modern enforcement tools for overstretched council housing teams. Automated compliance screening, risk-based prioritisation, Kanban case management, and real-time reporting for MHCLG returns.",
  alternates: { canonical: "https://rentercheck.vercel.app/councils/enforcement-tools" },
  openGraph: {
    title: "PRS Enforcement Software for Council Housing Teams | RenterCheck",
    description:
      "Automated compliance screening, risk-based prioritisation, and enforcement pipeline management for local authority housing teams.",
    url: "https://rentercheck.vercel.app/councils/enforcement-tools",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
};

const complianceChecks = [
  { name: "EPC Rating", desc: "Valid certificate, minimum E rating (C from 2030)" },
  { name: "Gas Safety", desc: "Annual CP12 certificate on file" },
  { name: "Electrical Safety", desc: "EICR within 5 years, satisfactory result" },
  { name: "Deposit Protection", desc: "Deposit held in approved scheme, prescribed information served" },
  { name: "HMO Licensing", desc: "Mandatory or additional licence where required" },
  { name: "Selective Licensing", desc: "Property licensed if in designated area" },
  { name: "PRS Database Registration", desc: "Landlord registered, property listed (from late 2026)" },
  { name: "Smoke and CO Alarms", desc: "Compliant detectors on every floor" },
];

const metrics = [
  { label: "Properties screened per hour", value: "5,000+" },
  { label: "Average time from detection to first notice", value: "48 hours" },
  { label: "Civil penalty income identified per borough", value: "£1.2M+" },
  { label: "Reduction in manual screening time", value: "85%" },
];

const faqs = [
  {
    q: "How does automated compliance screening work?",
    a: "RenterCheck pulls data from the EPC Register, PRS Database (from late 2026), council licensing records, and deposit protection schemes. Each property is checked against all legal requirements simultaneously, with non-compliant properties flagged automatically.",
  },
  {
    q: "Can it integrate with our existing case management system?",
    a: "Yes. RenterCheck provides a REST API that can feed data into existing council systems such as Uniform, Civica, and M3. We also offer a standalone Kanban-style enforcement pipeline for teams that want to manage cases directly.",
  },
  {
    q: "What reporting is available for MHCLG returns?",
    a: "RenterCheck generates pre-formatted reports covering compliance rates by ward, enforcement actions taken, response times, civil penalties issued, and rent repayment orders pursued. These align with MHCLG reporting requirements.",
  },
  {
    q: "How does risk-based prioritisation work?",
    a: "Each property receives a risk score based on multiple factors: EPC rating, property age, complaint history, area deprivation index, previous enforcement actions, and housing type. Higher-risk properties appear at the top of your enforcement queue.",
  },
];

export default function EnforcementToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rentercheck.vercel.app" },
          { "@type": "ListItem", position: 2, name: "For Councils", item: "https://rentercheck.vercel.app/councils" },
          { "@type": "ListItem", position: 3, name: "Enforcement Tools" },
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
            <li className="text-slate-900 font-medium">Enforcement Tools</li>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              Enforcement Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Modern Enforcement Tools for Overstretched Housing Teams
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              3 to 5 officers covering 10,000+ PRS properties. Legacy systems. Manual processes. There is a better way. RenterCheck automates compliance screening so your team can focus on enforcement.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/councils/demo"
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-500"
              >
                View Dashboard Demo
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

      {/* The Challenge */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The Challenge Facing Every Council
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              England has 4.6 million privately rented homes. Most councils have between 3 and 5 enforcement officers responsible for thousands of PRS properties. Officers spend their time on manual spreadsheet checks, phone calls to verify certificates, and paperwork instead of enforcement.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              The result: only 2% of non-compliant landlords face enforcement action. Rogue landlords operate with near-impunity. Tenants suffer in unsafe housing because the system cannot keep up.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              The Renters&apos; Rights Act 2025 gives councils stronger powers. But without the right tools, those powers remain on paper.
            </p>
          </div>
        </div>
      </section>

      {/* Automated Compliance Screening */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Automated Compliance Screening
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            Bulk-check every PRS property in your authority area against eight key legal requirements. Non-compliant properties are flagged automatically.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceChecks.map((check) => (
              <div
                key={check.name}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <h3 className="font-semibold text-slate-900 text-sm">{check.name}</h3>
                </div>
                <p className="text-xs text-slate-500">{check.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk-Based Prioritisation */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Risk-Based Prioritisation
              </h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Not every non-compliant property needs the same level of attention. RenterCheck scores properties by compliance risk so your team focuses enforcement where it matters most.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "EPC rating and energy performance trends",
                  "Property age and construction type",
                  "Complaint history and repeat offences",
                  "Area deprivation index (IMD 2019)",
                  "Previous enforcement actions and outcomes",
                  "Housing type (flat, HMO, converted dwelling)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <svg className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="font-bold text-slate-900 mb-6">Risk Score Breakdown</h3>
              {[
                { label: "Critical (80-100)", pct: 8, color: "bg-danger-500" },
                { label: "High (60-79)", pct: 15, color: "bg-warning-500" },
                { label: "Medium (40-59)", pct: 24, color: "bg-warning-300" },
                { label: "Low (0-39)", pct: 53, color: "bg-accent-500" },
              ].map((bar) => (
                <div key={bar.label} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">{bar.label}</span>
                    <span className="font-semibold text-slate-900">{bar.pct}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-200">
                    <div className={`h-3 rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                  </div>
                </div>
              ))}
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

      {/* Enforcement Pipeline */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Enforcement Pipeline
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            Kanban-style case management from detection through resolution. Every enforcement case is tracked, timed, and documented.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { stage: "Detection", desc: "Non-compliance identified automatically", count: "142" },
              { stage: "Investigation", desc: "Evidence gathered, landlord contacted", count: "67" },
              { stage: "Notice Served", desc: "Compliance notice or improvement notice issued", count: "34" },
              { stage: "Penalty", desc: "Civil penalty notice or prosecution", count: "18" },
              { stage: "Resolved", desc: "Property brought into compliance", count: "891" },
            ].map((step) => (
              <div key={step.stage} className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-2xl font-extrabold text-primary-600">{step.count}</p>
                <h3 className="mt-2 font-semibold text-slate-900 text-sm">{step.stage}</h3>
                <p className="mt-1 text-xs text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenant Complaint Triage */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Tenant Complaint Triage
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Tenants submit structured reports through RenterCheck&apos;s{" "}
              <Link href="/report-issue" className="text-primary-600 hover:text-primary-700 underline">report tool</Link>{" "}
              and{" "}
              <Link href="/damp-check" className="text-primary-600 hover:text-primary-700 underline">damp checker</Link>.
              Each complaint arrives with property data, compliance status, and evidence already attached. No more sifting through unstructured emails.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Structured complaint forms with photo evidence upload",
                "Automatic property compliance status attached to every complaint",
                "Priority scoring based on hazard severity and tenant vulnerability",
                "Response time tracking for Awaab's Law compliance",
                "Integration with council complaint management systems",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <svg className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Real-Time Reporting for MHCLG Returns
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            Generate the compliance and enforcement data that MHCLG requires without manual data collection. Dashboards update in real time.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{m.value}</p>
                <p className="mt-2 text-sm text-slate-600">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The ROI Is Clear
            </h2>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed max-w-3xl">
              A £500/month platform that identifies over £1.2 million in civil penalty income per year. Each unlicensed HMO penalty starts at £17,000. Each rent repayment order can recover up to 24 months of rent under the Renters&apos; Rights Act 2025.
            </p>
            <p className="mt-4 text-lg text-slate-700 leading-relaxed max-w-3xl">
              Councils using risk-based enforcement typically see a 3x to 5x increase in enforcement output with the same team size. The platform pays for itself within the first month.
            </p>
            <div className="mt-8">
              <Link
                href="/councils/demo"
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-500"
              >
                Book a Demo
              </Link>
            </div>
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
              { href: "/councils/hmo-detection", title: "HMO Detection", desc: "Find every unlicensed HMO in your borough" },
              { href: "/councils/prs-database", title: "PRS Database Integration", desc: "Be ready for the mandatory landlord register" },
              { href: "/councils/rent-repayment", title: "Rent Repayment Orders", desc: "Maximise RRO recovery under new powers" },
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

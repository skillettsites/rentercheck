import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "PRS Database Integration for Local Authorities | RenterCheck",
  description:
    "Be PRS Database ready from day one. Pre-built integration layer for councils, compliance screening, automated alerts, and property data enrichment. Prepare now for the late 2026 launch.",
  alternates: { canonical: "https://rentercheck.vercel.app/councils/prs-database" },
  openGraph: {
    title: "PRS Database Integration for Local Authorities | RenterCheck",
    description:
      "Pre-built PRS Database integration for council housing teams. Compliance screening, automated alerts, and enforcement tools ready for the mandatory landlord register.",
    url: "https://rentercheck.vercel.app/councils/prs-database",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
};

const features = [
  {
    title: "Auto-Flag Unregistered Landlords",
    desc: "Cross-reference known PRS properties against the register. Any property without a registered landlord is flagged for investigation within 24 hours of detection.",
  },
  {
    title: "Compliance Scoring",
    desc: "Every property receives a compliance score based on EPC validity, gas safety certification, deposit protection, licensing status, and PRS Database registration.",
  },
  {
    title: "Bulk Screening",
    desc: "Upload your entire PRS property list and screen thousands of properties in minutes. No more manual checks across multiple spreadsheets and databases.",
  },
  {
    title: "Enforcement Pipeline",
    desc: "Non-compliant properties automatically enter your enforcement workflow. Track from initial detection through investigation, notice, and resolution.",
  },
];

const faqs = [
  {
    q: "When does the PRS Database launch?",
    a: "The government has confirmed a late 2026 launch for the mandatory PRS Database under the Renters' Rights Act 2025. All private landlords in England will be required to register their properties and demonstrate compliance before letting.",
  },
  {
    q: "What data will the PRS Database contain?",
    a: "The register will include landlord identity and contact details, property addresses, EPC ratings, gas safety certificate status, electrical safety records, and compliance with the Decent Homes Standard. Councils will have enforcement access to query the register.",
  },
  {
    q: "How does RenterCheck integrate with the PRS Database?",
    a: "RenterCheck provides a pre-built integration layer that connects with the PRS Database API. We enrich register data with EPC records, local crime statistics, flood risk assessments, and licensing records to give your team a complete compliance picture.",
  },
  {
    q: "Can we start using RenterCheck before the PRS Database launches?",
    a: "Yes. RenterCheck works with existing data sources today: EPC Register, council licensing records, and public property data. When the PRS Database goes live, the integration activates automatically with no migration needed.",
  },
  {
    q: "What are the penalties for landlords who fail to register?",
    a: "Under the Renters' Rights Act 2025, landlords who fail to register on the PRS Database face civil penalties. They will also be unable to use Section 8 grounds to regain possession and cannot serve valid rent increase notices until registered.",
  },
];

export default function PRSDatabasePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rentercheck.vercel.app" },
          { "@type": "ListItem", position: 2, name: "For Councils", item: "https://rentercheck.vercel.app/councils" },
          { "@type": "ListItem", position: 3, name: "PRS Database Integration" },
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
            <li className="text-slate-900 font-medium">PRS Database Integration</li>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
              </svg>
              PRS Database
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Be PRS Database Ready from Day One
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              The mandatory landlord register launches late 2026. Councils have months to prepare. RenterCheck gives you the integration layer, compliance screening, and enforcement tools to be ready before it goes live.
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
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The Clock Is Ticking
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              The Renters&apos; Rights Act 2025 creates a mandatory PRS Database that every private landlord in England must join before they can let a property. The government has confirmed a late 2026 launch date.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Most councils have no existing tools to interface with this register. When it goes live, enforcement teams will need to cross-reference registration data with existing compliance records, identify unregistered landlords, and manage the inevitable surge of enforcement cases.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Building these systems from scratch takes 12 to 18 months. Procurement alone takes 6 months. The time to act is now.
            </p>
          </div>
        </div>
      </section>

      {/* What RenterCheck Provides */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            What RenterCheck Provides
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            A pre-built integration layer that connects your enforcement systems with the PRS Database from launch day. No custom development. No lengthy procurement. Ready to deploy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:shadow-lg hover:border-primary-200"
              >
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-12">
            How It Works: Property Data Enrichment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. PRS Database Sync</h3>
              <p className="mt-2 text-sm text-slate-600">
                RenterCheck connects to the PRS Database API and pulls registration data for every property in your authority area.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Data Enrichment</h3>
              <p className="mt-2 text-sm text-slate-600">
                Each property is enriched with EPC records, crime statistics, flood risk, licensing status, and council tax data to build a complete compliance profile.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Automated Alerts</h3>
              <p className="mt-2 text-sm text-slate-600">
                Non-compliant or unregistered properties trigger alerts to your enforcement team with all the evidence needed to take action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <RegisterInterestCTA variant="inline" />
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
              { href: "/councils/enforcement-tools", title: "Enforcement Software", desc: "Automated compliance screening and case management" },
              { href: "/councils/hmo-detection", title: "HMO Detection", desc: "Find every unlicensed HMO in your borough" },
              { href: "/councils/selective-licensing", title: "Selective Licensing", desc: "Manage your licensing scheme effortlessly" },
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

import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "Selective Licensing Management Software | RenterCheck",
  description:
    "Manage your selective licensing scheme effortlessly. Application tracking, automated compliance checks, renewal reminders, and unlicensed property detection. 60+ active schemes and growing.",
  alternates: { canonical: "https://rentercheck.vercel.app/councils/selective-licensing" },
  openGraph: {
    title: "Selective Licensing Management Software | RenterCheck",
    description:
      "Streamline selective licensing scheme management. Automated application processing, compliance monitoring, renewal tracking, and unlicensed property detection.",
    url: "https://rentercheck.vercel.app/councils/selective-licensing",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
};

const challenges = [
  {
    title: "Application Processing",
    desc: "Thousands of applications arrive in a short window. Manual processing creates bottlenecks, delays, and errors. Incomplete applications require follow-up.",
  },
  {
    title: "Compliance Monitoring",
    desc: "Licensed properties must meet ongoing conditions. Gas safety certificates expire. EPCs lapse. Deposit protection lapses. Manual tracking is unsustainable at scale.",
  },
  {
    title: "Renewal Management",
    desc: "Licences last 5 years maximum. Tracking thousands of renewal dates across overlapping scheme periods requires automated reminders and workflows.",
  },
  {
    title: "Unlicensed Property Detection",
    desc: "The biggest challenge: identifying properties that should be licensed but are not. Without active detection, non-compliant landlords face no consequences.",
  },
];

const features = [
  {
    title: "Application Tracking",
    desc: "Digital application portal with automatic validation. Incomplete applications are flagged immediately. Processing time reduced from weeks to days.",
  },
  {
    title: "Automated Compliance Checks",
    desc: "Continuous monitoring of licence conditions: EPC validity, gas safety certificate expiry, deposit protection status, fire safety compliance.",
  },
  {
    title: "Renewal Reminders",
    desc: "Automated 90-day, 60-day, and 30-day renewal reminders to landlords. Lapsed licences trigger enforcement workflow automatically.",
  },
  {
    title: "Unlicensed Property Detection",
    desc: "Cross-reference known PRS properties against your licence register. Properties without a licence in a designated area are flagged for investigation.",
  },
  {
    title: "Fee Management",
    desc: "Track application fees, late fees, and penalty charges. Generate payment reminders and reconcile against council finance systems.",
  },
  {
    title: "Reporting Dashboard",
    desc: "Real-time overview: total licensed properties, pending applications, lapsed licences, compliance rates by area, enforcement pipeline.",
  },
];

const faqs = [
  {
    q: "What changed for selective licensing in December 2024?",
    a: "Since December 2024, local authorities no longer need Secretary of State approval for selective licensing schemes covering up to 20% of their geographical area or 20% of their PRS stock. This removes a significant barrier and is expected to accelerate the adoption of new schemes.",
  },
  {
    q: "How many selective licensing schemes are currently active?",
    a: "Over 60 selective licensing schemes are currently active across England. With the removal of Secretary of State approval requirements, industry experts expect this number to grow significantly through 2026 and 2027.",
  },
  {
    q: "What penalty can councils issue for unlicensed properties?",
    a: "Operating a property without a required selective licence is a criminal offence. Councils can issue a civil penalty of up to £30,000 per property as an alternative to prosecution. The government's recommended starting amount is £12,000. Landlords also face rent repayment orders of up to 24 months under the Renters' Rights Act 2025.",
  },
  {
    q: "Can RenterCheck manage multiple licensing schemes?",
    a: "Yes. RenterCheck supports multiple overlapping schemes with different geographical boundaries, fee structures, and conditions. This is important for authorities that operate both mandatory HMO licensing and selective licensing simultaneously.",
  },
  {
    q: "How does unlicensed property detection work?",
    a: "RenterCheck cross-references EPC data, council tax records, and PRS Database registration (from late 2026) against your selective licensing register. Properties identified as privately rented within a designated licensing area but without a corresponding licence are flagged for investigation.",
  },
];

export default function SelectiveLicensingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rentercheck.vercel.app" },
          { "@type": "ListItem", position: 2, name: "For Councils", item: "https://rentercheck.vercel.app/councils" },
          { "@type": "ListItem", position: 3, name: "Selective Licensing" },
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
            <li className="text-slate-900 font-medium">Selective Licensing</li>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              Selective Licensing
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Manage Your Selective Licensing Scheme Effortlessly
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Over 60 schemes active and growing rapidly since the removal of Secretary of State approval. RenterCheck handles applications, compliance monitoring, renewals, and enforcement in one platform.
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

      {/* Context */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The Selective Licensing Landscape
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Selective licensing under Part 3 of the Housing Act 2004 allows councils to require all privately rented properties in a designated area to hold a licence. It is one of the most powerful tools available for improving PRS standards.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Since December 2024, councils no longer need Secretary of State approval for schemes covering up to 20% of their geographical area or 20% of their PRS properties. This change is expected to drive rapid growth in the number of active schemes.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Each scheme generates thousands of licence applications, ongoing compliance obligations, and the need to detect properties that should be licensed but are not. Manual management breaks down at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-12">
            The Challenges of Scheme Management
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.title}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <h3 className="text-lg font-bold text-slate-900">{challenge.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How RenterCheck Helps */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            How RenterCheck Helps
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            A single platform for the entire licensing lifecycle: from initial application to renewal, compliance monitoring to enforcement.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all hover:shadow-lg hover:border-primary-200"
              >
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
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

      {/* Fee Recovery */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Fee Recovery and Enforcement Revenue
            </h2>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed max-w-3xl">
              Selective licensing schemes are designed to be self-funding through licence fees. But the real financial opportunity lies in detecting unlicensed properties.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-primary-600">£12,000</p>
                <p className="mt-2 text-slate-600">Government recommended starting penalty for operating without a selective licence</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-primary-600">£30,000</p>
                <p className="mt-2 text-slate-600">Maximum civil penalty per unlicensed property under Part 3 of the Housing Act 2004</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-danger-600">24 months</p>
                <p className="mt-2 text-slate-600">Maximum rent repayment order under the Renters&apos; Rights Act 2025 for operating unlicensed</p>
              </div>
            </div>

            <p className="mt-8 text-slate-600">
              Civil penalty income is retained by the local authority under Section 126 of the Housing and Planning Act 2016 and must be reinvested in housing enforcement activities.
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
              { href: "/councils/hmo-detection", title: "HMO Detection", desc: "Find unlicensed HMOs across your borough" },
              { href: "/councils/enforcement-tools", title: "Enforcement Software", desc: "Full enforcement platform with case management" },
              { href: "/councils/prs-database", title: "PRS Database Integration", desc: "Cross-reference licensing with the landlord register" },
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

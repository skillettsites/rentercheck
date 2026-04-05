import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "Decent Homes Standard Enforcement for Private Rentals | RenterCheck",
  description:
    "Prepare for the Decent Homes Standard in the private rented sector. Screen properties against DHS criteria using EPC data, HHSRS indicators, and damp risk modelling. 20% of PRS homes currently fail.",
  alternates: { canonical: "https://rentercheck.vercel.app/councils/decent-homes" },
  openGraph: {
    title: "Decent Homes Standard Enforcement for Private Rentals | RenterCheck",
    description:
      "The Decent Homes Standard extends to private rentals for the first time. Screen your PRS stock against DHS criteria and prepare for proactive enforcement.",
    url: "https://rentercheck.vercel.app/councils/decent-homes",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
};

const dhsCriteria = [
  {
    title: "1. Free from Category 1 Hazards",
    desc: "The property must be free from serious hazards as assessed under the Housing Health and Safety Rating System (HHSRS). This includes excess cold, falls, fire, damp and mould, electrical safety, and structural collapse.",
    status: "Enforceable now under HHSRS",
  },
  {
    title: "2. In a Reasonable State of Repair",
    desc: "Key building components (roof, windows, external walls, heating, plumbing, electrics) must be in a reasonable state of repair. Components are assessed based on their age and expected lifespan.",
    status: "New requirement for PRS",
  },
  {
    title: "3. Reasonably Modern Facilities",
    desc: "The property must have a kitchen that is 20 years old or less, an adequate bathroom, adequate noise insulation, and adequate size and layout for the household.",
    status: "New requirement for PRS",
  },
  {
    title: "4. Reasonable Degree of Thermal Comfort",
    desc: "The property must have effective insulation and efficient heating. From 2030, all PRS properties must have an EPC rating of C or above. Double glazing and loft insulation are typical requirements.",
    status: "EPC C from 2030",
  },
  {
    title: "5. Minimum Energy Efficiency",
    desc: "Currently minimum EPC E rating required. This rises to EPC C by 2030 under the Domestic Minimum Energy Efficiency Standard (MEES) regulations, with limited exemptions.",
    status: "EPC E now, C from 2030",
  },
];

const timeline = [
  { year: "2025", event: "Renters' Rights Act receives Royal Assent. DHS extended to PRS in principle." },
  { year: "2026", event: "PRS Database launches. Councils gain access to registered landlord data." },
  { year: "2028", event: "Expected consultation on DHS implementation timescales for PRS." },
  { year: "2030", event: "EPC C minimum for new tenancies (MEES regulations). Major compliance milestone." },
  { year: "2033", event: "EPC C minimum for all PRS tenancies (including existing)." },
  { year: "2035", event: "Full Decent Homes Standard enforcement in private rented sector expected." },
];

const faqs = [
  {
    q: "When does the Decent Homes Standard apply to private rentals?",
    a: "The Renters' Rights Act 2025 extends the Decent Homes Standard to the private rented sector for the first time. Full implementation is expected by 2035, but the EPC C requirement takes effect from 2030 for new tenancies and 2033 for all tenancies.",
  },
  {
    q: "What percentage of PRS homes currently fail the Decent Homes Standard?",
    a: "According to the English Housing Survey, approximately 21% of private rented homes do not meet the Decent Homes Standard. That represents roughly 960,000 properties across England that will need improvement before full enforcement begins.",
  },
  {
    q: "How does RenterCheck screen properties against DHS criteria?",
    a: "RenterCheck uses EPC data to assess energy efficiency and thermal comfort, property age and construction type for repair indicators, HHSRS risk modelling for Category 1 hazards, and damp risk scoring based on building characteristics and local climate data.",
  },
  {
    q: "Can councils take action before the 2035 deadline?",
    a: "Yes. Councils can already enforce against Category 1 hazards under HHSRS, which is the first criterion of the DHS. The EPC C requirement from 2030 is separately enforceable under MEES regulations. RenterCheck helps identify properties failing these existing requirements today.",
  },
];

export default function DecentHomesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rentercheck.vercel.app" },
          { "@type": "ListItem", position: 2, name: "For Councils", item: "https://rentercheck.vercel.app/councils" },
          { "@type": "ListItem", position: 3, name: "Decent Homes Standard" },
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
            <li className="text-slate-900 font-medium">Decent Homes Standard</li>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Decent Homes Standard
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Prepare for the Decent Homes Standard in Private Rentals
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              For the first time, the Decent Homes Standard will apply to the private rented sector. Over 960,000 PRS homes currently fail. Start screening now to manage the transition.
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

      {/* What's Changing */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What Is Changing
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              The Decent Homes Standard has governed social housing quality since 2000. The Renters&apos; Rights Act 2025 extends it to the private rented sector for the first time, covering all 4.6 million PRS homes in England.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Local authorities will be responsible for enforcement. This means assessing compliance across thousands of additional properties with the same constrained resources.
            </p>
          </div>
        </div>
      </section>

      {/* Five Criteria */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            The Five DHS Criteria
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            Every private rented property will need to meet all five criteria. Failure on any single criterion means the property does not meet the standard.
          </p>

          <div className="space-y-6">
            {dhsCriteria.map((criterion) => (
              <div
                key={criterion.title}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{criterion.title}</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">{criterion.desc}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 whitespace-nowrap">
                    {criterion.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scale of the Problem */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-12">
            Scale of the Problem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "21%", desc: "Of PRS homes currently fail the Decent Homes Standard (English Housing Survey)" },
              { stat: "960,000", desc: "Approximate number of non-decent private rented homes across England" },
              { stat: "12%", desc: "Of PRS homes have a Category 1 hazard, the most serious classification under HHSRS" },
            ].map((item) => (
              <div
                key={item.stat}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center"
              >
                <p className="text-5xl font-extrabold text-danger-600">{item.stat}</p>
                <p className="mt-4 text-slate-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How RenterCheck Helps */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            How RenterCheck Helps
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-12">
            Screen properties against DHS criteria using data that is available today. Identify properties most likely to fail before tenants complain, before full enforcement begins.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "EPC-Based Energy Screening",
                desc: "Identify all properties below EPC C. Flag properties below EPC E (current minimum). Prioritise properties approaching the 2030 and 2033 deadlines.",
              },
              {
                title: "HHSRS Risk Indicators",
                desc: "Use property age, construction type, and EPC data to estimate Category 1 hazard risk. Older properties with poor energy ratings are highest priority.",
              },
              {
                title: "Damp Risk Modelling",
                desc: "Analyse property characteristics (solid walls, single glazing, no mechanical ventilation) against local climate data to score damp and mould risk.",
              },
              {
                title: "Proactive Enforcement",
                desc: "Do not wait for tenant complaints. Screen your entire PRS stock and identify failing properties proactively. Prioritise by severity and tenant vulnerability.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:shadow-lg hover:border-primary-200"
              >
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
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

      {/* Timeline */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-12">
            Implementation Timeline
          </h2>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-200" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative flex gap-6">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-bold shadow-lg">
                      {item.year.slice(2)}
                    </div>
                  </div>
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5">
                    <p className="font-semibold text-slate-900">{item.year}</p>
                    <p className="mt-1 text-slate-600">{item.event}</p>
                  </div>
                </div>
              ))}
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
              { href: "/councils/awaabs-law", title: "Awaab's Law Compliance", desc: "Monitor damp and mould response times across your PRS" },
              { href: "/councils/enforcement-tools", title: "Enforcement Software", desc: "Full enforcement platform with compliance screening" },
              { href: "/councils/prs-database", title: "PRS Database Integration", desc: "Be ready for the mandatory landlord register" },
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

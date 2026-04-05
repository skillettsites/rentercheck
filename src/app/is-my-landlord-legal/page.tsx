import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "Is My Landlord Legal? Complete Compliance Check for UK Renters",
  description:
    "Check if your landlord is meeting all legal obligations. 10-point compliance checklist covering PRS Database registration, deposit protection, gas safety, EPC, EICR, and more under current UK law.",
  alternates: { canonical: "https://rentercheck.vercel.app/is-my-landlord-legal" },
  openGraph: {
    title: "Is My Landlord Legal? Complete Compliance Check for UK Renters",
    description:
      "10-point compliance checklist for UK landlords. Check deposit protection, gas safety, EPC, EICR, and more.",
    url: "https://rentercheck.vercel.app/is-my-landlord-legal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is My Landlord Legal? Complete Compliance Check for UK Renters",
    description:
      "Check if your landlord is meeting all legal obligations with our 10-point compliance checklist.",
  },
};

const complianceItems = [
  {
    num: 1,
    title: "Register on the PRS Database",
    status: "From late 2026",
    legislation: "Renters' Rights Act 2025, Part 1",
    detail: "Every private landlord in England must register themselves and each property on the PRS Database. Registration must be completed before letting or advertising a property.",
    penalty: "Up to £7,000 (first offence), £40,000 (repeat). Cannot serve possession notices or let property while unregistered.",
  },
  {
    num: 2,
    title: "Protect your deposit within 30 days",
    status: "Current law",
    legislation: "Housing Act 2004, Sections 213-215",
    detail: "The deposit must be placed in a government-approved scheme (DPS, MyDeposits, or TDS) within 30 days. The landlord must provide the tenant with prescribed information about the scheme.",
    penalty: "Penalty of 1-3x the deposit amount. Cannot serve a Section 21 notice (where still applicable) until the deposit is properly protected.",
  },
  {
    num: 3,
    title: "Provide a valid Energy Performance Certificate (EPC)",
    status: "Current law",
    legislation: "Energy Performance of Buildings Regulations 2012; MEES Regulations 2015",
    detail: "An EPC must be provided to tenants before they sign the tenancy agreement. The property must have a minimum rating of E. From 2030, the minimum increases to C for new tenancies.",
    penalty: "Up to £5,000 fine per property. Cannot let a property rated F or G.",
  },
  {
    num: 4,
    title: "Annual gas safety check",
    status: "Current law",
    legislation: "Gas Safety (Installation and Use) Regulations 1998",
    detail: "A Gas Safe registered engineer must inspect all gas appliances, fittings, and flues annually. A copy of the CP12 certificate must be given to existing tenants within 28 days and to new tenants before they move in.",
    penalty: "Unlimited fine and up to 6 months imprisonment. Serious risk to tenant safety.",
  },
  {
    num: 5,
    title: "Electrical safety report (EICR) every 5 years",
    status: "Current law",
    legislation: "Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020",
    detail: "An Electrical Installation Condition Report must be carried out by a qualified electrician at least every 5 years. A copy must be given to tenants within 28 days of the inspection.",
    penalty: "Up to £30,000 fine. Local authority can arrange remedial works and recover costs.",
  },
  {
    num: 6,
    title: "Provide the How to Rent guide",
    status: "Current law",
    legislation: "Deregulation Act 2015, Section 21B",
    detail: "The current version of the government's How to Rent guide must be provided to tenants at the start of each tenancy. It must be the version current at the time, not an outdated copy.",
    penalty: "Cannot serve a valid Section 21 notice (where still applicable) without providing it.",
  },
  {
    num: 7,
    title: "Smoke alarms on every floor",
    status: "Current law",
    legislation: "Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022",
    detail: "At least one smoke alarm must be installed on every storey of the property where there is a room used as living accommodation. Alarms must be tested on the day each new tenancy begins.",
    penalty: "Up to £5,000 fine.",
  },
  {
    num: 8,
    title: "Carbon monoxide (CO) alarms where needed",
    status: "Current law",
    legislation: "Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022",
    detail: "A CO alarm must be installed in any room containing a fixed combustion appliance (excluding gas cookers). This includes rooms with gas boilers, wood burners, and open fires.",
    penalty: "Up to £5,000 fine.",
  },
  {
    num: 9,
    title: "Join the PRS Ombudsman",
    status: "From 2028",
    legislation: "Renters' Rights Act 2025, Part 3",
    detail: "All private landlords must join the new Private Rented Sector Ombudsman when it launches (expected 2028). This gives tenants a free, independent complaints resolution service.",
    penalty: "Civil penalty. Cannot serve valid possession notices without membership.",
  },
  {
    num: 10,
    title: "Meet the Decent Homes Standard",
    status: "From 2035",
    legislation: "Renters' Rights Act 2025, extending Housing Act 2004",
    detail: "The Decent Homes Standard, previously only applicable to social housing, will be extended to the private rented sector. Properties must be free from serious hazards, in reasonable repair, have reasonably modern facilities, and provide adequate thermal comfort.",
    penalty: "Enforcement notices, civil penalties, improvement notices, prohibition orders.",
  },
];

const penaltiesData = [
  { offence: "Failure to register on PRS Database", fine: "Up to £7,000 / £40,000", other: "Cannot let or evict" },
  { offence: "No gas safety certificate", fine: "Unlimited", other: "Up to 6 months prison" },
  { offence: "No valid EPC", fine: "Up to £5,000", other: "Cannot let F/G rated properties" },
  { offence: "No EICR", fine: "Up to £30,000", other: "Council can do remedial works" },
  { offence: "Deposit not protected", fine: "1-3x deposit amount", other: "Cannot serve Section 21" },
  { offence: "No smoke/CO alarms", fine: "Up to £5,000", other: "Per offence" },
  { offence: "Illegal eviction", fine: "Unlimited", other: "Criminal offence, up to 2 years prison" },
  { offence: "Harassment of tenant", fine: "Unlimited", other: "Criminal offence" },
  { offence: "Rent repayment order", fine: "Up to 24 months' rent", other: "Tribunal can award to tenant" },
  { offence: "Bidding wars / above-advertised rent", fine: "Up to £7,000", other: "New offence under RRA 2025" },
];

const faqItems = [
  {
    question: "How do I know if my landlord has a valid gas safety certificate?",
    answer:
      "Your landlord must give you a copy of the gas safety certificate (CP12) within 28 days of the annual inspection, or before you move in. If you have not received one, ask your landlord in writing. If they refuse or do not respond, contact your local council's environmental health team.",
  },
  {
    question: "My landlord has not protected my deposit. What can I do?",
    answer:
      "If your deposit is not protected in an approved scheme within 30 days, you can apply to the county court. The court can order your landlord to protect it and pay you compensation of 1-3 times the deposit amount. Your landlord also cannot serve a valid Section 21 notice until the deposit is properly protected.",
  },
  {
    question: "Can my landlord evict me for reporting them to the council?",
    answer:
      "No. Under Section 33 of the Deregulation Act 2015, a Section 21 notice is invalid if it is served within 6 months of a council improvement notice or emergency remedial action. From May 2026 when Section 21 is abolished, your landlord will need to prove specific grounds under the reformed Section 8 process, making retaliatory eviction even harder.",
  },
  {
    question: "What is the difference between this page and the landlord compliance checker?",
    answer:
      "This page is an informational guide explaining all 10 legal requirements your landlord must meet. The landlord compliance checker at /landlord-check is an interactive tool where you answer questions about your specific situation and get a personalised compliance report.",
  },
  {
    question: "Do these rules apply to lodgers or live-in landlords?",
    answer:
      "Most of these rules apply to assured shorthold tenancies (ASTs) and the new periodic tenancies under the Renters' Rights Act 2025. If you are a lodger (sharing a property with your landlord), some protections are different. Gas safety and smoke alarm requirements still apply, but deposit protection rules may not. Check your specific situation with Citizens Advice.",
  },
];

export default function IsMyLandlordLegalPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rentercheck.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Is My Landlord Legal?",
        item: "https://rentercheck.vercel.app/is-my-landlord-legal",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 pt-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-slate-500">
          <li>
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-800 font-medium">Is My Landlord Legal?</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white mt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Is My Landlord Breaking the Law?
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-primary-100 leading-relaxed">
            Every landlord in England must meet at least 10 legal requirements.
            Here is the complete checklist, with legislation references and penalties.
          </p>
          <div className="mt-8">
            <Link
              href="/landlord-check"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-accent-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Check Your Landlord Now
            </Link>
          </div>
        </div>
      </section>

      {/* 10 Things Every Legal Landlord Must Do */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">10 Things Every Legal Landlord Must Do</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            If your landlord is not doing all of these, they may be breaking the law.
            Each requirement is backed by specific legislation.
          </p>
          <div className="mt-10 space-y-6">
            {complianceItems.map((item) => (
              <div key={item.num} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                    {item.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          item.status === "Current law"
                            ? "bg-accent-100 text-accent-800"
                            : "bg-primary-100 text-primary-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{item.legislation}</p>
                    <p className="mt-3 text-sm text-slate-700 leading-relaxed">{item.detail}</p>
                    <div className="mt-3 rounded-lg bg-danger-50 border border-danger-100 px-4 py-2.5">
                      <p className="text-sm text-danger-700">
                        <span className="font-semibold">Penalty:</span> {item.penalty}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penalties Table */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Penalties at a Glance</h2>
          <p className="mt-4 text-slate-600">
            A summary of the fines and consequences landlords face for non-compliance:
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-900">Offence</th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-900">Maximum Fine</th>
                  <th className="py-3 text-sm font-semibold text-slate-900">Other Consequences</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {penaltiesData.map((row, i) => (
                  <tr key={i}>
                    <td className="py-3 pr-4 text-sm font-medium text-slate-800">{row.offence}</td>
                    <td className="py-3 pr-4 text-sm text-danger-600 font-semibold">{row.fine}</td>
                    <td className="py-3 text-sm text-slate-600">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to check now */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Check Your Landlord Now</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Use our interactive compliance checker to answer questions about your
            specific situation. You will get a personalised report showing which
            requirements your landlord is meeting and which they are not.
          </p>
          <div className="mt-8">
            <Link
              href="/landlord-check"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary-700 transition-colors"
            >
              Start Compliance Check
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* What to do if non-compliant */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">What to Do if Your Landlord Is Non-Compliant</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                step: "1",
                title: "Document everything",
                desc: "Take photos, save emails, keep copies of all correspondence. Note dates when you reported issues and any responses received. This evidence is essential for any future complaint or tribunal claim.",
              },
              {
                step: "2",
                title: "Write to your landlord",
                desc: "Put your concerns in writing (email is fine). Clearly state which legal requirements are not being met and reference the specific legislation. Give them a reasonable deadline to respond (14 days is standard).",
              },
              {
                step: "3",
                title: "Report to your local council",
                desc: "Contact your council's environmental health or private sector housing team. They have the power to inspect the property, issue improvement notices, and levy civil penalties. You can find your council at GOV.UK.",
              },
              {
                step: "4",
                title: "Apply to the First-tier Tribunal",
                desc: "For deposit protection issues and rent repayment orders, you can apply directly to the Property Chamber of the First-tier Tribunal. For rent repayment orders, you can claim up to 24 months' rent if your landlord has committed a relevant offence.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/report-issue"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              Generate escalation letters with our report tool
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* New rights under RRA 2025 */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">New Rights Under the Renters&apos; Rights Act 2025</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            From 1 May 2026, tenants in England gain significant new protections:
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Section 21 abolished", desc: "No more no-fault evictions. Landlords must prove specific grounds to end a tenancy." },
              { title: "Rent increases limited", desc: "Maximum once per year via Section 13 only. Tenants can challenge at tribunal." },
              { title: "Bidding wars banned", desc: "Cannot request or accept rent above the advertised amount. £7,000 fine." },
              { title: "Right to request pets", desc: "Landlords must respond within 28 days and cannot unreasonably refuse." },
              { title: "Discrimination banned", desc: "No blanket bans on benefits claimants or families with children. £7,000 fine." },
              { title: "Rent in advance capped", desc: "Maximum one month's rent in advance. No more demanding 6 months upfront." },
              { title: "PRS Ombudsman", desc: "Free, independent complaints resolution. All landlords must join from 2028." },
              { title: "Rent repayment orders doubled", desc: "Maximum increased from 12 to 24 months' rent for qualifying offences." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Read the full guide:{" "}
            <Link href="/renters-rights-act" className="text-primary-600 font-medium hover:text-primary-700 underline">
              Renters&apos; Rights Act 2025: Complete Guide
            </Link>
          </p>
        </div>
      </section>

      {/* Register Interest CTA */}
      <RegisterInterestCTA variant="banner" />

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-warning-200 bg-warning-50 p-6 text-sm text-warning-800 leading-relaxed">
            <p className="font-semibold mb-2">Important Disclaimer</p>
            <p>
              This page provides general information about landlord legal obligations in
              England based on current and upcoming legislation. It is not legal advice.
              Laws differ in Scotland, Wales, and Northern Ireland. Some dates
              (particularly for the PRS Database and Ombudsman) are estimates based on
              government statements and may change. If you need help with a specific
              situation, contact{" "}
              <a
                href="https://www.shelter.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:text-warning-900"
              >
                Shelter
              </a>{" "}
              (0808 800 4444) or{" "}
              <a
                href="https://www.citizensadvice.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:text-warning-900"
              >
                Citizens Advice
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

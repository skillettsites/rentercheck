import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "Renters' Rights Act 2025 | Complete Guide for UK Tenants",
  description:
    "Complete guide to the Renters' Rights Act 2025. Section 21 abolished, rent increase limits, bidding wars banned, pet rights, PRS Database, Ombudsman, Decent Homes Standard, and Awaab's Law explained for tenants.",
  alternates: { canonical: "https://rentercheck.vercel.app/renters-rights-act" },
  openGraph: {
    title: "Renters' Rights Act 2025 | Complete Guide for UK Tenants",
    description:
      "Everything tenants need to know about the Renters' Rights Act 2025. Section 21 abolished, rent limits, pet rights, PRS Database, and more.",
    url: "https://rentercheck.vercel.app/renters-rights-act",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renters' Rights Act 2025 | Complete Guide for UK Tenants",
    description:
      "The definitive tenant guide to the Renters' Rights Act 2025. All changes, dates, and what they mean for you.",
  },
};

const timelineEvents = [
  { date: "27 October 2025", title: "Royal Assent", desc: "Renters' Rights Act 2025 (c.26) receives Royal Assent.", done: true },
  { date: "1 May 2026", title: "Section 21 abolished", desc: "No-fault evictions end. All tenancies become periodic. Reformed Section 8 grounds take effect. Bidding wars banned. Discrimination bans enforced.", done: false },
  { date: "Late 2026", title: "PRS Database launches", desc: "Regional rollout of the mandatory landlord register begins.", done: false },
  { date: "2027-2028", title: "PRS Database: full coverage", desc: "All private landlords in England must be registered.", done: false },
  { date: "2028", title: "PRS Ombudsman launches", desc: "All landlords must join. Tenants gain free complaints service.", done: false },
  { date: "2030", title: "EPC minimum C for new tenancies", desc: "New tenancies require minimum EPC rating of C (currently E).", done: false },
  { date: "2035", title: "Decent Homes Standard", desc: "Private rented properties must meet the Decent Homes Standard.", done: false },
];

const section8Grounds = [
  { ground: "Ground 1", type: "Mandatory", desc: "Landlord or family member wishes to live in the property", notice: "4 months" },
  { ground: "Ground 1A", type: "Mandatory", desc: "Landlord wishes to sell the property", notice: "4 months" },
  { ground: "Ground 2", type: "Mandatory", desc: "Mortgage lender requires possession", notice: "2 months" },
  { ground: "Ground 6", type: "Mandatory", desc: "Substantial works needed (redevelopment)", notice: "4 months" },
  { ground: "Ground 6A", type: "Mandatory", desc: "Superior lease ending", notice: "2 months" },
  { ground: "Ground 8", type: "Mandatory", desc: "Serious rent arrears (3+ months)", notice: "4 weeks" },
  { ground: "Ground 8A", type: "Mandatory", desc: "Repeated rent arrears (3 times in 3 years)", notice: "4 weeks" },
  { ground: "Ground 10", type: "Discretionary", desc: "Some rent arrears at notice and hearing date", notice: "2 weeks" },
  { ground: "Ground 11", type: "Discretionary", desc: "Persistent delay in paying rent", notice: "2 weeks" },
  { ground: "Ground 12", type: "Discretionary", desc: "Breach of tenancy terms (other than rent)", notice: "2 weeks" },
  { ground: "Ground 14", type: "Discretionary", desc: "Anti-social behaviour or criminal activity", notice: "Immediate" },
  { ground: "Ground 14A", type: "Mandatory", desc: "Domestic abuse (perpetrator)", notice: "2 weeks" },
];

const civilPenalties = [
  { offence: "Failure to register on PRS Database", penalty: "£7,000 (first), £40,000 (repeat)" },
  { offence: "Illegal eviction or harassment", penalty: "Unlimited fine, up to 2 years prison" },
  { offence: "Bidding wars (above advertised rent)", penalty: "Up to £7,000" },
  { offence: "Discrimination (DSS/children bans)", penalty: "Up to £7,000" },
  { offence: "Excessive rent in advance (over 1 month)", penalty: "Up to £7,000" },
  { offence: "Failure to join Ombudsman (from 2028)", penalty: "Civil penalty, cannot evict" },
  { offence: "No gas safety certificate", penalty: "Unlimited fine, 6 months prison" },
  { offence: "No EICR", penalty: "Up to £30,000" },
  { offence: "No EPC provided", penalty: "Up to £5,000" },
  { offence: "Deposit not protected", penalty: "1-3x deposit amount" },
  { offence: "No smoke/CO alarms", penalty: "Up to £5,000" },
  { offence: "Providing false information to PRS Database", penalty: "Up to £40,000" },
];

const faqItems = [
  {
    question: "When does the Renters' Rights Act 2025 come into effect?",
    answer:
      "The Act received Royal Assent on 27 October 2025. The main provisions, including the abolition of Section 21 and the bans on bidding wars and discrimination, take effect on 1 May 2026. The PRS Database begins regional rollout in late 2026. The Ombudsman launches in 2028.",
  },
  {
    question: "Does the Renters' Rights Act apply to me if I'm already in a tenancy?",
    answer:
      "Yes. From 1 May 2026, all existing assured shorthold tenancies in England automatically convert to periodic tenancies. Your landlord can no longer end your tenancy with a Section 21 notice, even if your fixed term has expired.",
  },
  {
    question: "Can my landlord still evict me after Section 21 is abolished?",
    answer:
      "Yes, but only using the reformed Section 8 grounds. These require a specific, proven reason such as serious rent arrears, anti-social behaviour, the landlord wanting to sell or move in, or the need for substantial works. The notice periods and grounds are set out in the Act.",
  },
  {
    question: "What if my landlord asks for more than one month's rent in advance?",
    answer:
      "From 1 May 2026, landlords cannot request or accept more than one month's rent in advance. If they do, they commit an offence carrying a fine of up to £7,000. This applies regardless of the tenant's circumstances or immigration status.",
  },
  {
    question: "Can my landlord refuse to let me have a pet?",
    answer:
      "From 1 May 2026, tenants have the right to request a pet. Landlords must respond within 28 days and cannot unreasonably refuse. If they do refuse, the tenant can challenge the decision. Landlords can require the tenant to have pet insurance to cover any potential damage.",
  },
  {
    question: "What is the PRS Ombudsman and when does it start?",
    answer:
      "The PRS Ombudsman is a new, independent complaints resolution service for private renters. All landlords will be required to join when it launches, expected in 2028. Tenants will be able to make complaints about their landlord for free, and the Ombudsman can order remedies including compensation.",
  },
  {
    question: "Does the Act apply in Scotland, Wales, and Northern Ireland?",
    answer:
      "No. The Renters' Rights Act 2025 applies to England only. Scotland has its own legislation (Private Housing Tenancies Act 2016). Wales is developing its own Renting Homes reforms. Northern Ireland has separate tenancy legislation.",
  },
  {
    question: "Can my landlord increase my rent by any amount they want?",
    answer:
      "No. From 1 May 2026, rent increases are limited to once per year and must be proposed via a Section 13 notice. The tenant can challenge any increase at the First-tier Tribunal, which will determine the market rent for the property. Landlords cannot include rent review clauses in tenancy agreements.",
  },
  {
    question: "What is Awaab's Law and does it apply to private rentals?",
    answer:
      "Awaab's Law was originally introduced for social housing following the death of two-year-old Awaab Ishak from mould exposure. The Renters' Rights Act 2025 extends these requirements to the private rented sector. Landlords will be required to investigate reported hazards within 14 days, begin remedial works within a further 7 days, and complete emergency repairs within 24 hours.",
  },
  {
    question: "Where can I get free legal help as a tenant?",
    answer:
      "Shelter (0808 800 4444) provides free housing advice. Citizens Advice offers free, confidential guidance on tenant rights. Your local council's environmental health team can investigate housing conditions. The Leasehold Advisory Service (LEASE) helps with leasehold and commonhold queries. For tribunal claims, you may be eligible for legal aid depending on your income.",
  },
];

export default function RentersRightsActPage() {
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
        name: "Renters' Rights Act 2025",
        item: "https://rentercheck.vercel.app/renters-rights-act",
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
          <li className="text-slate-800 font-medium">Renters&apos; Rights Act 2025</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white mt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <p className="text-sm font-medium text-primary-200 uppercase tracking-wider">Complete Guide</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Renters&apos; Rights Act 2025
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-primary-100 leading-relaxed">
            The biggest change to tenant rights in a generation. Section 21 gone, rent
            increases limited, bidding wars banned, pet rights established, and a
            mandatory landlord register created. Here is everything you need to know.
          </p>
          <p className="mt-3 text-sm text-primary-300">
            Royal Assent: 27 October 2025 &bull; Main provisions from 1 May 2026
          </p>
        </div>
      </section>

      {/* Key Dates Timeline */}
      <section className="py-16 sm:py-20" id="timeline">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Key Dates Timeline</h2>
          <p className="mt-4 text-slate-600 text-center max-w-2xl mx-auto">
            The Act&apos;s provisions are being phased in over several years. Here are
            the dates that matter most for tenants.
          </p>
          <div className="mt-10 relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2" />
            {timelineEvents.map((event, i) => (
              <div
                key={event.date}
                className={`relative pl-12 sm:pl-0 pb-10 last:pb-0 ${
                  i % 2 === 0 ? "sm:pr-[calc(50%+2rem)] sm:text-right" : "sm:pl-[calc(50%+2rem)]"
                }`}
              >
                <div
                  className={`absolute left-4 sm:left-1/2 top-1 h-4 w-4 rounded-full border-2 -translate-x-1/2 ${
                    event.done
                      ? "bg-accent-500 border-accent-500"
                      : "bg-white border-primary-400"
                  }`}
                />
                <p className="text-sm font-semibold text-primary-600">{event.date}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{event.title}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 21 Abolished */}
      <section className="py-16 sm:py-20 bg-white" id="section-21">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Section 21 Abolished: No More No-Fault Evictions</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              From <strong>1 May 2026</strong>, Section 21 of the Housing Act 1988 is
              repealed. This means landlords can no longer end a tenancy without giving
              a reason. All existing assured shorthold tenancies (ASTs) automatically
              convert to periodic tenancies.
            </p>
            <p>
              Instead, landlords must use <strong>reformed Section 8 grounds</strong> to
              end a tenancy. These grounds are divided into mandatory grounds (where the
              court must grant possession if proved) and discretionary grounds (where the
              court decides whether possession is reasonable).
            </p>
          </div>

          <h3 className="mt-10 text-xl font-bold text-slate-900">Reformed Section 8 Grounds</h3>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 pr-3 text-sm font-semibold text-slate-900">Ground</th>
                  <th className="py-3 pr-3 text-sm font-semibold text-slate-900">Type</th>
                  <th className="py-3 pr-3 text-sm font-semibold text-slate-900">Reason</th>
                  <th className="py-3 text-sm font-semibold text-slate-900">Notice Period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {section8Grounds.map((row) => (
                  <tr key={row.ground}>
                    <td className="py-3 pr-3 text-sm font-medium text-slate-800">{row.ground}</td>
                    <td className="py-3 pr-3 text-sm">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.type === "Mandatory"
                            ? "bg-danger-100 text-danger-700"
                            : "bg-warning-100 text-warning-700"
                        }`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-sm text-slate-600">{row.desc}</td>
                    <td className="py-3 text-sm text-slate-600">{row.notice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Note: Landlords cannot use Ground 1 (moving in) or Ground 1A (selling) during
            the first 12 months of a tenancy.
          </p>
        </div>
      </section>

      {/* Rent Increase Limits */}
      <section className="py-16 sm:py-20" id="rent-increases">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Rent Increase Limits</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              The Act introduces strict controls on how and when landlords can increase rent:
            </p>
            <ul className="space-y-3 ml-1">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Maximum once per year.</strong> Landlords can only propose one rent increase in any 12-month period.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Section 13 only.</strong> All rent increases must be proposed via a formal Section 13 notice. Rent review clauses in tenancy agreements are void.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Two months&apos; notice.</strong> The landlord must give at least two months&apos; notice of the proposed increase.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Tribunal challenge.</strong> Tenants can challenge any proposed increase at the First-tier Tribunal, which will determine the open market rent for the property. The tribunal cannot set a rent higher than the landlord proposed.</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 rounded-xl border border-primary-200 bg-primary-50 p-5">
            <p className="text-sm text-primary-800">
              <strong>Key point:</strong> The Act does not impose a rent cap. The tribunal
              assesses the open market rent. However, the once-per-year limit and the
              ability to challenge prevent excessive or frequent increases.
            </p>
          </div>
        </div>
      </section>

      {/* Bidding Wars Banned */}
      <section className="py-16 sm:py-20 bg-white" id="bidding-wars">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Bidding Wars Banned</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              From 1 May 2026, landlords and letting agents commit an offence if they:
            </p>
            <ul className="space-y-3 ml-1">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-400" />
                <span>Invite or encourage a tenant to offer rent above the advertised amount</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-400" />
                <span>Accept rent above the advertised amount from a prospective tenant</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-400" />
                <span>Create an auction or competitive process for the tenancy</span>
              </li>
            </ul>
            <p>
              The penalty is a civil fine of <strong>up to £7,000</strong>. This tackles the
              practice of landlords pitting prospective tenants against each other to drive
              up rents, which was widespread in high-demand areas.
            </p>
          </div>
        </div>
      </section>

      {/* Pet Rights */}
      <section className="py-16 sm:py-20" id="pets">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Right to Request a Pet</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              The Act creates a formal right for tenants to request permission to keep a pet.
              The process works as follows:
            </p>
            <ul className="space-y-3 ml-1">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span>The tenant submits a written request to the landlord</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span>The landlord must respond within <strong>28 days</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span>The landlord <strong>cannot unreasonably refuse</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span>The landlord can require the tenant to have <strong>pet insurance</strong> to cover potential damage</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span>If consent is refused without a reasonable ground, the tenant can challenge through the Ombudsman (from 2028) or the courts</span>
              </li>
            </ul>
            <p>
              Reasonable grounds for refusal might include a property with no outdoor space
              for a large dog, or a lease that prohibits pets in the building. A blanket
              &quot;no pets&quot; policy will not be considered reasonable.
            </p>
          </div>
        </div>
      </section>

      {/* Discrimination Ban */}
      <section className="py-16 sm:py-20 bg-white" id="discrimination">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Discrimination Ban: No DSS, No Children Policies Illegal</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              From 1 May 2026, it is a criminal offence for landlords or letting agents to:
            </p>
            <ul className="space-y-3 ml-1">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-400" />
                <span>Advertise with blanket bans on benefits claimants (&quot;No DSS&quot;, &quot;No Housing Benefit&quot;, &quot;Working professionals only&quot;)</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-400" />
                <span>Refuse to let to someone solely because they receive benefits</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-400" />
                <span>Advertise with blanket bans on families with children</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-400" />
                <span>Refuse to let to someone solely because they have children</span>
              </li>
            </ul>
            <p>
              The penalty is a civil fine of <strong>up to £7,000</strong>. This builds on
              existing case law (including the landmark Equality Act 2010 rulings) by
              placing the prohibition directly into statute.
            </p>
          </div>
        </div>
      </section>

      {/* Rent in Advance Cap */}
      <section className="py-16 sm:py-20" id="rent-advance">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Rent in Advance Capped at One Month</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              From 1 May 2026, landlords cannot request or accept more than <strong>one
              month&apos;s rent in advance</strong>. This applies regardless of the tenant&apos;s
              circumstances.
            </p>
            <p>
              Previously, some landlords demanded 3, 6, or even 12 months upfront,
              particularly from tenants with guarantor issues, non-UK credit histories, or
              irregular income. This effectively priced out many renters, especially
              international students and self-employed workers.
            </p>
            <p>
              The penalty for demanding excessive rent in advance is a civil fine of{" "}
              <strong>up to £7,000</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* PRS Database */}
      <section className="py-16 sm:py-20 bg-white" id="prs-database">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">PRS Database: Mandatory Landlord Register</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              The Act creates a <strong>mandatory, publicly accessible register</strong> of
              all private landlords in England. The PRS Database replaces the Database of
              Rogue Landlords and requires every landlord to register themselves and each
              of their rental properties.
            </p>
            <p>
              Tenants will be able to search the database by postcode or landlord name to
              verify registration status, compliance history, and enforcement actions before
              signing a tenancy agreement.
            </p>
            <p>
              The database begins a <strong>regional rollout in late 2026</strong>, with
              full national coverage expected by 2027-2028.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/prs-database"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              Read the full PRS Database guide
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Ombudsman */}
      <section className="py-16 sm:py-20" id="ombudsman">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">New PRS Ombudsman</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              The Act creates a <strong>mandatory Private Rented Sector Ombudsman</strong>,
              expected to launch in <strong>2028</strong>. All private landlords will be
              required to join.
            </p>
            <p>Key features of the Ombudsman service:</p>
            <ul className="space-y-3 ml-1">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Free for tenants.</strong> No cost to make a complaint.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Binding decisions.</strong> The Ombudsman can order remedies including apologies, repairs, and compensation.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Independent.</strong> Not controlled by the government or landlord groups.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Faster than courts.</strong> Designed to resolve disputes without the cost and delay of tribunal proceedings.</span>
              </li>
            </ul>
            <p>
              Landlords who fail to join the Ombudsman face civil penalties and cannot
              serve valid possession notices.
            </p>
          </div>
        </div>
      </section>

      {/* Decent Homes Standard */}
      <section className="py-16 sm:py-20 bg-white" id="decent-homes">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Decent Homes Standard Extended to Private Rentals</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              The Decent Homes Standard has applied to social housing since 2000 but has
              never applied to the private rented sector. The Renters&apos; Rights Act 2025
              changes that.
            </p>
            <p>
              From <strong>2035</strong>, all private rented properties in England must meet
              four criteria:
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Free from serious hazards", desc: "No Category 1 hazards under the Housing Health and Safety Rating System (HHSRS)" },
                { title: "In reasonable repair", desc: "The structure and exterior, and key building services, must be in reasonable condition" },
                { title: "Reasonably modern facilities", desc: "Kitchen, bathroom, and common areas must have reasonably modern fittings" },
                { title: "Adequate thermal comfort", desc: "Effective insulation and efficient heating throughout the property" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awaab's Law */}
      <section className="py-16 sm:py-20" id="awaabs-law">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Awaab&apos;s Law Extended to Private Rentals</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Awaab&apos;s Law was introduced following the death of two-year-old Awaab Ishak
              in December 2020, caused by prolonged exposure to mould in a social housing
              flat in Rochdale. The original law set strict timescales for social landlords
              to deal with damp and mould.
            </p>
            <p>
              The Renters&apos; Rights Act 2025 extends these requirements to the private
              rented sector. Private landlords will be required to:
            </p>
            <ul className="space-y-3 ml-1">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Investigate</strong> reported hazards (damp, mould, and other risks) within <strong>14 days</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Begin repairs</strong> within a further <strong>7 days</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span><strong>Complete emergency repairs</strong> (where there is a risk to life) within <strong>24 hours</strong></span>
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <Link
              href="/damp-check"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              Check your property for damp and mould risk
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Rent Repayment Orders */}
      <section className="py-16 sm:py-20 bg-white" id="rent-repayment">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Rent Repayment Orders Doubled to 24 Months</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Rent repayment orders (RROs) allow tenants to reclaim rent paid to a landlord
              who has committed certain offences. The Renters&apos; Rights Act 2025 doubles the
              maximum period from 12 months to <strong>24 months</strong>.
            </p>
            <p>
              Qualifying offences include:
            </p>
            <ul className="space-y-3 ml-1">
              {[
                "Failure to register on the PRS Database",
                "Failure to obtain an HMO licence where required",
                "Illegal eviction or harassment",
                "Failure to comply with an improvement notice",
                "Failure to comply with a prohibition order",
                "Using violence to secure entry (Criminal Law Act 1977)",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              To apply for an RRO, you apply to the First-tier Tribunal (Property Chamber).
              You do not need a solicitor, and the application fee is modest.
            </p>
          </div>
        </div>
      </section>

      {/* Civil Penalties Summary Table */}
      <section className="py-16 sm:py-20" id="penalties">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Civil Penalties Summary</h2>
          <p className="mt-4 text-slate-600">
            A complete summary of the key fines and penalties under the Renters&apos; Rights
            Act 2025 and related housing legislation:
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-900">Offence</th>
                  <th className="py-3 text-sm font-semibold text-slate-900">Maximum Penalty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {civilPenalties.map((row, i) => (
                  <tr key={i}>
                    <td className="py-3 pr-4 text-sm font-medium text-slate-800">{row.offence}</td>
                    <td className="py-3 text-sm text-danger-600 font-semibold">{row.penalty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What to do now */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">What You Can Do Now</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Use these free tools to check your rental property and understand your rights:
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/check", title: "Property Check", desc: "Full rental safety report with 15 data sources" },
              { href: "/landlord-check", title: "Landlord Check", desc: "10-point compliance checker" },
              { href: "/landlord-register", title: "Landlord Register", desc: "Check if your landlord is registered" },
              { href: "/prs-database", title: "PRS Database", desc: "Everything about the landlord register" },
              { href: "/is-my-landlord-legal", title: "Is My Landlord Legal?", desc: "Complete compliance checklist" },
              { href: "/damp-check", title: "Damp Check", desc: "4-step mould risk assessment" },
              { href: "/report-issue", title: "Report an Issue", desc: "Generate escalation letters" },
              { href: "/rights", title: "Your Rights", desc: "Plain-English tenant guides" },
              { href: "/fair-rent", title: "Fair Rent Check", desc: "Compare your rent to area averages" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:shadow-lg hover:border-primary-200"
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-primary-700">{tool.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{tool.desc}</p>
              </Link>
            ))}
          </div>
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
              This guide covers the Renters&apos; Rights Act 2025 (c.26) which received
              Royal Assent on 27 October 2025. It applies to England only. Some provisions
              have fixed commencement dates (e.g. 1 May 2026 for Section 21 abolition),
              while others depend on secondary legislation and may change. This page is
              for informational purposes and is not legal advice. If you need help with a
              specific situation, contact{" "}
              <a
                href="https://www.shelter.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:text-warning-900"
              >
                Shelter
              </a>{" "}
              (0808 800 4444),{" "}
              <a
                href="https://www.citizensadvice.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:text-warning-900"
              >
                Citizens Advice
              </a>
              , or a qualified housing solicitor.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

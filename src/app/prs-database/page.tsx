import type { Metadata } from "next";
import Link from "next/link";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "PRS Database Explained | What the Landlord Register Means for Renters",
  description:
    "The PRS Database is a mandatory register of all private landlords in England under the Renters' Rights Act 2025. Learn what data it contains, when it launches, and how tenants can use it.",
  alternates: { canonical: "https://rentercheck.vercel.app/prs-database" },
  openGraph: {
    title: "PRS Database Explained | What the Landlord Register Means for Renters",
    description:
      "The PRS Database is a mandatory register of all private landlords in England. Learn what it means for renters.",
    url: "https://rentercheck.vercel.app/prs-database",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRS Database Explained | What the Landlord Register Means for Renters",
    description:
      "Everything tenants need to know about the PRS Database, the mandatory landlord register launching late 2026.",
  },
};

const faqItems = [
  {
    question: "Is the PRS Database the same as the Rogue Landlord Database?",
    answer:
      "No. The Database of Rogue Landlords only listed landlords with convictions or multiple civil penalties. The PRS Database replaces it entirely with a comprehensive register that ALL private landlords in England must join, regardless of their history.",
  },
  {
    question: "Will the PRS Database be free for tenants to use?",
    answer:
      "Yes. The government has confirmed that the publicly accessible elements of the PRS Database will be free for tenants and prospective tenants to search. You will be able to check landlord registration status and compliance information at no cost.",
  },
  {
    question: "Do all landlords need to register, including those with one property?",
    answer:
      "Yes. Every private landlord in England who lets residential property must register on the PRS Database, whether they own one property or hundreds. There are no exemptions based on portfolio size.",
  },
  {
    question: "What if my landlord uses a letting agent?",
    answer:
      "The landlord remains responsible for registering on the PRS Database even if they use a letting agent or property management company. However, the agent can submit the registration on the landlord's behalf. The database will show both the landlord and any agent associated with the property.",
  },
  {
    question: "Can I check the PRS Database before signing a tenancy?",
    answer:
      "Yes, that is one of the primary purposes of the database. Once live, prospective tenants will be able to search by postcode or landlord name to verify registration status before committing to a tenancy agreement.",
  },
];

export default function PRSDatabasePage() {
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
        name: "PRS Database",
        item: "https://rentercheck.vercel.app/prs-database",
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
          <li className="text-slate-800 font-medium">PRS Database</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white mt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            The PRS Database: Everything You Need to Know
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-primary-100 leading-relaxed">
            The mandatory landlord register that gives tenants real transparency
            for the first time. Here is what it means for you.
          </p>
        </div>
      </section>

      {/* What is it? */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">What is the PRS Database?</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              The <strong>Private Rented Sector (PRS) Database</strong> is a centralised,
              digital register of every private landlord in England. It was created by
              the <strong>Renters&apos; Rights Act 2025</strong> (c.26), which received
              Royal Assent on 27 October 2025.
            </p>
            <p>
              The database replaces the existing Database of Rogue Landlords, which only
              tracked landlords with convictions or multiple civil penalties. The PRS Database
              goes much further: <strong>every</strong> private landlord must register,
              regardless of their history. This is a fundamental shift in how the private
              rented sector is regulated.
            </p>
            <p>
              The database will be <strong>publicly accessible</strong>, meaning tenants
              and prospective tenants can search it before signing a tenancy agreement.
              For the first time, renters will have a reliable way to verify that their
              landlord is operating legally.
            </p>
          </div>
        </div>
      </section>

      {/* Why it matters for tenants */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Why It Matters for Tenants</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-accent-200 bg-accent-50 p-6">
              <div className="h-12 w-12 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900">Transparency</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Check landlord credentials before you sign. No more guessing whether
                your landlord is operating legally.
              </p>
            </div>
            <div className="rounded-xl border border-accent-200 bg-accent-50 p-6">
              <div className="h-12 w-12 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900">Accountability</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Landlords who do not register face fines of up to £40,000 and cannot
                legally let or evict. The register holds them accountable.
              </p>
            </div>
            <div className="rounded-xl border border-accent-200 bg-accent-50 p-6">
              <div className="h-12 w-12 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900">Protection</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Enforcement history is visible. Councils can identify non-compliant
                landlords faster, protecting tenants from repeat offenders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What data it contains */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">What Data the PRS Database Contains</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Landlords must submit detailed information about themselves and each
            property they let. The database will hold the following fields:
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-900">Category</th>
                  <th className="py-3 text-sm font-semibold text-slate-900">Data Fields</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Landlord Identity</td>
                  <td className="py-3 text-sm text-slate-600">Full name, contact address, email, phone number</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Agent Details</td>
                  <td className="py-3 text-sm text-slate-600">Managing agent name, registration number, contact details</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Property Information</td>
                  <td className="py-3 text-sm text-slate-600">Full address, property type, number of bedrooms, council tax band, HMO status</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Safety Certificates</td>
                  <td className="py-3 text-sm text-slate-600">Gas safety (CP12), EPC rating and expiry, EICR report and expiry</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Safety Equipment</td>
                  <td className="py-3 text-sm text-slate-600">Smoke alarm confirmation, CO alarm confirmation</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Tenancy Details</td>
                  <td className="py-3 text-sm text-slate-600">Rent amount, tenancy start date, deposit scheme, How to Rent guide provided</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Enforcement History</td>
                  <td className="py-3 text-sm text-slate-600">Civil penalties, criminal convictions, banning orders, rent repayment orders</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Ombudsman Membership</td>
                  <td className="py-3 text-sm text-slate-600">PRS Ombudsman registration status (from 2028)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When does it launch? */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">When Does the PRS Database Launch?</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              The government has indicated a <strong>regional rollout beginning in late 2026</strong>.
              This means certain areas of England will go live first as a pilot, with the
              rest of the country following in stages.
            </p>
            <p>
              Full national coverage is expected by <strong>2027-2028</strong>. The exact
              timeline depends on the government&apos;s implementation schedule, which is still
              being finalised.
            </p>
            <p>
              During the rollout period, landlords in active regions will be required to
              register within a set timeframe. Failure to register once their area goes
              live will constitute an offence.
            </p>
          </div>
          <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-6">
            <p className="text-sm font-semibold text-primary-800">
              Want to know the moment it launches in your area?
            </p>
            <p className="mt-1 text-sm text-primary-700">
              Register your interest below and we will email you as soon as the PRS
              Database goes live.
            </p>
          </div>
        </div>
      </section>

      {/* How to use it */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">How to Use the PRS Database (When Live)</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                step: "1",
                title: "Enter a postcode or landlord name",
                desc: "Search the PRS Database by the property postcode or by the landlord's registered name.",
              },
              {
                step: "2",
                title: "View registration status",
                desc: "Confirm that the landlord is registered and authorised to let property at the address you searched.",
              },
              {
                step: "3",
                title: "Check compliance history",
                desc: "Review gas safety, EPC, and EICR certification status. See whether all safety requirements are met.",
              },
              {
                step: "4",
                title: "Review enforcement actions",
                desc: "Check whether the landlord has any civil penalties, criminal convictions, or banning orders on record.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penalties */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Penalties for Landlords Who Do Not Register</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              The Renters&apos; Rights Act 2025 introduces serious consequences for landlords
              who fail to register on the PRS Database:
            </p>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-900">Offence</th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-900">Penalty</th>
                  <th className="py-3 text-sm font-semibold text-slate-900">Additional Consequences</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Failure to register (first offence)</td>
                  <td className="py-3 pr-4 text-sm text-danger-600 font-semibold">Up to £7,000</td>
                  <td className="py-3 text-sm text-slate-600">Cannot serve valid possession notices</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Repeat failure to register</td>
                  <td className="py-3 pr-4 text-sm text-danger-600 font-semibold">Up to £40,000</td>
                  <td className="py-3 text-sm text-slate-600">May face criminal prosecution</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Letting without registration</td>
                  <td className="py-3 pr-4 text-sm text-danger-600 font-semibold">Up to £7,000</td>
                  <td className="py-3 text-sm text-slate-600">Cannot market or advertise the property</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Providing false information</td>
                  <td className="py-3 pr-4 text-sm text-danger-600 font-semibold">Up to £40,000</td>
                  <td className="py-3 text-sm text-slate-600">Criminal prosecution possible</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-slate-600 leading-relaxed">
            Additionally, tenants can apply to the First-tier Tribunal for a{" "}
            <strong>rent repayment order of up to 24 months&apos; rent</strong> if their
            landlord has committed a relevant offence, including failure to register.
          </p>
        </div>
      </section>

      {/* How councils use it */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">How Councils Use the PRS Database</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Local authorities gain powerful new enforcement tools through the PRS Database:
            </p>
            <ul className="space-y-3 ml-1">
              {[
                "Identify unregistered landlords and properties in their area",
                "Cross-reference registration data with licensing and enforcement records",
                "Detect potential HMOs that have not applied for mandatory licences",
                "Monitor compliance with gas safety, EPC, and electrical safety requirements",
                "Issue civil penalties directly, without needing to go through the courts",
                "Track repeat offenders and build cases for prosecution or banning orders",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              If you work in council housing enforcement, see our{" "}
              <Link href="/councils" className="text-primary-600 font-medium hover:text-primary-700 underline">
                council tools and pricing
              </Link>{" "}
              for bulk property data access.
            </p>
          </div>
        </div>
      </section>

      {/* Register Interest CTA */}
      <RegisterInterestCTA variant="banner" />

      {/* Related Tools */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Related Tools</h2>
          <p className="mt-4 text-slate-600">
            While the PRS Database is being built, use these free tools to check your
            rental property:
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/check", title: "Property Check", desc: "Full rental safety report with 15 data sources" },
              { href: "/landlord-check", title: "Landlord Check", desc: "10-point compliance checker" },
              { href: "/rights", title: "Your Rights", desc: "Plain-English tenant rights guides" },
              { href: "/damp-check", title: "Damp Check", desc: "4-step mould and damp risk assessment" },
              { href: "/report-issue", title: "Report an Issue", desc: "Generate escalation letters" },
              { href: "/landlord-register", title: "Landlord Register", desc: "Check if your landlord is registered" },
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
              This page provides general information about the PRS Database under the
              Renters&apos; Rights Act 2025 (c.26). It is not legal advice. The PRS Database
              applies to England only. Implementation details, launch dates, and database
              features may change. If you need specific legal advice, contact{" "}
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

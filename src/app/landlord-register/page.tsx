import type { Metadata } from "next";
import Link from "next/link";
import PostcodeSearch from "@/components/PostcodeSearch";
import RegisterInterestCTA from "@/components/RegisterInterestCTA";

export const metadata: Metadata = {
  title: "Check if Your Landlord is Registered | PRS Database Lookup",
  description:
    "Check if your landlord is registered on the PRS Database. The mandatory landlord register launches late 2026 under the Renters' Rights Act 2025. Verify registration, compliance history, and enforcement actions.",
  alternates: { canonical: "https://rentercheck.vercel.app/landlord-register" },
  openGraph: {
    title: "Check if Your Landlord is Registered | PRS Database Lookup",
    description:
      "Check if your landlord is registered on the PRS Database. Verify registration, compliance history, and enforcement actions under the Renters' Rights Act 2025.",
    url: "https://rentercheck.vercel.app/landlord-register",
  },
  twitter: {
    card: "summary_large_image",
    title: "Check if Your Landlord is Registered | PRS Database Lookup",
    description:
      "Check if your landlord is registered on the PRS Database. The mandatory landlord register launches late 2026.",
  },
};

const faqItems = [
  {
    question: "When will I be able to check if my landlord is registered?",
    answer:
      "The PRS Database is expected to launch in late 2026 with a regional rollout across England. Full national coverage is expected by 2027-2028. Until then, you can use RenterCheck to verify EPC ratings, check local crime data, and assess flood risk for any rental property.",
  },
  {
    question: "What happens if my landlord is not registered on the PRS Database?",
    answer:
      "Landlords who fail to register face a civil penalty of up to £7,000 for a first offence and up to £40,000 for repeat offences. Unregistered landlords cannot serve valid possession notices, cannot market or let their property, and tenants may be able to claim a rent repayment order covering up to 24 months of rent.",
  },
  {
    question: "Does the PRS Database apply in Scotland, Wales, and Northern Ireland?",
    answer:
      "The PRS Database under the Renters' Rights Act 2025 applies to England only. Scotland already has a landlord registration scheme through local authorities. Wales has Rent Smart Wales, which requires landlord registration and licensing. Northern Ireland has a separate landlord registration scheme.",
  },
  {
    question: "Will I be able to see my landlord's personal details on the database?",
    answer:
      "The publicly accessible part of the PRS Database will show the landlord's registration status, the properties they have registered, compliance history, and any enforcement actions. Personal contact details will not be publicly visible, but you will be able to confirm whether your landlord is legally registered.",
  },
  {
    question: "What is the difference between the PRS Database and the Database of Rogue Landlords?",
    answer:
      "The Database of Rogue Landlords (now called the Database of Rogue Landlords and Property Agents) only lists landlords who have been convicted of certain offences or received multiple civil penalties. The PRS Database replaces it with a comprehensive register that ALL private landlords in England must join, not just those with enforcement history.",
  },
];

export default function LandlordRegisterPage() {
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
        name: "Check if Landlord is Registered",
        item: "https://rentercheck.vercel.app/landlord-register",
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
          <li className="text-slate-800 font-medium">Landlord Register</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white mt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Check if Your Landlord is Registered
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-primary-100 leading-relaxed">
            The PRS Database launches late 2026 under the Renters&apos; Rights Act 2025.
            Every private landlord in England must register. Until then, check your
            rental property below.
          </p>
          <div className="mt-8">
            <PostcodeSearch />
          </div>
          <p className="mt-4 text-sm text-primary-200">
            Register below to be notified when landlord registration checks go live.
          </p>
        </div>
      </section>

      {/* What is the PRS Database? */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">What is the PRS Database?</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              The <strong>Private Rented Sector (PRS) Database</strong> is a mandatory,
              centralised register of all private landlords in England. It was established
              by the <strong>Renters&apos; Rights Act 2025</strong> (c.26), which received
              Royal Assent on 27 October 2025.
            </p>
            <p>
              For the first time, every private landlord in England must register
              themselves and each of their rental properties on a single, publicly
              accessible database. This replaces the existing Database of Rogue Landlords,
              which only tracked landlords with enforcement history.
            </p>
            <p>
              The PRS Database is expected to begin a <strong>regional rollout in late 2026</strong>,
              with full national coverage by 2027-2028. Once live, tenants will be able to
              check whether their landlord is legally registered before signing a tenancy agreement.
            </p>
          </div>
        </div>
      </section>

      {/* What landlords must submit */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">What Landlords Must Submit</h2>
          <p className="mt-4 text-slate-600">
            The PRS Database requires landlords to provide the following information
            for each registered property:
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-900">Document / Information</th>
                  <th className="py-3 text-sm font-semibold text-slate-900">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Gas Safety Certificate</td>
                  <td className="py-3 text-sm text-slate-600">Valid CP12 certificate, renewed annually</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Energy Performance Certificate (EPC)</td>
                  <td className="py-3 text-sm text-slate-600">Minimum E rating (C rating required from 2030)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Electrical Safety Report (EICR)</td>
                  <td className="py-3 text-sm text-slate-600">Valid report, renewed every 5 years</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Property Details</td>
                  <td className="py-3 text-sm text-slate-600">Address, property type, number of bedrooms, council tax band</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Landlord Contact Information</td>
                  <td className="py-3 text-sm text-slate-600">Name, address, email, and managing agent details if applicable</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Tenancy Information</td>
                  <td className="py-3 text-sm text-slate-600">Rent amount, tenancy start date, deposit scheme details</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-800">Compliance Declarations</td>
                  <td className="py-3 text-sm text-slate-600">Smoke alarms, CO alarms, How to Rent guide provided</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What you can check */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">What You Can Check (Once Live)</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            When the PRS Database launches, tenants and prospective tenants will be able
            to verify the following information about any private landlord or rental property
            in England:
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Registration Status",
                desc: "Confirm your landlord is legally registered and authorised to let property",
              },
              {
                title: "Compliance History",
                desc: "View gas safety, EPC, and electrical safety certification status",
              },
              {
                title: "Enforcement Actions",
                desc: "Check if the landlord has received civil penalties or prosecution",
              },
              {
                title: "Property Standards",
                desc: "See whether the property meets minimum legal standards",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg className="h-5 w-5 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What if your landlord isn't registered? */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">What if Your Landlord Is Not Registered?</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Under the Renters&apos; Rights Act 2025, landlords who fail to register on the
              PRS Database face serious consequences:
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-danger-200 bg-danger-50 p-5">
              <p className="font-semibold text-danger-800">Civil Penalty: Up to £7,000 (first offence)</p>
              <p className="mt-1 text-sm text-danger-700">Local authorities can issue an immediate financial penalty without court proceedings.</p>
            </div>
            <div className="rounded-xl border border-danger-200 bg-danger-50 p-5">
              <p className="font-semibold text-danger-800">Repeat Offence: Up to £40,000</p>
              <p className="mt-1 text-sm text-danger-700">Persistent non-compliance results in significantly higher penalties.</p>
            </div>
            <div className="rounded-xl border border-danger-200 bg-danger-50 p-5">
              <p className="font-semibold text-danger-800">Cannot Serve Possession Notices</p>
              <p className="mt-1 text-sm text-danger-700">An unregistered landlord cannot validly serve a notice to end your tenancy.</p>
            </div>
            <div className="rounded-xl border border-danger-200 bg-danger-50 p-5">
              <p className="font-semibold text-danger-800">Cannot Market or Let Property</p>
              <p className="mt-1 text-sm text-danger-700">It is an offence to advertise or let a property without being registered.</p>
            </div>
            <div className="rounded-xl border border-warning-200 bg-warning-50 p-5">
              <p className="font-semibold text-warning-800">Rent Repayment Orders: Up to 24 Months&apos; Rent</p>
              <p className="mt-1 text-sm text-warning-700">
                Tenants can apply to the First-tier Tribunal for a rent repayment order if their
                landlord has committed certain offences, including failing to register. The maximum
                award has been doubled to 24 months&apos; rent under the Renters&apos; Rights Act 2025.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Key Dates and Timeline</h2>
          <div className="mt-10 relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2" />

            {[
              {
                date: "27 October 2025",
                title: "Royal Assent",
                desc: "Renters' Rights Act 2025 receives Royal Assent, establishing the legal framework for the PRS Database.",
                done: true,
              },
              {
                date: "1 May 2026",
                title: "Section 21 Abolished",
                desc: "No-fault evictions end. All existing tenancies convert to periodic tenancies. Reformed Section 8 grounds take effect.",
                done: false,
              },
              {
                date: "Late 2026",
                title: "PRS Database Launches",
                desc: "Regional rollout begins. Landlords in pilot areas must register. Tenants can start checking landlord registration status.",
                done: false,
              },
              {
                date: "2027-2028",
                title: "Full Coverage",
                desc: "PRS Database extends to all areas of England. All private landlords must be registered.",
                done: false,
              },
              {
                date: "2028",
                title: "PRS Ombudsman",
                desc: "New Private Rented Sector Ombudsman launches. All landlords must join. Tenants gain a free complaints resolution service.",
                done: false,
              },
            ].map((event, i) => (
              <div
                key={event.date}
                className={`relative pl-12 sm:pl-0 pb-10 last:pb-0 ${
                  i % 2 === 0 ? "sm:pr-[calc(50%+2rem)] sm:text-right" : "sm:pl-[calc(50%+2rem)]"
                }`}
              >
                {/* Dot */}
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

      {/* What you can do now */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">What You Can Do Now</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            While the PRS Database is not yet live, you can already check key aspects
            of your rental property and landlord compliance using RenterCheck:
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/check"
              className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:shadow-lg hover:border-primary-200"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-primary-700">Property Check</h3>
              <p className="mt-1 text-sm text-slate-600">EPC ratings, crime data, flood risk, air quality, schools, and transport links.</p>
            </Link>
            <Link
              href="/landlord-check"
              className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:shadow-lg hover:border-primary-200"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-primary-700">Landlord Compliance Check</h3>
              <p className="mt-1 text-sm text-slate-600">Verify gas safety, EPC, EICR, deposit protection, and 7 other legal requirements.</p>
            </Link>
            <Link
              href="/damp-check"
              className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:shadow-lg hover:border-primary-200"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-primary-700">Damp and Mould Check</h3>
              <p className="mt-1 text-sm text-slate-600">Assess damp and mould risk with our 4-step wizard. Know your rights under Awaab&apos;s Law.</p>
            </Link>
            <Link
              href="/rights"
              className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:shadow-lg hover:border-primary-200"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-primary-700">Know Your Rights</h3>
              <p className="mt-1 text-sm text-slate-600">Plain-English guides to deposit protection, eviction rules, repairs, and rent increases.</p>
            </Link>
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
              This page provides general information about the PRS Database under the
              Renters&apos; Rights Act 2025 (c.26). It is not legal advice. The PRS Database
              applies to England only. Exact launch dates and database features may change
              as the government finalises implementation details. If you need help with a
              specific situation, contact{" "}
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

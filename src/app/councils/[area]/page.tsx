import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostcodeSearch from "@/components/PostcodeSearch";
import { getAllCouncils, getCouncilBySlug } from "@/data/councils";
import { getAreaBySlug } from "@/data/areas";

interface PageProps {
  params: Promise<{ area: string }>;
}

export async function generateStaticParams() {
  return getAllCouncils().map((c) => ({ area: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { area: slug } = await params;
  const council = getCouncilBySlug(slug);
  if (!council) return {};

  const title = `Renting in ${council.area} | Local Council Rules & HMO Licensing`;
  const description = `${council.name}: HMO licensing, selective licensing schemes, environmental health contacts, and tenant rights for renters in ${council.area}. Know your local council rules before you rent.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rentercheck.vercel.app/councils/${slug}`,
    },
    alternates: {
      canonical: `https://rentercheck.vercel.app/councils/${slug}`,
    },
  };
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default async function CouncilAreaPage({ params }: PageProps) {
  const { area: slug } = await params;
  const council = getCouncilBySlug(slug);
  if (!council) notFound();

  const areaData = getAreaBySlug(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: council.name,
    url: council.website,
    areaServed: {
      "@type": "City",
      name: council.area,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: council.region,
      addressCountry: "GB",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rentercheck.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Councils", item: "https://rentercheck.vercel.app/councils" },
      { "@type": "ListItem", position: 3, name: council.area, item: `https://rentercheck.vercel.app/councils/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/councils" className="hover:text-white transition-colors">Councils</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{council.area}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Renting in {council.area}
          </h1>
          <p className="mt-3 text-lg text-slate-300">
            {council.name} &middot; {council.region}
          </p>
          <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed">
            Local council rules, licensing schemes, and tenant resources for renters in {council.area}.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-8">

        {/* Licensing Schemes */}
        <SectionCard title="Licensing Schemes">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">Active Schemes</h3>
              <div className="flex flex-wrap gap-2">
                {council.licensingSchemes.map((scheme) => (
                  <span
                    key={scheme}
                    className="inline-flex items-center rounded-full bg-primary-50 border border-primary-200 px-3 py-1 text-sm font-medium text-primary-700"
                  >
                    {scheme}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-600">HMO Licence Fee</p>
                <p className="text-lg font-bold text-slate-900">{council.licenseFeeHMO}</p>
              </div>
              {council.licenseFeeSelective !== "N/A" && (
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">Selective Licence Fee</p>
                  <p className="text-lg font-bold text-slate-900">{council.licenseFeeSelective}</p>
                </div>
              )}
            </div>

            {council.selectiveLicensingAreas.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  Selective Licensing Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {council.selectiveLicensingAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-sm font-medium text-amber-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-slate-500 mt-3">
              Estimated {council.totalPRSProperties.toLocaleString()} private rented properties in the {council.area} area.
            </p>
          </div>
        </SectionCard>

        {/* HMO Rules Locally */}
        <SectionCard title={`HMO Rules in ${council.area}`}>
          <div className="space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              {council.rentersRightsNotes}
            </p>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-1">Check the HMO Register</h3>
              <p className="text-sm text-blue-700">
                {council.hmoRegisterUrl.startsWith("http") ? (
                  <>
                    View the public HMO register:{" "}
                    <a
                      href={council.hmoRegisterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium hover:text-blue-900"
                    >
                      {council.name} HMO Register
                    </a>
                  </>
                ) : (
                  council.hmoRegisterUrl
                )}
              </p>
            </div>

            <div className="text-sm text-slate-600">
              <p className="font-medium text-slate-800 mb-1">What landlords must do:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Obtain the correct licence for the property type</li>
                <li>Meet minimum room sizes (6.51m2 for one person, 10.22m2 for two)</li>
                <li>Provide adequate kitchen and bathroom facilities</li>
                <li>Install and maintain fire safety equipment</li>
                <li>Keep the property in good repair and free from hazards</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Report a Problem */}
        <SectionCard title="Report a Housing Problem">
          <div className="space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              If you are experiencing issues with your rented property in {council.area}, contact the council&apos;s environmental health team. They can investigate complaints about damp, mould, disrepair, overcrowding, and other hazards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-600">Phone</p>
                <p className="text-base font-semibold text-slate-900">{council.environmentalHealthPhone}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-600">Email</p>
                <p className="text-base font-semibold text-slate-900">{council.environmentalHealthEmail}</p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Council Website</p>
              <a
                href={council.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-primary-600 hover:text-primary-700 underline"
              >
                {council.website.replace("https://", "")}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link
                href="/report-issue"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
              >
                Generate a Complaint Letter
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/damp-check"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Run a Damp Assessment
              </Link>
            </div>
          </div>
        </SectionCard>

        {/* Tenant Advice */}
        <SectionCard title={`Tenant Advice in ${council.area}`}>
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <p className="text-sm text-green-800 font-medium">Local Advice Line</p>
              <p className="text-base font-semibold text-green-900">{council.tenantAdviceLine}</p>
            </div>

            <div className="space-y-2 text-sm text-slate-700">
              <p className="font-medium text-slate-800">Free help is available from:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <a href="https://www.shelter.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Shelter
                  </a>{" "}
                  (national housing charity, free advice line: 0808 800 4444)
                </li>
                <li>
                  <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Citizens Advice
                  </a>{" "}
                  (free, confidential advice on housing issues)
                </li>
                <li>Your local council&apos;s housing advice service</li>
                {council.region === "Scotland" && (
                  <li>
                    <a href="https://www.gov.scot/policies/private-renting/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      Scottish Government Private Renting Guidance
                    </a>
                  </li>
                )}
                {council.region === "Wales" && (
                  <li>
                    <a href="https://www.rentsmart.gov.wales" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      Rent Smart Wales
                    </a>{" "}
                    (landlord and agent registration)
                  </li>
                )}
                {council.region === "Northern Ireland" && (
                  <li>
                    <a href="https://www.housingrights.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      Housing Rights NI
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Local Rental Market */}
        {areaData && (
          <SectionCard title={`Rental Market in ${council.area}`}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500">2-Bed Rent</p>
                  <p className="text-lg font-bold text-slate-900">£{areaData.medianRent.twoBed.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">/month</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500">Avg Yield</p>
                  <p className="text-lg font-bold text-slate-900">{areaData.averageYield}%</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500">Growth (YoY)</p>
                  <p className="text-lg font-bold text-slate-900">{areaData.rentGrowthYoY}%</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500">Demand</p>
                  <p className="text-lg font-bold text-slate-900">{areaData.demandLevel}</p>
                </div>
              </div>

              <Link
                href={`/rent/${council.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Full {council.area} rental market guide
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </SectionCard>
        )}

        {/* Your Rights */}
        <SectionCard title="Your Rights as a Renter">
          <div className="space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              Whether you are renting in {council.area} or anywhere else in the UK, you have legal protections as a tenant. The Renters&apos; Rights Bill strengthens these protections further.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Deposit Protection", href: "/rights/deposit-protection" },
                { label: "Damp and Mould", href: "/rights/damp-and-mould" },
                { label: "Repairs and Maintenance", href: "/rights/repairs" },
                { label: "All Rights Guides", href: "/rights" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:border-primary-300 hover:bg-white transition-all"
                >
                  {link.label}
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Check a Property */}
        <section className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check a Property in {council.area}
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Enter any postcode to get an instant rental safety report with EPC data, crime stats, flood risk, and more.
          </p>
          <PostcodeSearch size="sm" />
        </section>
      </div>
    </>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ----------------------------------------------------------------
   SEO (set via useEffect for client component)
---------------------------------------------------------------- */
const PAGE_TITLE = "HMO Licence Checker | Does Your Property Need a Licence?";
const PAGE_DESCRIPTION =
  "Free HMO licence checker for UK tenants and landlords. Answer a few questions to find out if your property needs a mandatory HMO licence, additional licensing, or qualifies as a Section 257 HMO.";

/* ----------------------------------------------------------------
   Types
---------------------------------------------------------------- */
type Verdict = "mandatory" | "additional" | "section257" | "none";

interface FormState {
  tenants: number;
  households: number;
  storeys: number;
  isConverted: boolean | null;
  sharedFacilities: boolean | null;
  localAuthority: string;
  isPurposeBuiltFlat: boolean | null;
}

interface VerdictResult {
  verdict: Verdict;
  reasons: string[];
}

/* ----------------------------------------------------------------
   HMO Logic
---------------------------------------------------------------- */
function determineVerdict(form: FormState): VerdictResult {
  const reasons: string[] = [];

  // Section 257: converted building
  if (form.isConverted === true) {
    reasons.push(
      "The property is a converted building. If it contains 2 or more flats, fewer than two-thirds are owner-occupied, and the conversion does not meet 1991 Building Regulations standards, it may be classified as a Section 257 HMO."
    );
    // Could still also need mandatory licensing, so check that too
  }

  // Mandatory HMO licence
  if (
    form.tenants >= 5 &&
    form.households >= 2 &&
    form.sharedFacilities === true
  ) {
    // Exception for purpose-built flats
    if (form.isPurposeBuiltFlat === true) {
      reasons.push(
        "Although there are 5 or more tenants from 2 or more households sharing facilities, purpose-built flats in blocks of 3 or more self-contained flats are exempt from mandatory HMO licensing."
      );
      // May still need additional licensing
      if (form.tenants >= 3 && form.households >= 2) {
        reasons.push(
          "However, with 3 or more tenants from 2 or more households, additional licensing may apply depending on your local council's scheme."
        );
        return { verdict: "additional", reasons };
      }
      return { verdict: form.isConverted ? "section257" : "none", reasons };
    }

    reasons.push(
      `This property has ${form.tenants} tenants from ${form.households} separate households sharing facilities. Since the 2018 extension of mandatory licensing, any property (regardless of storeys) with 5 or more tenants forming 2 or more households and sharing facilities requires a mandatory HMO licence.`
    );
    return { verdict: "mandatory", reasons };
  }

  // Additional licensing (council-specific)
  if (
    form.tenants >= 3 &&
    form.households >= 2 &&
    form.sharedFacilities === true
  ) {
    reasons.push(
      `This property has ${form.tenants} tenants from ${form.households} households sharing facilities. While it does not meet the threshold for mandatory licensing (5+ tenants), many local councils operate additional licensing schemes that cover properties with 3 or more tenants from 2 or more households. You should check with your local council.`
    );
    if (form.isConverted === true) {
      return { verdict: "section257", reasons };
    }
    return { verdict: "additional", reasons };
  }

  // Section 257 only
  if (form.isConverted === true) {
    return { verdict: "section257", reasons };
  }

  // No HMO
  if (form.tenants < 3 || form.households < 2) {
    reasons.push(
      "Based on the number of tenants and households, this property does not appear to meet the definition of an HMO. An HMO generally requires at least 3 tenants from 2 or more separate households."
    );
  }
  if (form.sharedFacilities === false) {
    reasons.push(
      "The property does not have shared facilities (kitchen or bathroom), which is typically a requirement for HMO classification."
    );
  }

  return { verdict: "none", reasons };
}

/* ----------------------------------------------------------------
   Verdict Display Config
---------------------------------------------------------------- */
const VERDICT_CONFIG: Record<
  Verdict,
  {
    bg: string;
    border: string;
    text: string;
    icon: string;
    heading: string;
    description: string;
  }
> = {
  mandatory: {
    bg: "bg-danger-50",
    border: "border-danger-200",
    text: "text-danger-700",
    icon: "⚠",
    heading: "This property REQUIRES a mandatory HMO licence",
    description:
      "Operating without a licence is a criminal offence carrying unlimited fines and potential rent repayment orders.",
  },
  additional: {
    bg: "bg-warning-50",
    border: "border-warning-200",
    text: "text-warning-700",
    icon: "⚡",
    heading:
      "This property MAY require an additional licence (check with your council)",
    description:
      "Many councils operate additional or selective licensing schemes. Contact your local authority to confirm.",
  },
  none: {
    bg: "bg-accent-50",
    border: "border-accent-200",
    text: "text-accent-700",
    icon: "✓",
    heading: "This property does not appear to need an HMO licence",
    description:
      "Based on your answers, this property does not meet the standard HMO criteria. However, some councils operate selective licensing; check locally if unsure.",
  },
  section257: {
    bg: "bg-primary-50",
    border: "border-primary-200",
    text: "text-primary-700",
    icon: "🏢",
    heading: "This may be a Section 257 HMO (converted building)",
    description:
      "Section 257 HMOs are converted buildings containing self-contained flats that do not meet 1991 Building Regulations. Different rules and licensing may apply.",
  },
};

/* ----------------------------------------------------------------
   Sub-Components
---------------------------------------------------------------- */
function YesNoToggle({
  value,
  onChange,
  label,
  help,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
  label: string;
  help?: string;
}) {
  return (
    <fieldset className="mb-6">
      <legend className="text-sm font-medium text-slate-700 mb-1">
        {label}
      </legend>
      {help && <p className="text-xs text-slate-500 mb-2">{help}</p>}
      <div className="flex gap-2">
        {[
          { val: true, text: "Yes" },
          { val: false, text: "No" },
        ].map((opt) => {
          const isActive = value === opt.val;
          const activeClass = opt.val
            ? "bg-primary-600 text-white border-primary-600"
            : "bg-slate-600 text-white border-slate-600";
          return (
            <button
              key={String(opt.val)}
              type="button"
              onClick={() => onChange(opt.val)}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
                isActive
                  ? activeClass
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function SliderInput({
  label,
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div className="mb-6">
      <label className="text-sm font-medium text-slate-700 mb-2 block">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary-600"
        />
        <span className="min-w-[3rem] text-center text-lg font-bold text-primary-700 bg-primary-50 rounded-lg px-3 py-1">
          {value}
          {max === value && "+"}{suffix}
        </span>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  children,
  colour = "primary",
}: {
  title: string;
  children: React.ReactNode;
  colour?: "primary" | "warning" | "danger" | "accent";
}) {
  const borderClass = {
    primary: "border-primary-200",
    warning: "border-warning-200",
    danger: "border-danger-200",
    accent: "border-accent-200",
  }[colour];

  const bgClass = {
    primary: "bg-primary-50",
    warning: "bg-warning-50",
    danger: "bg-danger-50",
    accent: "bg-accent-50",
  }[colour];

  const titleClass = {
    primary: "text-primary-800",
    warning: "text-warning-800",
    danger: "text-danger-800",
    accent: "text-accent-800",
  }[colour];

  return (
    <div className={`rounded-xl border ${borderClass} ${bgClass} p-5`}>
      <h3 className={`font-semibold ${titleClass} mb-3`}>{title}</h3>
      <div className="text-sm text-slate-700 space-y-2">{children}</div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Main Page Component
---------------------------------------------------------------- */
export default function HMOCheckPage() {
  const [form, setForm] = useState<FormState>({
    tenants: 3,
    households: 2,
    storeys: 2,
    isConverted: null,
    sharedFacilities: null,
    localAuthority: "",
    isPurposeBuiltFlat: null,
  });

  const [showResults, setShowResults] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const result = useMemo(() => determineVerdict(form), [form]);
  const config = VERDICT_CONFIG[result.verdict];

  const canSubmit =
    form.sharedFacilities !== null &&
    form.isConverted !== null &&
    form.isPurposeBuiltFlat !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setShowResults(true);
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const councilSearchUrl = form.localAuthority.trim()
    ? `https://www.google.com/search?q=${encodeURIComponent(
        form.localAuthority.trim() + " HMO register"
      )}`
    : null;

  return (
    <>
      {/* Dynamic head */}
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <meta property="og:title" content={PAGE_TITLE} />
      <meta property="og:description" content={PAGE_DESCRIPTION} />
      <link rel="canonical" href="https://rentercheck.vercel.app/hmo-check" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            HMO Licence Checker
          </h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Answer a few questions about the property to find out if it needs an
            HMO licence, what type of licence applies, and what it means for
            tenants and landlords.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Card: Property Details */}
            <div className="glass-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Property Details
              </h2>

              <SliderInput
                label="How many tenants live in the property?"
                value={form.tenants}
                min={1}
                max={20}
                onChange={(v) => update("tenants", v)}
              />

              <SliderInput
                label="How many separate households?"
                value={form.households}
                min={1}
                max={10}
                onChange={(v) => update("households", v)}
              />
              <p className="text-xs text-slate-500 -mt-4 mb-6">
                A household is a family, couple, or single person living
                together as one unit.
              </p>

              <SliderInput
                label="How many storeys does the building have?"
                value={form.storeys}
                min={1}
                max={5}
                onChange={(v) => update("storeys", v)}
              />

              <YesNoToggle
                label="Is the property a converted building (e.g. house split into flats)?"
                value={form.isConverted}
                onChange={(v) => update("isConverted", v)}
              />

              <YesNoToggle
                label="Does the property have shared facilities (kitchen, bathroom)?"
                value={form.sharedFacilities}
                onChange={(v) => update("sharedFacilities", v)}
                help="Facilities shared between different households count as shared."
              />

              <YesNoToggle
                label="Is this a purpose-built flat in a block of 3 or more flats?"
                value={form.isPurposeBuiltFlat}
                onChange={(v) => update("isPurposeBuiltFlat", v)}
                help="Purpose-built means the building was originally designed as flats, not converted from a house."
              />

              <div className="mb-2">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Local authority area (optional)
                </label>
                <input
                  type="text"
                  value={form.localAuthority}
                  onChange={(e) => update("localAuthority", e.target.value)}
                  placeholder="e.g. Manchester, Camden, Leeds"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-700/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Check HMO Status
              </button>
            </div>
          </form>

          {/* Results */}
          {showResults && (
            <div id="results" className="mt-10 space-y-6 animate-fade-in">
              {/* Verdict Card */}
              <div
                className={`rounded-2xl border-2 ${config.border} ${config.bg} p-6 sm:p-8 text-center`}
              >
                <div className="text-4xl mb-3" aria-hidden="true">
                  {config.icon}
                </div>
                <h2
                  className={`text-xl sm:text-2xl font-bold ${config.text} mb-3`}
                >
                  {config.heading}
                </h2>
                <p className="text-sm text-slate-600">{config.description}</p>
              </div>

              {/* Why */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Why this result?
                </h3>
                <ul className="space-y-2">
                  {result.reasons.map((reason, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-700">
                      <span className="text-primary-500 mt-0.5 shrink-0">
                        •
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What this means for tenants */}
              <InfoCard title="What this means for tenants" colour="primary">
                {result.verdict === "mandatory" ||
                result.verdict === "additional" ? (
                  <ul className="space-y-2">
                    <li>
                      • The landlord must hold a valid HMO licence from the
                      local council
                    </li>
                    <li>
                      • The property must meet fire safety requirements
                      (alarms, extinguishers, fire doors)
                    </li>
                    <li>
                      • Bedrooms must meet minimum room sizes: 6.51m&sup2; for
                      a single occupant, 10.22m&sup2; for two people
                    </li>
                    <li>
                      • There must be adequate kitchen and bathroom facilities
                      for the number of tenants
                    </li>
                    <li>
                      • A designated HMO manager must be in place and
                      contactable
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    <li>
                      • Standard tenancy protections still apply (deposit
                      protection, gas safety, EPC, etc.)
                    </li>
                    <li>
                      • Check your tenancy agreement for any specific terms
                      about occupancy limits
                    </li>
                    <li>
                      • Use our{" "}
                      <Link
                        href="/landlord-check"
                        className="text-primary-600 underline"
                      >
                        Landlord Compliance Checker
                      </Link>{" "}
                      to verify other requirements
                    </li>
                  </ul>
                )}
              </InfoCard>

              {/* What this means for landlords */}
              <InfoCard title="What this means for landlords" colour="warning">
                {result.verdict === "mandatory" ? (
                  <ul className="space-y-2">
                    <li>
                      • You must apply for a mandatory HMO licence from your
                      local council
                    </li>
                    <li>
                      • Licence fees typically range from £500 to £1,500
                      depending on the council
                    </li>
                    <li>
                      • The application process involves a property inspection,
                      DBS check, and management plan
                    </li>
                    <li>
                      • You must be a "fit and proper person" to hold a licence
                    </li>
                    <li>
                      • The licence must be displayed in the property
                    </li>
                    <li>
                      • Licences are typically valid for 5 years
                    </li>
                  </ul>
                ) : result.verdict === "additional" ? (
                  <ul className="space-y-2">
                    <li>
                      • Contact your local council to check if an additional
                      licensing scheme applies in your area
                    </li>
                    <li>
                      • If required, licence fees are similar to mandatory
                      licensing (£500 to £1,500)
                    </li>
                    <li>
                      • The council may have specific conditions for the area or
                      property type
                    </li>
                    <li>
                      • Not all councils operate additional licensing schemes
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    <li>
                      • No HMO licence appears to be required, but always
                      confirm with your local council
                    </li>
                    <li>
                      • Standard landlord obligations still apply (gas safety,
                      deposit protection, EPC, etc.)
                    </li>
                    <li>
                      • Some councils operate selective licensing that covers
                      all rental properties in certain areas
                    </li>
                  </ul>
                )}
              </InfoCard>

              {/* Penalties */}
              <InfoCard
                title="Penalties for unlicensed HMOs"
                colour="danger"
              >
                <ul className="space-y-2">
                  <li>
                    • <strong>Unlimited fine</strong> for operating an
                    unlicensed HMO (criminal offence)
                  </li>
                  <li>
                    • Tenants can apply for a{" "}
                    <strong>Rent Repayment Order</strong> of up to 12 months'
                    rent
                  </li>
                  <li>
                    • The landlord cannot serve a{" "}
                    <strong>Section 21 eviction notice</strong> while unlicensed
                  </li>
                  <li>
                    • The council can issue a{" "}
                    <strong>management order</strong> taking control of the
                    property
                  </li>
                  <li>
                    • A criminal conviction may prevent the landlord from
                    obtaining future licences
                  </li>
                </ul>
              </InfoCard>

              {/* Minimum Room Sizes */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Minimum HMO Room Sizes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 text-center">
                    <div className="text-3xl font-bold text-primary-700 mb-1">
                      6.51m&sup2;
                    </div>
                    <div className="text-sm font-medium text-primary-800">
                      Single Bedroom
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      One person sleeping room
                    </div>
                  </div>
                  <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 text-center">
                    <div className="text-3xl font-bold text-primary-700 mb-1">
                      10.22m&sup2;
                    </div>
                    <div className="text-sm font-medium text-primary-800">
                      Double Bedroom
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Two people sleeping room
                    </div>
                  </div>
                  <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 text-center">
                    <div className="text-3xl font-bold text-primary-700 mb-1">
                      Varies
                    </div>
                    <div className="text-sm font-medium text-primary-800">
                      Communal Living
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Set by local council
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Rooms below these sizes cannot be used as sleeping
                  accommodation in a licensed HMO. If your room is smaller,
                  report it to your local council.
                </p>
              </div>

              {/* Check if licensed */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Check if your HMO is licensed
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Most councils publish their HMO register online. You can
                  search for your property to confirm whether the landlord holds
                  a valid licence.
                </p>
                {councilSearchUrl ? (
                  <a
                    href={councilSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                    Search {form.localAuthority.trim()} HMO Register
                  </a>
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    Enter a local authority name above to get a direct search
                    link.
                  </p>
                )}
              </div>

              {/* Report unlicensed */}
              <div className="rounded-xl border border-danger-200 bg-danger-50 p-6">
                <h3 className="font-semibold text-danger-800 mb-2">
                  Suspect an unlicensed HMO?
                </h3>
                <p className="text-sm text-slate-700 mb-4">
                  If you believe your property should be licensed but is not,
                  you can report it to your local council. You may also be
                  entitled to a Rent Repayment Order.
                </p>
                <Link
                  href="/report-issue"
                  className="inline-flex items-center gap-2 rounded-lg bg-danger-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-danger-700 transition-colors"
                >
                  Report an Issue
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>

              {/* Back to tools */}
              <div className="text-center pt-4">
                <Link
                  href="/"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← Back to all tools
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "HMO Licence Checker",
            description: PAGE_DESCRIPTION,
            url: "https://rentercheck.vercel.app/hmo-check",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
            },
            publisher: {
              "@type": "Organization",
              name: "RenterCheck",
              url: "https://rentercheck.vercel.app",
            },
          }),
        }}
      />
    </>
  );
}

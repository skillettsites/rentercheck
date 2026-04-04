"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";

/* ----------------------------------------------------------------
   Types
---------------------------------------------------------------- */
type Answer = "yes" | "no" | "unknown";

interface FormData {
  postcode: string;
  propertyType: "hmo" | "single" | "unsure";
  tenantCount: number;
  licensed: Answer;
  gasSafety: Answer;
  epcProvided: Answer;
  depositProtected: Answer;
  howToRent: Answer;
  electricalSafety: Answer;
  smokeAlarms: Answer;
  coAlarms: Answer;
}

interface ComplianceItem {
  key: keyof Omit<FormData, "postcode" | "propertyType" | "tenantCount">;
  label: string;
  legalRef: string;
  penalty: string;
  action: string;
  validityPeriod: string;
}

/* ----------------------------------------------------------------
   Compliance Requirements Data
---------------------------------------------------------------- */
const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    key: "gasSafety",
    label: "Gas Safety Certificate",
    legalRef: "Gas Safety (Installation and Use) Regulations 1998",
    penalty: "Unlimited fine, up to 6 months imprisonment",
    action:
      "Book a Gas Safe registered engineer for an annual gas safety check. Provide a copy of the certificate to tenants within 28 days.",
    validityPeriod: "Must be renewed annually",
  },
  {
    key: "epcProvided",
    label: "Energy Performance Certificate (EPC)",
    legalRef: "Energy Performance of Buildings Regulations 2012",
    penalty: "Up to £5,000 fine per property",
    action:
      "Commission an EPC from an accredited assessor. Minimum rating of E required (C rating required from 2028). Provide a copy to tenants before they move in.",
    validityPeriod: "Valid for 10 years",
  },
  {
    key: "depositProtected",
    label: "Deposit Protection",
    legalRef: "Housing Act 2004, Section 213",
    penalty:
      "Penalty of 1-3x the deposit amount. Cannot serve a Section 21 notice until the deposit is protected and prescribed information is provided.",
    action:
      "Protect the deposit in an approved scheme (DPS, MyDeposits, or TDS) within 30 days of receipt. Provide prescribed information to the tenant.",
    validityPeriod: "Must be protected within 30 days of receipt",
  },
  {
    key: "howToRent",
    label: "\"How to Rent\" Guide",
    legalRef: "Deregulation Act 2015",
    penalty:
      "Cannot use Section 21 eviction without providing the current version of this guide.",
    action:
      "Download the latest version from GOV.UK and provide it to tenants at the start of each new tenancy. Must be the current version, not an outdated copy.",
    validityPeriod: "Must be current version at tenancy start",
  },
  {
    key: "electricalSafety",
    label: "Electrical Safety (EICR)",
    legalRef: "Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020",
    penalty: "Up to £30,000 fine",
    action:
      "Arrange an Electrical Installation Condition Report (EICR) by a qualified electrician. Provide a copy to tenants within 28 days of the inspection.",
    validityPeriod: "Must be renewed every 5 years",
  },
  {
    key: "smokeAlarms",
    label: "Smoke Alarms on Every Floor",
    legalRef: "Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022",
    penalty: "Up to £5,000 fine",
    action:
      "Install at least one smoke alarm on every storey of the property where there is a room used as living accommodation. Test alarms on the day each new tenancy begins.",
    validityPeriod: "Check at start of each tenancy; replace units every 10 years",
  },
  {
    key: "coAlarms",
    label: "Carbon Monoxide Alarms",
    legalRef: "Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022",
    penalty: "Up to £5,000 fine",
    action:
      "Install a CO alarm in any room containing a fixed combustion appliance (excluding gas cookers). This includes gas boilers, wood burners, and open fires.",
    validityPeriod: "Check at start of each tenancy; replace units per manufacturer guidelines",
  },
  {
    key: "licensed",
    label: "HMO / Selective Licensing",
    legalRef: "Housing Act 2004, Part 2",
    penalty:
      "Unlimited fine, rent repayment orders of up to 12 months' rent, criminal record",
    action:
      "Check with your local council whether a licence is required. Mandatory HMO licensing applies to properties with 5 or more tenants from 2 or more households. Many councils also operate selective licensing schemes for smaller properties.",
    validityPeriod: "Typically valid for 5 years; check with your local council",
  },
];

/* ----------------------------------------------------------------
   Score Calculation
---------------------------------------------------------------- */
function calculateScore(data: FormData): number {
  const weights: Record<string, number> = {
    gasSafety: 15,
    epcProvided: 10,
    depositProtected: 15,
    howToRent: 8,
    electricalSafety: 12,
    smokeAlarms: 12,
    coAlarms: 10,
    licensed: 18,
  };

  let total = 0;
  let maxScore = 0;

  for (const item of COMPLIANCE_ITEMS) {
    const weight = weights[item.key] || 10;
    maxScore += weight;
    const answer = data[item.key];
    if (answer === "yes") {
      total += weight;
    } else if (answer === "unknown") {
      total += weight * 0.3;
    }
    // "no" scores 0
  }

  // If not HMO, licensing is less relevant; redistribute weight
  if (data.propertyType === "single" && data.tenantCount < 3) {
    const licensingWeight = weights.licensed;
    maxScore -= licensingWeight;
    const answer = data.licensed;
    if (answer === "yes") {
      total -= licensingWeight;
    } else if (answer === "unknown") {
      total -= licensingWeight * 0.3;
    }
    // Add partial weight for selective licensing
    maxScore += 5;
    if (data.licensed === "yes") total += 5;
    else if (data.licensed === "unknown") total += 1.5;
  }

  return Math.round((total / maxScore) * 100);
}

function getScoreColour(score: number): {
  bg: string;
  text: string;
  border: string;
  label: string;
  ringColour: string;
} {
  if (score >= 80) {
    return {
      bg: "bg-accent-50",
      text: "text-accent-700",
      border: "border-accent-200",
      label: "Largely Compliant",
      ringColour: "#059669",
    };
  }
  if (score >= 50) {
    return {
      bg: "bg-warning-50",
      text: "text-warning-700",
      border: "border-warning-200",
      label: "Action Needed",
      ringColour: "#d97706",
    };
  }
  return {
    bg: "bg-danger-50",
    text: "text-danger-700",
    border: "border-danger-200",
    label: "Serious Compliance Issues",
    ringColour: "#dc2626",
  };
}

function getItemStatus(answer: Answer): {
  icon: React.ReactNode;
  colour: string;
  bgColour: string;
} {
  if (answer === "yes") {
    return {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      ),
      colour: "text-accent-600",
      bgColour: "bg-accent-50",
    };
  }
  if (answer === "no") {
    return {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      ),
      colour: "text-danger-600",
      bgColour: "bg-danger-50",
    };
  }
  return {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    colour: "text-warning-600",
    bgColour: "bg-warning-50",
  };
}

/* ----------------------------------------------------------------
   Penalty Table Data
---------------------------------------------------------------- */
const PENALTY_TABLE = [
  { requirement: "Gas Safety Certificate", fine: "Unlimited fine", criminal: "Up to 6 months imprisonment", other: "Injury/death liability" },
  { requirement: "EPC", fine: "Up to £5,000", criminal: "No", other: "Cannot legally let the property" },
  { requirement: "Deposit Protection", fine: "1-3x deposit amount", criminal: "No", other: "Cannot serve Section 21" },
  { requirement: "\"How to Rent\" Guide", fine: "None directly", criminal: "No", other: "Cannot serve Section 21" },
  { requirement: "EICR (Electrical Safety)", fine: "Up to £30,000", criminal: "No", other: "Local authority can arrange works at landlord cost" },
  { requirement: "Smoke Alarms", fine: "Up to £5,000", criminal: "No", other: "Local authority enforcement" },
  { requirement: "CO Alarms", fine: "Up to £5,000", criminal: "No", other: "Local authority enforcement" },
  { requirement: "HMO Licence (if applicable)", fine: "Unlimited fine", criminal: "Yes, criminal offence", other: "Rent repayment orders up to 12 months" },
  { requirement: "Right to Rent Checks", fine: "Up to £3,000 per tenant", criminal: "Up to 5 years imprisonment", other: "Immigration Act 2014" },
  { requirement: "Fitness for Habitation", fine: "Tenant can sue for compensation", criminal: "No", other: "Homes (Fitness for Human Habitation) Act 2018" },
];

/* ----------------------------------------------------------------
   Component: TriStateToggle
---------------------------------------------------------------- */
function TriStateToggle({
  value,
  onChange,
  label,
}: {
  value: Answer;
  onChange: (v: Answer) => void;
  label: string;
}) {
  const options: { val: Answer; text: string }[] = [
    { val: "yes", text: "Yes" },
    { val: "no", text: "No" },
    { val: "unknown", text: "Don't know" },
  ];

  return (
    <fieldset className="mb-5">
      <legend className="text-sm font-medium text-slate-700 mb-2">{label}</legend>
      <div className="flex gap-2">
        {options.map((opt) => {
          const isActive = value === opt.val;
          let activeClass = "";
          if (isActive) {
            if (opt.val === "yes") activeClass = "bg-accent-600 text-white border-accent-600";
            else if (opt.val === "no") activeClass = "bg-danger-600 text-white border-danger-600";
            else activeClass = "bg-warning-500 text-white border-warning-500";
          }
          return (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange(opt.val)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
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

/* ----------------------------------------------------------------
   Main Page Component
---------------------------------------------------------------- */
export default function LandlordCheckPage() {
  const [formData, setFormData] = useState<FormData>({
    postcode: "",
    propertyType: "single",
    tenantCount: 1,
    licensed: "unknown",
    gasSafety: "unknown",
    epcProvided: "unknown",
    depositProtected: "unknown",
    howToRent: "unknown",
    electricalSafety: "unknown",
    smokeAlarms: "unknown",
    coAlarms: "unknown",
  });

  const [showResults, setShowResults] = useState(false);

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const score = useMemo(() => calculateScore(formData), [formData]);
  const scoreInfo = useMemo(() => getScoreColour(score), [score]);

  const issueCount = useMemo(() => {
    return COMPLIANCE_ITEMS.filter((item) => formData[item.key] === "no").length;
  }, [formData]);

  const unknownCount = useMemo(() => {
    return COMPLIANCE_ITEMS.filter((item) => formData[item.key] === "unknown").length;
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setFormData({
      postcode: "",
      propertyType: "single",
      tenantCount: 1,
      licensed: "unknown",
      gasSafety: "unknown",
      epcProvided: "unknown",
      depositProtected: "unknown",
      howToRent: "unknown",
      electricalSafety: "unknown",
      smokeAlarms: "unknown",
      coAlarms: "unknown",
    });
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Circumference for the SVG ring */
  const RING_RADIUS = 58;
  const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
  const ringOffset = RING_CIRCUMFERENCE - (score / 100) * RING_CIRCUMFERENCE;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 text-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
          </div>
          <div className="relative">
            <h1 className="animate-fade-in text-4xl sm:text-5xl font-extrabold tracking-tight">
              Landlord Compliance Checker
            </h1>
            <p className="animate-slide-up mt-5 mx-auto max-w-2xl text-lg text-primary-100 leading-relaxed">
              Check whether your rental property meets all UK legal requirements.
              Answer a few questions to get your compliance score, see which
              regulations apply, and find out what action to take.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="animate-slide-up">
            {/* Property Details */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                Property Details
              </h2>

              {/* Postcode */}
              <div className="mb-5">
                <label htmlFor="postcode" className="text-sm font-medium text-slate-700 mb-1 block">
                  Property Postcode
                </label>
                <input
                  id="postcode"
                  type="text"
                  placeholder="e.g. SW1A 1AA"
                  value={formData.postcode}
                  onChange={(e) => updateField("postcode", e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                />
              </div>

              {/* Property Type */}
              <div className="mb-5">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Property Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { val: "hmo" as const, text: "HMO (3+ unrelated tenants)" },
                      { val: "single" as const, text: "Single Let" },
                      { val: "unsure" as const, text: "Not sure" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => updateField("propertyType", opt.val)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
                        formData.propertyType === opt.val
                          ? "bg-primary-600 text-white border-primary-600"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenant Count */}
              <div className="mb-2">
                <label htmlFor="tenantCount" className="text-sm font-medium text-slate-700 mb-1 block">
                  Number of Tenants
                </label>
                <select
                  id="tenantCount"
                  value={formData.tenantCount}
                  onChange={(e) => updateField("tenantCount", Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "tenant" : "tenants"}
                    </option>
                  ))}
                </select>
              </div>

              {/* HMO Warning */}
              {(formData.propertyType === "hmo" || formData.tenantCount >= 5) && (
                <div className="mt-4 rounded-xl border border-warning-200 bg-warning-50 p-4 text-sm text-warning-800">
                  <p className="font-semibold flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    HMO Licensing May Apply
                  </p>
                  <p className="mt-1">
                    Properties with 5 or more tenants forming 2 or more households require a mandatory HMO licence.
                    Many councils also have additional or selective licensing schemes. Check with your local authority.
                  </p>
                </div>
              )}
            </div>

            {/* Compliance Questions */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
                Compliance Questions
              </h2>

              <TriStateToggle
                label="Is the gas safety certificate current?"
                value={formData.gasSafety}
                onChange={(v) => updateField("gasSafety", v)}
              />
              <TriStateToggle
                label="Has a valid EPC been provided to the tenant?"
                value={formData.epcProvided}
                onChange={(v) => updateField("epcProvided", v)}
              />
              <TriStateToggle
                label="Was the deposit protected within 30 days?"
                value={formData.depositProtected}
                onChange={(v) => updateField("depositProtected", v)}
              />
              <TriStateToggle
                label='Was the "How to Rent" guide provided?'
                value={formData.howToRent}
                onChange={(v) => updateField("howToRent", v)}
              />
              <TriStateToggle
                label="Is the electrical safety certificate (EICR) current?"
                value={formData.electricalSafety}
                onChange={(v) => updateField("electricalSafety", v)}
              />
              <TriStateToggle
                label="Are there smoke alarms on every floor?"
                value={formData.smokeAlarms}
                onChange={(v) => updateField("smokeAlarms", v)}
              />
              <TriStateToggle
                label="Are CO alarms installed where needed?"
                value={formData.coAlarms}
                onChange={(v) => updateField("coAlarms", v)}
              />
              <TriStateToggle
                label="Is the property licensed (if required)?"
                value={formData.licensed}
                onChange={(v) => updateField("licensed", v)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700 focus:ring-4 focus:ring-primary-500/30 focus:outline-none transition-all duration-200 cursor-pointer"
            >
              Check Compliance
            </button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section id="results" className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* Score Card */}
            <div className={`animate-fade-in rounded-2xl border ${scoreInfo.border} ${scoreInfo.bg} p-6 sm:p-8 mb-8`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                {/* Score Ring */}
                <div className="relative flex-shrink-0">
                  <svg width="140" height="140" className="-rotate-90">
                    <circle
                      cx="70"
                      cy="70"
                      r={RING_RADIUS}
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r={RING_RADIUS}
                      fill="none"
                      stroke={scoreInfo.ringColour}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={RING_CIRCUMFERENCE}
                      strokeDashoffset={ringOffset}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-extrabold ${scoreInfo.text}`}>{score}</span>
                    <span className="text-xs text-slate-500">out of 100</span>
                  </div>
                </div>

                {/* Score Details */}
                <div className="text-center sm:text-left">
                  <h3 className={`text-2xl font-bold ${scoreInfo.text}`}>
                    {scoreInfo.label}
                  </h3>
                  {formData.postcode && (
                    <p className="text-sm text-slate-500 mt-1">
                      Property at {formData.postcode}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-3 justify-center sm:justify-start">
                    {issueCount > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-danger-100 px-3 py-1 text-xs font-medium text-danger-700">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        {issueCount} {issueCount === 1 ? "issue" : "issues"} found
                      </span>
                    )}
                    {unknownCount > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-warning-100 px-3 py-1 text-xs font-medium text-warning-700">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                        {unknownCount} uncertain
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="animate-slide-up rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                </svg>
                Your Legal Obligations
              </h2>

              <div className="space-y-4">
                {COMPLIANCE_ITEMS.map((item) => {
                  const answer = formData[item.key];
                  const status = getItemStatus(answer);
                  const isIssue = answer !== "yes";

                  return (
                    <div
                      key={item.key}
                      className={`rounded-xl border p-4 sm:p-5 transition-all duration-200 ${
                        answer === "yes"
                          ? "border-accent-100 bg-accent-50/50"
                          : answer === "no"
                            ? "border-danger-100 bg-danger-50/50"
                            : "border-warning-100 bg-warning-50/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex-shrink-0 rounded-full p-1.5 ${status.bgColour} ${status.colour}`}>
                          {status.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900">{item.label}</h3>
                          <p className="mt-1 text-xs text-slate-500 font-mono">{item.legalRef}</p>

                          {isIssue && (
                            <>
                              <div className="mt-3 rounded-lg bg-white/80 p-3 border border-slate-100">
                                <p className="text-sm text-slate-700">
                                  <span className="font-semibold text-danger-600">Penalty: </span>
                                  {item.penalty}
                                </p>
                              </div>
                              <div className="mt-2 rounded-lg bg-white/80 p-3 border border-slate-100">
                                <p className="text-sm text-slate-700">
                                  <span className="font-semibold text-primary-600">Action needed: </span>
                                  {item.action}
                                </p>
                              </div>
                            </>
                          )}

                          {answer === "yes" && (
                            <p className="mt-2 text-sm text-accent-700">
                              Compliant. {item.validityPeriod}.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Penalties Table */}
            <div className="animate-slide-up rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm mb-8" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="h-6 w-6 text-danger-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                Penalties for Non-Compliance
              </h2>

              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-2 font-semibold text-slate-700">Requirement</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-700">Fine</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-700 hidden sm:table-cell">Criminal?</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-700 hidden md:table-cell">Other Consequences</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PENALTY_TABLE.map((row) => (
                      <tr key={row.requirement} className="border-b border-slate-100 last:border-b-0">
                        <td className="py-3 px-2 font-medium text-slate-900">{row.requirement}</td>
                        <td className="py-3 px-2 text-danger-600 font-medium">{row.fine}</td>
                        <td className="py-3 px-2 text-slate-600 hidden sm:table-cell">{row.criminal}</td>
                        <td className="py-3 px-2 text-slate-600 hidden md:table-cell">{row.other}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div className="animate-slide-up rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm mb-8" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Key Compliance Timelines
              </h2>

              <div className="space-y-4">
                {[
                  {
                    title: "Gas Safety Certificate",
                    period: "Annual renewal",
                    detail: "Must be renewed every 12 months. You can renew up to 2 months early without losing the existing expiry date.",
                    icon: "🔥",
                  },
                  {
                    title: "EPC",
                    period: "Valid for 10 years",
                    detail: "Minimum E rating currently required. From 2028, a minimum C rating will be needed for new tenancies (and all tenancies thereafter).",
                    icon: "⚡",
                  },
                  {
                    title: "Deposit Protection",
                    period: "Within 30 days of receipt",
                    detail: "Must protect the deposit and serve prescribed information within 30 days. The deposit must stay protected for the entire tenancy.",
                    icon: "🏦",
                  },
                  {
                    title: "EICR (Electrical Safety)",
                    period: "Every 5 years",
                    detail: "Must be provided to tenants within 28 days of the inspection, and to new tenants before they move in.",
                    icon: "🔌",
                  },
                  {
                    title: "Smoke and CO Alarms",
                    period: "Check at start of each tenancy",
                    detail: "Test all alarms on the first day of each new tenancy. Smoke alarms should be replaced every 10 years; CO alarms per manufacturer guidance.",
                    icon: "🚨",
                  },
                  {
                    title: "HMO Licence",
                    period: "Typically 5 years",
                    detail: "Licence duration varies by council. Apply well in advance as processing can take several months. Operating without a licence is a criminal offence.",
                    icon: "📋",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition-colors">
                    <span className="text-2xl flex-shrink-0" role="img" aria-label={item.title}>
                      {item.icon}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{item.title}</h3>
                        <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Get Compliant CTAs */}
            <div className="animate-slide-up rounded-2xl border border-slate-100 bg-gradient-to-br from-primary-50 to-white p-6 sm:p-8 shadow-sm" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
                Get Compliant
              </h2>
              <p className="text-slate-600 text-center mb-6">
                Take action now to protect yourself, your tenants, and your investment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    /* Generate a simple text checklist and download */
                    const lines = [
                      "LANDLORD COMPLIANCE CHECKLIST",
                      `Property: ${formData.postcode || "Not specified"}`,
                      `Property Type: ${formData.propertyType === "hmo" ? "HMO" : formData.propertyType === "single" ? "Single Let" : "Not sure"}`,
                      `Tenants: ${formData.tenantCount}`,
                      `Compliance Score: ${score}/100 (${scoreInfo.label})`,
                      "",
                      "REQUIREMENTS:",
                      "",
                    ];
                    COMPLIANCE_ITEMS.forEach((item) => {
                      const answer = formData[item.key];
                      const mark = answer === "yes" ? "[PASS]" : answer === "no" ? "[FAIL]" : "[CHECK]";
                      lines.push(`${mark} ${item.label}`);
                      lines.push(`    Law: ${item.legalRef}`);
                      lines.push(`    Validity: ${item.validityPeriod}`);
                      if (answer !== "yes") {
                        lines.push(`    Penalty: ${item.penalty}`);
                        lines.push(`    Action: ${item.action}`);
                      }
                      lines.push("");
                    });
                    lines.push("ADDITIONAL REQUIREMENTS (not scored):");
                    lines.push("");
                    lines.push("[ ] Right to Rent checks completed (Immigration Act 2014, up to £3,000 per tenant)");
                    lines.push("[ ] Property is fit for human habitation (Homes (Fitness for Human Habitation) Act 2018)");
                    lines.push("[ ] Legionella risk assessment completed");
                    lines.push("[ ] Buildings and contents insurance in place");
                    lines.push("[ ] Mortgage lender consent to let obtained (if applicable)");
                    lines.push("");
                    lines.push("Generated by RenterCheck (rentercheck.vercel.app)");

                    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `compliance-checklist-${formData.postcode || "property"}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700 transition-all cursor-pointer"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Compliance Checklist
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                  </svg>
                  Check Another Property
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 rounded-2xl border border-warning-200 bg-warning-50 p-6 text-sm text-warning-800 leading-relaxed">
              <p className="font-semibold mb-2">Important Disclaimer</p>
              <p>
                This tool provides general guidance based on current English landlord and tenant law.
                It is not legal advice. Regulations may differ in Scotland, Wales, and Northern Ireland.
                Local councils may also impose additional licensing or safety requirements.
                For specific legal advice, contact a qualified solicitor, your local council,
                or <a href="https://www.nrla.org.uk" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-warning-900">NRLA</a> (National Residential Landlords Association).
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA (visible when results not shown) */}
      {!showResults && (
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Why Compliance Matters
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Non-compliant landlords face unlimited fines, criminal prosecution, and rent repayment orders.
                Tenants can also check whether their landlord is meeting legal obligations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  value: "£30,000",
                  label: "Maximum fine for missing EICR",
                  colour: "text-danger-600",
                },
                {
                  value: "12 months",
                  label: "Rent repayment for unlicensed HMO",
                  colour: "text-warning-600",
                },
                {
                  value: "3x deposit",
                  label: "Penalty for unprotected deposit",
                  colour: "text-primary-600",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-white p-6 text-center"
                >
                  <p className={`text-3xl sm:text-4xl font-extrabold ${stat.colour}`}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-slate-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/rights"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Learn more about tenant rights
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

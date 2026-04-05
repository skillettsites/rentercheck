"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

/* ----------------------------------------------------------------
   SEO
---------------------------------------------------------------- */
const PAGE_TITLE = "Report a Repair Issue | Free Letter Generator for Tenants";
const PAGE_DESCRIPTION =
  "Generate free formal letters to send your landlord or council about repair issues. Covers damp, heating, plumbing, electrical faults, pests, and more. Cites UK housing legislation including Awaab's Law.";

/* ----------------------------------------------------------------
   Types & Constants
---------------------------------------------------------------- */
const ISSUE_TYPES = [
  "Damp and mould",
  "Heating not working",
  "Hot water not working",
  "Plumbing leak",
  "Electrical fault",
  "Broken windows/doors",
  "Pest infestation",
  "Security issue (broken locks, etc.)",
  "Structural damage",
  "Other",
] as const;

const SEVERITY_OPTIONS = [
  {
    value: "emergency",
    label: "Emergency",
    desc: "Immediate risk to health or safety",
    icon: (
      <svg className="h-6 w-6 text-danger-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    value: "urgent",
    label: "Urgent",
    desc: "Needs fixing within days",
    icon: (
      <svg className="h-6 w-6 text-warning-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "non-urgent",
    label: "Non-urgent",
    desc: "Needs fixing but not immediately dangerous",
    icon: (
      <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-3.19A.75.75 0 006 12.638v6.724a.75.75 0 00.036.257l5.384-4.451zM21 12.638v6.724a.75.75 0 01-.036.257l-5.384-4.451 5.384-3.19a.75.75 0 00.036.66zm-1.5-1.5l-5.384 3.19-5.384-3.19a.75.75 0 00-.036-.66V5.25a.75.75 0 01.75-.75h9.75a.75.75 0 01.75.75v5.888a.75.75 0 00.036.66l.018-.01z" />
      </svg>
    ),
  },
] as const;

const DURATION_OPTIONS = [
  "Just noticed",
  "Days",
  "Weeks",
  "Months",
  "Over a year",
] as const;

interface Step1Data {
  issueType: string;
  otherIssue: string;
}

interface Step2Data {
  severity: string;
}

interface Step3Data {
  address: string;
  tenantName: string;
  landlordName: string;
  duration: string;
  reportedBefore: boolean | null;
  previousReportDate: string;
  description: string;
}

/* ----------------------------------------------------------------
   Letter Generation
---------------------------------------------------------------- */

function getRelevantLegislation(issueType: string): string {
  switch (issueType) {
    case "Damp and mould":
      return `Section 11 of the Landlord and Tenant Act 1985 requires you to keep the structure and exterior of the dwelling in repair. The Homes (Fitness for Human Habitation) Act 2018 requires the property to be fit for habitation throughout the tenancy. Awaab's Law further requires that damp and mould issues be acknowledged within 14 days and that emergency hazards be addressed within 24 hours.`;
    case "Heating not working":
    case "Hot water not working":
      return `Section 11 of the Landlord and Tenant Act 1985 specifically requires you to keep in repair and proper working order the installations for space heating and water heating. The Homes (Fitness for Human Habitation) Act 2018 also requires adequate heating provision.`;
    case "Plumbing leak":
      return `Section 11 of the Landlord and Tenant Act 1985 requires you to keep in repair and proper working order the installations for the supply of water, gas, and electricity, and for sanitation. This includes basins, sinks, baths, and sanitary conveniences.`;
    case "Electrical fault":
      return `Section 11 of the Landlord and Tenant Act 1985 requires you to keep in repair and proper working order the installations for the supply of electricity. Additionally, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require a valid EICR (Electrical Installation Condition Report) at least every 5 years.`;
    case "Broken windows/doors":
      return `Section 11 of the Landlord and Tenant Act 1985 requires you to keep the structure and exterior of the dwelling in repair, which includes windows and external doors. The Homes (Fitness for Human Habitation) Act 2018 also covers freedom from damp and adequate thermal insulation.`;
    case "Pest infestation":
      return `Under the Homes (Fitness for Human Habitation) Act 2018, a property must be free from conditions that make it unfit, which includes pest infestations. Under the Housing Health and Safety Rating System (HHSRS), domestic hygiene and pests are Category 1 hazards.`;
    case "Security issue (broken locks, etc.)":
      return `Section 11 of the Landlord and Tenant Act 1985 requires you to keep the structure and exterior of the dwelling in repair, which includes locks and security features. The Homes (Fitness for Human Habitation) Act 2018 also covers entry by intruders as a relevant factor.`;
    case "Structural damage":
      return `Section 11 of the Landlord and Tenant Act 1985 places an obligation on you to keep the structure and exterior of the dwelling-house in repair. This includes walls, foundations, roof, and load-bearing elements. The Housing Health and Safety Rating System (HHSRS) also considers structural collapse and falling elements.`;
    default:
      return `Section 11 of the Landlord and Tenant Act 1985 requires you to keep the structure and exterior of the dwelling in repair and to keep in proper working order the installations for heating, water, and sanitation. The Homes (Fitness for Human Habitation) Act 2018 further requires the property to be fit for habitation.`;
  }
}

function generateLetters(
  s1: Step1Data,
  s2: Step2Data,
  s3: Step3Data
): { title: string; description: string; content: string }[] {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const issueLabel = s1.issueType === "Other" ? s1.otherIssue : s1.issueType;
  const legislation = getRelevantLegislation(s1.issueType);
  const isEmergency = s2.severity === "emergency";
  const deadlineDays = isEmergency ? 7 : 14;
  const previousReport = s3.reportedBefore
    ? `\n\nI previously reported this issue on ${s3.previousReportDate || "[date of previous report]"}, but it has not been resolved.`
    : "";

  // Letter 1: Initial Request
  const letter1 = `Dear ${s3.landlordName || "[Landlord/Agent Name]"},

Re: Repair Request, ${issueLabel} at ${s3.address || "[Property Address]"}

I am writing to formally report a repair issue at the above property. The issue is: ${issueLabel.toLowerCase()}.

${s3.description || "[Description of the issue]"}

This issue has been present for: ${s3.duration.toLowerCase()}.${previousReport}

I would be grateful if you could arrange for this to be inspected and repaired at your earliest convenience.

Under Section 11 of the Landlord and Tenant Act 1985, you have a legal obligation to carry out repairs to the structure, exterior, and installations of the property. The Homes (Fitness for Human Habitation) Act 2018 also requires that the property remains fit for habitation throughout the tenancy.

I would appreciate your written response within 14 days confirming what action you intend to take and when repairs will be carried out.

Thank you for your attention to this matter.

Yours sincerely,
${s3.tenantName || "[Your Name]"}

Date: ${today}`;

  // Letter 2: Formal Notice
  const letter2 = `Dear ${s3.landlordName || "[Landlord/Agent Name]"},

Re: FORMAL NOTICE, Unresolved Repair Issue at ${s3.address || "[Property Address]"}

I am writing as a formal follow-up to my previous correspondence regarding ${issueLabel.toLowerCase()} at the above property.

I first reported this issue on [date of initial report]. Despite this, the issue remains unresolved.

${s3.description || "[Description of the issue]"}

I wish to remind you of your legal obligations:

${legislation}

Under the Housing Health and Safety Rating System (HHSRS), this issue may constitute a Category 1 or Category 2 hazard, which the local authority has a duty to take action on.

I am giving you ${deadlineDays} days from the date of this letter to:
1. Acknowledge this formal notice in writing
2. Provide a clear timeline for completing the necessary repairs
3. Begin the repair work

If I do not receive a satisfactory response within this timeframe, I will:
- Report the matter to the local council's environmental health department and request an inspection under the Housing Act 2004
- Contact Shelter for advice on further legal options
- Consider applying to the First-tier Tribunal (Property Chamber) for a determination

I am keeping a full record of all correspondence, photographs, and evidence relating to this matter.

Yours sincerely,
${s3.tenantName || "[Your Name]"}

Date: ${today}`;

  // Letter 3: Council Complaint
  const letter3 = `Dear Environmental Health Department,
${s3.address ? `[Council Name]` : "[Council Name]"}

Re: Request for Property Inspection, ${s3.address || "[Property Address]"}

I am a tenant at the above address and I am writing to request a formal inspection of my property under the Housing Act 2004.

I have been experiencing the following issue: ${issueLabel.toLowerCase()}.

${s3.description || "[Description of the issue]"}

This issue has been present for ${s3.duration.toLowerCase()}.

I have reported this issue to my landlord/managing agent (${s3.landlordName || "[Landlord/Agent Name]"}) on the following occasions:
- Initial report: [date of initial report]
- Formal notice: [date of formal notice]

Despite these reports, the issue remains unresolved and is affecting my health and wellbeing.

I am requesting that you:
1. Carry out an inspection of the property under Section 4 of the Housing Act 2004
2. Assess the property using the Housing Health and Safety Rating System (HHSRS)
3. Take appropriate enforcement action if Category 1 or Category 2 hazards are identified, which may include an Improvement Notice or Prohibition Order

I have documentary evidence including photographs, a timeline of the issue, and copies of all correspondence with my landlord, which I can provide upon request.

I would be grateful for a response confirming when an inspection can be arranged.

Yours faithfully,
${s3.tenantName || "[Your Name]"}
${s3.address || "[Property Address]"}

Date: ${today}`;

  return [
    {
      title: "Letter 1: Initial Request to Landlord",
      description: "Polite, professional first contact. Send this first and keep a copy.",
      content: letter1,
    },
    {
      title: "Letter 2: Formal Notice to Landlord",
      description: "Firmer follow-up citing specific legislation. Send if you get no response within 14 days.",
      content: letter2,
    },
    {
      title: "Letter 3: Council Complaint Template",
      description: "Request for environmental health inspection. Use if the landlord fails to act after your formal notice.",
      content: letter3,
    },
  ];
}

/* ----------------------------------------------------------------
   Sub-components
---------------------------------------------------------------- */

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isComplete = step < current;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-200 scale-110"
                  : isComplete
                  ? "bg-accent-500 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {isComplete ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                step
              )}
            </div>
            {step < total && (
              <div
                className={`h-0.5 w-8 sm:w-12 transition-colors duration-300 ${
                  isComplete ? "bg-accent-500" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-slate-700 mb-2">{children}</label>;
}

function LetterCard({
  title,
  description,
  content,
}: {
  title: string;
  description: string;
  content: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            copied
              ? "bg-accent-100 text-accent-700"
              : "bg-primary-600 text-white hover:bg-primary-700"
          }`}
        >
          {copied ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-4 sm:p-6 max-h-80 overflow-y-auto">
        <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Main Page
---------------------------------------------------------------- */
export default function ReportIssuePage() {
  const [step, setStep] = useState(1);

  const [step1, setStep1] = useState<Step1Data>({
    issueType: "",
    otherIssue: "",
  });

  const [step2, setStep2] = useState<Step2Data>({
    severity: "",
  });

  const [step3, setStep3] = useState<Step3Data>({
    address: "",
    tenantName: "",
    landlordName: "",
    duration: "",
    reportedBefore: null,
    previousReportDate: "",
    description: "",
  });

  const [letters, setLetters] = useState<
    { title: string; description: string; content: string }[]
  >([]);

  const canProceedStep1 =
    step1.issueType !== "" &&
    (step1.issueType !== "Other" || step1.otherIssue.trim() !== "");

  const canProceedStep2 = step2.severity !== "";

  const canProceedStep3 =
    step3.address.trim() !== "" &&
    step3.tenantName.trim() !== "" &&
    step3.duration !== "" &&
    step3.reportedBefore !== null &&
    step3.description.trim() !== "";

  const handleGenerate = useCallback(() => {
    const generated = generateLetters(step1, step2, step3);
    setLetters(generated);
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step1, step2, step3]);

  const goNext = () => {
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Report a Repair Issue
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Generate formal letters to send your landlord or council about repair issues in your rental property. Free, citing UK housing legislation.
            </p>
          </div>

          {/* Wizard Steps 1-3 */}
          {step <= 3 && (
            <>
              <StepIndicator current={step} total={3} />

              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm animate-fade-in">
                {/* Step 1: Issue Type */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">What&apos;s the issue?</h2>
                    <p className="text-sm text-slate-500 mb-4">Select the type of repair problem you need to report.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ISSUE_TYPES.map((issue) => (
                        <button
                          key={issue}
                          type="button"
                          onClick={() => setStep1({ ...step1, issueType: issue })}
                          className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all text-left ${
                            step1.issueType === issue
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {issue}
                        </button>
                      ))}
                    </div>

                    {step1.issueType === "Other" && (
                      <div className="animate-slide-up">
                        <FieldLabel>Please describe the issue</FieldLabel>
                        <input
                          type="text"
                          value={step1.otherIssue}
                          onChange={(e) => setStep1({ ...step1, otherIssue: e.target.value })}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                          placeholder="e.g. Roof tiles missing"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Severity */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">How severe is the issue?</h2>
                    <p className="text-sm text-slate-500 mb-4">This helps us set the right tone and timescales in your letters.</p>

                    <div className="space-y-3">
                      {SEVERITY_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setStep2({ severity: opt.value })}
                          className={`w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                            step2.severity === opt.value
                              ? "border-primary-500 bg-primary-50"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="shrink-0">{opt.icon}</div>
                          <div>
                            <p className={`font-semibold ${
                              step2.severity === opt.value ? "text-primary-700" : "text-slate-900"
                            }`}>
                              {opt.label}
                            </p>
                            <p className="text-sm text-slate-500 mt-0.5">{opt.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Your Details</h2>
                    <p className="text-sm text-slate-500 mb-4">We&apos;ll use these to populate your letters. Nothing is stored or sent anywhere.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <FieldLabel>Property address</FieldLabel>
                        <input
                          type="text"
                          value={step3.address}
                          onChange={(e) => setStep3({ ...step3, address: e.target.value })}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                          placeholder="Full address including postcode"
                        />
                      </div>

                      <div>
                        <FieldLabel>Your name</FieldLabel>
                        <input
                          type="text"
                          value={step3.tenantName}
                          onChange={(e) => setStep3({ ...step3, tenantName: e.target.value })}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <FieldLabel>Landlord / agent name (optional)</FieldLabel>
                        <input
                          type="text"
                          value={step3.landlordName}
                          onChange={(e) => setStep3({ ...step3, landlordName: e.target.value })}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                          placeholder="Their name or company"
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel>How long has this been an issue?</FieldLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {DURATION_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setStep3({ ...step3, duration: opt })}
                            className={`rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all ${
                              step3.duration === opt
                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Have you reported it before?</FieldLabel>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep3({ ...step3, reportedBefore: true })}
                          className={`flex-1 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                            step3.reportedBefore === true
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep3({ ...step3, reportedBefore: false })}
                          className={`flex-1 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                            step3.reportedBefore === false
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {step3.reportedBefore && (
                      <div className="animate-slide-up">
                        <FieldLabel>When did you last report it?</FieldLabel>
                        <input
                          type="date"
                          value={step3.previousReportDate}
                          onChange={(e) => setStep3({ ...step3, previousReportDate: e.target.value })}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                        />
                      </div>
                    )}

                    <div>
                      <FieldLabel>Brief description of the problem</FieldLabel>
                      <textarea
                        value={step3.description}
                        onChange={(e) => setStep3({ ...step3, description: e.target.value })}
                        rows={4}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none"
                        placeholder="Describe the issue in your own words. Include specific rooms, how long it has been happening, and any effects on you or the property."
                      />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={
                        (step === 1 && !canProceedStep1) ||
                        (step === 2 && !canProceedStep2)
                      }
                      className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={!canProceedStep3}
                      className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Generate My Letters
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Step 4: Results */}
          {step === 4 && letters.length > 0 && (
            <div className="space-y-8 animate-fade-in">
              {/* Success banner */}
              <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100">
                    <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-accent-900">Your Letters Are Ready</h2>
                <p className="text-sm text-accent-700 mt-2">
                  Three letters have been generated. Copy each one and replace the bracketed sections with your specific details before sending.
                </p>
              </div>

              {/* Letters */}
              {letters.map((letter, i) => (
                <LetterCard key={i} {...letter} />
              ))}

              {/* Evidence Checklist */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Evidence Checklist</h2>
                <p className="text-sm text-slate-500 mb-4">Gathering strong evidence is essential. Here is what to document:</p>
                <div className="space-y-3">
                  {[
                    "Photograph the issue from multiple angles with good lighting",
                    "Ensure your phone's date/time stamp is visible in photo metadata",
                    "Take a new photo each week to show progression",
                    "Screenshot any text messages or emails with your landlord",
                    "Keep a written log with dates of when you noticed changes",
                    "If the issue affects your health, get a GP letter linking symptoms to the property",
                    "Note the names and dates of any phone conversations with your landlord",
                    "Save copies of your tenancy agreement and any inspection reports",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-slate-300">
                        <span className="text-xs text-slate-400">{i + 1}</span>
                      </div>
                      <p className="text-sm text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escalation Timeline */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Escalation Timeline</h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200" />

                  <div className="space-y-6">
                    {[
                      {
                        label: "Report to landlord",
                        desc: "Send Letter 1 via email. Keep a copy.",
                        time: "Day 1",
                        color: "bg-primary-500",
                      },
                      {
                        label: "Wait 14 days",
                        desc: "Give your landlord a reasonable time to respond and arrange repairs.",
                        time: "Day 1-14",
                        color: "bg-primary-400",
                      },
                      {
                        label: "Formal notice",
                        desc: "If no response, send Letter 2 setting a firm deadline.",
                        time: "Day 15",
                        color: "bg-warning-500",
                      },
                      {
                        label: "Wait 7 days",
                        desc: "Allow a final window for the landlord to act.",
                        time: "Day 15-22",
                        color: "bg-warning-400",
                      },
                      {
                        label: "Council complaint",
                        desc: "Send Letter 3 to your local council's environmental health team.",
                        time: "Day 23",
                        color: "bg-orange-500",
                      },
                      {
                        label: "Council inspection",
                        desc: "The council will arrange an HHSRS inspection of your property.",
                        time: "Day 23-37",
                        color: "bg-orange-400",
                      },
                      {
                        label: "Tribunal",
                        desc: "If still unresolved, apply to the First-tier Tribunal (Property Chamber).",
                        time: "Day 38+",
                        color: "bg-danger-500",
                      },
                    ].map((item, i) => (
                      <div key={i} className="relative flex items-start gap-4 pl-2">
                        <div className={`relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${item.color}`}>
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                        <div className="flex-1 pb-1">
                          <div className="flex items-baseline gap-3">
                            <h3 className="font-semibold text-slate-900 text-sm">{item.label}</h3>
                            <span className="text-xs font-medium text-slate-400">{item.time}</span>
                          </div>
                          <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Know Your Rights */}
              <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-primary-900 mb-3">Know Your Rights</h2>
                <p className="text-sm text-primary-800 leading-relaxed mb-4">
                  As a tenant in England, you have strong legal protections. Your landlord cannot evict you in retaliation for reporting repairs (this is called a &quot;retaliatory eviction&quot; and is illegal under the Deregulation Act 2015).
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/rights"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
                  >
                    Read Our Full Rights Guide
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/damp-check"
                    className="inline-flex items-center gap-2 rounded-lg border border-primary-300 px-4 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-100 transition-colors"
                  >
                    Damp &amp; Mould Assessment
                  </Link>
                </div>
              </div>

              {/* Start Again */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setLetters([]);
                    setStep1({ issueType: "", otherIssue: "" });
                    setStep2({ severity: "" });
                    setStep3({
                      address: "",
                      tenantName: "",
                      landlordName: "",
                      duration: "",
                      reportedBefore: null,
                      previousReportDate: "",
                      description: "",
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Report a Different Issue
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

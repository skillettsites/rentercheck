"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

/* ----------------------------------------------------------------
   SEO
---------------------------------------------------------------- */
const PAGE_TITLE = "Damp & Mould Risk Assessment | Check Your Rental Property";
const PAGE_DESCRIPTION =
  "Free damp and mould risk assessment for UK tenants. Answer a few questions about your rental property and get a personalised risk score, your rights under Awaab's Law, and a template letter to send your landlord.";

/* ----------------------------------------------------------------
   Types & Constants
---------------------------------------------------------------- */
const PROPERTY_TYPES = [
  "Flat",
  "Terraced",
  "Semi-detached",
  "Detached",
  "Converted flat",
  "Maisonette",
] as const;

const PROPERTY_AGES = [
  "Pre-1919",
  "1919-1944",
  "1945-1964",
  "1965-1979",
  "1980-1999",
  "2000+",
] as const;

const BEDROOM_OPTIONS = ["1", "2", "3", "4", "5+"] as const;

const FLOOR_OPTIONS = [
  "Ground",
  "1st",
  "2nd",
  "3rd+",
  "Whole house",
] as const;

const MOULD_LOCATIONS = [
  "Bedroom walls",
  "Bedroom ceiling",
  "Bathroom",
  "Kitchen",
  "Living room",
  "Windows/frames",
  "Behind furniture",
] as const;

const HEATING_OPTIONS = [
  "Central heating (gas)",
  "Electric heaters",
  "Storage heaters",
  "Heat pump",
  "None",
] as const;

const EXTRACTOR_OPTIONS = [
  "Bathroom only",
  "Kitchen only",
  "Both",
  "Neither",
] as const;

const VENTILATION_OPTIONS = ["Good", "Adequate", "Poor"] as const;

const GLAZING_OPTIONS = ["Double", "Single", "Mix"] as const;

const TENURE_OPTIONS = [
  "Less than 6 months",
  "6-12 months",
  "1-3 years",
  "3+ years",
] as const;

const LANDLORD_RESPONSE_OPTIONS = [
  "Yes, fixed it",
  "Yes, but didn't fix",
  "No response",
  "Haven't reported",
] as const;

interface Step1Data {
  postcode: string;
  propertyType: string;
  propertyAge: string;
  bedrooms: string;
  floor: string;
}

interface Step2Data {
  visibleMould: boolean | null;
  mouldLocations: string[];
  dampPatches: boolean | null;
  mustySmell: boolean | null;
  condensation: boolean | null;
  peelingPaint: boolean | null;
}

interface Step3Data {
  heating: string;
  extractorFans: string;
  ventilation: string;
  glazing: string;
  roofIssues: string;
  risingDamp: string;
}

interface Step4Data {
  tenure: string;
  reportedToLandlord: boolean | null;
  landlordResponse: string;
  healthAffected: boolean | null;
  hasPhotos: boolean | null;
}

interface RiskResult {
  score: number;
  level: "low" | "moderate" | "high" | "severe";
  causes: string[];
}

function calculateRisk(
  s1: Step1Data,
  s2: Step2Data,
  s3: Step3Data,
  _s4: Step4Data
): RiskResult {
  let score = 0;
  const causes: string[] = [];

  // Visible mould: +25 base, +5 per additional location
  if (s2.visibleMould) {
    score += 25;
    const extraLocations = Math.max(0, s2.mouldLocations.length - 1);
    score += extraLocations * 5;
    if (s2.mouldLocations.length > 3) {
      causes.push(
        `Mould is present in ${s2.mouldLocations.length} areas of your property, indicating a widespread problem rather than an isolated patch.`
      );
    } else if (s2.mouldLocations.length > 0) {
      causes.push(
        `Visible mould in ${s2.mouldLocations.join(", ").toLowerCase()} suggests moisture is not being managed effectively.`
      );
    }
  }

  // Damp patches: +15
  if (s2.dampPatches) {
    score += 15;
    causes.push(
      "Damp patches or staining on walls can indicate penetrating damp, rising damp, or condensation build-up over time."
    );
  }

  // Musty smell: +10
  if (s2.mustySmell) {
    score += 10;
    causes.push(
      "A persistent musty smell often indicates hidden mould growth behind walls, under flooring, or in poorly ventilated spaces."
    );
  }

  // Condensation: +10
  if (s2.condensation) {
    score += 10;
    causes.push(
      "Regular condensation on windows means warm moist air is meeting cold surfaces. This creates the perfect environment for mould."
    );
  }

  // Peeling paint: +10
  if (s2.peelingPaint) {
    score += 10;
    causes.push(
      "Peeling wallpaper or paint is a sign of prolonged moisture exposure, which can harbour mould growth behind the surface."
    );
  }

  // Pre-1945 property: +10
  if (s1.propertyAge === "Pre-1919" || s1.propertyAge === "1919-1944") {
    score += 10;
    causes.push(
      "Older properties (pre-1945) typically lack modern damp-proof courses, cavity wall insulation, and adequate ventilation. These structural factors significantly increase damp risk."
    );
  }

  // No extractor fans: +10
  if (s3.extractorFans === "Neither") {
    score += 10;
    causes.push(
      "Without extractor fans in the bathroom or kitchen, moisture from cooking and bathing has no way to escape. This is a major contributor to condensation damp."
    );
  }

  // Single glazing: +10
  if (s3.glazing === "Single") {
    score += 10;
    causes.push(
      "Single-glazed windows are much colder than double-glazed ones, causing warm indoor air to condense on the glass and surrounding walls."
    );
  }

  // Poor ventilation: +10
  if (s3.ventilation === "Poor") {
    score += 10;
    causes.push(
      "Poor ventilation traps moisture inside the property. Without adequate airflow, humidity rises and condensation becomes inevitable."
    );
  }

  // Electric/no heating: +10
  if (s3.heating === "Electric heaters" || s3.heating === "None") {
    score += 10;
    causes.push(
      s3.heating === "None"
        ? "Having no heating system means the property cannot maintain a temperature that prevents condensation. Cold homes are damp homes."
        : "Portable electric heaters only warm a small area and are expensive to run. Tenants often underuse them, leaving much of the property cold and prone to condensation."
    );
  }

  // Ground floor flat: +5
  if (
    s1.floor === "Ground" &&
    (s1.propertyType === "Flat" || s1.propertyType === "Converted flat" || s1.propertyType === "Maisonette")
  ) {
    score += 5;
    causes.push(
      "Ground floor flats are more susceptible to rising damp from the ground and tend to be cooler, increasing condensation risk."
    );
  }

  // Roof/gutter issues: +10
  if (s3.roofIssues === "Yes") {
    score += 10;
    causes.push(
      "Roof or gutter problems allow rainwater to penetrate the building structure, causing penetrating damp that can affect walls and ceilings."
    );
  }

  // Cap at 100
  score = Math.min(100, score);

  let level: RiskResult["level"];
  if (score <= 25) level = "low";
  else if (score <= 50) level = "moderate";
  else if (score <= 75) level = "high";
  else level = "severe";

  return { score, level, causes };
}

const RISK_CONFIG = {
  low: {
    label: "Low Risk",
    color: "text-accent-700",
    bg: "bg-accent-50",
    border: "border-accent-200",
    barColor: "bg-accent-500",
    description:
      "Your property shows minimal signs of damp or mould risk. The conditions you described suggest the property is reasonably well maintained and ventilated. Continue to monitor, especially during colder months when condensation is more common.",
  },
  moderate: {
    label: "Moderate Risk",
    color: "text-warning-700",
    bg: "bg-warning-50",
    border: "border-warning-200",
    barColor: "bg-warning-500",
    description:
      "Your property has some risk factors for damp and mould. While the situation may not be urgent, these issues can worsen over time if left unaddressed. We recommend reporting the issues to your landlord and monitoring for changes.",
  },
  high: {
    label: "High Risk",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    barColor: "bg-orange-500",
    description:
      "Your property has significant damp and mould risk factors. This combination of issues is likely to worsen and could affect your health. You should report this to your landlord in writing as soon as possible and keep evidence of all communication.",
  },
  severe: {
    label: "Severe Risk",
    color: "text-danger-700",
    bg: "bg-danger-50",
    border: "border-danger-200",
    barColor: "bg-danger-500",
    description:
      "Your property shows severe damp and mould risk. Multiple serious factors are present, and this is likely already affecting the property's habitability and your health. Urgent action is required. Report to your landlord immediately and consider contacting your local council's environmental health team.",
  },
};

/* ----------------------------------------------------------------
   Components
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

function YesNoButtons({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex-1 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
          value === true
            ? "border-primary-500 bg-primary-50 text-primary-700"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
        }`}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex-1 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
          value === false
            ? "border-primary-500 bg-primary-50 text-primary-700"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
        }`}
      >
        No
      </button>
    </div>
  );
}

function ThreeWayButtons({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = ["Yes", "No", "Don't know"];
  return (
    <div className="flex gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all ${
            value === opt
              ? "border-primary-500 bg-primary-50 text-primary-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function ThreeWayNA({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = ["Yes", "No", "N/A"];
  return (
    <div className="flex gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all ${
            value === opt
              ? "border-primary-500 bg-primary-50 text-primary-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function SelectGrid({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div className={`grid gap-2 ${columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all text-left ${
            value === opt
              ? "border-primary-500 bg-primary-50 text-primary-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function CheckboxGrid({
  options,
  values,
  onChange,
}: {
  options: readonly string[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter((v) => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all text-left flex items-center gap-2 ${
            values.includes(opt)
              ? "border-primary-500 bg-primary-50 text-primary-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
              values.includes(opt)
                ? "border-primary-500 bg-primary-500"
                : "border-slate-300 bg-white"
            }`}
          >
            {values.includes(opt) && (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </div>
          {opt}
        </button>
      ))}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-slate-700 mb-2">{children}</label>;
}

function generateTemplateLetter(
  s1: Step1Data,
  result: RiskResult,
  s2: Step2Data
): string {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const issues: string[] = [];
  if (s2.visibleMould) issues.push(`visible mould in ${s2.mouldLocations.join(", ").toLowerCase()}`);
  if (s2.dampPatches) issues.push("damp patches and staining on walls");
  if (s2.condensation) issues.push("regular condensation on windows");
  if (s2.mustySmell) issues.push("a persistent musty smell");
  if (s2.peelingPaint) issues.push("peeling wallpaper or paint");

  const issueText = issues.length > 0 ? issues.join("; ") : "damp and mould conditions";

  return `Dear [Landlord/Agent Name],

Re: Damp and Mould at ${s1.postcode || "[Your Address]"}

I am writing to formally report damp and mould issues at the above property. I have identified the following problems: ${issueText}.

I have conducted a risk assessment which rates the property as "${RISK_CONFIG[result.level].label}" with a score of ${result.score}/100.

Under Section 11 of the Landlord and Tenant Act 1985, you are responsible for keeping the structure and exterior of the property in repair, including drains, gutters, and external pipes. You are also responsible for keeping in repair and proper working order the installations for space heating and water heating.

I also wish to draw your attention to Awaab's Law (Social Housing) and the updated Homes (Fitness for Human Habitation) Act 2018. Under these provisions:

- You must acknowledge this report within 14 days
- If this is an emergency hazard, you must begin repairs within 24 hours
- For non-emergency issues, repairs must be carried out within a reasonable period
- If you fail to act, I have the right to contact the local council's environmental health department

I have documented the issues with photographs and would appreciate your written response within 14 days confirming what action you intend to take.

If I do not receive a satisfactory response, I will escalate this matter to the local council and, if necessary, pursue legal remedies including applying to the First-tier Tribunal.

Yours sincerely,

[Your Name]

Date: ${today}`;
}

/* ----------------------------------------------------------------
   Main Page Component
---------------------------------------------------------------- */
export default function DampCheckPage() {
  const [step, setStep] = useState(1);

  const [step1, setStep1] = useState<Step1Data>({
    postcode: "",
    propertyType: "",
    propertyAge: "",
    bedrooms: "",
    floor: "",
  });

  const [step2, setStep2] = useState<Step2Data>({
    visibleMould: null,
    mouldLocations: [],
    dampPatches: null,
    mustySmell: null,
    condensation: null,
    peelingPaint: null,
  });

  const [step3, setStep3] = useState<Step3Data>({
    heating: "",
    extractorFans: "",
    ventilation: "",
    glazing: "",
    roofIssues: "",
    risingDamp: "",
  });

  const [step4, setStep4] = useState<Step4Data>({
    tenure: "",
    reportedToLandlord: null,
    landlordResponse: "",
    healthAffected: null,
    hasPhotos: null,
  });

  const [result, setResult] = useState<RiskResult | null>(null);
  const [letterCopied, setLetterCopied] = useState(false);

  const canProceedStep1 =
    step1.postcode.trim() !== "" &&
    step1.propertyType !== "" &&
    step1.propertyAge !== "" &&
    step1.bedrooms !== "" &&
    step1.floor !== "";

  const canProceedStep2 =
    step2.visibleMould !== null &&
    step2.dampPatches !== null &&
    step2.mustySmell !== null &&
    step2.condensation !== null &&
    step2.peelingPaint !== null;

  const canProceedStep3 =
    step3.heating !== "" &&
    step3.extractorFans !== "" &&
    step3.ventilation !== "" &&
    step3.glazing !== "" &&
    step3.roofIssues !== "";

  const canProceedStep4 =
    step4.tenure !== "" &&
    step4.reportedToLandlord !== null &&
    step4.healthAffected !== null &&
    step4.hasPhotos !== null;

  const handleSubmit = useCallback(() => {
    const risk = calculateRisk(step1, step2, step3, step4);
    setResult(risk);
    setStep(5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step1, step2, step3, step4]);

  const goNext = () => {
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyLetter = async () => {
    if (!result) return;
    const letter = generateTemplateLetter(step1, result, step2);
    try {
      await navigator.clipboard.writeText(letter);
      setLetterCopied(true);
      setTimeout(() => setLetterCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = letter;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setLetterCopied(true);
      setTimeout(() => setLetterCopied(false), 3000);
    }
  };

  const config = result ? RISK_CONFIG[result.level] : null;

  return (
    <>
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <meta property="og:title" content={PAGE_TITLE} />
      <meta property="og:description" content={PAGE_DESCRIPTION} />
      <meta property="og:url" content="https://rentercheck.vercel.app/damp-check" />
      <link rel="canonical" href="https://rentercheck.vercel.app/damp-check" />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Damp &amp; Mould Risk Assessment
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Answer a few questions about your rental property to get a personalised risk score, understand your rights under Awaab&apos;s Law, and get a template letter for your landlord.
            </p>
          </div>

          {/* Wizard Steps 1-4 */}
          {step <= 4 && (
            <>
              <StepIndicator current={step} total={4} />

              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm animate-fade-in">
                {/* Step 1: Property Details */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Property Details</h2>
                    <p className="text-sm text-slate-500 mb-4">Tell us about your rental property.</p>

                    <div>
                      <FieldLabel>Postcode</FieldLabel>
                      <input
                        type="text"
                        value={step1.postcode}
                        onChange={(e) => setStep1({ ...step1, postcode: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                        placeholder="e.g. SW1A 1AA"
                      />
                    </div>

                    <div>
                      <FieldLabel>Property type</FieldLabel>
                      <SelectGrid options={PROPERTY_TYPES} value={step1.propertyType} onChange={(v) => setStep1({ ...step1, propertyType: v })} columns={3} />
                    </div>

                    <div>
                      <FieldLabel>Property age</FieldLabel>
                      <SelectGrid options={PROPERTY_AGES} value={step1.propertyAge} onChange={(v) => setStep1({ ...step1, propertyAge: v })} columns={3} />
                    </div>

                    <div>
                      <FieldLabel>Number of bedrooms</FieldLabel>
                      <SelectGrid options={BEDROOM_OPTIONS} value={step1.bedrooms} onChange={(v) => setStep1({ ...step1, bedrooms: v })} columns={3} />
                    </div>

                    <div>
                      <FieldLabel>Which floor?</FieldLabel>
                      <SelectGrid options={FLOOR_OPTIONS} value={step1.floor} onChange={(v) => setStep1({ ...step1, floor: v })} columns={3} />
                    </div>
                  </div>
                )}

                {/* Step 2: Current Conditions */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Current Conditions</h2>
                    <p className="text-sm text-slate-500 mb-4">What can you see and smell in the property right now?</p>

                    <div>
                      <FieldLabel>Can you see any visible mould?</FieldLabel>
                      <YesNoButtons value={step2.visibleMould} onChange={(v) => setStep2({ ...step2, visibleMould: v })} />
                    </div>

                    {step2.visibleMould && (
                      <div className="animate-slide-up">
                        <FieldLabel>Where is the mould? (select all that apply)</FieldLabel>
                        <CheckboxGrid
                          options={MOULD_LOCATIONS}
                          values={step2.mouldLocations}
                          onChange={(v) => setStep2({ ...step2, mouldLocations: v })}
                        />
                      </div>
                    )}

                    <div>
                      <FieldLabel>Can you see damp patches or staining?</FieldLabel>
                      <YesNoButtons value={step2.dampPatches} onChange={(v) => setStep2({ ...step2, dampPatches: v })} />
                    </div>

                    <div>
                      <FieldLabel>Is there a musty smell?</FieldLabel>
                      <YesNoButtons value={step2.mustySmell} onChange={(v) => setStep2({ ...step2, mustySmell: v })} />
                    </div>

                    <div>
                      <FieldLabel>Do you see condensation on windows regularly?</FieldLabel>
                      <YesNoButtons value={step2.condensation} onChange={(v) => setStep2({ ...step2, condensation: v })} />
                    </div>

                    <div>
                      <FieldLabel>Any peeling wallpaper or paint?</FieldLabel>
                      <YesNoButtons value={step2.peelingPaint} onChange={(v) => setStep2({ ...step2, peelingPaint: v })} />
                    </div>
                  </div>
                )}

                {/* Step 3: Property Factors */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Property Factors</h2>
                    <p className="text-sm text-slate-500 mb-4">Details about heating, ventilation, and structural condition.</p>

                    <div>
                      <FieldLabel>What heating do you have?</FieldLabel>
                      <SelectGrid options={HEATING_OPTIONS} value={step3.heating} onChange={(v) => setStep3({ ...step3, heating: v })} columns={2} />
                    </div>

                    <div>
                      <FieldLabel>Do you have extractor fans?</FieldLabel>
                      <SelectGrid options={EXTRACTOR_OPTIONS} value={step3.extractorFans} onChange={(v) => setStep3({ ...step3, extractorFans: v })} />
                    </div>

                    <div>
                      <FieldLabel>How would you rate ventilation?</FieldLabel>
                      <SelectGrid options={VENTILATION_OPTIONS} value={step3.ventilation} onChange={(v) => setStep3({ ...step3, ventilation: v })} columns={3} />
                    </div>

                    <div>
                      <FieldLabel>Double or single glazed?</FieldLabel>
                      <SelectGrid options={GLAZING_OPTIONS} value={step3.glazing} onChange={(v) => setStep3({ ...step3, glazing: v })} columns={3} />
                    </div>

                    <div>
                      <FieldLabel>Any known roof or gutter issues?</FieldLabel>
                      <ThreeWayButtons value={step3.roofIssues} onChange={(v) => setStep3({ ...step3, roofIssues: v })} />
                    </div>

                    <div>
                      <FieldLabel>Ground floor: any rising damp signs?</FieldLabel>
                      <ThreeWayNA value={step3.risingDamp} onChange={(v) => setStep3({ ...step3, risingDamp: v })} />
                    </div>
                  </div>
                )}

                {/* Step 4: Your Situation */}
                {step === 4 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Your Situation</h2>
                    <p className="text-sm text-slate-500 mb-4">A few questions about your experience so far.</p>

                    <div>
                      <FieldLabel>How long have you lived here?</FieldLabel>
                      <SelectGrid options={TENURE_OPTIONS} value={step4.tenure} onChange={(v) => setStep4({ ...step4, tenure: v })} />
                    </div>

                    <div>
                      <FieldLabel>Have you reported this to your landlord?</FieldLabel>
                      <YesNoButtons value={step4.reportedToLandlord} onChange={(v) => setStep4({ ...step4, reportedToLandlord: v })} />
                    </div>

                    {step4.reportedToLandlord && (
                      <div className="animate-slide-up">
                        <FieldLabel>If yes, did they respond?</FieldLabel>
                        <SelectGrid options={LANDLORD_RESPONSE_OPTIONS} value={step4.landlordResponse} onChange={(v) => setStep4({ ...step4, landlordResponse: v })} />
                      </div>
                    )}

                    <div>
                      <FieldLabel>Has it affected your health?</FieldLabel>
                      <YesNoButtons value={step4.healthAffected} onChange={(v) => setStep4({ ...step4, healthAffected: v })} />
                    </div>

                    <div>
                      <FieldLabel>Do you have photos as evidence?</FieldLabel>
                      <YesNoButtons value={step4.hasPhotos} onChange={(v) => setStep4({ ...step4, hasPhotos: v })} />
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
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

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={
                        (step === 1 && !canProceedStep1) ||
                        (step === 2 && !canProceedStep2) ||
                        (step === 3 && !canProceedStep3)
                      }
                      className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canProceedStep4}
                      className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Get My Risk Assessment
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Step 5: Results */}
          {step === 5 && result && config && (
            <div className="space-y-8 animate-fade-in">
              {/* Risk Score Card */}
              <div className={`rounded-2xl border ${config.border} ${config.bg} p-6 sm:p-8`}>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Your Risk Score</p>
                  <p className={`mt-2 text-6xl font-extrabold ${config.color}`}>{result.score}</p>
                  <p className="text-sm text-slate-500 mt-1">out of 100</p>
                  <p className={`mt-3 text-2xl font-bold ${config.color}`}>{config.label}</p>
                </div>

                {/* Progress bar */}
                <div className="mt-6 mx-auto max-w-md">
                  <div className="relative h-4 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full ${config.barColor} transition-all duration-1000 ease-out`}
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                    <span>Severe</span>
                  </div>
                </div>
              </div>

              {/* 1. Your Risk Level */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-3">Your Risk Level</h2>
                <p className="text-slate-600 leading-relaxed">{config.description}</p>
              </div>

              {/* 2. Likely Causes */}
              {result.causes.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Likely Causes</h2>
                  <div className="space-y-3">
                    {result.causes.map((cause, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warning-100">
                          <svg className="h-3.5 w-3.5 text-warning-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                          </svg>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{cause}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Awaab's Law */}
              <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-primary-900 mb-4">Your Rights Under Awaab&apos;s Law</h2>
                <p className="text-primary-800 text-sm leading-relaxed mb-4">
                  Awaab&apos;s Law was introduced following the death of two-year-old Awaab Ishak from prolonged mould exposure in his family&apos;s social housing. It sets clear timescales that landlords must follow when tenants report damp and mould.
                </p>
                <div className="space-y-3">
                  {[
                    { time: "14 days", text: "Your landlord must acknowledge your report and arrange an inspection" },
                    { time: "24 hours", text: "For emergency hazards (e.g. severe mould affecting breathing), the landlord must begin repairs" },
                    { time: "Reasonable period", text: "For non-emergency issues, repairs must be completed within a reasonable timeframe" },
                    { time: "If no action", text: "You have the right to contact your local council's environmental health department, who can order the landlord to act" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/60 rounded-lg p-3">
                      <span className="inline-flex shrink-0 items-center rounded-md bg-primary-600 px-2.5 py-1 text-xs font-bold text-white">
                        {item.time}
                      </span>
                      <p className="text-primary-800 text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. What To Do Next */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">What To Do Next</h2>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Document everything",
                      desc: "Take clear photos of all damp and mould with timestamps. Keep a written log of when you first noticed the problem and how it has progressed. Save any messages or emails with your landlord.",
                    },
                    {
                      step: "2",
                      title: "Report to your landlord in writing",
                      desc: "Send a formal letter or email to your landlord describing the issue. Keep a copy for your records. Use our template letter below, or use our report issue tool for a more detailed letter.",
                      link: "/report-issue",
                      linkText: "Go to Report Issue tool",
                    },
                    {
                      step: "3",
                      title: "If no response within 14 days, contact the council",
                      desc: "Your local council's environmental health team can inspect the property and issue an improvement notice. Search for your council's environmental health contact online.",
                    },
                    {
                      step: "4",
                      title: "If still unresolved, consider tribunal or legal action",
                      desc: "You can apply to the First-tier Tribunal (Property Chamber) for a ruling. You may also be able to claim compensation. Shelter and Citizens Advice can help you understand your options.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                        {item.link && (
                          <Link
                            href={item.link}
                            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                          >
                            {item.linkText}
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Template Letter */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Template Letter to Landlord</h2>
                  <button
                    type="button"
                    onClick={copyLetter}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      letterCopied
                        ? "bg-accent-100 text-accent-700"
                        : "bg-primary-600 text-white hover:bg-primary-700"
                    }`}
                  >
                    {letterCopied ? (
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
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 sm:p-6">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
                    {generateTemplateLetter(step1, result, step2)}
                  </pre>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Replace the bracketed sections with your details before sending. Always keep a copy and send via email so you have a record.
                </p>
              </div>

              {/* 6. Useful Contacts */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Useful Contacts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Shelter Helpline",
                      desc: "Free housing advice for England",
                      contact: "0808 800 4444",
                      url: "https://www.shelter.org.uk",
                    },
                    {
                      name: "Citizens Advice",
                      desc: "Free, confidential advice on housing rights",
                      contact: "0800 144 8848",
                      url: "https://www.citizensadvice.org.uk",
                    },
                    {
                      name: "Environmental Health",
                      desc: "Contact your local council to request a property inspection",
                      contact: "Search: [your council] environmental health",
                      url: "https://www.gov.uk/find-local-council",
                    },
                    {
                      name: "Housing Ombudsman",
                      desc: "For social housing tenants with unresolved complaints",
                      contact: "0300 111 3000",
                      url: "https://www.housing-ombudsman.org.uk",
                    },
                  ].map((c) => (
                    <a
                      key={c.name}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border border-slate-200 p-4 transition-all hover:shadow-md hover:border-primary-200"
                    >
                      <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">{c.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{c.desc}</p>
                      <p className="text-sm font-medium text-primary-600 mt-2">{c.contact}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Start Again */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setResult(null);
                    setStep1({ postcode: "", propertyType: "", propertyAge: "", bedrooms: "", floor: "" });
                    setStep2({ visibleMould: null, mouldLocations: [], dampPatches: null, mustySmell: null, condensation: null, peelingPaint: null });
                    setStep3({ heating: "", extractorFans: "", ventilation: "", glazing: "", roofIssues: "", risingDamp: "" });
                    setStep4({ tenure: "", reportedToLandlord: null, landlordResponse: "", healthAffected: null, hasPhotos: null });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Start a New Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

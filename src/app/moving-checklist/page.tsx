"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";

/* ----------------------------------------------------------------
   SEO
---------------------------------------------------------------- */
const PAGE_TITLE = "Moving Into a Rental: Complete Checklist | RenterCheck";
const PAGE_DESCRIPTION =
  "Free interactive moving checklist for UK tenants. Track every task from viewing to settled, with links to tools, rights info, and deadline reminders. Save your progress automatically.";

/* ----------------------------------------------------------------
   Data Types
---------------------------------------------------------------- */
interface ChecklistItem {
  id: string;
  task: string;
  explanation: string;
  deadline?: string;
  link?: { href: string; label: string; external?: boolean };
}

interface ChecklistSection {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItem[];
}

/* ----------------------------------------------------------------
   Checklist Data
---------------------------------------------------------------- */
const SECTIONS: ChecklistSection[] = [
  {
    id: "before-sign",
    title: "Before You Sign",
    icon: "📋",
    items: [
      {
        id: "bs-1",
        task: "Check the property's safety report",
        explanation:
          "Enter the postcode to check EPC rating, local crime data, flood risk, and more.",
        deadline: "Before viewing or signing",
        link: { href: "/check", label: "Check Property" },
      },
      {
        id: "bs-2",
        task: "Verify landlord compliance",
        explanation:
          "Check if the landlord has valid gas safety, deposit protection, EPC, and other legal requirements.",
        deadline: "Before signing",
        link: { href: "/landlord-check", label: "Landlord Compliance Checker" },
      },
      {
        id: "bs-3",
        task: "Check if rent is fair for the area",
        explanation:
          "Compare the asking rent against local median rents to make sure you are not overpaying.",
        deadline: "Before signing",
        link: { href: "/fair-rent", label: "Fair Rent Calculator" },
      },
      {
        id: "bs-4",
        task: "Calculate total monthly cost",
        explanation:
          "Do not forget council tax, utility bills, broadband, and contents insurance on top of rent.",
        deadline: "Before signing",
        link: { href: "/calculator", label: "Cost Calculator" },
      },
      {
        id: "bs-5",
        task: "Check if the property is an HMO",
        explanation:
          "If you will be sharing with others from different households, the property may need an HMO licence.",
        deadline: "Before signing",
        link: { href: "/hmo-check", label: "HMO Licence Checker" },
      },
      {
        id: "bs-6",
        task: "Assess damp and mould risk",
        explanation:
          "Look for visible mould, condensation, musty smells, and peeling paint during viewings.",
        deadline: "During viewing",
        link: { href: "/damp-check", label: "Damp Risk Assessment" },
      },
      {
        id: "bs-7",
        task: "Read and understand your tenancy agreement",
        explanation:
          "Check break clauses, notice periods, restrictions on pets or guests, and any unfair terms.",
        deadline: "Before signing",
      },
      {
        id: "bs-8",
        task: "Verify landlord identity",
        explanation:
          "Ask for proof of ownership or managing agent credentials. Check they are who they say they are.",
        deadline: "Before paying any money",
      },
    ],
  },
  {
    id: "moving-day",
    title: "Moving Day",
    icon: "📦",
    items: [
      {
        id: "md-1",
        task: "Take dated photos of every room",
        explanation:
          "Document any existing damage, marks, or wear before you move your belongings in. Include timestamps.",
      },
      {
        id: "md-2",
        task: "Read meter readings (gas, electric, water)",
        explanation:
          "Photograph each meter with the date visible. You will need these to set up your accounts.",
      },
      {
        id: "md-3",
        task: "Check smoke alarms work on every floor",
        explanation:
          "Press the test button on each alarm. Required by law since 2022.",
      },
      {
        id: "md-4",
        task: "Check CO alarms near gas appliances",
        explanation:
          "Carbon monoxide alarms are required by law near any fixed combustion appliance (boiler, gas fire).",
      },
      {
        id: "md-5",
        task: "Receive keys for all locks",
        explanation:
          "Front door, back door, window locks, communal areas, meter cupboards, and any garage or shed.",
      },
      {
        id: "md-6",
        task: "Sign and keep a copy of the inventory",
        explanation:
          "Go through it carefully and note any discrepancies immediately. This protects your deposit.",
      },
      {
        id: "md-7",
        task: "Check all appliances work",
        explanation:
          "Test the oven, hob, fridge, washing machine, boiler, and any other included appliances.",
      },
    ],
  },
  {
    id: "first-week",
    title: "Within First Week",
    icon: "🏠",
    items: [
      {
        id: "fw-1",
        task: "Set up gas and electricity",
        explanation:
          "Contact your preferred supplier with your meter readings. Compare tariffs to get the best deal.",
        link: {
          href: "https://www.octopus.energy",
          label: "Compare at Octopus Energy",
          external: true,
        },
      },
      {
        id: "fw-2",
        task: "Set up water",
        explanation:
          "Contact your water company. You cannot switch water suppliers; it is based on your area.",
      },
      {
        id: "fw-3",
        task: "Set up broadband",
        explanation:
          "Compare deals and check which providers service your area. Contracts typically run 12-24 months.",
        link: {
          href: "https://www.broadbandchoices.co.uk",
          label: "Compare Broadband Deals",
          external: true,
        },
      },
      {
        id: "fw-4",
        task: "Set up contents insurance",
        explanation:
          "Your landlord's building insurance does not cover your personal belongings. Contents insurance is relatively cheap.",
      },
      {
        id: "fw-5",
        task: "Register for council tax",
        explanation:
          "Contact your local council. Apply for single person discount (25% off) if you live alone.",
      },
      {
        id: "fw-6",
        task: "Get TV licence (if needed)",
        explanation:
          "Required if you watch live TV on any channel or use BBC iPlayer. Not needed for other streaming services.",
      },
    ],
  },
  {
    id: "within-30-days",
    title: "Within 30 Days",
    icon: "📅",
    items: [
      {
        id: "td-1",
        task: "Confirm deposit is protected",
        explanation:
          "Your deposit must be protected in an approved scheme within 30 days: DPS, MyDeposits, or TDS. If not, the landlord cannot serve a Section 21 notice and you may be entitled to 1-3x your deposit in compensation.",
        deadline: "Check within 30 days of paying",
      },
      {
        id: "td-2",
        task: "Receive prescribed information about deposit",
        explanation:
          "The landlord must give you written details of which scheme protects your deposit, how to get it back, and what to do if there is a dispute.",
        deadline: "Within 30 days of tenancy start",
      },
      {
        id: "td-3",
        task: "Receive 'How to Rent' guide",
        explanation:
          "The landlord must provide the current version from GOV.UK. Without it, they cannot use Section 21 eviction.",
        deadline: "At or before tenancy start",
        link: {
          href: "https://www.gov.uk/government/publications/how-to-rent",
          label: "Download from GOV.UK",
          external: true,
        },
      },
      {
        id: "td-4",
        task: "Receive gas safety certificate",
        explanation:
          "A copy of the current Gas Safe certificate must be provided within 28 days of the annual check.",
        deadline: "Within 28 days",
      },
      {
        id: "td-5",
        task: "Receive EPC certificate",
        explanation:
          "The property must have a minimum E rating (C from 2028). The landlord must provide a copy before you move in.",
        deadline: "Before moving in",
      },
      {
        id: "td-6",
        task: "Receive electrical safety report (EICR)",
        explanation:
          "A copy of the Electrical Installation Condition Report must be given within 28 days of the inspection. Must be renewed every 5 years.",
        deadline: "Within 28 days",
      },
    ],
  },
  {
    id: "first-month",
    title: "Within First Month",
    icon: "✉",
    items: [
      {
        id: "fm-1",
        task: "Register with a local GP",
        explanation: "Find your nearest surgery and register as a new patient.",
      },
      {
        id: "fm-2",
        task: "Register to vote (electoral roll)",
        explanation:
          "Important for your credit score and civic participation. Register at gov.uk/register-to-vote.",
        link: {
          href: "https://www.gov.uk/register-to-vote",
          label: "Register to Vote",
          external: true,
        },
      },
      {
        id: "fm-3",
        task: "Update address with DVLA",
        explanation:
          "A legal requirement; you must update your driving licence address within 28 days of moving.",
        deadline: "Within 28 days",
        link: {
          href: "https://www.gov.uk/change-address-driving-licence",
          label: "Update DVLA Address",
          external: true,
        },
      },
      {
        id: "fm-4",
        task: "Update address with bank",
        explanation:
          "Most banks allow you to update online or via their app. Update all accounts and credit cards.",
      },
      {
        id: "fm-5",
        task: "Update address with employer and HMRC",
        explanation:
          "Make sure your tax records and payslips go to the right place.",
      },
      {
        id: "fm-6",
        task: "Set up mail redirect with Royal Mail",
        explanation:
          "Catch anything still being sent to your old address. Redirect costs from around £35 for 3 months.",
        link: {
          href: "https://www.royalmail.com/personal/receiving-mail/redirection",
          label: "Set Up Redirect",
          external: true,
        },
      },
    ],
  },
  {
    id: "ongoing",
    title: "Ongoing",
    icon: "🔄",
    items: [
      {
        id: "og-1",
        task: "Keep a repairs log",
        explanation:
          "Record the date, issue, who you contacted, and their response. This is essential evidence if problems escalate.",
      },
      {
        id: "og-2",
        task: "Save all communication with landlord",
        explanation:
          "Keep emails, text messages, letters, and any written responses. Follow up phone calls with a confirming email.",
      },
      {
        id: "og-3",
        task: "Check your deposit is still protected (annually)",
        explanation:
          "Use the scheme websites (DPS, MyDeposits, TDS) to verify your deposit is still registered.",
      },
      {
        id: "og-4",
        task: "Review tenancy before renewal",
        explanation:
          "Check for unfair terms, rent increases, and whether the agreement still suits your needs.",
      },
    ],
  },
];

const STORAGE_KEY = "rentercheck-moving-checklist";

/* ----------------------------------------------------------------
   Main Component
---------------------------------------------------------------- */
export default function MovingChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setChecked(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    // Expand all sections by default
    const initial: Record<string, boolean> = {};
    for (const section of SECTIONS) {
      initial[section.id] = true;
    }
    setExpandedSections(initial);
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
      } catch {
        // Storage full or unavailable
      }
    }
  }, [checked, mounted]);

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }, []);

  const totalItems = useMemo(
    () => SECTIONS.reduce((acc, s) => acc + s.items.length, 0),
    []
  );

  const completedItems = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );

  const progressPercent = useMemo(
    () => (totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0),
    [completedItems, totalItems]
  );

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the entire checklist? This cannot be undone."
      )
    ) {
      setChecked({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const sectionProgress = useCallback(
    (section: ChecklistSection) => {
      const done = section.items.filter((item) => checked[item.id]).length;
      return { done, total: section.items.length };
    },
    [checked]
  );

  return (
    <>
      {/* Dynamic head */}
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <meta property="og:title" content={PAGE_TITLE} />
      <meta property="og:description" content={PAGE_DESCRIPTION} />
      <link
        rel="canonical"
        href="https://rentercheck.vercel.app/moving-checklist"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Moving Into a Rental: Complete Checklist
          </h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Everything you need to do before, during, and after moving into a
            rental property. Your progress is saved automatically.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="sticky top-16 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-200/60">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              {completedItems} of {totalItems} tasks complete
            </span>
            <span className="text-sm font-bold text-primary-700">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercent}%`,
                background:
                  progressPercent === 100
                    ? "linear-gradient(90deg, #059669, #10b981)"
                    : "linear-gradient(90deg, #2563eb, #3b82f6)",
              }}
            />
          </div>
          {progressPercent === 100 && (
            <p className="text-sm text-accent-600 font-medium mt-2 text-center animate-fade-in">
              All done! You are fully settled in.
            </p>
          )}
        </div>
      </section>

      {/* Checklist Sections */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-4">
          {SECTIONS.map((section) => {
            const { done, total } = sectionProgress(section);
            const isExpanded = expandedSections[section.id] ?? true;
            const isComplete = done === total;

            return (
              <div
                key={section.id}
                className={`glass-card overflow-hidden transition-all duration-300 ${
                  isComplete ? "ring-2 ring-accent-200" : ""
                }`}
              >
                {/* Section Header */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">
                      {section.icon}
                    </span>
                    <div className="text-left">
                      <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                        {section.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {done} of {total} complete
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isComplete && (
                      <span className="text-xs font-medium bg-accent-100 text-accent-700 px-2.5 py-1 rounded-full">
                        Done
                      </span>
                    )}
                    <svg
                      className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </button>

                {/* Section Items */}
                {isExpanded && (
                  <div className="border-t border-slate-100">
                    {section.items.map((item) => {
                      const isDone = checked[item.id] ?? false;
                      return (
                        <div
                          key={item.id}
                          className={`flex gap-3 sm:gap-4 p-4 sm:px-6 sm:py-4 border-b border-slate-50 last:border-b-0 transition-colors ${
                            isDone ? "bg-accent-50/40" : "hover:bg-slate-50/50"
                          }`}
                        >
                          {/* Checkbox */}
                          <button
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            className={`mt-0.5 shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                              isDone
                                ? "bg-accent-500 border-accent-500"
                                : "border-slate-300 hover:border-primary-400"
                            }`}
                            aria-label={`Mark "${item.task}" as ${
                              isDone ? "incomplete" : "complete"
                            }`}
                          >
                            {isDone && (
                              <svg
                                className="h-3 w-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            )}
                          </button>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium transition-all ${
                                isDone
                                  ? "text-slate-400 line-through"
                                  : "text-slate-800"
                              }`}
                            >
                              {item.task}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {item.explanation}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {item.deadline && (
                                <span className="inline-flex items-center gap-1 text-xs bg-warning-50 text-warning-700 px-2 py-0.5 rounded-full border border-warning-200">
                                  <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                  {item.deadline}
                                </span>
                              )}
                              {item.link && (
                                <Link
                                  href={item.link.href}
                                  target={
                                    item.link.external ? "_blank" : undefined
                                  }
                                  rel={
                                    item.link.external
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium"
                                >
                                  {item.link.label}
                                  {item.link.external ? (
                                    <svg
                                      className="h-3 w-3"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="h-3 w-3"
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
                                  )}
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            <Link
              href="/rights"
              className="glass-card p-5 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚖</span>
                <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                  Know Your Rights
                </h3>
              </div>
              <p className="text-sm text-slate-600">
                Understand your legal rights as a tenant, from deposit
                protection to repair obligations.
              </p>
            </Link>

            <Link
              href="/report-issue"
              className="glass-card p-5 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🛡</span>
                <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                  Need Help?
                </h3>
              </div>
              <p className="text-sm text-slate-600">
                Report issues, get template letters, and find out where to
                escalate problems.
              </p>
            </Link>
          </div>

          {/* Reset Button */}
          <div className="text-center pt-4 pb-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-slate-400 hover:text-danger-600 transition-colors cursor-pointer"
            >
              Reset Checklist
            </button>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Moving Into a Rental Property Checklist",
            description: PAGE_DESCRIPTION,
            url: "https://rentercheck.vercel.app/moving-checklist",
            step: SECTIONS.flatMap((section) =>
              section.items.map((item) => ({
                "@type": "HowToStep",
                name: item.task,
                text: item.explanation,
              }))
            ),
          }),
        }}
      />
    </>
  );
}

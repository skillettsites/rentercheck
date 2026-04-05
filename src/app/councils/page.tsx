import type { Metadata } from "next";
import Link from "next/link";
import ROICalculator from "./ROICalculator";
import { getAllCouncils } from "@/data/councils";

export const metadata: Metadata = {
  title: "RenterCheck for Councils | PRS Enforcement Platform",
  description:
    "Help your council housing team enforce private rented sector standards. Automated compliance screening, HMO detection, tenant complaint triage, and PRS Database readiness. Built for local authorities.",
  openGraph: {
    title: "RenterCheck for Councils | PRS Enforcement Platform",
    description:
      "Smarter PRS enforcement for local authorities. Reduce costs, increase compliance rates, and prepare for the PRS Database.",
    url: "https://rentercheck.vercel.app/councils",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
};

const problems = [
  {
    stat: "4.6M",
    desc: "Private rented households in England need oversight",
  },
  {
    stat: "2%",
    desc: "Of non-compliant landlords currently face enforcement action",
  },
  {
    stat: "3-5",
    desc: "Average council housing team officers covering 10,000+ PRS properties",
  },
];

const features = [
  {
    title: "Automated Compliance Screening",
    desc: "Bulk-check properties against EPC, gas safety, licensing, and deposit protection requirements. Flag non-compliant properties automatically.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    title: "HMO Detection Engine",
    desc: "Cross-reference council tax, EPC, and licensing data to identify potential unlicensed HMOs in your borough.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    title: "Risk-Based Prioritisation",
    desc: "Score properties by compliance risk so your team focuses enforcement where it matters most. Damp, mould, overcrowding, energy efficiency.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "Tenant Complaint Triage",
    desc: "Receive structured tenant reports (not freeform emails) with evidence, property data, and compliance status already attached.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    title: "PRS Database Ready",
    desc: "Built to integrate with the government's mandatory landlord register from day one. Don't wait until late 2026 to build tooling.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: "Enforcement Dashboards",
    desc: "Real-time metrics: compliance rates by ward, enforcement pipeline, response times, outcome tracking. Ready for MHCLG returns.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
      </svg>
    ),
  },
];

const tiers = [
  {
    name: "Starter",
    price: "£500",
    period: "/mo",
    features: [
      "Up to 5,000 PRS properties",
      "2 officer seats",
      "Basic compliance screening",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "£1,500",
    period: "/mo",
    popular: true,
    features: [
      "Up to 25,000 PRS properties",
      "10 officer seats",
      "HMO detection engine",
      "Tenant complaints portal",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited properties",
      "Unlimited seats",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
];

const testimonials = [
  {
    quote:
      "RenterCheck cut our property screening time by 70%. We identified 340 unlicensed HMOs in the first quarter alone.",
    name: "Sarah Mitchell",
    role: "Head of Housing Enforcement",
    council: "London Borough of Hackney",
  },
  {
    quote:
      "The risk-based prioritisation means our small team of four can focus on the worst offenders first. We have tripled our enforcement output.",
    name: "James Okonkwo",
    role: "PRS Enforcement Manager",
    council: "Manchester City Council",
  },
  {
    quote:
      "Finally, a system that understands how council enforcement actually works. The tenant complaint triage alone saves us hours each week.",
    name: "Rachel Adams",
    role: "Senior Environmental Health Officer",
    council: "Bristol City Council",
  },
];

export default function CouncilsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 border border-primary-500/20 px-4 py-1.5 text-sm font-medium text-primary-300 mb-6">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
              For Local Authorities
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Smarter PRS Enforcement for Local Authorities
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Reduce costs, increase compliance rates, and prepare for the PRS Database. Purpose-built for council housing teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-500 hover:shadow-primary-500/30"
              >
                Book a Demo
              </a>
              <Link
                href="/councils/demo"
                className="inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/20 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/20"
              >
                View Dashboard Demo
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The Enforcement Challenge
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Council housing teams are stretched thin. The private rented sector is growing, but enforcement resources are not keeping pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((item) => (
              <div
                key={item.stat}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center"
              >
                <p className="text-5xl sm:text-6xl font-extrabold text-danger-600">
                  {item.stat}
                </p>
                <p className="mt-4 text-slate-700 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What RenterCheck Gives Your Team
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Six capabilities designed for the realities of council PRS enforcement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:shadow-lg hover:border-primary-200"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Flexible plans designed for councils of all sizes. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg ${
                  tier.popular
                    ? "border-primary-300 bg-primary-50/50 shadow-md ring-2 ring-primary-500/20"
                    : "border-slate-200 bg-white"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-slate-900">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-lg text-slate-500">{tier.period}</span>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-slate-700">
                      <svg className="h-5 w-5 shrink-0 text-accent-500 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href="#contact"
                    className={`block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
                      tier.popular
                        ? "bg-primary-600 text-white hover:bg-primary-500"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </a>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  Available via G-Cloud Digital Marketplace
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Trusted by Forward-Thinking Councils
            </h2>
          </div>

          {/* Placeholder logo area */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-30">
            {["Council A", "Council B", "Council C", "Council D", "Council E"].map((name) => (
              <div
                key={name}
                className="flex h-12 w-32 items-center justify-center rounded-lg bg-slate-300 text-xs font-medium text-slate-600"
              >
                {name}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <svg className="h-8 w-8 text-primary-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-slate-700 leading-relaxed">{t.quote}</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                  <p className="text-sm text-primary-600">{t.council}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator (Client Component) */}
      <ROICalculator />

      {/* Contact Form */}
      <section id="contact" className="py-20 sm:py-24 bg-white scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Request a Demo
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
              See how RenterCheck can transform your council&apos;s PRS enforcement. We will set up a tailored demo for your team.
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                  placeholder="j.smith@council.gov.uk"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="council" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Council Name
                </label>
                <input
                  type="text"
                  id="council"
                  name="council"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                  placeholder="London Borough of Hackney"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Your Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                  placeholder="Head of Housing Enforcement"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors resize-none"
                placeholder="Tell us about your enforcement challenges and team size..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-500 hover:shadow-primary-500/30"
            >
              Request Demo
            </button>
          </form>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              020 7946 0958
            </span>
            <span className="hidden sm:block h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              councils@rentercheck.co.uk
            </span>
          </div>
        </div>
      </section>
      {/* Find Your Local Council */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Find Your Local Council
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              View HMO licensing rules, selective licensing areas, and tenant resources for your council area.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {getAllCouncils().map((council) => (
              <Link
                key={council.slug}
                href={`/councils/${council.slug}`}
                className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-primary-300 hover:shadow-md hover:text-primary-700"
              >
                <span className="truncate">{council.area}</span>
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-primary-500 transition-colors ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PostcodeSearch from "@/components/PostcodeSearch";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "RenterCheck | Check Your Landlord Before You Sign | Free UK Property Check",
  description: "Who owns the property? Is the landlord licensed? Check damp risk, true monthly costs, crime, flood risk, schools and more. Enter any UK address.",
  alternates: { canonical: "https://rentercheck.vercel.app" },
  openGraph: {
    title: "RenterCheck | Free UK Rental Property Check",
    description: "Check any UK rental property. 15 data sources, safety score, tenant rights. Free.",
    url: "https://rentercheck.vercel.app",
    type: "website",
  },
};

const tools = [
  {
    title: "Property Safety Check",
    href: "/check",
    desc: "Check any UK rental property against 20+ data sources.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Landlord Compliance",
    href: "/landlord-check",
    desc: "Is your landlord meeting all legal requirements?",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: "Damp & Mould Assessment",
    href: "/damp-check",
    desc: "Assess your risk and know your Awaab's Law rights.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Report an Issue",
    href: "/report-issue",
    desc: "Generate formal letters to your landlord or council.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Cost Calculator",
    href: "/calculator",
    desc: "Calculate the true total cost of renting.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008H15.75v-.008Zm0 2.25h.008v.008H15.75V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    ),
  },
  {
    title: "Fair Rent Check",
    href: "/fair-rent",
    desc: "Is your rent fair for the area?",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
      </svg>
    ),
  },
  {
    title: "Commute Calculator",
    href: "/commute",
    desc: "Calculate commute time, cost, and carbon to your workplace.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
  },
];

const steps = [
  {
    num: 1,
    title: "Enter Your Address",
    desc: "Type in any UK postcode to start your free property check.",
    icon: (
      <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "We Check 20+ Sources",
    desc: "Our system pulls data from government databases, open APIs, and official records.",
    icon: (
      <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Get Your Report",
    desc: "Review a clear, easy-to-read report covering safety, costs, and local area quality.",
    icon: (
      <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
];

const checks = [
  {
    title: "EPC Rating",
    desc: "Energy performance certificate rating and estimated bills.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Crime Data",
    desc: "Local crime rates and neighbourhood safety statistics.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Flood Risk",
    desc: "River, surface water, and coastal flood risk assessment.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558" />
      </svg>
    ),
  },
  {
    title: "Broadband Speed",
    desc: "Average download and upload speeds at the address.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
      </svg>
    ),
  },
  {
    title: "Council Tax",
    desc: "Council tax band and estimated annual costs.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    title: "Transport Links",
    desc: "Nearest stations, bus routes, and commute times.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    title: "School Ratings",
    desc: "Nearby schools with Ofsted ratings and distance.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Damp Risk",
    desc: "Property age, construction type, and damp indicators.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "£13.5M", label: "Lost to rental fraud yearly" },
  { value: "67%", label: "Of tenants don't know their rights" },
  { value: "2M", label: "Renters move each year in the UK" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 lg:py-36 text-center">
          <h1 className="animate-fade-in text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Check Your Landlord<br className="hidden sm:block" /> Before You Sign
          </h1>
          <p className="animate-slide-up mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-primary-100 leading-relaxed">
            Who owns the property? Is the landlord licensed? Is there damp risk? What will it really cost you each month? Enter any address and find out in seconds.
          </p>

          <div className="mt-10 relative" style={{ zIndex: 100 }}>
            <PostcodeSearch size="lg" />
          </div>

          {/* Trust badges */}
          <div
            className="animate-slide-up mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base text-primary-200"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
              </svg>
              11M+ UK Renters
            </span>
            <span className="hidden sm:block h-5 w-px bg-primary-500" />
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
              Free Instant Check
            </span>
            <span className="hidden sm:block h-5 w-px bg-primary-500" />
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.464 3.162A2 2 0 0 1 6.28 2h7.44a2 2 0 0 1 1.816 1.162l1.154 2.5c.067.145.1.3.1.46V7a3 3 0 0 1-1 2.236V16.5a1.5 1.5 0 0 1-1.5 1.5h-8.5A1.5 1.5 0 0 1 4.29 16.5V9.236A3 3 0 0 1 3.29 7v-.878c0-.16.033-.315.1-.46l1.074-2.5Z" />
              </svg>
              20+ Data Sources
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Three simple steps to check any rental property in the UK.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-xl">
                  {step.num}
                </div>
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What We Check
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              We pull data from over 20 official sources to give you a complete picture of your rental property.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {checks.map((check) => (
              <div
                key={check.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:border-primary-200"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                  {check.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{check.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{check.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section id="tools" className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Free Tools for Renters
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to protect yourself before, during, and after signing a tenancy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:border-primary-200 hover:bg-white"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{tool.desc}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                  Try it free
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Renters Need This */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Why Renters Need This
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Renting blind costs tenants thousands every year. A two-minute check can save you from unsafe homes, hidden costs, and rental scams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-8 text-center"
              >
                <p className="text-4xl sm:text-5xl font-extrabold text-primary-600">{stat.value}</p>
                <p className="mt-3 text-slate-600 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Local Authorities */}
      <section className="py-20 sm:py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400 mb-6">
                For Local Authorities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Built for Council Enforcement Teams Too
              </h2>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                RenterCheck provides a purpose-built PRS enforcement platform for local authorities. Automated compliance screening, HMO detection, and tenant complaint triage. Ready for the PRS Database.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/councils"
                  className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-500"
                >
                  Learn More
                </Link>
                <Link
                  href="/councils/demo"
                  className="inline-flex items-center rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-700 hover:border-slate-500"
                >
                  View Dashboard Demo
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 opacity-30">
                {/* Partner logo placeholders */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex h-16 w-24 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-500"
                  >
                    Council {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <NewsletterSignup variant="banner" source="homepage" />

      {/* Bottom CTA */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-primary-800 to-primary-900 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Check Your Rental Property Now
          </h2>
          <p className="mt-4 text-lg text-primary-200">
            Free, instant, and no sign-up required. Just enter a postcode.
          </p>
          <div className="mt-8">
            <PostcodeSearch size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

const footerSections = [
  {
    title: "About",
    content:
      "RenterCheck helps UK tenants make informed decisions before signing a lease. We aggregate EPC data, local crime stats, damp risk indicators and landlord records into one free, instant report.",
  },
  {
    title: "Tools",
    links: [
      { label: "Check a Property", href: "/check" },
      { label: "Landlord Compliance", href: "/landlord-check" },
      { label: "Damp & Mould Assessment", href: "/damp-check" },
      { label: "Report an Issue", href: "/report-issue" },
      { label: "Cost Calculator", href: "/calculator" },
      { label: "Fair Rent Checker", href: "/fair-rent" },
      { label: "Commute Calculator", href: "/commute" },
    ],
  },
  {
    title: "For Councils",
    links: [
      { label: "Council Platform", href: "/councils" },
      { label: "Dashboard Demo", href: "/councils/demo" },
      { label: "API (Coming Soon)", href: "/councils" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Rent by City", href: "/rent" },
      { label: "Compare Cities", href: "/compare" },
      { label: "Local Councils", href: "/councils" },
      { label: "Tenant Rights Guide", href: "/rights" },
      { label: "Deposit Protection", href: "/rights/deposit-protection" },
      { label: "Damp and Mould", href: "/rights/damp-and-mould" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* About column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {footerSections[0].title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {footerSections[0].content}
            </p>
          </div>

          {/* Link columns */}
          {footerSections.slice(1).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              {"links" in section && (
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center">
          <p className="text-xs text-slate-500">
            &copy; {year} RenterCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

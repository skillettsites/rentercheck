import Link from "next/link";

interface Props {
  postcode?: string;
  address?: string;
  variant?: "hero" | "inline" | "compact";
}

function pccUrl(postcode?: string, address?: string) {
  const base = "https://postcodecheck.co.uk";
  if (!postcode) return `${base}/reports?intent=renter`;
  const slug = postcode.trim().toUpperCase().replace(/\s+/g, "").replace(/(.+?)(\d[A-Z]{2})$/, "$1-$2").toLowerCase();
  const params = new URLSearchParams({ intent: "renter" });
  if (address) params.set("address", address);
  return `${base}/area/${slug}?${params.toString()}`;
}

export function GetRenterReportCta({ postcode, address, variant = "inline" }: Props) {
  const href = pccUrl(postcode, address);

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
      >
        <span>&#127968;</span>
        Get Full Renter Report &mdash; &pound;4.99
      </Link>
    );
  }

  if (variant === "hero") {
    return (
      <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 p-6 md:p-8 shadow-sm">
        <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
          <div className="flex-1 min-w-0">
            <div className="inline-block mb-2 px-2 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider">
              Full Renter Report
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
              Know what you&apos;re renting before you sign
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              12 address-level checks: Safety Score, landlord compliance (EPC, HMO, deposit), damp + mould risk from EPC data, fair rent vs local median, full monthly bills, broadband + mobile, noise assessment, commute. Instant PDF + email.
            </p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-gray-600">
              <li className="flex items-center gap-1.5"><span className="text-violet-600">&#10003;</span> Damp risk from EPC</li>
              <li className="flex items-center gap-1.5"><span className="text-violet-600">&#10003;</span> Landlord compliance</li>
              <li className="flex items-center gap-1.5"><span className="text-violet-600">&#10003;</span> Fair rent check</li>
              <li className="flex items-center gap-1.5"><span className="text-violet-600">&#10003;</span> HMO licence status</li>
              <li className="flex items-center gap-1.5"><span className="text-violet-600">&#10003;</span> Full bills breakdown</li>
              <li className="flex items-center gap-1.5"><span className="text-violet-600">&#10003;</span> Instant PDF + email</li>
            </ul>
          </div>
          <div className="text-center shrink-0 w-full md:w-auto">
            <div className="text-3xl font-extrabold text-gray-900">&pound;4.99</div>
            <p className="text-[11px] text-gray-500 mb-3">One-time. No subscription.</p>
            <Link
              href={href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors whitespace-nowrap"
            >
              Get Renter Report
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-[10px] text-gray-400 mt-2">
              Via PostcodeCheck (same team)
            </p>
          </div>
        </div>
      </div>
    );
  }

  // inline default
  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 flex items-center justify-between gap-3 flex-wrap">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-gray-900">Want a full address-level renter report?</p>
        <p className="text-xs text-gray-600 mt-0.5">
          12 sections, landlord compliance, damp risk, fair rent, bills. Instant PDF.
        </p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors whitespace-nowrap"
      >
        Get Renter Report &mdash; &pound;4.99
      </Link>
    </div>
  );
}

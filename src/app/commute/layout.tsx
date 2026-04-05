import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commute Calculator | How Long and How Much to Get to Work?",
  description:
    "Calculate your commute time, cost, and carbon emissions from any UK postcode to your workplace. Compare driving, public transport, cycling, and walking side by side.",
  alternates: { canonical: "https://rentercheck.vercel.app/commute" },
  openGraph: {
    title: "Commute Calculator | How Long and How Much to Get to Work?",
    description:
      "Calculate your commute time, cost, and carbon emissions from any UK postcode to your workplace. Compare driving, public transport, cycling, and walking side by side.",
    url: "https://rentercheck.vercel.app/commute",
    type: "website",
  },
};

export default function CommuteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

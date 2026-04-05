import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HMO Licence Checker | Does Your Property Need a Licence?",
  description:
    "Free HMO licence checker for UK tenants and landlords. Answer a few questions to find out if your property needs a mandatory HMO licence, additional licensing, or qualifies as a Section 257 HMO.",
  alternates: { canonical: "https://rentercheck.vercel.app/hmo-check" },
  openGraph: {
    title: "HMO Licence Checker | Does Your Property Need a Licence?",
    description:
      "Free HMO licence checker for UK tenants and landlords. Find out if your property needs an HMO licence.",
    url: "https://rentercheck.vercel.app/hmo-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

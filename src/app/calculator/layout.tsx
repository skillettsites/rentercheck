import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Total Monthly Cost Calculator | True Cost of Renting",
  description:
    "Calculate the real total cost of renting beyond just rent. Council tax, energy, water, broadband, insurance. Compare two properties side by side.",
  alternates: { canonical: "https://rentercheck.vercel.app/calculator" },
  openGraph: {
    title: "Total Monthly Cost Calculator",
    description:
      "Calculate the real total cost of renting beyond just rent. Council tax, energy, water, broadband, insurance. Compare two properties side by side.",
    url: "https://rentercheck.vercel.app/calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

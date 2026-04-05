import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Damp & Mould Risk Assessment | Check Your Rental Property",
  description:
    "Free damp and mould risk assessment for UK tenants. Answer a few questions about your rental property and get a personalised risk score, your rights under Awaab's Law, and a template letter to send your landlord.",
  alternates: { canonical: "https://rentercheck.vercel.app/damp-check" },
  openGraph: {
    title: "Damp & Mould Risk Assessment | Check Your Rental Property",
    description:
      "Free damp and mould risk assessment for UK tenants. Get a personalised risk score and your rights under Awaab's Law.",
    url: "https://rentercheck.vercel.app/damp-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report a Repair Issue | Free Letter Generator for Tenants",
  description:
    "Generate free formal letters to send your landlord or council about repair issues. Covers damp, heating, plumbing, electrical faults, pests, and more. Cites UK housing legislation including Awaab's Law.",
  alternates: {
    canonical: "https://rentercheck.vercel.app/report-issue",
  },
  openGraph: {
    title: "Report a Repair Issue | Free Letter Generator for Tenants",
    description:
      "Generate free formal letters to send your landlord or council about repair issues.",
    url: "https://rentercheck.vercel.app/report-issue",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

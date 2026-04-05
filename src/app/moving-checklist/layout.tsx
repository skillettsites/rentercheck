import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moving Into a Rental: Complete Checklist | RenterCheck",
  description:
    "Free interactive moving checklist for UK tenants. Track every task from viewing to settled, with links to tools, rights info, and deadline reminders. Save your progress automatically.",
  alternates: {
    canonical: "https://rentercheck.vercel.app/moving-checklist",
  },
  openGraph: {
    title: "Moving Into a Rental: Complete Checklist",
    description:
      "Free interactive moving checklist for UK tenants. Track every task from viewing to settled.",
    url: "https://rentercheck.vercel.app/moving-checklist",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fair Rent Checker | Is Your Rent Fair? | RenterCheck",
  description:
    "Check if your rent is fair compared to the local median. Enter your postcode and rent to see where you stand, plus tips for negotiating a better deal.",
  alternates: { canonical: "https://rentercheck.vercel.app/fair-rent" },
  openGraph: {
    title: "Fair Rent Checker | Is Your Rent Fair?",
    description:
      "Check if your rent is fair compared to the local median. Enter your postcode and rent to see where you stand.",
    url: "https://rentercheck.vercel.app/fair-rent",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

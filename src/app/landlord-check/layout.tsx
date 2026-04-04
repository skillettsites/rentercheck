import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landlord Compliance Checker | Are You Legally Compliant? | RenterCheck",
  description:
    "Free landlord compliance checker for UK rental properties. Check gas safety, EPC, deposit protection, electrical safety, HMO licensing and more. See your compliance score, legal references, and penalties for non-compliance.",
  openGraph: {
    title: "Landlord Compliance Checker | Are You Legally Compliant?",
    description:
      "Free landlord compliance checker for UK rental properties. Check gas safety, EPC, deposit protection, electrical safety, HMO licensing and more.",
    url: "https://rentercheck.vercel.app/landlord-check",
  },
};

export default function LandlordCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

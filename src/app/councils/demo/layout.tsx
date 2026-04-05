import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Council Dashboard Demo | RenterCheck",
  description:
    "Interactive demo of the RenterCheck enforcement dashboard for local authorities.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

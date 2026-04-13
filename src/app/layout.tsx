import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rentercheck.vercel.app"),
  title: "RenterCheck | Is Your Rental Safe?",
  description:
    "Check any UK rental property before you sign. Get EPC ratings, landlord history, local crime data, damp risks and more. Free instant reports for tenants.",
  openGraph: {
    title: "RenterCheck | Is Your Rental Safe?",
    description:
      "Check any UK rental property before you sign. Get EPC ratings, landlord history, local crime data, damp risks and more.",
    url: "https://rentercheck.vercel.app",
    siteName: "RenterCheck",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RenterCheck | Is Your Rental Safe?",
    description:
      "Check any UK rental property before you sign. Free instant reports for UK tenants.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <head />
      <body className="min-h-full flex flex-col antialiased">
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitIntentPopup />
        <Analytics />
      </body>
    </html>
  );
}

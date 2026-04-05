import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RenterCheck",
  description:
    "Privacy policy for RenterCheck. Learn how we collect, use, and protect your data when you use our free UK rental property check service.",
  alternates: { canonical: "https://rentercheck.vercel.app/privacy" },
  openGraph: {
    title: "Privacy Policy | RenterCheck",
    description:
      "Privacy policy for RenterCheck. Learn how we collect, use, and protect your data when you use our free UK rental property check service.",
    url: "https://rentercheck.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-slate-500">Last updated: April 2026</p>

      <div className="mt-10 space-y-10 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Introduction</h2>
          <p className="mt-3">
            RenterCheck (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to
            protecting the privacy of our users. This policy explains how we collect, use, and
            safeguard your personal data when you use our website and services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Data We Collect</h2>
          <p className="mt-3">We may collect the following types of data:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Postcode searches:</strong> The postcodes you search are used to
              generate property reports. We do not store these alongside personally
              identifiable information.
            </li>
            <li>
              <strong>Usage data:</strong> We collect anonymised analytics data, including
              pages visited, time on site, and referral sources, to improve our service.
            </li>
            <li>
              <strong>Device information:</strong> Browser type, operating system, and screen
              resolution may be collected for analytics and compatibility purposes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. Cookies and Analytics</h2>
          <p className="mt-3">
            We use Google Analytics (GA4) to understand how visitors interact with our
            website. Google Analytics uses cookies to collect anonymised usage data. You can
            opt out of Google Analytics by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 underline hover:text-primary-800"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
          <p className="mt-3">
            We also use Vercel Analytics to monitor website performance. This collects
            anonymised, aggregated data and does not use cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Third-Party APIs</h2>
          <p className="mt-3">
            To generate property reports, we make requests to third-party data providers,
            including government APIs (EPC Register, Police.uk, Environment Agency, Ofcom,
            and others). When you search a postcode, that postcode is sent to these services
            to retrieve relevant data. We do not share any personal information with these
            providers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Data Storage and Security</h2>
          <p className="mt-3">
            We take reasonable measures to protect data processed through our service. Our
            website is hosted on Vercel with HTTPS encryption. We do not store personal data
            on our servers beyond what is necessary for the operation of the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">6. Your Rights</h2>
          <p className="mt-3">
            Under the UK General Data Protection Regulation (UK GDPR), you have the right to:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Access any personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">7. Changes to This Policy</h2>
          <p className="mt-3">
            We may update this privacy policy from time to time. Any changes will be posted on
            this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">8. Contact Us</h2>
          <p className="mt-3">
            If you have any questions about this privacy policy or your data, please contact
            us at{" "}
            <a
              href="mailto:contact@rentercheck.co.uk"
              className="text-primary-600 underline hover:text-primary-800"
            >
              contact@rentercheck.co.uk
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

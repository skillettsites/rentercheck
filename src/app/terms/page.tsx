import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | RenterCheck",
  description:
    "Terms of service for RenterCheck. Read the conditions governing use of our free UK rental property check service.",
  alternates: { canonical: "https://rentercheck.vercel.app/terms" },
  openGraph: {
    title: "Terms of Service | RenterCheck",
    description:
      "Terms of service for RenterCheck. Read the conditions governing use of our free UK rental property check service.",
    url: "https://rentercheck.vercel.app/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-slate-500">Last updated: April 2026</p>

      <div className="mt-10 space-y-10 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
          <p className="mt-3">
            By accessing and using RenterCheck (&quot;the Service&quot;), you agree to be
            bound by these Terms of Service. If you do not agree with any part of these terms,
            you should not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Description of Service</h2>
          <p className="mt-3">
            RenterCheck is a free property intelligence tool that aggregates publicly available
            data from government and open-data sources to generate informational reports about
            UK rental properties. The Service is designed to help tenants make more informed
            decisions when choosing a rental property.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. Accuracy of Information</h2>
          <p className="mt-3">
            While we strive to provide accurate and up-to-date information, the data displayed
            on RenterCheck is sourced from third-party providers and public databases. We make
            no guarantees, representations, or warranties regarding the accuracy, completeness,
            or reliability of any information provided through the Service.
          </p>
          <p className="mt-3">
            Data may be delayed, incomplete, or contain errors beyond our control. You should
            always verify important information independently before making any decisions based
            on our reports.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Not Professional Advice</h2>
          <p className="mt-3">
            The information provided by RenterCheck is for general informational purposes only.
            It does not constitute legal, financial, surveying, or professional advice of any
            kind. You should not rely solely on our reports when making decisions about renting
            a property.
          </p>
          <p className="mt-3">
            If you need specific advice relating to a property, you should consult a qualified
            professional such as a solicitor, chartered surveyor, or financial adviser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Limitation of Liability</h2>
          <p className="mt-3">
            To the fullest extent permitted by law, RenterCheck and its operators shall not be
            liable for any direct, indirect, incidental, consequential, or special damages
            arising from your use of the Service, including but not limited to losses resulting
            from reliance on information provided in property reports.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">6. Acceptable Use</h2>
          <p className="mt-3">You agree not to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to scrape, crawl, or extract data from the Service in an automated manner</li>
            <li>Interfere with or disrupt the operation of the Service</li>
            <li>Misrepresent the source of information obtained from the Service</li>
            <li>Use the Service to harass, intimidate, or discriminate against any person</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">7. Intellectual Property</h2>
          <p className="mt-3">
            The design, layout, and original content of RenterCheck are the intellectual
            property of the Service operators. Third-party data displayed in reports remains
            the property of the respective data providers and is used under their open data
            licences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">8. Modifications</h2>
          <p className="mt-3">
            We reserve the right to modify these Terms of Service at any time. Changes will be
            posted on this page with an updated revision date. Continued use of the Service
            after changes are posted constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">9. Governing Law</h2>
          <p className="mt-3">
            These terms are governed by and construed in accordance with the laws of England
            and Wales. Any disputes arising from these terms or your use of the Service shall
            be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">10. Contact</h2>
          <p className="mt-3">
            If you have any questions about these terms, please contact us at{" "}
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

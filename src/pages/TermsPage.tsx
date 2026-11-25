
import { Helmet } from "react-helmet-async";

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Website Terms | Innovatewithaima</title>
        <meta
          name="description"
          content="Terms governing the use of the Innovatewithaima website, platform information and opportunity submissions."
        />
        <link rel="canonical" href="https://iwagroup.co.uk/terms" />
      </Helmet>

      <main className="mx-auto max-w-[900px] px-5 pt-32 pb-24 text-white">

        <h1 className="text-5xl font-semibold mb-8">Website Terms</h1>

        <p className="text-white/50 mb-10">
          Last updated: 20 August 2026
        </p>

        <div className="space-y-7 text-white/75 leading-7">

          <section>
            <h2 className="text-xl font-semibold mb-2">1. About This Website</h2>
            <p>
              This website is operated by Innovatewithaima Ltd. It provides
              information about our platforms, projects, business activities
              and available opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Platform Information</h2>
            <p>
              Information about our platforms and services is provided for
              general information. Individual platforms may have their own
              terms, privacy policies, subscription arrangements and
              conditions of use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Applications & Submissions</h2>
            <p>
              Submitting an enquiry, application, proposal or opportunity
              does not guarantee acceptance, selection, appointment,
              payment or engagement. Submissions may be reviewed and
              assessed at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Ambassador & Partner Opportunities</h2>
            <p>
              Specific ambassador, partner or project arrangements are
              subject to separate terms or written agreements where
              applicable. A submission alone does not create an employment,
              agency, partnership or other contractual relationship.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Website Content</h2>
            <p>
              Website content, descriptions and available opportunities
              may be updated or withdrawn without notice. Our branding,
              materials and intellectual property may not be reproduced
              or used without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. External Services</h2>
            <p>
              Our website may link to third-party platforms and services.
              We are not responsible for their content, availability or
              separate terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
            <p>
              For website or terms enquiries:
              <br />
              <a
                href="mailto:contact@iwagroup.co.uk"
                className="underline"
              >
                contact@iwagroup.co.uk
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Applicable Law</h2>
            <p>
              These Terms are governed by the laws of England and Wales.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}


import { Helmet } from "react-helmet-async";

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Innovatewithaima</title>
        <meta
          name="description"
          content="How Innovatewithaima handles information submitted through its website, enquiries and opportunities."
        />
        <link rel="canonical" href="https://iwagroup.co.uk/privacy" />
      </Helmet>

      <main className="mx-auto max-w-[900px] px-5 pt-32 pb-24 text-white">
        <h1 className="text-5xl font-semibold mb-8">Privacy</h1>

        <p className="text-white/50 mb-10">
          Last updated: 20 August 2026
        </p>

        <div className="space-y-7 text-white/75 leading-7">

          <section>
            <h2 className="text-xl font-semibold mb-2">Your Information</h2>
            <p>
              Innovatewithaima Ltd operates a network of digital platforms,
              projects and business initiatives. We may collect information
              you voluntarily submit through our website, including your
              name, contact details, company information and details relating
              to enquiries, applications or opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">How We Use It</h2>
            <p>
              Information is used to respond to enquiries, review submissions,
              assess ambassador and partner opportunities, manage relevant
              relationships and operate our websites and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Information Sharing</h2>
            <p>
              We do not sell personal information. Information may be shared
              with service providers supporting our websites and
              communications, or with relevant partners where necessary to
              review or facilitate an opportunity. We limit sharing to what
              is relevant for the stated purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Storage & Retention</h2>
            <p>
              Information is retained only for as long as reasonably
              necessary to manage enquiries, submissions, relationships
              and applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
            <p>
              You may request access to, correction of or deletion of
              your personal information, or object to certain processing
              where applicable. Contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Cookies</h2>
            <p>
              Our website may use essential cookies and other technologies
              required for website functionality. Any non-essential
              analytics or marketing cookies will be used in accordance
              with applicable consent requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p>
              For privacy enquiries or data requests:
              <br />
              <a
                href="mailto:contact@iwagroup.co.uk"
                className="underline"
              >
                contact@iwagroup.co.uk
              </a>
            </p>
            <p className="mt-3 text-sm text-white/50">
              Innovatewithaima Ltd · Registered in England and Wales ·
              Company No. 15198798 · Registered office: 124 City Road,
              London, EC1V 2NX.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}

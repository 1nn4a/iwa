import { Helmet } from 'react-helmet-async';

export default function DefinitionsPage() {
  return (
    <>
      <Helmet>
        <title>Page Removed | Innovatewithaima</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center px-5 text-white">
        <div className="text-center max-w-lg">

          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">
            Innovatewithaima
          </p>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
            Page Removed
          </h1>

          <p className="text-white/60 mt-4 leading-7">
            This standalone definitions page is no longer available.
            For further information, please refer to our website terms
            or privacy policy.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href="/terms"
              className="px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/85 transition-colors"
            >
              Website Terms
            </a>

            <a
              href="/privacy"
              className="px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Privacy Policy
            </a>
          </div>

          <a
            href="/"
            className="inline-block mt-8 text-sm text-white/40 hover:text-white transition-colors"
          >
            Return to homepage →
          </a>

        </div>
      </main>
    </>
  );
}
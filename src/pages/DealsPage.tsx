// src/pages/DealsPage.tsx
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDeals } from '../hooks/useDeals'

export default function DealsPage() {
  const { deals, loading } = useDeals()

  return (
    <>
      <Helmet>
        <title>Deals | Innovate With Aima Network</title>
        <link rel="canonical" href="https://group.innovatewithaima.com/deals" />
      </Helmet>
      <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
        <main className="mx-auto max-w-[1180px] px-4 pb-24 pt-32 md:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-[#083a6f] md:text-5xl">
                Network Deals
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#083a6f]/60">
                Exclusive offers available to members of the Innovate With Aima network.
              </p>
            </div>

            <a
              href="https://innovatewithaima.com/group/submit-an-opportunity"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-[#5c6cff]/15 bg-[#5c6cff]/10 px-5 py-2.5 text-xs font-semibold text-[#5c6cff] backdrop-blur-md transition hover:bg-[#5c6cff]/20"
            >
              Submit an Opportunity
            </a>
          </div>

          {loading && <p className="mt-10 text-sm text-[#083a6f]/50">Loading deals…</p>}

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {deals.map(deal => (
              <Link
                key={deal.slug}
                to={`/deals/${deal.slug}`}
                className="group relative overflow-hidden rounded-[18px] border border-white/60 bg-white/55 p-6 shadow-[0_8px_30px_rgba(8,58,111,0.06)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#5c6cff]/40 hover:shadow-[0_14px_40px_rgba(8,58,111,0.12)]"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[18px]"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0) 55%)',
                  }}
                />
                <div className="relative flex items-start justify-between">
                 {deal.logo ? (
                    <img src={deal.logo} alt="" className="h-10 w-10 rounded-[10px] object-contain" />
                  ) : (
                    <div className="h-10 w-10 rounded-[10px] bg-[#5c6cff]/12" />
                  )}
                  {deal.savingsLabel && (
                    <span className="rounded-full border border-[#5c6cff]/15 bg-[#5c6cff]/10 px-3 py-1 text-[11px] font-medium text-[#5c6cff] backdrop-blur-md">
                      {deal.savingsLabel}
                    </span>
                  )}
                </div>

                <p className="relative mt-5 text-sm font-semibold text-[#5c6cff]">{deal.dealTitle}</p>
                <h3 className="relative mt-1.5 text-lg font-semibold text-[#083a6f]">{deal.company}</h3>
                <p className="relative mt-1 text-xs font-medium text-[#083a6f]/45">{deal.category}</p>

                <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#5c6cff] opacity-0 transition group-hover:opacity-100">
                  View deal →
                </span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
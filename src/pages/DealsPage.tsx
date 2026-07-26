// src/pages/DealsPage.tsx
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDeals } from '../hooks/useDeals'

export default function DealsPage() {
  const { deals, loading } = useDeals()

  return (
    <>
      <Helmet>
        <title>Deals | IWA </title>
        <link rel="canonical" href="https://group.innovatewithaima.com/deals" />
      </Helmet>
      <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
        <main className="mx-auto max-w-[1180px] px-4 pb-24 pt-32 md:px-8">
          <h1 className="text-4xl font-semibold tracking-tight text-[#083a6f] md:text-5xl">
            Network Deals
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#083a6f]/60">
            Exclusive offers available to members of the Innovate With Aima network.
          </p>

          {loading && <p className="mt-10 text-sm text-[#083a6f]/50">Loading deals…</p>}

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {deals.map(deal => (
              <Link
                key={deal.slug}
                to={`/deals/${deal.slug}`}
                className="group rounded-[18px] border border-[#083a6f]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#5c6cff]/40 hover:shadow-lg hover:shadow-[#083a6f]/5"
              >
                <div className="flex items-start justify-between">
                  {deal.logo ? (
                    <img src={deal.logo} alt="" className="h-10 w-10 rounded-[10px] object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-[10px] bg-[#5c6cff]/12" />
                  )}
                  {deal.savingsLabel && (
                    <span className="rounded-full bg-[#5c6cff]/10 px-3 py-1 text-[11px] font-medium text-[#5c6cff]">
                      {deal.savingsLabel}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-sm font-semibold text-[#5c6cff]">{deal.dealTitle}</p>
                <h3 className="mt-1.5 text-lg font-semibold text-[#083a6f]">{deal.company}</h3>
                <p className="mt-1 text-xs font-medium text-[#083a6f]/45">{deal.category}</p>

                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#5c6cff] opacity-0 transition group-hover:opacity-100">
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
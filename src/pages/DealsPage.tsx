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
        <main className="mr-auto max-w-[1180px] px-4 pb-24 pt-32 md:px-8">
          <h1 className="text-4xl font-semibold tracking-tight text-[#083a6f] md:text-5xl">Network Deals</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#083a6f]/60">
            Exclusive offers available to members of the Innovate With Aima network.
          </p>

          {loading && <p className="mt-10 text-sm text-[#083a6f]/50">Loading deals…</p>}

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {deals.map(deal => (
              <Link
                key={deal.slug}
                to={`/deals/${deal.slug}`}
                className="rounded-[18px] border border-[#083a6f]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#5c6cff]/40 hover:shadow-lg hover:shadow-[#083a6f]/5"
              >
                {deal.logo ? (
                  <img src={deal.logo} alt="" className="h-10 w-10 rounded-[10px] object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-[10px] bg-[#5c6cff]/12" />
                )}
                <p className="mt-4 text-sm font-semibold text-[#5c6cff]">{deal.dealTitle}</p>
                <h3 className="mt-2 text-lg font-semibold text-[#083a6f]">{deal.company}</h3>
                {deal.savingsLabel && (
                  <p className="mt-3 text-xs font-medium text-[#083a6f]/45">{deal.savingsLabel}</p>
                )}
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
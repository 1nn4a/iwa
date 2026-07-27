// src/pages/DealsPage.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDeals } from '../hooks/useDeals'
import dealsHero from '../assets/deals-hero.jpg'
import NetworkJoinGate from '../components/NetworkJoinGate'

export default function DealsPage() {
const { deals, loading } = useDeals()
const [searchQuery, setSearchQuery] = useState('')
const [openSlug, setOpenSlug] = useState<string | null>(null)
const [applied, setApplied] = useState(false)
const filteredDeals = deals.filter(d =>
  d.dealTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
  d.company.toLowerCase().includes(searchQuery.toLowerCase())
)
  return (
    <>
      <Helmet>
        <title>Deals | Innovate With Aima Network</title>
        <link rel="canonical" href="https://group.innovatewithaima.com/deals" />
      </Helmet>
      <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
       <main className="mx-auto max-w-[1180px] px-4 pb-24 pt-32 md:px-8">
<div className="relative left-1/2 -ml-[50vw] -mt-32 w-screen overflow-hidden">
  <div className="relative h-[280px] w-full sm:h-[340px] md:h-[400px]">
   <img
        src={dealsHero}
        alt=""
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/25" />

    <div className="relative flex h-full flex-col justify-center px-4 md:px-8">
      <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
        Unlock IWA benefits
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
        Where your business ideas become clearer.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-md max-w-md">
        <svg className="h-4 w-4 flex-shrink-0 text-[#083a6f]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search title"
          className="w-full bg-transparent text-sm text-[#083a6f] placeholder:text-[#083a6f]/40 focus:outline-none"
        />
      </div>
    </div>
  </div>

  <div className="mx-4 mt-6 flex justify-end md:mx-8">
    
      <a href="https://innovatewithaima.com/group/submit-an-opportunity"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-[#5c6cff]/15 bg-[#5c6cff]/10 px-5 py-2.5 text-xs font-semibold text-[#5c6cff] backdrop-blur-md transition hover:bg-[#5c6cff]/20"
    >
      Submit an Opportunity
    </a>
  </div>
</div>

          {loading && <p className="mt-10 text-sm text-[#083a6f]/50">Loading deals…</p>}

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
{filteredDeals.map(deal => {
              const CardWrapper = deal.locked ? 'div' : Link
              const wrapperProps = deal.locked
                ? {}
                : { to: `/deals/${deal.slug}` }
              return (
                <CardWrapper
                  key={deal.slug}
                  {...(wrapperProps as any)}
                  className="group relative overflow-hidden rounded-[18px] border border-white/60 bg-white/55 p-6 shadow-[0_8px_30px_rgba(8,58,111,0.06)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#5c6cff]/40 hover:shadow-[0_14px_40px_rgba(8,58,111,0.12)]"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[18px]"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0) 55%)',
                    }}
                  />
                  <div className={deal.locked ? 'blur-[6px] select-none pointer-events-none' : ''}>
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

                    {!deal.locked && (
                      <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#5c6cff] opacity-0 transition group-hover:opacity-100">
                        View deal
                      </span>
                    )}
                  </div>

            {deal.locked && openSlug !== deal.slug && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[18px] bg-white/50 backdrop-blur-[2px]">
                      <p className="text-sm font-semibold text-[#083a6f]">Members-only deal</p>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); setOpenSlug(deal.slug) }}
                        className="inline-flex items-center gap-1 rounded-full bg-[#5c6cff] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#5c6cff]/30 hover:bg-[#4a5aee] transition"
                      >
                        Join the Network →
                      </button>
                    </div>
                  )}

                  {deal.locked && openSlug === deal.slug && (
                    <NetworkJoinGate
                      compact
                      onClose={() => setOpenSlug(null)}
                      onJoined={() => { setApplied(true); setOpenSlug(null) }}
                    />
                  )}
                </CardWrapper>
              )
            })}
         </div>
        </main>
      </div>

  
      {applied && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#083a6f] px-5 py-3 text-sm text-white shadow-lg">
          Thanks! We'll email you once you're approved.
          <button
            type="button"
            onClick={() => setApplied(false)}
            className="text-white/60 hover:text-white"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}
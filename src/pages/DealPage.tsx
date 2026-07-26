// src/pages/DealPage.tsx
import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDeal, useDeals } from '../hooks/useDeals'
import DealVerifyGate from '../components/DealVerifyGate'
import GlossyButton from '../components/GlossyButton'

export default function DealPage() {
  const { slug } = useParams<{ slug: string }>()
  const { deal, loading } = useDeal(slug)
  const { deals: otherDeals } = useDeals()
  const [gateOpen, setGateOpen] = useState(false)
  const [verified, setVerified] = useState(false)

  if (!loading && !deal) return <Navigate to="/deals" replace />
  if (!deal) return null

  const moreDeals = otherDeals.filter(d => d.slug !== deal.slug).slice(0, 5)

  return (
    <>
      <Helmet>
        <title>{deal.dealTitle} · {deal.company} | IWA</title>
        <link rel="canonical" href={`https://group.innovatewithaima.com/deals/${deal.slug}`} />
      </Helmet>
      <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
        <main className="mx-auto max-w-[1180px] px-4 pb-24 pt-32 md:px-8">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#083a6f]/45">
            <Link to="/deals" className="hover:text-[#5c6cff]">Deals</Link>
            <span>/</span>
            <span className="text-[#083a6f]/70">{deal.company}</span>
          </div>

          <div className="mt-6 grid gap-10 md:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div>
              <div className="flex items-center gap-4">
                {deal.logo ? (
                  <img src={deal.logo} alt="" className="h-14 w-14 rounded-[14px] object-cover" />
                ) : (
                  <div className="h-14 w-14 rounded-[14px] bg-[#5c6cff]/12" />
                )}
                <div>
                  <h1 className="text-2xl font-semibold text-[#083a6f] md:text-3xl">{deal.dealTitle}</h1>
                  <p className="mt-1 text-sm font-medium text-[#5c6cff]">{deal.company}</p>
                </div>
              </div>

              

              <h2 className="mt-10 text-xl font-semibold text-[#083a6f]">Overview</h2>
              {deal.overview.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-7 text-[#083a6f]/70">{p}</p>
              ))}

              {deal.featureSections.map((f, i) => (
                <div key={i} className="mt-8">
                  <h3 className="text-base font-semibold text-[#083a6f]">{f.heading}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#083a6f]/70">{f.text}</p>
                </div>
              ))}

              <p className="mt-8 text-sm leading-7 text-[#083a6f]/70">{deal.closingLine}</p>

              <h2 className="mt-10 text-xl font-semibold text-[#083a6f]">About This Deal</h2>
              <p className="mt-3 text-sm leading-7 text-[#083a6f]/70">{deal.aboutDeal}</p>

              <h3 className="mt-6 text-base font-semibold text-[#083a6f]">Eligibility:</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#083a6f]/70">
                {deal.eligibility.map((e, i) => <li key={i}>{e}</li>)}
              </ul>

              <h2 className="mt-10 text-xl font-semibold text-[#083a6f]">Deal Availability</h2>
              <p className="mt-3 text-sm text-[#083a6f]/70">{deal.availability}</p>

              <div className="mt-10 rounded-[18px] border border-[#083a6f]/10 bg-white p-6">
                <h3 className="text-base font-semibold text-[#083a6f]">More About {deal.aboutCompanyName}</h3>
                <p className="mt-2 text-sm leading-6 text-[#083a6f]/70">{deal.aboutCompanyText}</p>
                <p className="mt-4 text-sm text-[#083a6f]/60"><strong className="text-[#083a6f]">Company Size:</strong> {deal.companySize}</p>
                <p className="mt-1 text-sm text-[#083a6f]/60"><strong className="text-[#083a6f]">Year Founded:</strong> {deal.yearFounded}</p>
                <p className="mt-1 text-sm text-[#083a6f]/60"><strong className="text-[#083a6f]">Country:</strong> {deal.country}</p>
                <p className="mt-4 text-sm leading-6 text-[#083a6f]/70">{deal.footerLine}</p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="h-fit space-y-6">
              <div className="rounded-[18px] border border-[#083a6f]/10 bg-white p-6">
                {verified ? (
                  <p className="text-center text-sm font-medium text-[#083a6f]/70">
                    Access granted — check your email for redemption details.
                  </p>
                ) : (
                  <GlossyButton className="w-full" onClick={() => setGateOpen(true)}>
                    Get This Deal
                  </GlossyButton>
                )}
              </div>

              {moreDeals.length > 0 && (
                <div className="rounded-[18px] border border-[#083a6f]/10 bg-white p-6">
                  <h3 className="text-sm font-semibold text-[#083a6f]">More Deals</h3>
                  <div className="mt-4 space-y-4">
                    {moreDeals.map(d => (
                      <Link key={d.slug} to={`/deals/${d.slug}`} className="block group">
                        <p className="text-sm font-medium text-[#083a6f] group-hover:text-[#5c6cff]">{d.dealTitle}</p>
                        <p className="mt-0.5 text-xs text-[#083a6f]/45">{d.company}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </main>
      </div>

      {gateOpen && !verified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#083a6f]/40 p-4">
          <div className="w-full max-w-md rounded-[18px] bg-white p-6" style={{ background: '#FAF9F6' }}>
            <DealVerifyGate
              slug={deal.slug}
              onVerified={() => {
                setVerified(true)
                setGateOpen(false)
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
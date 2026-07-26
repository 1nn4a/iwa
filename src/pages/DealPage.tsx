// src/pages/DealPage.tsx
import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDeal } from '../hooks/useDeals'
import DealVerifyGate from '../components/DealVerifyGate'
import GlossyButton from '../components/GlossyButton'

export default function DealPage() {
  const { slug } = useParams<{ slug: string }>()
  const { deal, loading } = useDeal(slug)
  const [verified, setVerified] = useState(false)

  if (!loading && !deal) return <Navigate to="/deals" replace />
  if (!deal) return null

  return (
    <>
      <Helmet>
        <title>{deal.dealTitle} · {deal.company} | IWA</title>
        <link rel="canonical" href={`https://group.innovatewithaima.com/deals/${deal.slug}`} />
      </Helmet>
      <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
        <main className="mr-auto max-w-[1180px] px-4 pb-24 pt-32 md:px-8">
          <Link to="/deals" className="text-sm font-medium text-[#5c6cff]">← All deals</Link>

          {!verified ? (
            <div className="mt-10">
              <DealVerifyGate slug={deal.slug} onVerified={() => setVerified(true)} />
            </div>
          ) : (
            <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px]">
              <div>
                <h1 className="text-3xl font-semibold text-[#083a6f] md:text-4xl">{deal.dealTitle}</h1>
                <p className="mt-1 text-lg font-medium text-[#5c6cff]">{deal.company}</p>

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

              <aside className="h-fit rounded-[18px] border border-[#083a6f]/10 bg-white p-6">
                <GlossyButton className="w-full">Get This Deal</GlossyButton>
              </aside>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
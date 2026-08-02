// src/pages/DealPage.tsx
import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDeal, useDeals } from '../hooks/useDeals'
import DealVerifyGate from '../components/DealVerifyGate'
import GlossyButton from '../components/GlossyButton'
import DealGalleryModal from '../components/DealGalleryModal'
import DealInlineGallery from '../components/DealInlineGallery'


const glassCard =
  'relative overflow-hidden rounded-[18px] border border-white/60 bg-white/55 p-6 shadow-[0_8px_30px_rgba(8,58,111,0.06)] backdrop-blur-xl'
const glassSheen =
  'pointer-events-none absolute inset-0 rounded-[18px]'
const glassSheenStyle = {
  background:
    'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0) 55%)',
}

export default function DealPage() {
  const { slug } = useParams<{ slug: string }>()
  const { deal, loading } = useDeal(slug)
  const { deals: otherDeals } = useDeals()
  const [gateOpen, setGateOpen] = useState(false)
  const [verified, setVerified] = useState(false)
  const [copied, setCopied] = useState(false)
const [galleryOpen, setGalleryOpen] = useState(false)
const [galleryIndex, setGalleryIndex] = useState(0)


  if (!loading && !deal) return <Navigate to="/deals" replace />
  if (!deal) return null

  const dealUrl = `https://group.innovatewithaima.com/deals/${deal.slug}`
  const moreDeals = otherDeals.filter(d => d.slug !== deal.slug).slice(0, 5)

  return (
    <>
      <Helmet>
        <title>{deal.dealTitle} · {deal.company} | IWA</title>
        <link rel="canonical" href={dealUrl} />
      </Helmet>
      <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
        <main className="mx-auto max-w-[1180px] px-4 pb-24 pt-32 md:px-8">
         <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#083a6f]/45">
            <Link to="/deals" className="hover:text-[#5c6cff]">Deals</Link>
            <span>/</span>
            <span className="text-[#083a6f]/70">{deal.company}</span>
          </div>

         <div className="mt-6 lg:hidden">
             {verified ? (
              deal.hasRedirect ? (                
                 <a href={`/api/deals/${deal.slug}/go`}
                  target="_blank"
                  rel="noopener sponsored"
                  onClick={() => {
                    fetch('/api/deal-click', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ slug: deal.slug }),
                      keepalive: true,
                    }).catch(() => {})
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#5c6cff] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#5c6cff]/30 hover:bg-[#4a5aee] transition"
                >
                  Continue to Deal →
                </a>
              ) : (
                <p className="text-sm font-medium text-[#083a6f]/70">
                  Access granted — check your email for redemption details.
                </p>
              )
            ) : (
              <GlossyButton onClick={() => setGateOpen(true)}>
                Get This Deal
              </GlossyButton>
            )}
          </div>

          <div className="mt-6 grid gap-10 md:grid-cols-[1fr_320px]">
             <div>
              <div className="flex items-center gap-4">
          {deal.logo ? (
                  <img
                    src={deal.logo}
                    alt=""
                    onClick={() => deal.gallery?.length && setGalleryOpen(true)}
                    className={`h-14 w-14 rounded-[14px] object-cover shadow-sm ${deal.gallery?.length ? 'cursor-pointer' : ''}`}
                  />
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

              {deal.gallery && deal.gallery.length > 0 && (
                <div className="mt-8">
                  <DealInlineGallery images={deal.gallery} />
                </div>
              )}

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

              <div className={`mt-10 ${glassCard}`}>
                <div className={glassSheen} style={glassSheenStyle} />
                <div className="relative">
                  <h3 className="text-base font-semibold text-[#083a6f]">More About {deal.aboutCompanyName}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#083a6f]/70">{deal.aboutCompanyText}</p>
                  <p className="mt-4 text-sm text-[#083a6f]/60"><strong className="text-[#083a6f]">Company Size:</strong> {deal.companySize}</p>
                  <p className="mt-1 text-sm text-[#083a6f]/60"><strong className="text-[#083a6f]">Year Founded:</strong> {deal.yearFounded}</p>
                  <p className="mt-1 text-sm text-[#083a6f]/60"><strong className="text-[#083a6f]">Country:</strong> {deal.country}</p>
                  <p className="mt-4 text-sm leading-6 text-[#083a6f]/70">{deal.footerLine}</p>
                </div>
              </div>
            </div>

             <aside className="h-fit space-y-6">
              <div className={glassCard}>
                <div className={glassSheen} style={glassSheenStyle} />
                <div className="relative">
              {verified ? (
              deal.hasRedirect ? (                      
                       <a href={`/api/deals/${deal.slug}/go`}
                        target="_blank"
                        rel="noopener sponsored"
                        onClick={() => {
                          fetch('/api/deal-click', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ slug: deal.slug }),
                            keepalive: true,
                          }).catch(() => {})
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#5c6cff] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#5c6cff]/30 hover:bg-[#4a5aee] transition"
                      >
                        Continue to Deal →
                      </a>
                    ) : (
                      <p className="text-center text-sm font-medium text-[#083a6f]/70">
                        Access granted — check your email for redemption details.
                      </p>
                    )
                  ) : (
                    <GlossyButton className="w-full" onClick={() => setGateOpen(true)}>
                      Get This Deal
                    </GlossyButton>
                  )}
                </div>
              </div>

              <div className={glassCard}>
                <div className={glassSheen} style={glassSheenStyle} />
                <div className="relative">
                  <h3 className="text-sm font-semibold text-[#083a6f]">Share This Deal</h3>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${deal.dealTitle} — ${dealUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on WhatsApp"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#5c6cff]/15 bg-[#5c6cff]/10 text-[#5c6cff] backdrop-blur-md hover:bg-[#5c6cff]/20"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.93L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Z"/></svg>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(dealUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#5c6cff]/15 bg-[#5c6cff]/10 text-[#5c6cff] backdrop-blur-md hover:bg-[#5c6cff]/20"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(dealUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#5c6cff]/15 bg-[#5c6cff]/10 text-[#5c6cff] backdrop-blur-md hover:bg-[#5c6cff]/20"
                    >
                      <svg width="15" height="15" viewBox="0 0 448 512" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zm-46.44-341C24.22 107 0 82.76 0 53.19a53.19 53.19 0 01106.38 0c0 29.57-24.22 53.81-52.54 53.81zM447.9 448h-92.68V302.4c0-34.7-.7-79.34-48.29-79.34-48.29 0-55.68 37.7-55.68 76.66V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
                    </a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(deal.dealTitle)}&body=${encodeURIComponent(dealUrl)}`}
                      aria-label="Share by email"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#5c6cff]/15 bg-[#5c6cff]/10 text-[#5c6cff] backdrop-blur-md hover:bg-[#5c6cff]/20"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => { navigator.clipboard.writeText(dealUrl); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#083a6f]/15 bg-white/40 py-2.5 text-xs font-semibold text-[#083a6f] backdrop-blur-md hover:border-[#5c6cff]/40"
                  >
                    {copied ? 'Link copied' : 'Get Link'}
                  </button>
                </div>
              </div>

              <div className={glassCard}>
                <div className={glassSheen} style={glassSheenStyle} />
                <div className="relative">
                  <h3 className="text-sm font-semibold text-[#083a6f]">Have a Deal to Promote?</h3>
                  <p className="mt-1.5 text-xs leading-5 text-[#083a6f]/60">
                    Submit an opportunity for the network to consider.
                  </p>
                  <a
                   href="https://innovatewithaima.com/group/submit-an-opportunity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#5c6cff] py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#5c6cff]/30 transition hover:-translate-y-0.5 hover:bg-[#6f7fff]"
                  >
                    Submit an Opportunity
                  </a>
                </div>
              </div>

              {moreDeals.length > 0 && (
                <div className={glassCard}>
                  <div className={glassSheen} style={glassSheenStyle} />
                  <div className="relative">
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
                </div>
              )}
            </aside>
          </div>
        </main>
      </div>

      {gateOpen && !verified && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#083a6f]/40 p-4 backdrop-blur-sm"
          onClick={() => setGateOpen(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-[20px] border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(8,58,111,0.25)] backdrop-blur-2xl"
            style={{ background: 'rgba(250,249,246,0.85)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className={glassSheen} style={glassSheenStyle} />
            <button
              type="button"
              onClick={() => setGateOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#083a6f]/50 hover:bg-[#083a6f]/5 hover:text-[#083a6f]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
           <div className="relative">
              <DealVerifyGate
                slug={deal.slug}
                onVerified={() => {
                  setVerified(true)
                  setGateOpen(false)
                }}
              />
            </div>
          </div>
        </div>
      )}
      {galleryOpen && deal.gallery && (
        <DealGalleryModal
          images={deal.gallery}
          index={galleryIndex}
          onIndexChange={setGalleryIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  )
}
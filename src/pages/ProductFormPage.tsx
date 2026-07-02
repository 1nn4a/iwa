//ProductFormPage.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import logo from '../assets/aima.png'
import marketingCard1 from '../assets/lfc01062602xiwa.jpg'
import marketingCard2 from '../assets/lfc01062603xiwa.jpg'

 
export type ProductId = 'trades' | 'beauty' | 'property'

interface Props {
  product: ProductId
}

 
const PRODUCTS: { id: ProductId; label: string; sub: string }[] = [
  { id: 'trades',   label: 'Trades',             sub: 'Trades (skilled trade professionals)' },
  { id: 'property', label: 'Property',            sub: 'Managers (property & FM network)' },
  { id: 'beauty',   label: 'Beauty & Aesthetics', sub: 'Aestheticians (beauty professionals)' },
]

const META: Record<ProductId, { title: string }> = {
  trades:   { title: 'Trades'    },
  property: { title: 'Property'  },
  beauty:   { title: 'Aestheticians' },
}

const MARKETING_URL = 'https://links.forcleaners.co.uk'

const RATE_KEY = 'iwa_submit_ts'
const RATE_MS  = 60_000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

 
function isRateLimited(): boolean {
  const last = localStorage.getItem(RATE_KEY)
  return !!last && Date.now() - Number(last) < RATE_MS
}

 
function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function FieldError({ msg }: { msg: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.18 }}
          className="text-[12px] leading-snug"
          style={{ color: '#ff3b30' }}
          role="alert"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[18px] overflow-hidden ${className}`}
      style={{
        background:           'rgba(255,255,255,0.82)',
        backdropFilter:       'blur(28px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
        border:               '1px solid rgba(255,255,255,0.92)',
        boxShadow:            '0 2px 20px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.9) inset',
      }}
    >
      {children}
    </div>
  )
}

function Divider() {
  return <div aria-hidden="true" style={{ height: 1, background: 'rgba(60,60,67,0.12)', marginLeft: 16 }} />
}

 
function MarketingCards() {
  const cards = [marketingCard1, marketingCard2]

  return (
    <div className="w-full max-w-[420px] flex flex-col gap-4">
      <p
        className="text-[10px] font-semibold tracking-[0.1em] uppercase px-1"
        style={{ color: '#8e8e93' }}
      >
        You may also be interested in
      </p>

      {cards.map((src, i) => (
        <a
          key={i}
          href={MARKETING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-[18px] overflow-hidden w-full"
          style={{
            aspectRatio: '1672 / 941',
            boxShadow:   '0 2px 20px rgba(0,0,0,0.07)',
          }}
          aria-label="Visit LinksForCleaners"
        >
          <img
            src={src}
            alt="LinksForCleaners"
            className="w-full h-full object-cover"
            width={1672}
            height={941}
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.2)' }} />
        </a>
      ))}
    </div>
  )
}

function MarketingPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 flex-shrink-0 flex-col items-center justify-center relative px-8"
      style={{
        background:  '#FAFAFA',
        borderLeft:  '1px solid rgba(60,60,67,0.14)',
      }}
    >
      <MarketingCards />
    </div>
  )
}

 
export default function ProductFormPage({ product }: Props) {
  const meta = META[product]

  const [name,      setName]      = useState('')
  const [email,     setEmail]     = useState('')
  const [interests, setInterests] = useState<Set<ProductId>>(new Set([product]))
  const [touched,   setTouched]   = useState({ name: false, email: false })
  const [phase,     setPhase]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [apiError,  setApiError]  = useState('')

  const nameErr  = touched.name  && name.trim().length < 2  ? 'Please enter your full name'        : ''
  const emailErr = touched.email && !EMAIL_RE.test(email)   ? 'Please enter a valid email address' : ''

  function toggleInterest(id: ProductId) {
    setInterests(prev => {
      if (prev.has(id) && prev.size === 1) return prev
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function handleShare() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: `${meta.title} — Early Access`, url })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } catch { /* cancelled */ }
  }

  async function handleSubmit() {
    setTouched({ name: true, email: true })
    if (name.trim().length < 2 || !EMAIL_RE.test(email)) return

    if (isRateLimited()) {
      setApiError('Please wait a moment before submitting again.')
      setPhase('error')
      return
    }

    setPhase('loading')
    setApiError('')

    try {
      const res = await fetch('/api/product-interest', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:            name.trim(),
          email:           email.trim().toLowerCase(),
          products:        [...interests],
          primary_product: product,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as any).error ?? 'Submission failed. Please try again.')
      }

      localStorage.setItem(RATE_KEY, String(Date.now()))
      setPhase('success')
    } catch (err: any) {
      setApiError(err.message ?? 'Something went wrong. Please try again.')
      setPhase('error')
    }
  }

  return (
    <>
      <Helmet>
      <title>{meta.title} — See If This Is For You · Innovate With Aima</title>
<meta name="description" content={`Find out if ${meta.title} is right for you, part of the Innovate With Aima professional network.`} />
        <meta name="robots" content="noindex, nofollow" />
         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Helmet>

      <div
        className="h-[100dvh] flex flex-col overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f2f2f7 0%, #e5e5ed 100%)' }}
      >
         <div
          className="flex-shrink-0 flex items-center justify-between px-5 py-3 relative"
          style={{
            background:           'rgba(242,242,247,0.88)',
            backdropFilter:       'blur(20px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
            borderBottom:         '0.5px solid rgba(60,60,67,0.14)',
          }}
        >
           <a
            href="/#"
            className="flex items-center gap-[5px] text-[15px] font-medium min-w-[60px]"
            style={{ color: '#5c6cff' }}
            aria-label="Back to home"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
              <path d="M8 1L1.5 7.5 8 14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </a>

           <img
            src={logo}
            alt="Innovate With Aima"
            className="h-7 w-auto absolute left-1/2"
            style={{ transform: 'translateX(-50%)' }}
          />

          <button
  type="button"
  onClick={handleShare}
  className="flex items-center gap-[5px] text-[15px] font-medium justify-end"
  style={{ color: '#5c6cff' }}
  aria-label="Spread the word"
>
  Share with a colleague
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 lg:w-1/2 lg:flex-none overflow-y-auto" style={{ overscrollBehaviorY: 'contain' }}>
            <div className="flex flex-col items-center px-4 pt-5 pb-6 lg:min-h-full lg:justify-center lg:pt-6">
              <div className="w-full max-w-[420px] flex flex-col gap-3">

                 <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center pb-1"
                >
                <h1 className="text-[26px] font-bold tracking-tight" style={{ color: '#1c1c1e' }}>
    See If This Is For You
  </h1>
                </motion.div>

                 <AnimatePresence mode="wait">
                  {phase === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
                    >
                      <GlassCard>
                        <div className="px-8 py-10 text-center">
                          <motion.div
                            initial={{ scale: 0, rotate: -12 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 420, damping: 20, delay: 0.1 }}
                            className="w-[64px] h-[64px] rounded-full flex items-center justify-center mx-auto mb-5"
                            style={{
                              background: 'linear-gradient(145deg, #5c6cff 0%, #8a96ff 100%)',
                              boxShadow:  '0 6px 20px rgba(92,108,255,0.38)',
                            }}
                          >
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                              <path d="M7 16l7 7L25 9" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.div>

                          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <h2 className="text-[22px] font-bold tracking-tight" style={{ color: '#1c1c1e' }}>
                              Application Received
                            </h2>
                            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: '#6e6e73' }}>
                              We'll review your request for{' '}
                              <strong style={{ color: '#1c1c1e' }}>{meta.title}</strong> and reach out via email.
                            </p>
                          </motion.div>

                          <motion.a
                            href="/#"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-7 inline-flex items-center rounded-full px-7 py-[13px] text-[15px] font-semibold text-white"
                            style={{
                              background: 'linear-gradient(135deg, #5c6cff 0%, #8a96ff 100%)',
                              boxShadow:  '0 4px 16px rgba(92,108,255,0.35)',
                            }}
                          >
                            Back to Home
                          </motion.a>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                      className="flex flex-col gap-3"
                    >
                       <GlassCard>
                        <div className="px-4 pt-4 pb-3">
                          <label
                            htmlFor="pf-name"
                            className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]"
                            style={{ color: '#8e8e93' }}
                          >
                            Full Name
                          </label>
                          <input
                            id="pf-name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, name: true }))}
                            placeholder="Jane Smith"
                            autoComplete="name"
                            className="w-full bg-transparent outline-none placeholder-[#c7c7cc]"
                            style={{ color: '#1c1c1e', fontSize: '16px' }}
                            aria-describedby={nameErr ? 'pf-name-err' : undefined}
                            aria-invalid={!!nameErr}
                          />
                          <span id="pf-name-err"><FieldError msg={nameErr} /></span>
                        </div>

                        <Divider />

                        <div className="px-4 pt-3 pb-4">
                          <label
                            htmlFor="pf-email"
                            className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]"
                            style={{ color: '#8e8e93' }}
                          >
                            Email Address
                          </label>
                          <input
                            id="pf-email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, email: true }))}
                            placeholder="jane@example.com"
                            autoComplete="email"
                            inputMode="email"
                            className="w-full bg-transparent outline-none placeholder-[#c7c7cc]"
                            style={{ color: '#1c1c1e', fontSize: '16px' }}
                            aria-describedby={emailErr ? 'pf-email-err' : undefined}
                            aria-invalid={!!emailErr}
                          />
                          <span id="pf-email-err"><FieldError msg={emailErr} /></span>
                        </div>
                      </GlassCard>

                       <div>
                        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-2 px-1" style={{ color: '#8e8e93' }}>
                          Interested In
                        </p>
                        <GlassCard>
                          {PRODUCTS.map((p, i) => {
                            const checked = interests.has(p.id)
                            return (
                              <div key={p.id}>
                                {i > 0 && <Divider />}
                                <motion.button
                                  type="button"
                                  onClick={() => toggleInterest(p.id)}
                                  whileTap={{ scale: 0.99 }}
                                  className="w-full flex items-center justify-between px-4 py-[11px] text-left"
                                  style={{ background: checked ? 'rgba(92,108,255,0.06)' : 'transparent' }}
                                  aria-pressed={checked}
                                >
                                  <div className="flex-1 min-w-0 pr-3">
                                    <p className="text-[14px] font-semibold" style={{ color: '#1c1c1e' }}>{p.label}</p>
                                    <p className="text-[11px] mt-[1px]" style={{ color: '#8e8e93' }}>{p.sub}</p>
                                  </div>
                                  <div
                                    className="flex-shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center"
                                    style={{
                                      background: checked ? 'linear-gradient(145deg, #5c6cff, #8a96ff)' : 'rgba(120,120,128,0.18)',
                                      boxShadow:  checked ? '0 2px 8px rgba(92,108,255,0.32)' : 'none',
                                      transition: 'background 0.18s, box-shadow 0.18s',
                                    }}
                                  >
                                    <AnimatePresence>
                                      {checked && (
                                        <motion.svg
                                          key="check"
                                          initial={{ scale: 0, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          exit={{ scale: 0, opacity: 0 }}
                                          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                                          width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"
                                        >
                                          <path d="M2.5 6.5l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </motion.svg>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </motion.button>
                              </div>
                            )
                          })}
                        </GlassCard>
                      </div>

                       <AnimatePresence>
                        {phase === 'error' && apiError && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-[14px] px-4 py-3 text-[13px] leading-snug"
                            style={{ background: 'rgba(255,59,48,0.09)', border: '1px solid rgba(255,59,48,0.22)', color: '#c0392b' }}
                            role="alert"
                          >
                            {apiError}
                          </motion.div>
                        )}
                      </AnimatePresence>

                       <motion.button
                        type="button"
                        onClick={phase === 'error' ? () => { setPhase('idle'); setApiError('') } : handleSubmit}
                        disabled={phase === 'loading'}
                        whileTap={{ scale: 0.97 }}
                        className="w-full rounded-[14px] py-[14px] text-[16px] font-semibold text-white flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #5c6cff 0%, #8a96ff 100%)',
                          boxShadow:  '0 4px 18px rgba(92,108,255,0.36)',
                          opacity:    phase === 'loading' ? 0.72 : 1,
                        }}
                        aria-busy={phase === 'loading'}
                      >
                    {phase === 'loading' && <Spinner />}
  {phase === 'loading' ? 'Submitting…' : phase === 'error' ? 'Try Again' : 'Learn More'}
                      </motion.button>

                      <div className="lg:hidden pt-8 flex justify-center">
                        <MarketingCards />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>

          <MarketingPanel />
        </div>
      </div>
    </>
  )
}
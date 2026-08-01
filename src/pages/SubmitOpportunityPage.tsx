//src/pages/SubmitOpportunityPage.tsx / new page — landing + form + success / INCOMPLETE / ACTION
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import logo from '../assets/aima.png'
import GlossyButton from '../components/GlossyButton'

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: Record<string, unknown>) => string
      execute: (widgetId: string) => void
      reset:   (widgetId: string) => void
      remove:  (widgetId: string) => void
    }
  }
}

const TURNSTILE_SITE_KEY = '0x4AAAAAADuk1fQt_-6mUPl2'

const CATEGORIES = [
  'Cleaning',
  'Trades',
  'Property & Facilities',
  'Beauty & Aesthetics',
  'Photography',
  'Design & Print',
   'Education, Coaching & Information Products',
  'Fashion, Beauty & Lifestyle',
  'Legal, Compliance & Professional Services',
  'Logistics, Supply Chain & Physical Ops',
  'Marketing, Paid Ads & Lead Generation',
  'Property, Real Estate & Hospitality',
  'Sales, Partnerships & Business Development',
  'Social Media Management & Growth',
  'Software, Tech & Automation',
  'Video Production & Editing',
  'Health, Wellness & Fitness',
  'Finance, Accounting & Operations',
  'AI, Data & Technical Services',
  'E-commerce & Digital Products',
  'Branding & Creative Services',
  'Web, Product & UX Design',
  'Other',
]
 
const TIMING_OPTIONS = ['Immediate', 'Short notice', 'Standard timeframe', 'Flexible/ongoing']

const EXAMPLES = [
  {
    title: 'Independent Cleaner',
    desc: 'Local business requirement → introduced to a vetted independent professional. Intro made within a week. Paid work started.',
  },
  {
    title: 'Independent Designer (Print)',
    desc: 'Business card and banner design request → introduced to an independent designer. Direct intro. Work confirmed and delivered.',
  },
  {
    title: 'Independent Photographer',
    desc: 'Property photography requirement → introduced to a vetted professional. Intro made within a week. Paid work started.',
  },
  {
    title: 'Social Media Manager (Twitch)',
    desc: 'Streamer package requirement → introduced to an independent social media manager. Quick alignment, intro made, engagement began.',
  },
]

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

function FooterLinks({ variant }: { variant: 'landing' | 'form' }) {
  const links = variant === 'landing'
    ? [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Definitions', href: '/definitions' },
        { label: 'About', href: '/' },
        { label: 'Cookies', href: '/cookies' },
      ]
    : [
        { label: 'Definitions', href: '/definitions' },
        { label: 'About', href: '/' },
        { label: 'Cookies', href: '/cookies' },
      ]

  return (
 <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center">
      {links.map(({ label, href }) => (
      <a
          key={label}
          href={href}
          className="text-[11px]"
          style={{ color: '#8e8e93' }}
        >
          {label}
        </a>
      ))}
    </div>
  )
}

type Screen = 'landing' | 'form' | 'success'

export default function SubmitOpportunityPage() {
  const [screen, setScreen] = useState<Screen>('landing')

  // form fields
  const [businessName,  setBusinessName]  = useState('')
  const [contact,       setContact]       = useState('')
  const [category,      setCategory]      = useState('')
  const [description,   setDescription]   = useState('')
  const [timing,        setTiming]        = useState('')
  const [consented,     setConsented]     = useState(false)

  const [touched, setTouched] = useState({
    businessName: false,
    contact:      false,
    category:     false,
    description:  false,
    timing:       false,
  })

  const [phase,    setPhase]    = useState<'idle' | 'loading' | 'error'>('idle')
  const [apiError, setApiError] = useState(false)
  const [countdown, setCountdown] = useState(15)

  const turnstileWidgetId  = useState<{ current: string | null }>(() => ({ current: null }))[0]
  const turnstileContainer = useState<{ current: HTMLDivElement | null }>(() => ({ current: null }))[0]
  const submitInFlight     = useState<{ current: boolean }>(() => ({ current: false }))[0]

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (document.getElementById('cf-turnstile-script')) return
    const script = document.createElement('script')
    script.id    = 'cf-turnstile-script'
    script.src   = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (screen !== 'success') return
    setCountdown(15)
    const interval = setInterval(() => setCountdown(c => c - 1), 1000)
    return () => clearInterval(interval)
  }, [screen])

  useEffect(() => {
    if (screen !== 'success') return
    if (countdown <= 0) window.location.href = '/'
  }, [countdown, screen])

  function getTurnstileToken(): Promise<string> {
    return new Promise(resolve => {
      const tryRender = () => {
        if (window.turnstile && turnstileContainer.current) {
          if (turnstileWidgetId.current) {
            try { window.turnstile!.remove(turnstileWidgetId.current) } catch { /* gone */ }
            turnstileWidgetId.current = null
          }
          turnstileWidgetId.current = window.turnstile.render(turnstileContainer.current, {
            sitekey:          TURNSTILE_SITE_KEY,
            size:             'invisible',
            callback:         (token: string) => resolve(token),
            'error-callback': () => resolve(''),
          })
        } else {
          setTimeout(tryRender, 150)
        }
      }
      tryRender()
    })
  }

  // validation
  const businessNameErr = touched.businessName && businessName.trim().length < 2 ? 'Please enter your business name' : ''
  const contactErr      = touched.contact      && contact.trim().length < 3      ? 'Please enter a contact email or phone number' : ''
  const categoryErr     = touched.category     && !category                      ? 'Please select a category' : ''
  const descriptionErr  = touched.description  && description.trim().length < 10 ? 'Please describe the opportunity in a bit more detail' : ''
  const timingErr       = touched.timing       && !timing                        ? 'Please select a timing' : ''

  const isValid = !businessNameErr && !contactErr && !categoryErr && !descriptionErr && !timingErr
    && businessName.trim().length >= 2
    && contact.trim().length >= 3
    && !!category
    && description.trim().length >= 10
    && !!timing
    && consented

  async function handleSubmit() {
    setTouched({ businessName: true, contact: true, category: true, description: true, timing: true })
    if (!isValid) return
    if (submitInFlight.current) return
    submitInFlight.current = true
    setPhase('loading')
    setApiError(false)

    try {
      const turnstileToken = await getTurnstileToken()
      const res = await fetch('/api/submit-opportunity', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name:   businessName.trim(),
          contact:         contact.trim(),
          category,
          description:     description.trim(),
          timing,
          turnstile_token: turnstileToken,
        }),
      })
      if (!res.ok) throw new Error('SUBMIT_FAILED')
      setScreen('success')
    } catch {
      setApiError(true)
      setPhase('error')
    } finally {
      submitInFlight.current = false
    }
  }

  async function handleShare() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Submit an Opportunity — Innovate With Aima', url })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } catch { /* cancelled */ }
  }

  return (
    <>
      <Helmet>
        <title>Submit an Opportunity · Innovate With Aima</title>
        <meta name="description" content="Share active or upcoming work with the Innovate With Aima professional network." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://innovatewithaima.com/group/submit-an-opportunity" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Helmet>

      <div
        className="min-h-[100dvh] flex flex-col"
        style={{ background: 'linear-gradient(180deg, #f2f2f7 0%, #e5e5ed 100%)' }}
      >
         <div ref={el => { turnstileContainer.current = el }} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />

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
            href="/"
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
            aria-label="Tell a colleague"
          >
            Tell a colleague
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </button>
        </div>

         <div className="flex-1 flex items-start justify-center px-4 pt-6 pb-10">
          <div className="w-full max-w-[480px] flex flex-col gap-4">

            <AnimatePresence mode="wait">

               {screen === 'landing' && (
                <motion.div
                  key="landing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col gap-4"
                >
                  <div className="text-center pb-1">
                    <h1 className="text-[26px] font-bold tracking-tight" style={{ color: '#1c1c1e' }}>
                      What this looks like in practice
                    </h1>
                    <p className="mt-1 text-[13px] leading-relaxed" style={{ color: '#6e6e73' }}>
                      Recent opportunities introduced through our existing network.
                    </p>
                    <p className="mt-1 text-[12px] italic leading-relaxed" style={{ color: '#8e8e93' }}>
                      (Examples shown reflect typical opportunity types shared through the network)
                    </p>
                  </div>

                  <GlassCard>
                    {EXAMPLES.map((ex, i) => (
                      <div key={ex.title}>
                        {i > 0 && <Divider />}
                        <div className="px-5 py-4">
                          <p className="text-[14px] font-semibold" style={{ color: '#1c1c1e' }}>{ex.title}</p>
                          <p className="mt-[3px] text-[12px] leading-relaxed" style={{ color: '#6e6e73' }}>{ex.desc}</p>
                        </div>
                      </div>
                    ))}
                  </GlassCard>

               <FooterLinks variant="landing" />

                  <GlossyButton
                    onClick={() => setScreen('form')}
                    className="w-full"
                  >
                    Start Your Opportunity Submission
                  </GlossyButton>
                </motion.div>
              )}

               {screen === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col gap-3"
                >
                  <div className="text-center pb-1">
                    <h1 className="text-[26px] font-bold tracking-tight" style={{ color: '#1c1c1e' }}>
                      Submit an Opportunity
                    </h1>
                    <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#6e6e73' }}>
                      This page is for businesses and operators sharing active or upcoming work with the Innovate With Aima network.
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed" style={{ color: '#8e8e93' }}>
                      Please provide the key details of your opportunity. Once submitted, you may be asked to confirm it before we proceed.
                    </p>
                  </div>

                   <GlassCard>
                    <div className="px-4 pt-4 pb-3">
                      <label
                        htmlFor="so-business"
                        className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]"
                        style={{ color: '#8e8e93' }}
                      >
                        Business name *
                      </label>
                      <input
                        id="so-business"
                        type="text"
                        value={businessName}
                        onChange={e => setBusinessName(e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, businessName: true }))}
                        placeholder="Enter business name…"
                        autoComplete="organization"
                        className="w-full bg-transparent outline-none placeholder-[#c7c7cc]"
                        style={{ color: '#1c1c1e', fontSize: '16px' }}
                        aria-invalid={!!businessNameErr}
                      />
                      <FieldError msg={businessNameErr} />
                    </div>

                    <Divider />

                    <div className="px-4 pt-3 pb-4">
                      <label
                        htmlFor="so-contact"
                        className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]"
                        style={{ color: '#8e8e93' }}
                      >
                        Contact Email/Phone *
                      </label>
                      <input
                        id="so-contact"
                        type="text"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, contact: true }))}
                        placeholder="Enter email or phone…"
                        autoComplete="email"
                        inputMode="email"
                        className="w-full bg-transparent outline-none placeholder-[#c7c7cc]"
                        style={{ color: '#1c1c1e', fontSize: '16px' }}
                        aria-invalid={!!contactErr}
                      />
                      <FieldError msg={contactErr} />
                    </div>
                  </GlassCard>

                   <GlassCard>
                    <div className="px-4 py-4">
                      <label
                        htmlFor="so-category"
                        className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]"
                        style={{ color: '#8e8e93' }}
                      >
                        Primary industry/opportunity category *
                      </label>
                      <select
                        id="so-category"
                        value={category}
                        onChange={e => { setCategory(e.target.value); setTouched(t => ({ ...t, category: true })) }}
                        className="w-full bg-transparent outline-none"
                        style={{ color: category ? '#1c1c1e' : '#c7c7cc', fontSize: '16px' }}
                        aria-invalid={!!categoryErr}
                      >
                        <option value="" disabled>Please select…</option>
                        {CATEGORIES.map(c => <option key={c} value={c} style={{ color: '#1c1c1e' }}>{c}</option>)}
                      </select>
                      <FieldError msg={categoryErr} />
                    </div>
                  </GlassCard>

                   <GlassCard>
                    <div className="px-4 py-4">
                      <label
                        htmlFor="so-desc"
                        className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]"
                        style={{ color: '#8e8e93' }}
                      >
                        Details *
                      </label>
                      <textarea
                        id="so-desc"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        onBlur={() => setTouched(t => ({ ...t, description: true }))}
                        placeholder="Provide details of the opportunity…"
                        rows={5}
                        className="w-full bg-transparent outline-none resize-none placeholder-[#c7c7cc]"
                        style={{ color: '#1c1c1e', fontSize: '15px', lineHeight: '1.5' }}
                        aria-invalid={!!descriptionErr}
                      />
                      <FieldError msg={descriptionErr} />
                    </div>
                  </GlassCard>

                   <div>
                    <p className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-2 px-1" style={{ color: '#8e8e93' }}>
                      Any deadlines/Timing *
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TIMING_OPTIONS.map(opt => {
                        const active = timing === opt
                        return (
                          <motion.button
                            key={opt}
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={() => { setTiming(opt); setTouched(t => ({ ...t, timing: true })) }}
                            className="rounded-full px-4 py-[7px] text-[13px] font-medium"
                            style={{
                              background: active
                                ? 'linear-gradient(145deg, #5c6cff 0%, #8a96ff 100%)'
                                : 'rgba(255,255,255,0.82)',
                              color:  active ? '#ffffff' : '#1c1c1e',
                              border: active ? 'none' : '1px solid rgba(60,60,67,0.16)',
                              boxShadow: active ? '0 2px 8px rgba(92,108,255,0.32)' : '0 1px 4px rgba(0,0,0,0.06)',
                            }}
                            aria-pressed={active}
                          >
                            {opt}
                          </motion.button>
                        )
                      })}
                    </div>
                    <FieldError msg={timingErr} />
                  </div>

                   <button
                    type="button"
                    onClick={() => setConsented(v => !v)}
                    className="flex items-start gap-3 text-left"
                    aria-pressed={consented}
                  >
                    <div
                      className="flex-shrink-0 mt-[2px] w-[20px] h-[20px] rounded-[5px] flex items-center justify-center"
                      style={{
                        background: consented ? 'linear-gradient(145deg, #5c6cff, #8a96ff)' : 'rgba(255,255,255,0.82)',
                        border:     consented ? 'none' : '1.5px solid rgba(60,60,67,0.28)',
                      }}
                    >
                      <AnimatePresence>
                        {consented && (
                          <motion.svg
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                            width="11" height="11" viewBox="0 0 13 13" fill="none" aria-hidden="true"
                          >
                            <path d="M2.5 6.5l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className="text-[12px] leading-relaxed" style={{ color: '#6e6e73' }}>
                      By providing your information, you consent to Innovatewithaima Ltd contacting you via email, phone, or text regarding our services and your submitted opportunities. We do not sell your personal information, and you can withdraw consent at any time. By submitting this form, you agree to our{' '}
                      <a href="/privacy" style={{ color: '#5c6cff' }} onClick={e => e.stopPropagation()}>Privacy Policy</a>
                      {' '}and{' '}
                      <a href="/terms" style={{ color: '#5c6cff' }} onClick={e => e.stopPropagation()}>Terms &amp; Conditions</a>.
                    </p>
                  </button>

                   <AnimatePresence>
                    {phase === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-[14px] px-4 py-3 text-[13px] leading-snug"
                        style={{ background: 'rgba(255,59,48,0.09)', border: '1px solid rgba(255,59,48,0.22)', color: '#c0392b' }}
                        role="alert"
                      >
                        {apiError ? (
                          <>
                            Something went wrong. Please contact us at{' '}
                            <a href="mailto:contact@innovatewithaima.com" style={{ color: '#c0392b', textDecoration: 'underline' }}>
                              contact@innovatewithaima.com
                            </a>.
                          </>
                        ) : (
                          'Please check the form and try again.'
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                   <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setScreen('landing')}
                      className="flex-1 rounded-full py-[11px] text-[14px] font-semibold"
                      style={{
                        background: 'rgba(255,255,255,0.82)',
                        border:     '1px solid rgba(60,60,67,0.16)',
                        color:      '#1c1c1e',
                      }}
                    >
                      Back
                    </button>

                    <GlossyButton
                      onClick={handleSubmit}
                      disabled={phase === 'loading' || !consented}
                      className="flex-1"
                      style={{ opacity: phase === 'loading' ? 0.72 : 1 }}
                      aria-busy={phase === 'loading'}
                    >
                      {phase === 'loading' && <Spinner />}
                      {phase === 'loading' ? 'Submitting…' : 'Next'}
                    </GlossyButton>
                  </div>

                 <FooterLinks variant="form" />
                </motion.div>
              )}

               {screen === 'success' && (
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
                          Opportunity Submitted
                        </h2>
                        <p className="mt-2 text-[14px] leading-relaxed" style={{ color: '#6e6e73' }}>
                          We'll review your submission and reach out via the contact details you provided.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 flex flex-col items-center gap-2"
                      >
                        <div className="relative w-[36px] h-[36px]">
                          <svg width="36" height="36" viewBox="0 0 36 36" className="-rotate-90">
                            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(92,108,255,0.15)" strokeWidth="3" />
                            <motion.circle
                              cx="18" cy="18" r="15.5" fill="none"
                              stroke="#5c6cff" strokeWidth="3" strokeLinecap="round"
                              strokeDasharray={2 * Math.PI * 15.5}
                              animate={{ strokeDashoffset: 2 * Math.PI * 15.5 * (1 - countdown / 15) }}
                              transition={{ duration: 1, ease: 'linear' }}
                            />
                          </svg>
                          <span
                            className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold"
                            style={{ color: '#5c6cff' }}
                          >
                            {Math.max(countdown, 0)}
                          </span>
                        </div>
                        <p className="text-[12px]" style={{ color: '#8e8e93' }}>
                          Redirecting you in {Math.max(countdown, 0)}s
                        </p>
                      </motion.div>

                      <GlossyButton as="a" href="/" className="mt-4">
                        Back to Home
                      </GlossyButton>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}
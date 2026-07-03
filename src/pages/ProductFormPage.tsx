//ProductFormPage.tsx

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import logo from '../assets/aima.png'
import marketingCard1 from '../assets/lfc01062602xiwa.jpg'
import marketingCard2 from '../assets/lfc01062603xiwa.jpg'

 
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

const MARKETING_URL = '/en/links-for-cleaners'

const RATE_KEY = 'iwa_submit_ts'
const RATE_MS  = 60_000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^(\+44\s?|0)[1-9]\d{8,9}$/
 
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

function ProcessSteps({ activeStep }: { activeStep: number }) {
  const steps = [
    { n: 1, label: 'Application received', desc: 'We confirm your details are in' },
    { n: 2, label: 'Review', desc: 'Our team looks over your request' },
    { n: 3, label: 'Call or email', desc: 'You hear from us directly' },
  ]
  return (
    <div className="w-full max-w-[420px] flex flex-col gap-4">
      <p
        className="text-[10px] font-semibold tracking-[0.1em] uppercase px-1"
        style={{ color: '#8e8e93' }}
      >
        What happens next
      </p>
      <GlassCard>
        <div className="px-5 py-5 flex flex-col gap-4">
          {steps.map((s, i) => {
            const active = i === activeStep
            const done   = i < activeStep
            return (
              <div key={s.n} className="flex items-start gap-3">
                <div className="relative flex-shrink-0 w-[26px] h-[26px] rounded-full flex items-center justify-center text-[12px] font-bold overflow-hidden">
                  {!active && !done && (
                    <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(120,120,128,0.18)' }} />
                  )}
                  {done && !active && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(145deg, #5c6cff 0%, #8a96ff 100%)' }}
                    />
                  )}
                  {active && (
                    <motion.div
                      layoutId="liquid-step-indicator"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(145deg, #5c6cff 0%, #8a96ff 100%)' }}
                    />
                  )}
                  <span className="relative z-10" style={{ color: (active || done) ? '#ffffff' : '#8e8e93' }}>
                    {s.n}
                  </span>
                </div>
                <motion.div animate={{ opacity: active ? 1 : 0.55 }} transition={{ duration: 0.3 }}>
                  <p className="text-[13px] font-semibold" style={{ color: active ? '#1c1c1e' : '#8e8e93' }}>{s.label}</p>
                  <p className="text-[12px] mt-[1px]" style={{ color: '#8e8e93' }}>{s.desc}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}

function PanelSlideshow() {
  const [slide, setSlide]           = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const STEP_MS = 900

  useEffect(() => {
    if (slide === 0) {
      setActiveStep(0)
      const id = setTimeout(() => setSlide(1), 5000)
      return () => clearTimeout(id)
    }
    setActiveStep(0)
    const t1 = setTimeout(() => setActiveStep(1), STEP_MS)
    const t2 = setTimeout(() => setActiveStep(2), STEP_MS * 2)
    const t3 = setTimeout(() => setSlide(0), STEP_MS * 3 + 700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [slide])

  const slides = [<MarketingCards key="cards" />, <ProcessSteps key="steps" activeStep={activeStep} />]

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32 }}
          className="w-full flex justify-center"
        >
          {slides[slide]}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-[6px]">
        {[0, 1].map(i => (
          <button
            key={i}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Show slide ${i + 1}`}
            className="rounded-full"
            style={{
              width:      slide === i ? 16 : 6,
              height:     6,
              background: slide === i ? '#5c6cff' : 'rgba(120,120,128,0.3)',
              transition: 'width 0.25s, background 0.25s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function CompactProcessSteps() {
  const steps = ['Received', 'Review', 'Callback/Email']
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep(s => (s + 1) % steps.length)
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="lg:hidden w-full rounded-[14px] px-4 py-3 flex items-center justify-between"
      style={{
        background:           'rgba(255,255,255,0.6)',
        backdropFilter:       'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        border:               '1px solid rgba(255,255,255,0.85)',
        boxShadow:            '0 1px 12px rgba(0,0,0,0.05)',
      }}
    >
      {steps.map((label, i) => {
        const active = i === activeStep
        const done   = i < activeStep
        return (
          <div key={label} className="flex items-center" style={{ flex: i < steps.length - 1 ? 1 : undefined }}>
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden">
                {!active && !done && (
                  <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(120,120,128,0.18)' }} />
                )}
                {done && !active && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(145deg, #5c6cff 0%, #8a96ff 100%)' }}
                  />
                )}
                {active && (
                  <motion.div
                    layoutId="liquid-compact-step-indicator"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(145deg, #5c6cff 0%, #8a96ff 100%)' }}
                  />
                )}
                <span className="relative z-10" style={{ color: (active || done) ? '#ffffff' : '#8e8e93' }}>
                  {i + 1}
                </span>
              </div>
              <motion.p
                animate={{ opacity: active ? 1 : 0.6 }}
                transition={{ duration: 0.3 }}
                className="text-[9.5px] font-semibold text-center leading-tight whitespace-nowrap"
                style={{ color: active ? '#1c1c1e' : '#8e8e93' }}
              >
                {label}
              </motion.p>
            </div>
            {i < steps.length - 1 && (
              <div className="h-[1.5px] flex-1 mx-1 mt-[-14px]" style={{ background: 'rgba(120,120,128,0.22)' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function MarketingPanel() {  return (
<div
      className="hidden lg:flex lg:w-[42%] flex-shrink-0 flex-col items-center justify-center relative px-8"
   style={{
        background:  '#FAFAFA',
        borderLeft:  '1px solid rgba(60,60,67,0.14)',
      }}
    >
      <PanelSlideshow />
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
  const [apiError,  setApiError]  = useState(false)

const [step,          setStep]          = useState<1 | 2>(1)
  const [showSubtext,   setShowSubtext]   = useState(false)
   useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const url = new URL(window.location.href)
    if (url.searchParams.has('step')) {
      url.searchParams.delete('step')
      window.history.replaceState(null, '', url.toString())
    }
    setStep(1)
   }, [])
const [phone,         setPhone]         = useState('+44 ')
  const [wantsCallback, setWantsCallback] = useState(false)
  const [preferredDay,  setPreferredDay]  = useState('')
  const [preferredTime, setPreferredTime] = useState('')
const [phase2,        setPhase2]        = useState<'idle' | 'loading' | 'error'>('idle')
   const [phase2Error,   setPhase2Error]   = useState(false)

   const turnstileWidgetId  = useState<{ current: string | null }>(() => ({ current: null }))[0]
  const turnstileContainer = useState<{ current: HTMLDivElement | null }>(() => ({ current: null }))[0]
  const submitInFlight     = useState<{ current: boolean }>(() => ({ current: false }))[0]

  useEffect(() => {
    if (document.getElementById('cf-turnstile-script')) return
    const script = document.createElement('script')
    script.id = 'cf-turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  function getTurnstileToken(): Promise<string> {
    return new Promise(resolve => {
      const tryRender = () => {
        if (window.turnstile && turnstileContainer.current) {
          if (turnstileWidgetId.current) {
            try { window.turnstile.remove(turnstileWidgetId.current) } catch { /* already gone */ }
            turnstileWidgetId.current = null
          }
          turnstileWidgetId.current = window.turnstile.render(turnstileContainer.current, {
            sitekey: TURNSTILE_SITE_KEY,
            size:    'invisible',
            callback: (token: string) => {
              resolve(token)
            },
            'error-callback': () => {
              resolve('')
            },
          })
        } else {
          setTimeout(tryRender, 150)
        }
      }
      tryRender()
    })
  }
  const [showBackPill,  setShowBackPill]  = useState(false)
const [showPhoneTip,  setShowPhoneTip]  = useState(false)
  const [countdown,     setCountdown]     = useState(15)
  const DAYS  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const TIMES = ['Morning', 'Afternoon', 'Evening']
const nameErr  = touched.name  && name.trim().length < 2  ? 'Please enter your full name'        : ''
  const emailErr = touched.email && !EMAIL_RE.test(email)   ? 'Please enter a valid email address' : ''
const normalizedPhone = phone.replace(/[\s()-]/g, '')
  const phoneErr = normalizedPhone !== '' && normalizedPhone !== '+44'
    && !PHONE_RE.test(normalizedPhone)
    ? 'Please enter a valid phone number'
    : ''
useEffect(() => {
    if (phase !== 'success') return
    setCountdown(15)
    const interval = setInterval(() => {
      setCountdown(c => c - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [phase])

  useEffect(() => {
    if (phase !== 'success') return
    if (countdown <= 0) {
      window.location.href = '/#'
    }
  }, [countdown, phase])

  function toggleInterest(id: ProductId) {    setInterests(prev => {
      if (prev.has(id) && prev.size === 1) return prev
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

 async function handleShare() {
    const shareUrl = new URL(window.location.href)
    shareUrl.searchParams.delete('step')
    const url = shareUrl.toString()
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
    if (submitInFlight.current) return
    submitInFlight.current = true

 if (isRateLimited()) {
      setApiError(false)
      setPhase('error')
      submitInFlight.current = false
      return
    }

    setPhase('loading')
    setApiError(false)

    try {
      const turnstileToken = await getTurnstileToken()
      const res = await fetch('/api/product-interest', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:            name.trim(),
          email:           email.trim().toLowerCase(),
          products:        [...interests],
          primary_product: product,
          turnstile_token: turnstileToken,
        }),
      })

   if (!res.ok) {
        throw new Error('CONTACT_US')
      }

 localStorage.setItem(RATE_KEY, String(Date.now()))
      setPhase('idle')
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
} catch (err: any) {
      setApiError(true)
      setPhase('error')
    } finally {
      submitInFlight.current = false
    }
  }
  async function handleFinalSubmit() {
    if (submitInFlight.current) return
    submitInFlight.current = true
    setPhase2('loading')
    setPhase2Error(false)

    try {
      const turnstileToken = await getTurnstileToken()
      const res = await fetch('/api/product-interest-callback', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
          email:          email.trim().toLowerCase(),
          phone:          (normalizedPhone === '' || normalizedPhone === '+44') ? null : phone.trim(),
          wants_callback: wantsCallback,
          preferred_day:  wantsCallback ? preferredDay  : null,
          preferred_time: wantsCallback ? preferredTime : null,
          turnstile_token: turnstileToken,
        }),
      })

if (!res.ok) {
        throw new Error('CONTACT_US')
      }

       setPhase('success')
      setStep(1)
} catch (err: any) {
      setPhase2Error(true)
      setPhase2('error')
    } finally {
      submitInFlight.current = false
    }
  }
  return (
    <>
      <Helmet>
      <title>{meta.title} — Access the right products · Innovate With Aima</title>
<meta name="description" content={`Find out if ${meta.title} is right for you, part of the Innovate With Aima professional network.`} />
        <meta name="robots" content="noindex, nofollow" />
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
         href="/#"
            onClick={(e) => {
              if (step === 2 && phase !== 'success') {
                e.preventDefault()
                setShowBackPill(true)
              }
            }}
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

      <AnimatePresence>
          {phase2 === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center pt-3"
            >
              <div
                className="flex items-center gap-2 rounded-full px-4 py-[9px] text-[13px] font-semibold"
                style={{
                  background: 'rgba(255,59,48,0.09)',
                  border:     '1px solid rgba(255,59,48,0.22)',
                  color:      '#c0392b',
                }}
                role="alert"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 8v5M12 17h.01M10.29 3.86l-8.18 14.18A2 2 0 003.82 21h16.36a2 2 0 001.71-3.96L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                We ran into an error, please try again.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBackPill && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center pt-3"
            >
              <div
                className="flex items-center gap-1 rounded-full px-1.5 py-1.5"
                style={{
                  background:           'rgba(242,242,247,0.92)',
                  backdropFilter:       'blur(20px) saturate(1.6)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
                  border:               '0.5px solid rgba(60,60,67,0.14)',
                  boxShadow:            '0 4px 16px rgba(0,0,0,0.1)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowBackPill(false)}
                  className="rounded-full px-4 py-[7px] text-[13px] font-semibold"
                  style={{ color: '#6e6e73' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => { setStep(1); setShowBackPill(false) }}
                  className="rounded-full px-4 py-[7px] text-[13px] font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #5c6cff 0%, #8a96ff 100%)' }}
                >
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

<div className="flex-1 flex">
          <div className="flex-1 lg:w-[58%] lg:flex-none">
            <div className="flex flex-col items-center px-4 pt-5 pb-6 lg:min-h-full lg:justify-center lg:pt-6">
              <div className="w-full max-w-[420px] flex flex-col gap-3">

               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center pb-1"
                >
                  {phase !== 'success' && (
                    <p className="text-[12px] font-semibold mb-2" style={{ color: '#5c6cff' }}>
                      Step {step} of 2
                    </p>
                  )}
           <h1 className="text-[26px] font-bold tracking-tight" style={{ color: '#1c1c1e' }}>
    Access the right products
  </h1>
{phase !== 'success' && (
<>
      <motion.button
        type="button"
        onClick={() => setShowSubtext(v => !v)}
        aria-expanded={showSubtext}
        aria-label="Show more"
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 500, damping: 24 }}
        className="lg:hidden mx-auto mt-2 flex flex-col items-center justify-center"
      >
        <div className="h-[16px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!showSubtext && (
              <motion.span
                key="label"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.16 }}
                className="text-[11px] font-medium"
                style={{ color: '#8e8e93' }}
              >
                Tap to learn more
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.svg
          animate={{ rotate: showSubtext ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
          className="mt-[2px]"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.button>
<div className="lg:hidden overflow-hidden">
        <AnimatePresence initial={false}>
          {showSubtext && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                height:  { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex flex-col gap-3 mt-2"
            >
              <p className="text-[13px] leading-relaxed" style={{ color: '#6e6e73' }}>
                Our solutions are helping dozens of professionals capture more leads, showcase their services, and earn passive income. We're now bringing the same technology to Trades, Property, Aesthetics, and other specialist industries. Register your interest today to help shape future products and receive early partner access.
              </p>
              <CompactProcessSteps />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="hidden lg:block mt-2 text-[13px] leading-relaxed" style={{ color: '#6e6e73' }}>
        Our solutions are helping dozens of professionals capture more leads, showcase their services, and earn passive income. We're now bringing the same technology to Trades, Property, Aesthetics, and other specialist industries. Register your interest today to help shape future products and receive early partner access.
      </p>
    </>
  )}
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

                          <motion.a
                            href="/#"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-4 inline-flex items-center rounded-full px-7 py-[13px] text-[15px] font-semibold text-white"
                            style={{
                              background: 'linear-gradient(135deg, #5c6cff 0%, #8a96ff 100%)',
                              boxShadow:  '0 4px 16px rgba(92,108,255,0.35)',
                            }}
                          >
                            Back to Home
                          </motion.a>
                        </div>
                      </GlassCard>

        <div className="lg:hidden pt-8 flex justify-center">
                        <MarketingCards />
                      </div>
                    </motion.div>
             ) : step === 2 ? (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                      className="flex flex-col gap-3"
                    >
                      <GlassCard>
                     <div className="px-4 pt-4 pb-3 relative">
                          <label
                            htmlFor="pf-phone"
                            className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]"
                            style={{ color: '#8e8e93' }}
                          >
                            Mobile Number
                          </label>
                          <input
                            id="pf-phone"
                            type="tel"
                            value={phone}
                            onChange={e => { setPhone(e.target.value); setShowPhoneTip(false) }}
                            placeholder="Optional"
                            autoComplete="tel"
                            inputMode="tel"
                            className="w-full bg-transparent outline-none placeholder-[#c7c7cc]"
                            style={{ color: '#1c1c1e', fontSize: '16px' }}
                            aria-describedby={phoneErr ? 'pf-phone-err' : showPhoneTip ? 'pf-phone-tip' : undefined}
                            aria-invalid={!!phoneErr}
                          />
                          <span id="pf-phone-err"><FieldError msg={phoneErr} /></span>
                          <AnimatePresence>
                            {showPhoneTip && (
                              <motion.div
                                id="pf-phone-tip"
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.18 }}
                                className="absolute left-4 right-4 top-full mt-1 rounded-[10px] px-3 py-2 text-[12px] font-medium text-white z-10"
                                style={{ background: '#1c1c1e' }}
                                role="alert"
                              >
                                Please enter a mobile number so we can call you back
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <Divider />

                    <button
                          type="button"
                          onClick={() => { setWantsCallback(v => !v); setShowPhoneTip(false) }}
                          className="w-full flex items-center justify-between px-4 py-[13px] text-left"
                          aria-pressed={wantsCallback}
                        >
                          <p className="text-[14px] font-medium" style={{ color: '#1c1c1e' }}>
                            I'd prefer a callback
                          </p>
                          <div
                            className="flex-shrink-0 w-[24px] h-[24px] rounded-[7px] flex items-center justify-center"
                            style={{
                              background: wantsCallback ? 'linear-gradient(145deg, #5c6cff, #8a96ff)' : 'rgba(120,120,128,0.18)',
                            }}
                          >
                            <AnimatePresence>
                              {wantsCallback && (
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
                        </button>

                        <AnimatePresence>
                          {wantsCallback && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Divider />
                              <div className="px-4 pt-3 pb-4 grid grid-cols-2 gap-3">
                                <div>
                                  <label
                                    htmlFor="pf-day"
                                    className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]"
                                    style={{ color: '#8e8e93' }}
                                  >
                                    Preferred Day
                                  </label>
                                  <select
                                    id="pf-day"
                                    value={preferredDay}
                                    onChange={e => setPreferredDay(e.target.value)}
                                    className="w-full bg-transparent outline-none"
                                    style={{ color: '#1c1c1e', fontSize: '15px' }}
                                  >
                                    <option value="">Select</option>
                                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                                  </select>
                                </div>
                                <div>
                                  <label
                                    htmlFor="pf-time"
                                    className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]"
                                    style={{ color: '#8e8e93' }}
                                  >
                                    Preferred Time
                                  </label>
                                  <select
                                    id="pf-time"
                                    value={preferredTime}
                                    onChange={e => setPreferredTime(e.target.value)}
                                    className="w-full bg-transparent outline-none"
                                    style={{ color: '#1c1c1e', fontSize: '15px' }}
                                  >
                                    <option value="">Select</option>
                                    {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                                  </select>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </GlassCard>

                <AnimatePresence>
                     {phase2 === 'error' && phase2Error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-[14px] px-4 py-3 text-[13px] leading-snug"
                            style={{ background: 'rgba(255,59,48,0.09)', border: '1px solid rgba(255,59,48,0.22)', color: '#c0392b' }}
                            role="alert"
                          >
                            Something went wrong on our end. Please contact us at{' '}
                            <a href="mailto:contact@innovatewithaima.com" style={{ color: '#c0392b', textDecoration: 'underline' }}>
                              contact@innovatewithaima.com
                            </a>{' '}
                            and we'll sort it out.
                          </motion.div>
                        )}
               </AnimatePresence>

                      <p className="text-[11px] leading-snug text-center px-2" style={{ color: '#8e8e93' }}>
                        By submitting, you confirm your details are accurate and agree to our{' '}
                        <a href="/privacy" style={{ color: '#5c6cff', textDecoration: 'underline' }}>
                          Privacy Policy
                        </a>.
                      </p>

                 <motion.button
                        type="button"
                        onClick={() => {
                          if (wantsCallback && (normalizedPhone === '' || normalizedPhone === '+44')) {
                            setShowPhoneTip(true)
                            return
                          }
                          handleFinalSubmit()
                        }}
                        disabled={phase2 === 'loading' || !!phoneErr || (wantsCallback && (!preferredDay || !preferredTime))}
                        whileTap={{ scale: 0.97 }}
                        className="w-full rounded-[14px] py-[14px] text-[16px] font-semibold text-white flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #5c6cff 0%, #8a96ff 100%)',
                          boxShadow:  '0 4px 18px rgba(92,108,255,0.36)',
                          opacity:    phase2 === 'loading' ? 0.72 : 1,
                        }}
                        aria-busy={phase2 === 'loading'}
                      >
                {phase2 === 'loading' && <Spinner />}
                        {phase2 === 'loading'
                          ? 'Submitting…'
                          : (normalizedPhone === '' || normalizedPhone === '+44')
                            ? 'Skip'
                            : 'Finish'}
                      </motion.button>
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
                            placeholder="Your name"
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
                            placeholder="your@email.com"
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
                                Something went wrong on our end. Please contact us at{' '}
                                <a href="mailto:contact@innovatewithaima.com" style={{ color: '#c0392b', textDecoration: 'underline' }}>
                                  contact@innovatewithaima.com
                                </a>{' '}
                                and we'll sort it out.
                              </>
                            ) : (
                              'Please wait a moment before submitting again.'
                            )}
                          </motion.div>
                        )}
             </AnimatePresence>

                <p className="text-[11px] leading-snug text-center px-2" style={{ color: '#8e8e93' }}>
                        By submitting, you confirm your details are accurate and agree to our{' '}
                        <a href="/privacy" style={{ color: '#5c6cff', textDecoration: 'underline' }}>
                          Privacy Policy
                        </a>.
                      </p>
                       <motion.button
                        type="button"
                        onClick={phase === 'error' ? () => window.location.reload() : handleSubmit}
                disabled={phase === 'loading'}
                        whileTap={{ scale: 0.97 }}
                        className="w-full rounded-[14px] py-[14px] text-[16px] font-semibold text-white flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #5c6cff 0%, #8a96ff 100%)',
                          boxShadow:  '0 4px 18px rgba(92,108,255,0.36)',
                          opacity:    (phase === 'loading' || phase === 'error') ? 0.72 : 1,
                        }}
                        aria-busy={phase === 'loading'}
                      >
                    {(phase === 'loading' || phase === 'error') && <Spinner />}
  {phase === 'loading' ? 'Submitting…' : phase === 'error' ? 'Refreshing…' : 'Learn More'}
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
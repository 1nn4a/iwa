// src/components/NetworkJoinGate.tsx  (new file)
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTurnstile } from '../hooks/useTurnstile'
import { getCookieConsent } from '../hooks/useCookieConsent'
import GlossyButton from './GlossyButton'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[18px] overflow-hidden"
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

export default function NetworkJoinGate({ onClose, onJoined, compact = false }: { onClose: () => void; onJoined: () => void; compact?: boolean }) {
      const { turnstileContainer, getTurnstileToken } = useTurnstile()
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState({ name: false, businessName: false, email: false })
  const [phase, setPhase] = useState<'idle' | 'loading' | 'error' | 'submitted'>('idle')

  const nameErr         = touched.name && name.trim().length < 2 ? 'Please enter your name' : ''
  const businessNameErr = touched.businessName && businessName.trim().length < 2 ? 'Please enter your business name' : ''
  const emailErr         = touched.email && !EMAIL_RE.test(email) ? 'Please enter a valid email address' : ''

  async function handleSubmit() {
    setTouched({ name: true, businessName: true, email: true })
    if (name.trim().length < 2 || businessName.trim().length < 2 || !EMAIL_RE.test(email)) return
    setPhase('loading')
    try {
      const turnstile_token = await getTurnstileToken()
      const res = await fetch('/api/network-join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
          name: name.trim(),
          business_name: businessName.trim(),
          email: email.trim().toLowerCase(),
          turnstile_token,
          cookie_consent: getCookieConsent(),
        }),
      })
     if (!res.ok) throw new Error('FAILED')
      setPhase('submitted')
      onJoined()
    } catch {
      setPhase('error')
    }
  }

return (
    <div
      className={compact
        ? 'absolute inset-0 z-20 flex flex-col rounded-[18px] overflow-hidden'
        : 'fixed inset-0 z-[100] flex flex-col'}
      style={{ background: compact ? '#FAF9F6' : 'linear-gradient(180deg, #f2f2f7 0%, #e5e5ed 100%)' }}
      onClick={e => e.stopPropagation()}
    >
      <div ref={el => { turnstileContainer.current = el }} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />

      <div
        className={compact ? 'flex-shrink-0 flex items-center justify-end px-3 py-2' : 'flex-shrink-0 flex items-center justify-between px-5 py-3'}
        style={compact ? {} : {
          background:           'rgba(242,242,247,0.88)',
          backdropFilter:       'blur(20px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
          borderBottom:         '0.5px solid rgba(60,60,67,0.14)',
        }}
      >
        {!compact && <span className="w-[60px]" />}
        {!compact && <p className="text-[15px] font-semibold" style={{ color: '#1c1c1e' }}>Join the Network</p>}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={compact ? 'flex items-center justify-end text-[13px] font-medium' : 'flex items-center justify-end w-[60px] text-[15px] font-medium'}
          style={{ color: '#5c6cff' }}
        >
          <svg width={compact ? 14 : 16} height={compact ? 14 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>

   <div className={compact ? 'flex-1 overflow-y-auto flex flex-col items-center px-3 pb-4' : 'flex-1 overflow-y-auto flex flex-col items-center px-4 pt-8 pb-10'}>
        <div className={compact ? 'w-full flex flex-col gap-2' : 'w-full max-w-[420px] flex flex-col gap-3'}>
        {phase === 'submitted' ? (
          <motion.div
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
                <h2 className="text-[22px] font-bold tracking-tight" style={{ color: '#1c1c1e' }}>
                  Application received
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: '#6e6e73' }}>
                  Applications are reviewed in limited intake windows. If accepted, we'll email you access details and onboarding guidance.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#5c6cff] px-6 py-2.5 text-sm font-semibold text-white"
                >
                  Close
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <>
          <div className="text-center pb-1">
            <h1 className="text-[26px] font-bold tracking-tight" style={{ color: '#1c1c1e' }}>
              Apply to Join the Network
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#6e6e73' }}>
              Submit your details to apply for membership and unlock member-only deals once accepted.
            </p>
          </div>

          <GlassCard>
            <div className="px-4 pt-4 pb-3">
              <label htmlFor="nj-name" className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]" style={{ color: '#8e8e93' }}>
                Full Name
              </label>
              <input
                id="nj-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, name: true }))}
                placeholder="Your name"
                autoComplete="name"
                className="w-full bg-transparent outline-none placeholder-[#c7c7cc]"
                style={{ color: '#1c1c1e', fontSize: '16px' }}
                aria-invalid={!!nameErr}
              />
              <FieldError msg={nameErr} />
            </div>

            <Divider />

            <div className="px-4 pt-3 pb-3">
              <label htmlFor="nj-business" className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]" style={{ color: '#8e8e93' }}>
                Business Name
              </label>
              <input
                id="nj-business"
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, businessName: true }))}
                placeholder="Your business name"
                autoComplete="organization"
                className="w-full bg-transparent outline-none placeholder-[#c7c7cc]"
                style={{ color: '#1c1c1e', fontSize: '16px' }}
                aria-invalid={!!businessNameErr}
              />
              <FieldError msg={businessNameErr} />
            </div>

            <Divider />

            <div className="px-4 pt-3 pb-4">
              <label htmlFor="nj-email" className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-[6px]" style={{ color: '#8e8e93' }}>
                Email Address
              </label>
              <input
                id="nj-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                placeholder="your@email.com"
                autoComplete="email"
                inputMode="email"
                className="w-full bg-transparent outline-none placeholder-[#c7c7cc]"
                style={{ color: '#1c1c1e', fontSize: '16px' }}
                aria-invalid={!!emailErr}
              />
              <FieldError msg={emailErr} />
            </div>
          </GlassCard>

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
                Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>

      <GlossyButton
            onClick={handleSubmit}
            disabled={phase === 'loading'}
            className="w-full"
            style={{ opacity: phase === 'loading' ? 0.72 : 1 }}
            aria-busy={phase === 'loading'}
          >
            {phase === 'loading' ? 'Submitting…' : 'Apply to Join'}
          </GlossyButton>
          </>
        )}
        </div>
      </div>
    </div>
  )
}
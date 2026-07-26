// src/components/DealVerifyGate.tsx
import { useState } from 'react'
import { useTurnstile } from '../hooks/useTurnstile'
import GlossyButton from './GlossyButton'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function DealVerifyGate({ slug, onVerified }: { slug: string; onVerified: () => void }) {
  const { turnstileContainer, getTurnstileToken } = useTurnstile()
  const [stage, setStage] = useState<'gate' | 'form'>('gate')
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState({ name: false, businessName: false, email: false })
  const [phase, setPhase] = useState<'idle' | 'loading' | 'error'>('idle')

  const nameErr         = touched.name && name.trim().length < 2 ? 'Please enter your name' : ''
  const businessNameErr = touched.businessName && businessName.trim().length < 2 ? 'Please enter your business name' : ''
  const emailErr         = touched.email && !EMAIL_RE.test(email) ? 'Please enter a valid email address' : ''

  async function handleVerify() {
    setTouched({ name: true, businessName: true, email: true })
    if (name.trim().length < 2 || businessName.trim().length < 2 || !EMAIL_RE.test(email)) return
    setPhase('loading')
    try {
      const turnstile_token = await getTurnstileToken()
      const res = await fetch('/api/deal-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          business_name: businessName.trim(),
          email: email.trim().toLowerCase(),
          slug,
          turnstile_token,
        }),
      })
      if (!res.ok) throw new Error('FAILED')
      onVerified()
    } catch {
      setPhase('error')
    }
  }

  if (stage === 'gate') {
    return (
      <div className="mx-auto max-w-[440px] rounded-[20px] border border-[#083a6f]/10 bg-white px-6 py-10 text-center">
        <h2 className="text-xl font-semibold text-[#083a6f]">This deal is member-locked</h2>
        <p className="mt-2 text-sm text-[#083a6f]/60">Verify a few details to unlock the full deal.</p>
        <GlossyButton onClick={() => setStage('form')} className="mt-6 w-full">
          Get Access
        </GlossyButton>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[440px] rounded-[20px] border border-[#083a6f]/10 bg-white px-6 py-10 text-center">
      <div ref={el => { turnstileContainer.current = el }} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />
      <h2 className="text-xl font-semibold text-[#083a6f]">Verify your details to view this deal</h2>
      <p className="mt-2 text-sm text-[#083a6f]/60">We'll run a quick security check before unlocking the deal details.</p>

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        onBlur={() => setTouched(t => ({ ...t, name: true }))}
        placeholder="Your name"
        className="mt-6 w-full rounded-full border border-[#083a6f]/15 px-4 py-3 text-sm text-[#083a6f] outline-none focus:border-[#5c6cff]"
        aria-invalid={!!nameErr}
      />
      {nameErr && <p className="mt-2 text-xs text-red-600">{nameErr}</p>}

      <input
        type="text"
        value={businessName}
        onChange={e => setBusinessName(e.target.value)}
        onBlur={() => setTouched(t => ({ ...t, businessName: true }))}
        placeholder="Business name"
        className="mt-3 w-full rounded-full border border-[#083a6f]/15 px-4 py-3 text-sm text-[#083a6f] outline-none focus:border-[#5c6cff]"
        aria-invalid={!!businessNameErr}
      />
      {businessNameErr && <p className="mt-2 text-xs text-red-600">{businessNameErr}</p>}

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onBlur={() => setTouched(t => ({ ...t, email: true }))}
        placeholder="your@email.com"
        className="mt-3 w-full rounded-full border border-[#083a6f]/15 px-4 py-3 text-sm text-[#083a6f] outline-none focus:border-[#5c6cff]"
        aria-invalid={!!emailErr}
      />
      {emailErr && <p className="mt-2 text-xs text-red-600">{emailErr}</p>}
      {phase === 'error' && <p className="mt-2 text-xs text-red-600">Verification failed. Please try again.</p>}

      <GlossyButton onClick={handleVerify} className="mt-4 w-full" disabled={phase === 'loading'}>
        {phase === 'loading' ? 'Verifying…' : 'Unlock Deal'}
      </GlossyButton>
    </div>
  )
}
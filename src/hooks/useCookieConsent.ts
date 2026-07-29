// src/hooks/useCookieConsent.ts
import { useState } from 'react'

const KEY = 'iwa_group_cookie_consent'

export type ConsentState = 'accepted' | 'rejected' | null

export function getCookieConsent(): ConsentState {
  try { return (localStorage.getItem(KEY) as ConsentState) || null }
  catch { return null }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(getCookieConsent)

  const accept = () => { localStorage.setItem(KEY, 'accepted'); setConsent('accepted') }
  const reject = () => { localStorage.setItem(KEY, 'rejected'); setConsent('rejected') }

  return { consent, accept, reject }
}
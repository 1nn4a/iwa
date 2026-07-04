import { useEffect, useState } from 'react'

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

export function useTurnstile() {
  const turnstileWidgetId  = useState<{ current: string | null }>(() => ({ current: null }))[0]
  const turnstileContainer = useState<{ current: HTMLDivElement | null }>(() => ({ current: null }))[0]

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

  return { turnstileContainer, getTurnstileToken }
}
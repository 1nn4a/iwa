// src/components/CookieBanner.tsx
import { useCookieConsent } from '../hooks/useCookieConsent'

const sheen = {
  background: 'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0) 55%)',
}

export default function CookieBanner() {
  const { consent, accept, reject } = useCookieConsent()

  if (window.location.hostname !== 'group.innovatewithaima.com') return null
  if (consent !== null) return null

  return (
    <>
      {/* Blocks all page interaction until choice is made */}
      <div
        className="fixed inset-0 z-[90] bg-[#083a6f]/10 backdrop-blur-[2px]"
        style={{ pointerEvents: 'all' }}
        aria-hidden="true"
      />

      {/* Mobile card — bottom sheet, ~200px, well under half screen */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[100] px-3 pb-3">
        <div className="relative overflow-hidden rounded-[20px] border border-white/60 bg-white/90 p-5 shadow-[0_-8px_40px_rgba(8,58,111,0.18)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 rounded-[20px]" style={sheen} />
          <div className="relative">
            <p className="text-sm font-semibold text-[#083a6f]">We use cookies</p>
            <p className="mt-1.5 text-xs leading-5 text-[#083a6f]/60">
              We use cookies to make our site work as you'd expect, improve your experience, analyse site usage and assist our marketing efforts.{' '}
              <a href="https://innovatewithaima.com/cookies" target="_blank" rel="noopener noreferrer" className="underline text-[#5c6cff]">Learn more</a>
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={reject}
                className="flex-1 rounded-full border border-[#083a6f]/20 bg-white/60 py-2.5 text-xs font-semibold text-[#083a6f] transition hover:border-[#083a6f]/40"
              >
                Reject All
              </button>
              <button
                onClick={accept}
                className="flex-1 rounded-full bg-[#5c6cff] py-2.5 text-xs font-semibold text-white shadow-md shadow-[#5c6cff]/30 transition hover:bg-[#4a5aee]"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop thin bar */}
      <div className="hidden sm:flex fixed bottom-0 left-0 right-0 z-[100] items-center justify-between gap-6 border-t border-[#083a6f]/10 bg-white/88 px-6 py-3 shadow-[0_-4px_24px_rgba(8,58,111,0.08)] backdrop-blur-xl">
        <p className="text-xs text-[#083a6f]/65 max-w-2xl">
          <span className="font-semibold text-[#083a6f]">We use cookies</span> to make our site work as you'd expect, improve your experience, analyse site usage and assist our marketing efforts.{' '}
          <a href="https://innovatewithaima.com/cookies" target="_blank" rel="noopener noreferrer" className="underline text-[#5c6cff] hover:text-[#4a5aee]">Learn more</a>
        </p>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={reject}
            className="rounded-full border border-[#083a6f]/20 bg-white/60 px-4 py-2 text-xs font-semibold text-[#083a6f] backdrop-blur-md transition hover:border-[#083a6f]/40"
          >
            Reject All
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-[#5c6cff] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-[#5c6cff]/30 transition hover:bg-[#4a5aee]"
          >
            Accept All
          </button>
        </div>
      </div>
    </>
  )
}
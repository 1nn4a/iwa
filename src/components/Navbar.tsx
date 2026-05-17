import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

interface NavbarProps {
  onOpenBlogSearch: () => void
}

export default function Navbar({ onOpenBlogSearch }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenBlogSearch()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onOpenBlogSearch])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/8 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-3 md:px-8">

          <a href="https://www.innovatewithaima.com/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} className="h-10" alt="AiMA" />
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            <NavLink
              to="/definitions"
              className="px-3 py-2 rounded-lg text-sm text-white/65 font-medium hover:text-white hover:bg-white/6 transition-all"
            >
              Definitions
            </NavLink>

            <a
              href="https://start.innovatewithaima.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm text-white/65 font-medium hover:text-white hover:bg-white/6 transition-all"
            >
              Blogs
            </a>

            <NavLink
              to="/apply"
              className="px-3 py-2 rounded-lg text-sm text-white/65 font-medium hover:text-white hover:bg-white/6 transition-all"
            >
              Contact
            </NavLink>

            <button
              onClick={onOpenBlogSearch}
              aria-label="Search articles"
              className="ml-2 inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-semibold text-white/45 hover:bg-white/[0.09] hover:text-white/80 hover:border-white/18 transition-all cursor-pointer whitespace-nowrap"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Search articles
              <kbd className="inline-flex items-center px-1 py-0.5 rounded text-[9px] font-bold border border-white/10 bg-white/[0.04] text-white/28 leading-none">
                ⌘K
              </kbd>
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <NavLink
              to="/apply"
              className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/16 transition-all"
            >
              Enquire
            </NavLink>

            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.09] transition-all"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/8 bg-black/60 backdrop-blur-xl">
            <nav className="max-w-[1180px] mx-auto px-4 py-3 flex flex-col gap-0.5" aria-label="Mobile navigation">

              <div className="px-3 pt-1 pb-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">Navigate</span>
              </div>

              <NavLink
                to="/definitions"
                onClick={closeMobile}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/6 transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M9 12h6M9 16h6M9 8h3M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
                Definitions
              </NavLink>

              <a
                href="https://start.innovatewithaima.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/6 transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Blogs
              </a>

              <button
                onClick={() => { closeMobile(); onOpenBlogSearch() }}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-white/50 hover:text-white/85 hover:bg-white/5 transition-all text-left border border-white/7 bg-white/[0.02] mt-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                Search articles
                <span className="ml-auto text-[10px] text-white/25 font-medium">16 published</span>
              </button>

              <div className="h-px bg-white/7 my-2" />

              <NavLink
                to="/apply"
                onClick={closeMobile}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/6 transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                Contact
              </NavLink>

              <div className="pt-2 pb-1">
                <NavLink
                  to="/apply"
                  onClick={closeMobile}
                  className="flex items-center justify-center w-full h-10 rounded-full bg-white/10 text-sm font-semibold text-white hover:bg-white/16 transition-all"
                >
                  Enquire
                </NavLink>
              </div>

            </nav>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
    </>
  )
}
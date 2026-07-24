// Navbar.tsx
 import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

interface NavbarProps {
  onOpenBlogSearch: () => void
}

interface NavItem {
  label: string
  to?: string
  href?: string
  external?: boolean
}

interface NavSection {
  label: string
  items: NavItem[]
}

const NAV_TREE: NavSection[] = [
  {
    label: 'Solutions',
    items: [
      { label: 'Links for Cleaners', href: '/en/links-for-cleaners', external: true },
      { label: 'Browse all', to: '/en/products' },
    ],
  },
  {
    label: 'Network',
    items: [
      { label: 'Membership', to: '/apply' },
      { label: 'Opportunities', href: 'https://innovatewithaima.com/group/submit-an-opportunity', external: true },
    ],
  },
  {
    label: 'Framework',
    items: [
      { label: 'FAQ', href: '/#faq' },
      { label: 'Key Principles', to: '/definitions' },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'Contact', to: '/apply' },
      { label: 'Home', to: '/' },
    ],
  },
]

const whiteGlossyStyle = `
  .navbar-white-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    isolation: isolate;
    overflow: hidden;
    border: none;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    border-radius: 999px;
    width: 100%;
    height: 44px;
    font-size: 14px;
    font-weight: 700;
    color: #083a6f;
    background: radial-gradient(
      ellipse 110% 120% at 50% 18%,
      #FFFFFF 0%,
      #FDFEFF 15%,
      #FAFCFF 25%,
      #F5F8FC 35%,
      #EFF3F9 45%,
      #E8EDF5 55%,
      #E1E7F0 65%,
      #D9E0EC 75%,
      #D2DAE8 83%,
      #CCD5E4 90%,
      #C6D0E1 95%,
      #C0CADD 100%
    );
    box-shadow:
      0 6px 22px 0 rgba(8, 58, 111, 0.18),
      inset 0 1px 1px rgba(255, 255, 255, 0.9);
  }
  .navbar-white-btn::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,0.5) 0%,
      rgba(255,255,255,0.2) 30%,
      rgba(255,255,255,0.0) 45%
    );
  }
  .navbar-white-btn:active {
    transform: translateY(1px);
  }
  .navbar-white-btn-content {
    position: relative;
    z-index: 2;
  }
`

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function NavItemLink({ item, onClick, className }: { item: NavItem; onClick: () => void; className: string }) {
  if (item.to) {
    return (
      <NavLink key={item.label} to={item.to} onClick={onClick} className={className}>
        {item.label}
      </NavLink>
    )
  }
  return (
    <a
      key={item.label}
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={className}
    >
      {item.label}
    </a>
  )
}

export default function Navbar({ onOpenBlogSearch }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function closeMobile() {
    setMobileOpen(false)
    setOpenMobileSection(null)
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/8 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-3 md:px-8">

          <a href="https://www.innovatewithaima.com/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} className="h-10" alt="AiMA" />
          </a>

          <nav ref={navRef} className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {NAV_TREE.map(section => {
              const isOpen = openMenu === section.label
              return (
                <div key={section.label} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : section.label)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-white/65 font-medium hover:text-white hover:bg-white/6 transition-all"
                    aria-expanded={isOpen}
                  >
                    {section.label}
                    <ChevronIcon open={isOpen} />
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 top-full mt-2 min-w-[200px] rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-xl shadow-black/40 py-2">
                      {section.items.map(item => (
                        <NavItemLink
                          key={item.label}
                          item={item}
                          onClick={() => setOpenMenu(null)}
                          className="block px-4 py-2.5 text-sm text-white/65 hover:text-white hover:bg-white/6 transition-all"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

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
      </header>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] z-50 bg-black overflow-y-auto">
          <nav className="max-w-[1180px] mx-auto px-4 py-4 flex flex-col" aria-label="Mobile navigation">

              {NAV_TREE.map(section => {
                const isOpen = openMobileSection === section.label
                return (
                  <div key={section.label} className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setOpenMobileSection(isOpen ? null : section.label)}
                      className="flex w-full items-center justify-between py-5 text-xl font-semibold text-white"
                      aria-expanded={isOpen}
                    >
                      {section.label}
                      <ChevronIcon open={isOpen} />
                    </button>

                    {isOpen && (
                      <div className="pb-4 flex flex-col gap-1">
                        {section.items.map(item => (
                          <NavItemLink
                            key={item.label}
                            item={item}
                            onClick={closeMobile}
                            className="py-3 text-lg text-white/70 hover:text-white transition-all"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              <button
                onClick={() => { closeMobile(); onOpenBlogSearch() }}
                className="flex items-center gap-3 py-5 text-xl font-semibold text-white text-left border-b border-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                Search articles
              </button>

              <div className="pt-6">
                <NavLink to="/apply" onClick={closeMobile} className="navbar-white-btn">
                  <span className="navbar-white-btn-content">Enquire</span>
                </NavLink>
              </div>

            </nav>
            <style>{whiteGlossyStyle}</style>
          </div>
        )}

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
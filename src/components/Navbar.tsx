// Navbar.tsx
import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo.webp'

interface NavItem {
  label: string
  to?: string
  href?: string
  external?: boolean
}

interface NavSection {
  label: string
  items: NavItem[]
  to?: string
}

const isGroupDomain = typeof window !== 'undefined' && window.location.hostname === 'group.iwagroup.co.uk'

const GROUP_DOMAIN_SAFE_PATHS = ['/join', '/group/submit-an-opportunity']
function isSafeOnGroupDomain(item: NavItem) {
  const path = item.to ?? (item.href ? new URL(item.href, 'https://group.iwagroup.co.uk').pathname : '')
  return GROUP_DOMAIN_SAFE_PATHS.some(safe => path === safe || path.startsWith(safe + '/'))
}

const NAV_TREE_ALL: NavSection[] = [
  {
    label: 'Solutions',
    items: [
      { label: 'Links for Cleaners', to: '/en/links-for-cleaners' },
      { label: 'Browse all', to: '/en/products' },
    ],
  },
  {
    label: 'Network',
    items: [
      isGroupDomain
        ? { label: 'Membership', href: 'https://iwagroup.co.uk/apply', external: true }
        : { label: 'Membership', to: '/apply' },
      { label: 'Submit Opportunities', href: 'https://iwagroup.co.uk/group/submit-an-opportunity', external: true },
      { label: 'Ambassador Programme', href: 'https://group.iwagroup.co.uk/join' },
    ],
  },
  {
    label: 'Overview',
    items: [
      { label: 'Framework', to: '/definitions' },
      { label: 'About', to: '/about' },
    ],
  },
  isGroupDomain
    ? {
        label: 'Home',
        items: [{ label: 'Back to Home', href: 'https://iwagroup.co.uk/', external: true }],
      }
    : {
        label: 'Home',
        items: [{ label: 'Back to Home', to: '/' }],
        to: '/',
      },
]

const NAV_TREE: NavSection[] = isGroupDomain
  ? NAV_TREE_ALL
      .map(section => ({ ...section, items: section.items.filter(isSafeOnGroupDomain) }))
      .filter(section => section.to || section.items.length > 0)
  : NAV_TREE_ALL

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
      <NavLink to={item.to} onClick={onClick} className={className}>
        {item.label}
      </NavLink>
    )
  }
  return (
    <a
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function isSectionActive(section: NavSection) {
    if (section.to) return location.pathname === section.to
    return section.items.some(item => {
      if (item.to) return location.pathname.startsWith(item.to)
      if (item.href) return location.pathname === new URL(item.href, window.location.origin).pathname
      return false
    })
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
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
      <header className={`fixed left-0 top-0 z-50 w-full [transform:translateZ(0)] transition-colors duration-300 ${scrolled ? 'border-b border-white/8 bg-black/45 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'}`}>
        <div className="flex w-full items-center justify-between gap-6 px-4 py-3 md:px-10 lg:px-16">
          <a href="https://iwagroup.co.uk/" className="flex flex-shrink-0 items-center gap-2">
            <img src={logo} className="h-10" alt="AiMA" />
          </a>

          <nav ref={navRef} className="hidden flex-1 items-center justify-evenly md:flex" aria-label="Primary navigation">
            {NAV_TREE.map(section => {
              const isActiveSection = isSectionActive(section)
              if (section.to) {
                return (
                  <NavLink
                    key={section.label}
                    to={section.to}
                    end
                    className={`flex items-center gap-1 whitespace-nowrap px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActiveSection
                        ? 'text-white bg-[#5c6cff] shadow-md shadow-[#5c6cff]/30'
                        : 'text-white/65 hover:text-white hover:bg-white/6'
                    }`}
                  >
                    {section.label}
                  </NavLink>
                )
              }
              const isOpen = openMenu === section.label
              return (
                <div key={section.label} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : section.label)}
                    className={`flex items-center gap-1 whitespace-nowrap px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActiveSection
                        ? 'text-white bg-[#5c6cff] shadow-md shadow-[#5c6cff]/30'
                        : 'text-white/65 hover:text-white hover:bg-white/6'
                    }`}
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
          </nav>

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
      </header>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] z-50 bg-black overflow-y-auto">
          <nav className="max-w-[1180px] mx-auto px-4 py-4 flex flex-col" aria-label="Mobile navigation">
            {NAV_TREE.map(section => {
              const isOpen = openMobileSection === section.label
              const isActiveSection = isSectionActive(section)
              return (
                <div key={section.label} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenMobileSection(isOpen ? null : section.label)}
                    className={`flex w-full items-center justify-between py-5 text-xl font-semibold ${isActiveSection ? 'text-[#8da2ff]' : 'text-white'}`}
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
          </nav>
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
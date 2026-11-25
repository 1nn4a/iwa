// Footer.tsx
type FooterLink = { label: string; href: string; external?: boolean }
type FooterColumn = { title: string; links: FooterLink[] }

const COLUMNS: FooterColumn[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: 'https://iwagroup.co.uk/about' },
      { label: 'Contact Us', href: 'mailto:contact@iwagroup.co.uk' },
    ],
  },
  {
    title: 'Platforms',
    links: [
      { label: 'Links For Cleaners', href: 'https://iwagroup.co.uk/en/links-for-cleaners' },
      { label: 'Links For Managers', href: 'https://iwagroup.co.uk/product-property-form' },
      { label: 'Tradespeople', href: 'https://iwagroup.co.uk/product-trades-form' },
      { label: 'Aestheticians', href: 'https://iwagroup.co.uk/product-beauty-form' },
      { label: 'Influencers', href: 'https://iwagroup.co.uk/en/cleaning-programme' },
    ],
  },
  {
    title: 'Opportunities',
    links: [
      { label: 'Ambassador Programme', href: 'https://group.iwagroup.co.uk/join' },
      { label: 'Apply', href: 'https://iwagroup.co.uk/apply' },
      { label: 'Submit an Opportunity', href: 'https://iwagroup.co.uk/group/submit-an-opportunity' },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/innovatewithaima', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/innovatewithaima/', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: 'https://iwagroup.co.uk/privacy' },
      { label: 'Website Terms', href: 'https://iwagroup.co.uk/terms' },
      { label: 'Cookies', href: 'https://iwagroup.co.uk/cookies' },
    ],
  },
]

interface FooterProps {
  variant?: 'dark' | 'light'
}

export default function Footer({ variant = 'dark' }: FooterProps) {
  const isLight = variant === 'light'
  const heading = isLight ? 'text-black' : 'text-white'
  const link = isLight ? 'text-black/65 active:text-black hover:text-black' : 'text-white/65 active:text-white hover:text-white'
  const border = isLight ? 'border-black/10' : 'border-white/10'
  const muted = isLight ? 'text-black/45' : 'text-white/45'
  const isGroupHost = typeof window !== 'undefined' && window.location.hostname === 'group.iwagroup.co.uk'
  const container = isGroupHost ? 'w-full' : 'mx-auto max-w-[1180px]'

  return (
    <footer className={`border-t ${border} ${isLight ? 'bg-white text-black' : 'bg-[#083a6f] text-white'}`}>
      <div className={`${container} px-5 pt-10 pb-8 md:px-8 md:pt-12`}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {COLUMNS.map(col => (
            <section key={col.title} aria-label={col.title}>
              <h3 className={`mb-3 text-base font-bold leading-snug ${heading}`}>{col.title}</h3>
              <ul className="flex flex-col">
                {col.links.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className={`inline-flex min-h-[36px] items-center break-words text-sm leading-snug transition-colors ${link}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className={`border-t ${border}`}>
        <div className={`${container} px-5 py-5 md:px-8`}>
       <div className={`text-xs leading-relaxed ${muted}`}>
  <p>
    © 2026 Innovatewithaima Ltd. All rights reserved.
  </p>
  <p className="mt-2">
    Innovatewithaima Ltd · Registered in England and Wales ·
    Company No. 15198798 · Registered Office: 124 City Road,
    London, EC1V 2NX.
  </p>
</div>
        </div>
      </div>
    </footer>
  )
}
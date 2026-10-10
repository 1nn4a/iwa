// Footer.tsx
interface FooterProps {
  variant?: 'dark' | 'light'
}

type FooterLink = { label: string; href: string; external?: boolean }
type FooterColumn = { title: string; links: FooterLink[] }

const COLUMNS: FooterColumn[] = [
  {
    title: 'About iwagroup.co.uk',
    links: [
      { label: 'About', href: 'https://iwagroup.co.uk/about' },
      { label: 'Definitions', href: 'https://iwagroup.co.uk/definitions' },
      { label: 'Apply', href: 'https://iwagroup.co.uk/apply' },
      { label: 'Submit an Opportunity', href: 'https://iwagroup.co.uk/group/submit-an-opportunity' },
      { label: 'Privacy Policy', href: 'https://iwagroup.co.uk/privacy' },
      { label: 'Terms & Conditions', href: 'https://iwagroup.co.uk/terms' },
      { label: 'Cookies', href: 'https://iwagroup.co.uk/cookies' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Links For Cleaners', href: 'https://iwagroup.co.uk/en/links-for-cleaners' },
      { label: 'Links For Managers', href: 'https://iwagroup.co.uk/product-property-form' },
      { label: 'Tradespeople', href: 'https://iwagroup.co.uk/product-trades-form' },
      { label: 'Aestheticians', href: 'https://iwagroup.co.uk/product-beauty-form' },
      { label: 'Influencers', href: 'https://iwagroup.co.uk/en/cleaning-programme' },
    ],
  },
  {
    title: 'Talents',
    links: [
      { label: 'Ambassador Programme', href: 'https://group.iwagroup.co.uk/join' },
      { label: 'Apply', href: 'https://iwagroup.co.uk/apply' },
    ],
  },
  {
    title: 'Follow us',
    links: [
      { label: 'IWA Official LinkedIn', href: 'https://www.linkedin.com/company/innovatewithaima', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/innovatewithaima/', external: true },
    ],
  },
  {
    title: 'Contact us',
    links: [
      { label: 'contact@innovatewithaima.com', href: 'mailto:contact@innovatewithaima.com' },
    ],
  },
]

export default function Footer({ variant = 'dark' }: FooterProps) {
  const isLight = variant === 'light'
  const heading = isLight ? 'text-black' : 'text-white'
  const link = isLight ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
  const border = isLight ? 'border-black/10' : 'border-white/10'
  const muted = isLight ? 'text-black/40' : 'text-white/40'
  const isGroupHost = typeof window !== 'undefined' && window.location.hostname === 'group.iwagroup.co.uk'

  return (
    <footer className={`border-t ${border} ${isLight ? 'bg-white text-black' : 'bg-[#083a6f] text-white'}`}>
      <div className={`px-5 pt-12 md:px-8 ${isGroupHost ? 'w-full' : 'mx-auto max-w-[1180px]'}`}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-sm sm:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map(col => (
            <div key={col.title}>
              <p className={`mb-4 text-[15px] font-bold ${heading}`}>{col.title}</p>
              <div className="flex flex-col gap-3">
                {col.links.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={`break-all ${link}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-12 border-t ${border}`}>
        <div className={`px-5 py-5 md:px-8 ${isGroupHost ? 'w-full' : 'mx-auto max-w-[1180px]'}`}>
          <p className={`text-xs ${muted}`}>
            Copyright © 2023-2026 Innovatewithaima ltd All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
// Footer.tsx
import footer from '../assets/footer.png'
import logo from '../assets/logo.png'

interface FooterProps {
  variant?: 'dark' | 'light'
}

export default function Footer({ variant = 'dark' }: FooterProps) {
  const isLight = variant === 'light'
  const label = isLight ? 'text-black/40' : 'text-white/40'
  const link = isLight ? 'text-black/70 hover:text-black' : 'text-white/70 hover:text-white'
  const border = isLight ? 'border-black/10' : 'border-white/8'

  return (
<footer className={`border-t ${border} ${isLight ? 'bg-white text-black' : 'bg-[#083a6f] text-white'}`}>
        <div className={`px-5 py-12 md:px-8 ${typeof window !== 'undefined' && window.location.hostname === 'group.innovatewithaima.com' ? 'w-full' : 'mx-auto max-w-[1180px]'}`}>

        <div className="flex flex-col md:flex-row md:justify-between gap-10">

 <div className="max-w-xs">
<div className="flex items-center gap-3 mb-3">
  <img src={logo} className={`h-8 opacity-90 ${isLight ? 'invert' : ''}`} alt="" />
  <img src={footer} className={`h-8 opacity-90 ${isLight ? 'invert' : ''}`} alt="Innovatewithaima" />
</div>
  <p className={`text-sm ${isLight ? 'text-black/60' : 'text-white/60'}`}>
A Private Professional Network for Specialist Businesses.
  </p>
</div>

           <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-3 ${label}`}>Legal</p>
              <div className="flex flex-col gap-2">
                <a href="https://www.innovatewithaima.com/privacy" className={link}>Privacy Policy</a>
                <a href="https://www.innovatewithaima.com/terms" className={link}>Terms & Conditions</a>
                <a href="https://www.innovatewithaima.com/cookies" className={link}>Cookies</a>
              </div>
            </div>

            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-3 ${label}`}>Company</p>
              <div className="flex flex-col gap-2">
                <a href="https://www.innovatewithaima.com/definitions" className={link}>Definitions</a>
                <a href="https://start.innovatewithaima.com" target="_blank" rel="noopener noreferrer" className={link}>Blogs</a>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${label}`}>Contact us</p>
                <div className="flex gap-3">
                  
                   <a href="https://www.instagram.com/innovatewithaima/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${isLight ? 'bg-black/5' : 'bg-white/10'}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  
                   <a href="https://www.linkedin.com/company/innovatewithaima"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${isLight ? 'bg-black/5' : 'bg-white/10'}`}
                  >
                   <svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor">
  <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341C24.22 107 0 82.76 0 53.19a53.19 53.19 0 01106.38 0c0 29.57-24.22 53.81-52.54 53.81zM447.9 448h-92.68V302.4c0-34.7-.7-79.34-48.29-79.34-48.29 0-55.68 37.7-55.68 76.66V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
</svg>
                  </a>
                </div>
              </div>
              <p className={`text-sm ${isLight ? 'text-black/60' : 'text-white/60'}`}>
                © 2026 Innovatewithaima. All rights reserved.
              </p>
            </div>
          </div>

        </div>

      </div>
    </footer>
  )
}
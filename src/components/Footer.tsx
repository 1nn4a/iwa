//Footer.tsx
import footer from '../assets/footer.png'

interface FooterProps {
  variant?: 'dark' | 'light'
}

export default function Footer({ variant = 'dark' }: FooterProps) {
  const isLight = variant === 'light'
  return (
    <footer className={`${isLight ? '' : 'mt-24'} border-t ${isLight ? 'border-black/10 bg-white text-black' : 'border-white/8 text-white'}`}>

      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8">

        <div className="grid md:grid-cols-3 gap-10 items-center">

          <div className={`text-sm ${isLight ? 'text-black/70' : 'text-white/70'}`}>
            <p>© 2026 Innovatewithaima. All rights reserved.</p>

            <div className="flex gap-4 mt-3">
              <a href="https://www.innovatewithaima.com/privacy">Privacy Policy</a>
              <a href="https://www.innovatewithaima.com/terms">Terms & Conditions</a>
              <a href="https://www.innovatewithaima.com/cookies">Cookies</a>
            </div>
          </div>

          <div className="flex justify-center">
            <img src={footer} className="h-16 opacity-90" />
          </div>

          <div className={`flex flex-col text-center md:text-left items-end gap-2 text-sm ${isLight ? 'text-black/70' : 'text-white/70'}`}>

            <a href="https://www.innovatewithaima.com/definitions">Definitions</a>

            <a
              href="https://www.instagram.com/innovatewithaima/"
              target="_blank"
            >
              Instagram
            </a>

            <a
              href="https://www.linkedin.com/company/innovatewithaima"
              target="_blank"
            >
              LinkedIn
            </a>

            <a
              href="https://start.innovatewithaima.com"
              target="_blank"
            >
              Blogs
            </a>

          </div>

        </div>

      </div>
    </footer>
  )
}
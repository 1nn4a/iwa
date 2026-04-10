import footer from '../assets/footer.png'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8 text-white">

      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8">

        <div className="grid md:grid-cols-3 gap-10 items-center">

          <div className="text-sm text-white/70">
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

          <div className="flex flex-col text-center md:text-left items-end gap-2 text-sm text-white/70">

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
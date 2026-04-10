import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/8 bg-black/45 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-3 md:px-8">

        <a href="https://www.innovatewithaima.com/" className="flex items-center gap-2">
          <img src={logo} className="h-10" />
        </a>

        <nav className="hidden items-center gap-7 md:flex text-sm text-white/70">

          <NavLink to="https://www.innovatewithaima.com/definitions">Definitions</NavLink>

          <a href="https://start.innovatewithaima.com" target="_blank">
            Blogs
          </a>

          <NavLink to="https://www.innovatewithaima.com/apply">Contact</NavLink>

        </nav>

        <NavLink
          to="https://www.innovatewithaima.com/apply"
          className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white"
        >
          Enquire
        </NavLink>

      </div>
    </header>
  )
}
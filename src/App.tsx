import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DefinitionsPage from './pages/DefinitionsPage'
import ApplyPage from './pages/ApplyPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import CookiesPage from './pages/CookiesPage'
import BlogsPage from './pages/BlogsPage'
import BlogPage from './pages/BlogPage'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import NotFound from './pages/NotFound'
import BlogSearchOverlay from './components/BlogSearchOverlay'

function StartRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    if (
      window.location.hostname === 'start.innovatewithaima.com' &&
      !window.location.pathname.startsWith('/blog')
    ) {
      navigate('/blog', { replace: true })
    }
  }, [navigate])
  return null
}

export default function App() {
  const [blogSearchOpen, setBlogSearchOpen] = useState(false)

  return (
    <BrowserRouter>
      <StartRedirect />
      <div className="min-h-screen flex flex-col">
        <div className="min-h-screen overflow-x-hidden">
          <Navbar onOpenBlogSearch={() => setBlogSearchOpen(true)} />
          <ScrollToTop />
          <div className="pt-20">
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/definitions" element={<DefinitionsPage />} />
                <Route path="/apply" element={<ApplyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
                <Route path="/blog" element={<BlogsPage />} />
                <Route path="/blog/:slug" element={<BlogPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
  <Footer />
          <ScrollToTopButton />
          <BlogSearchOverlay
            isOpen={blogSearchOpen}
            onClose={() => setBlogSearchOpen(false)}
          />
        </div>
      </div>
    </BrowserRouter>
  )
}
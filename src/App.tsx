//App.tsx
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import homeBg from './assets/iwa@.20260701.png'
import DefinitionsPage from './pages/DefinitionsPage'
import AboutPage from './pages/AboutPage'
import ApplyPage from './pages/ApplyPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import CookiesPage from './pages/CookiesPage'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import NotFound from './pages/NotFound'
import ProductFormPage from './pages/ProductFormPage'
import ProductsPage from './pages/ProductsPage'
import LinksForCleaners from './pages/LinksForCleaners'
import LinksForCleanersCreators from './pages/LinksForCleanersCreators'
import SubmitOpportunityPage from './pages/SubmitOpportunityPage'
import JoinPage from './pages/JoinPage'
import CookieBanner from './components/CookieBanner'

function StartRedirect() {
  useEffect(() => {
    if (window.location.hostname !== 'group.iwagroup.co.uk') return
    const path = window.location.pathname

    if (path === '/apply') {
      window.location.replace('https://iwagroup.co.uk/apply')
      return
    }
    if (path === '/') {
      window.location.replace('https://iwagroup.co.uk/')
      return
    }
    if (!path.startsWith('/join')) {
      window.location.replace('https://iwagroup.co.uk/group/submit-an-opportunity')
      return
    }
    document.body.classList.add('group-domain')
  }, [])

  return null
}

function AppShell() {
  const location = useLocation()
  const isFormPage = location.pathname.startsWith('/product-') && location.pathname.endsWith('-form')
  const isProductLandingPage = ['/en/links-for-cleaners', '/en/cleaning-programme', '/group/submit-an-opportunity'].includes(location.pathname)
  const isFullBleedHeroPage = location.pathname === '/join'
  const isNoPaddingPage = isFormPage || isProductLandingPage || isFullBleedHeroPage
  const isNoNavPage = isFormPage || location.pathname === '/group/submit-an-opportunity'
  const isLightFooterPage = isFormPage
  const isHomePage = location.pathname === '/'
  const isGroupHost = window.location.hostname === 'group.iwagroup.co.uk'

  return (
    <div className="min-h-screen flex flex-col">
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        {!isNoNavPage && <Navbar />}
        <ScrollToTop />
        <div className={`relative flex-1 flex flex-col ${isNoPaddingPage ? '' : 'pt-20'}`}>
          {isHomePage && (
            <div
              className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
              style={{
                backgroundImage: `url(${homeBg})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          )}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/definitions" element={<DefinitionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/apply" element={<ApplyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/en/products" element={<ProductsPage />} />
              <Route path="/en/links-for-cleaners" element={<LinksForCleaners />} />
              <Route path="/en/cleaning-programme" element={<LinksForCleanersCreators />} />
              <Route path="/product-trades-form" element={<ProductFormPage product="trades" />} />
              <Route path="/product-beauty-form" element={<ProductFormPage product="beauty" />} />
              <Route path="/product-property-form" element={<ProductFormPage product="property" />} />
              <Route path="/group/submit-an-opportunity" element={<SubmitOpportunityPage />} />
              <Route path="/join" element={isGroupHost ? <JoinPage /> : <Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer variant={isLightFooterPage ? 'light' : 'dark'} />
        {!isNoNavPage && <ScrollToTopButton />}
        <CookieBanner />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <StartRedirect />
      <AppShell />
    </BrowserRouter>
  )
}
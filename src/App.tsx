import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DefinitionsPage from './pages/DefinitionsPage';
import ApplyPage from './pages/ApplyPage';
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import CookiesPage from './pages/CookiesPage'
import CookieBanner from './components/CookieBanner'
import ScrollToTop from "./components/ScrollToTop"

export default function App() {
  return (
    
    <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <ScrollToTop/>
        <div className="pt-20">
          <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/definitions" element={<DefinitionsPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/terms" element={<TermsPage />} />
<Route path="/privacy" element={<PrivacyPage />} />
<Route path="/cookies" element={<CookiesPage />} />

          </Routes>
          </main>
        </div>
        <Footer />
        <CookieBanner />
                </div>

      </div>
    </BrowserRouter>
  );
}
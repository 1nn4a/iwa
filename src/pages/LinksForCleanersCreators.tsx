// LinksForCleanersCreators.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import heroDesktopImg from '../assets/linksforcleaners@.dprogramme.jpg';
import heroMobileImg from '../assets/linksforcleaners@.pprogramme.jpg';
import shareImg from '../assets/linksforcleaners@.cprogramme.jpg';
// import QuickNav from '../components/QuickNav';
import GlossyButton from '../components/GlossyButton';

const faqs: [string, string][] = [
  ['What is a clean-fluencer?', 'A clean-fluencer is a creator who shares cleaning-related content across platforms such as TikTok, Instagram or YouTube. Many build audiences around cleaning tips, product reviews, transformations and business advice. Links For Cleaners provides a professional profile where creators can organise their content, recommendations, affiliate links and business enquiries in one place.'],
  ['How do cleaning creators make money online?', 'Cleaning creators often generate income through affiliate partnerships, sponsored content, selling services, recommending products and collaborating with brands. Links For Cleaners helps creators present these opportunities through one personalised profile designed for audiences and commercial partnerships.'],
  ['Can I have affiliate links and my cleaning business on the same page?', 'Yes. Many creators also operate cleaning businesses. Links For Cleaners allows creators to combine affiliate recommendations, business enquiries, instant quotes, booking journeys, callback requests and walkthrough bookings within one organised profile, with features enabled according to how they operate.'],
  ['Can brands contact me through my profile?', 'Yes. Your profile can include dedicated contact options for commercial enquiries, collaborations and partnerships, giving brands one professional destination to learn about your work and get in touch.'],
  ['Can I track how people interact with my creator profile?', 'Yes. Links For Cleaners includes Profile Analytics showing profile visits, returning visitors, traffic sources, link clicks and enquiry activity, helping creators understand which content generates the most engagement and opportunities.'],
];

export default function LinksForCleanersCreators() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>LinksForCleaners Creator Programme- Turn Cleaning Content Into Rewards | Innovate With Aima</title>
        <meta name="description" content="A personalised profile for cleaning creators. Organise content, recommend products, attract brand deals and earn affiliate income from one link." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="LinksForCleaners Creator Programme- Turn Content Into Income" />
        <meta property="og:description" content="Build a cleaning creator profile that works while you create. Affiliate links, brand deals, and bookings from one profile." />
        <meta property="og:image" content={shareImg} />
        <meta property="og:type" content="website" />
<meta property="og:url" content="https://innovatewithaima.com/en/cleaning-programme" />
<meta property="og:url" content="https://innovatewithaima.com/en/cleaning-programme" />
<link rel="canonical" href="https://innovatewithaima.com/en/cleaning-programme" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LinksForCleaners Creator Programme" />
        <meta name="twitter:description" content="A personalised profile for cleaning creators. Content, recommendations and affiliate income from one link." />
        <meta name="twitter:image" content={shareImg} />
        <script type="application/ld+json">{`
          {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a clean-fluencer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A clean-fluencer is a creator who shares cleaning-related content across platforms such as TikTok, Instagram or YouTube. Many build audiences around cleaning tips, product reviews, transformations and business advice. Links For Cleaners provides a professional profile where creators can organise their content, recommendations, affiliate links and business enquiries in one place."
      }
    },
    {
      "@type": "Question",
      "name": "How do cleaning creators make money online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cleaning creators often generate income through affiliate partnerships, sponsored content, selling services, recommending products and collaborating with brands. Links For Cleaners helps creators present these opportunities through one personalised profile designed for audiences and commercial partnerships."
      }
    },
    {
      "@type": "Question",
      "name": "Can I have affiliate links and my cleaning business on the same page?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Many creators also operate cleaning businesses. Links For Cleaners allows creators to combine affiliate recommendations, business enquiries, instant quotes, booking journeys, callback requests and walkthrough bookings within one organised profile, with features enabled according to how they operate."
      }
    },
    {
      "@type": "Question",
      "name": "Can brands contact me through my profile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Your profile can include dedicated contact options for commercial enquiries, collaborations and partnerships, giving brands one professional destination to learn about your work and get in touch."
      }
    },
    {
      "@type": "Question",
      "name": "Can I track how people interact with my creator profile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Links For Cleaners includes Profile Analytics showing profile visits, returning visitors, traffic sources, link clicks and enquiry activity, helping creators understand which content generates the most engagement and opportunities."
      }
    }
  ]
}
        `}</script>
      </Helmet>

      <div className="lfcc-page">
        <div className="lfcc-topbar">
        <button
            type="button"
            onClick={() => navigate('/en/products')}
            className="lfcc-back-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            Back
          </button>
        </div>

<section className="mx-auto max-w-[1180px] px-4 md:px-8 pt-4 pb-1">
            <div className="lfcc-grid">
             <div className="lfcc-hero-card">
              <div
                className="absolute inset-0 bg-cover bg-center select-none hidden md:block"
                style={{ backgroundImage: `url(${heroDesktopImg})`, WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div
                className="absolute inset-0 bg-cover bg-center select-none md:hidden"
                style={{ backgroundImage: `url(${heroMobileImg})`, WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
                onContextMenu={(e) => e.preventDefault()}
              />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          <GlossyButton
    as="a"
    
    
    
    href="https://profile.forcleaners.co.uk/create"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Create an account"
    shape="circle"
    className="absolute bottom-4 right-4 z-20"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </GlossyButton>

              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-8 md:p-10">
                <div className="max-w-sm">
                  <h1 className="text-2xl md:text-3xl font-black font-['Inter'] text-white leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                    Stand out with a Link For Cleaners.
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                    Organise content, recommend products, attract brand opportunities and earn affiliate income from one personalised profile.
                  </p>
                </div>
              </div>
            </div>

             <div className="lfcc-faq-panel">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/70 mb-3">
                Frequently Asked Questions
              </p>
              <div className="space-y-1">
                {faqs.map(([q, a], i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={q} className="border-b border-white/10">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="flex w-full items-center justify-between py-4 text-left"
                      >
                        <h3 className="text-sm font-bold text-white pr-4">{q}</h3>
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                          className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      {isOpen && (
                        <p className="pb-4 text-[13px] leading-6 text-white/65">{a}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Creator Playbook — removed for now
        <section className="lfc-playbook" id="playbook">
          <div className="lfc-playbook-card">
            <p className="lfc-playbook-eyebrow">Creator Playbook</p>
            <h2 className="lfc-playbook-title">Creator Blueprints</h2>
            <p className="lfc-playbook-copy">
              A practical guide for cleaning creators covering profile setup, affiliate strategy, brand collaborations and ways to get more from the audience you've already built.
            </p>
            <button type="button" className="lfc-playbook-btn" onClick={handleNotifyMe}>
              {notified ? "You're on the list" : 'Notify me'}
            </button>
          </div>
        </section>
        */}

       

       <style>{`
      .lfcc-page {
  width: 100%;
  background: #083a6f;
  padding-top: 80px;
}
          .lfcc-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            margin-top: 24px;
          }

          .lfcc-hero-card {
            position: relative;
            width: 100%;
            aspect-ratio: 660 / 1020;
            border-radius: 45px;
            overflow: hidden;
            background: #5c6cff;
          }

          .lfcc-faq-panel {
            width: 100%;
          }
.lfcc-topbar {
            padding: 0 24px 20px;
          }

          .lfcc-back-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: none;
            color: #ffffff;
            font-size: 13px;
            font-weight: 500;
            min-height: 44px;
            cursor: pointer;
          }

       @media (min-width: 768px) {
            .lfcc-grid {
              grid-template-columns: 794px 1fr;
              align-items: stretch;
              justify-content: flex-start;
            }
            .lfcc-hero-card {
              aspect-ratio: auto;
              height: 600px;
            }
            .lfcc-faq-panel {
              align-self: center;
            }
          }
        `}</style>
      </div>
    </>
  );
}
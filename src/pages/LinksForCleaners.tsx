// LinksForCleaners.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import heroImg from '../assets/linksforcleaners@.instantq.jpg';
import shareImg from '../assets/lfc01062602xiwa.jpg';
import QuickNav from '../components/QuickNav';
import Blueprints from '../components/Blueprints';
const BANNER_COLOR = '#083a6f';

type ChangelogEntry = {
  version: string;
  title: string;
  badge: 'New' | 'Fix';
  date: string;
  sections: { label?: string; items: string[] }[];
};

const changelog: ChangelogEntry[] = [
  {
    version: 'v6.6',
    title: 'Bug fix',
    badge: 'Fix',
    date: '1 July 2026',
    sections: [
      {
        items: [
          'Fixed a bug where dismissing a link suggestion could leave an empty link behind on your profile. Cleaned up for all affected accounts, nothing for you to do.',
        ],
      },
    ],
  },
  {
    version: 'v6.5',
    title: 'Profile analytics',
    badge: 'New',
    date: '27 June 2026',
    sections: [
      {
        items: [
          'See unique visitors and total views on your profile: track how many people find you and how often they come back',
          'Track link clicks to see which links your visitors actually tap',
          'Enquiry starts and bookings now tracked end to end so you can see where people drop off',
          'Source breakdown shows whether traffic is coming from social, direct links, search, or referrals',
        ],
      },
    ],
  },
  {
    version: 'v6.4',
    title: 'Smarter links + desktop redesign',
    badge: 'New',
    date: '12 June 2026',
    sections: [
      {
        label: 'Desktop',
        items: [
          'Home screen on desktop rebuilt from scratch, no longer a stretched mobile layout',
          'Performance stats, quote activity, and earnings data front and centre without scrolling',
          'Quote requests, notifications, and profile activity all visible from one screen',
        ],
      },
      {
        label: 'Link suggestions',
        items: [
          'System now watches your links and flags when a better version exists, with a reason attached',
          'Suggestions appear on your Links tab with a one tap accept or dismiss, nothing changes unless you say so',
          'Notifications fire the moment a suggestion is ready, so you are not hunting for it',
        ],
      },
    ],
  },
  {
    version: 'v6.3',
    title: 'Enquiry notifications',
    badge: 'New',
    date: '23 May 2026',
    sections: [
      {
        items: [
          'Every quote request now sends a dashboard notification and an email with the full job details attached',
          'Notification includes: service type, property size, postcode, frequency, and the exact price range the customer saw',
          'Agency accounts: all profile enquiries land in one unified notification feed',
          'Notifications can be toggled on or off from inside your dashboard',
        ],
      },
    ],
  },
  {
    version: 'v6.2',
    title: 'Profile themes',
    badge: 'New',
    date: '15 May 2026',
    sections: [
      {
        items: [
          'Four profile themes available: Original, Solar Flare, Deep Ocean, Verdant',
          'Themes carry across link buttons, quote tools, share modal, and CTAs, set it once and let it work for you, done everywhere',
          'Dark mode now adapts per theme instead of applying the same colours across all of them',
          'Preview themes before going live from inside Manage Profile',
        ],
      },
    ],
  },
  {
    version: 'v6.1',
    title: 'Quote flow + profile expansion',
    badge: 'New',
    date: '8 May 2026',
    sections: [
      {
        label: 'Services',
        items: [
          'Run multiple service types from one profile: instant quotes, fixed price, callback, booking first, and photo request flows all supported',
          'Quote form adapts in real time based on the service a visitor picks',
          'After a quote, visitors can request a callback or jump straight into a walkthrough booking',
        ],
      },
      {
        label: 'Calculator',
        items: [
          'Pricing bands, time estimate logic, and repeat visit discounts all configurable from one place',
        ],
      },
      {
        label: 'Sharing',
        items: [
          'QR code now built into every profile: link directly from a flyer, business card, or phone screen',
          'Control whether media shows above or below your links on your public page',
          'Social preview handling improved across platforms',
        ],
      },
    ],
  },
  {
    version: 'v6.0',
    title: 'Custom links + dark mode',
    badge: 'New',
    date: '1 May 2026',
    sections: [
      {
        items: [
          'Custom links with your own labels: add anything, not just social accounts',
          'Light and dark mode on your public profile',
          'Public page layout tightened up: cleaner, faster to scan, stronger first impression',
        ],
      },
    ],
  },
];

export default function LinksForCleaners() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleTellColleague = async () => {
    const shareData = {
      title: 'LinksForCleaners',
      text: 'Market your entire cleaning business online with LinksForCleaners.',
      url: 'https://links.forcleaners.co.uk',
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
<>
      <Helmet>
        <title>LinksForCleaners – Market Your Cleaning Business Online | Innovate With Aima</title>
        <meta name="description" content="Personalised marketing pages for cleaning businesses and clean-fluencers in the UK. Instant quotes, booking tools, and social proof — all from one link." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="LinksForCleaners – Market Your Cleaning Business Online" />
        <meta property="og:description" content="Turn your social media following into cleaning clients. Instant quotes, Checkatrade reviews, and booking flows — built for UK cleaners." />
        <meta property="og:image" content={shareImg} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.innovatewithaima.com/linksforcleaners" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LinksForCleaners – Market Your Cleaning Business Online" />
        <meta name="twitter:description" content="Personalised marketing pages for UK cleaning businesses. Quotes, bookings, and affiliate earnings from one link." />
        <meta name="twitter:image" content={shareImg} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How can a cleaning business get more clients from Facebook?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "LinksForCleaners gives cleaning businesses a single branded profile link for their social media bio. Visitors can request an instant quote, book a clean, or view pricing directly from that link — no website needed. Profiles include Checkatrade and Google review aggregation to build trust instantly."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a free quote tool for self-employed cleaners in the UK?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. LinksForCleaners includes an instant quote flow built for UK independent cleaners. Customers enter property size, service type, and postcode and receive a price range immediately. Cleaners can also offer fixed-price, callback, or booking-first flows depending on how they prefer to work."
                }
              },
              {
                "@type": "Question",
                "name": "What is a clean-fluencer and how do they earn money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A clean-fluencer is a content creator in the cleaning niche who builds an audience on platforms like TikTok, Instagram, or YouTube. LinksForCleaners lets clean-fluencers earn passive income by sharing an affiliate profile link — when their followers sign up for cleaning services or purchase recommended products through that link, the creator earns a commission."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need a website to market my cleaning business online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. LinksForCleaners provides a personalised marketing page that works as a full storefront — including services, pricing, reviews, and booking — accessible from a single shareable link. It is designed for UK cleaning businesses that want a professional online presence without building or maintaining a website."
                }
              },
              {
                "@type": "Question",
                "name": "How do I get more cleaning clients without paying for ads?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "LinksForCleaners is built to convert existing social media traffic into paying clients without ad spend. A branded profile page with instant quotes, visible pricing, and real reviews from Checkatrade and Google means visitors who find you organically can book or enquire immediately."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      <div className="product-member-launch-lfc">
        <section className="lfc-hero">
          <div className="lfc-hero-card">
      <div className="lfc-hero-toprow">
              <Link to="/" className="lfc-back-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
                Back
              </Link>
            </div>

            <div className="lfc-hero-body">
              <div className="lfc-hero-content">
                

                <h1 className="lfc-heading">
                  Market your entire cleaning business online
                </h1>

                <p className="lfc-subheading">
                  Providing cleaning businesses and clean-fluencers with personalised marketing pages designed to turn social media engagement into revenue streams from brands and clients.
                </p>

     <div className="lfc-cta-row">
               <a  href="https://links.forcleaners.co.uk/cleansco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lfc-btn-tertiary"
                  >
                    See a live profile
                  </a>
                  <a  href="https://profile.forcleaners.co.uk/create"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lfc-register-link"
                  >
                    Register
                  </a>
                </div>
              </div>

            <div className="lfc-hero-image-wrap">
                <img
                  src={heroImg}
                  alt=""
                  className="lfc-hero-image"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ WebkitUserSelect: 'none', userSelect: 'none', WebkitTouchCallout: 'none' }}
                />
                <div className="lfc-hero-image-tint" />
                <div className="lfc-hero-image-blend" />
              </div>
            </div>

         </div>
    </section>

    <QuickNav onTellColleague={handleTellColleague} tellLabel={copied ? 'Link copied' : 'Tell a colleague'} />

        <section className="lfc-faq" id="faq">
          <div className="lfc-faq-inner">
            <p className="lfc-faq-eyebrow">Common Questions</p>
            <h2 className="lfc-faq-heading">About Links For Cleaners</h2>
            {[
              {
                q: "Do I need a website to market my cleaning business?",
                a: "No. Your LinksForCleaners profile can work as your online business storefront."
              },
              {
                q: "How do I get more cleaning clients without running ads?",
                a: "Put your profile link in your bio. Visitors who find you organically or through content can price up and enquire instantly."
              },
              {
                q: "Can I earn money from my cleaning content on TikTok or Instagram?",
                a: "A clean-fluencer is a content creator in the cleaning niche who builds an audience on platforms like TikTok, Instagram, or YouTube. LinksForCleaners lets clean-fluencers earn commissions by driving impressions to their profile link, when a vistor signs up for cleaning services or purchase recommended products through that link, the creator earns a commission."

              },
              {
                q: "Is there an instant quote tool for UK cleaners?",
                a: "Built in. Customers enter postcode, property size, and service type and see a price range immediately. You get the full job details by email and dashboard notification."
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="lfc-faq-item">
                <h3 className="lfc-faq-q">{q}</h3>
                <p className="lfc-faq-a">{a}</p>
              </div>
            ))}
          </div>
        </section>

<Blueprints />

    <section className="lfc-changelog" id="changelog">          <div className="lfc-changelog-inner">
                      <h2 className="lfc-changelog-header">ChangeLog</h2>

            {changelog.map((entry) => (
              <article key={entry.version} className="lfc-entry">
                <div className="lfc-entry-head">
                  <h3 className="lfc-entry-title">
                    {entry.version} - {entry.title}
                  </h3>
                  <span className={`lfc-entry-badge ${entry.badge === 'New' ? 'lfc-entry-badge-new' : 'lfc-entry-badge-fix'}`}>
                    {entry.badge}
                  </span>
                  <span className="lfc-entry-date">{entry.date}</span>
                </div>

                {entry.sections.map((section, i) => (
                  <div key={i} className="lfc-entry-section">
                    {section.label && (
                      <p className="lfc-entry-sublabel">{section.label}</p>
                    )}
                    <ul className="lfc-entry-list">
                      {section.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <style>{`
          .product-member-launch-lfc {
            width: 100%;
          }

.lfc-hero {
  background-color: ${BANNER_COLOR};
  padding: 64px 0 0;
}

        .lfc-hero-card {
  max-width: 1180px;
  margin: 0 auto;
  background-color: ${BANNER_COLOR};
  border-radius: 0;
  overflow: hidden;
  position: relative;
}

       .lfc-hero-toprow {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px 20px;
            color: #ffffff;
          }

          .lfc-back-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #ffffff;
            font-size: 13px;
            font-weight: 500;
            text-decoration: none;
            min-height: 44px;
          }

          .lfc-tell-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: none;
            color: rgba(255,255,255,0.75);
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            min-height: 44px;
          }

.lfc-hero-body {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 32px;
  min-height: 620px;
  overflow: hidden;
}

.lfc-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 150px;
}
       .lfc-badge {
  position: relative;
  z-index: 3;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
}

          .lfc-badge-img {
            width: 44px;
            height: 44px;
            object-fit: contain;
            pointer-events: none;
            user-select: none;
          }

          .lfc-heading {
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            font-weight: 900;
            font-size: 30px;
            line-height: 1.1;
            max-width: 460px;
            margin: 0;
          }

          .lfc-subheading {
            color: rgba(255,255,255,0.75);
            font-size: 14px;
            line-height: 1.6;
            max-width: 460px;
            margin: 0;
          }

          .lfc-cta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 8px;
          }

          .lfc-btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 44px;
            padding: 0 22px;
            border-radius: 999px;
            background: #ffffff;
            color: #083a6f;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
          }

          .lfc-btn-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 44px;
            padding: 0 22px;
            border-radius: 999px;
            background: transparent;
            border: 1px solid rgba(255,255,255,0.4);
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
          }
.lfc-register-link {
            display: inline-flex;
            align-items: center;
            min-height: 44px;
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
            text-decoration: underline;
            text-underline-offset: 3px;
          }

 .lfc-btn-tertiary {
             display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 44px;
            padding: 0 22px;
            border-radius: 999px;
            background: linear-gradient(135deg, rgba(212,175,90,0.28) 0%, rgba(255,215,140,0.18) 100%);
            border: 1px solid rgba(230,190,110,0.45);
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
.lfc-hero-image-wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  aspect-ratio: unset;
  border-radius: 0;
  overflow: hidden;
  background-color: ${BANNER_COLOR};
  z-index: 0;
}

.lfc-hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 60% 30%;
}

.lfc-hero-image-tint {
            position: absolute;
            inset: 0;
            background: ${BANNER_COLOR};
            opacity: 0.2;
            pointer-events: none;
          }

.lfc-hero-image-blend {
  position: absolute;
  inset: 0;
  background: ${BANNER_COLOR};
  opacity: 0.9;
  -webkit-mask-image: linear-gradient(to top, black 0%, black 20%, transparent 50%);
  mask-image: linear-gradient(to top, black 0%, black 20%, transparent 50%);
  backdrop-filter: blur(45px);
  -webkit-backdrop-filter: blur(45px);
  pointer-events: none;
  border-radius: inherit;
  clip-path: inset(0 round inherit);
  -webkit-clip-path: inset(0 round inherit);
}

          .lfc-changelog {
            background: #ffffff;
            padding: 48px 16px 64px;
          }

          .lfc-changelog-inner {
            max-width: 900px;
            margin: 0 auto;
          }

  .lfc-changelog-header {
            font-family: 'Inter', sans-serif;
            font-weight: 900;
            font-size: 28px;
            color: #0a0a0a;
            margin: 0 0 32px;
          }
          .lfc-entry {
            padding: 24px 0;
            border-top: 1px solid rgba(0,0,0,0.08);
          }

          .lfc-entry-head {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
          }

          .lfc-entry-title {
            font-size: 17px;
            font-weight: 700;
            color: #0a0a0a;
            margin: 0;
          }

          .lfc-entry-badge {
            font-size: 11px;
            font-weight: 700;
            padding: 2px 10px;
            border-radius: 999px;
          }

          .lfc-entry-badge-new {
            background: rgba(92,108,255,0.12);
            color: #5c6cff;
          }

          .lfc-entry-badge-fix {
            background: rgba(0,0,0,0.06);
            color: #444444;
          }

          .lfc-entry-date {
            font-size: 12px;
            color: rgba(0,0,0,0.45);
          }

          .lfc-entry-section {
            margin-top: 10px;
          }

          .lfc-entry-sublabel {
            font-size: 13px;
            font-weight: 700;
            color: #0a0a0a;
            margin: 12px 0 6px;
          }

          .lfc-entry-list {
            margin: 0;
            padding-left: 18px;
          }

          .lfc-entry-list li {
            font-size: 14px;
            line-height: 1.6;
            color: rgba(0,0,0,0.7);
            margin-bottom: 6px;
          }

          @media (min-width: 768px) {
 .lfc-hero-body {
  position: static;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  padding: 32px 40px 48px;
  min-height: 0;
  overflow: visible;
}
  .lfc-heading {
              font-size: 54px;
              max-width: 560px;
            }
.lfc-hero-image-blend {
              opacity: 0.94;
              -webkit-mask-image: linear-gradient(to top, black 0%, black 8%, rgba(0,0,0,0.6) 30%, transparent 65%);
              mask-image: linear-gradient(to top, black 0%, black 8%, rgba(0,0,0,0.6) 30%, transparent 65%);
              backdrop-filter: blur(70px);
              -webkit-backdrop-filter: blur(70px);
              clip-path: inset(0 round 16px);
              -webkit-clip-path: inset(0 round 16px);
            }

            .lfc-hero-content {
              flex: 1;
              padding-top: 0;
            }

            .lfc-heading {
              font-size: 62px;
            }

            .lfc-subheading {
              font-size: 15px;
            }

        .lfc-hero-image-wrap {
  position: relative;
  inset: auto;
  flex: 1;
  margin-top: 0;
  aspect-ratio: auto;
  height: 480px;
  border-radius: 16px;
}

           .lfc-hero-image {
              object-position: center top;
            }

            .lfc-hero {
              padding: 72px 16px 40px;
            }

       .lfc-hero-card {
              border-radius: 20px;
            }

   
           

          }
 .lfc-faq {
            background: #f7f7f8;
            padding: 64px 16px;
          }
          .lfc-faq-inner {
            max-width: 720px;
            margin: 0 auto;
          }
          .lfc-faq-eyebrow {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #5c6cff;
            margin: 0 0 12px;
          }
          .lfc-faq-heading {
            font-family: 'Inter', sans-serif;
            font-weight: 900;
            font-size: 28px;
            color: #0a0a0a;
            margin: 0 0 40px;
          }
          .lfc-faq-item {
            padding: 24px 0;
            border-top: 1px solid rgba(0,0,0,0.08);
          }
          .lfc-faq-q {
            font-size: 16px;
            font-weight: 700;
            color: #0a0a0a;
            margin: 0 0 8px;
          }
          .lfc-faq-a {
            font-size: 14px;
            line-height: 1.7;
            color: rgba(0,0,0,0.6);
            margin: 0;
          }
        `}</style>
              </div>
    </>
  );
}
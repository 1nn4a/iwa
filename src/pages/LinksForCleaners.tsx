// LinksForCleaners.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import heroImg from '../assets/linksforcleaners@.instantq.jpg';
import shareImg from '../assets/lfc01062602xiwa.jpg';
import QuickNav from '../components/QuickNav';
import Blueprints from '../components/Blueprints';
import GlossyButton from '../components/GlossyButton';
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
        <title>LinksForCleaners- Market Your Cleaning Business Online | Innovate With Aima</title>
        <meta name="description" content="Personalised marketing pages for cleaning businesses and clean-fluencers in the UK. Instant quotes, booking tools, and social proof — all from one link." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="LinksForCleaners- Market Your Cleaning Business Online" />
        <meta property="og:description" content="Turn your social media following into cleaning clients. Instant quotes, Checkatrade reviews, and booking flows — built for UK cleaners." />
        <meta property="og:image" content={shareImg} />
        <meta property="og:type" content="website" />
<meta property="og:url" content="https://innovatewithaima.com/en/links-for-cleaners" />
<meta property="og:url" content="https://innovatewithaima.com/en/links-for-cleaners" />
<link rel="canonical" href="https://innovatewithaima.com/en/links-for-cleaners" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LinksForCleaners- Market Your Cleaning Business Online" />
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
        "text": "Cleaning businesses are more likely to generate enquiries from Facebook when every post, comment and message directs potential customers to one professional destination. A single page containing services, pricing, reviews and clear enquiry options reduces friction and makes it easier for visitors to take action. Links For Cleaners brings these elements together in one organised system with a shareable profile designed to convert social media traffic into enquiries."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a free quote tool for self-employed cleaners in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many self-employed cleaners now use online quote tools to qualify enquiries before speaking with customers. Instant pricing helps set expectations and reduces repetitive conversations while still allowing businesses to decide how they handle bookings. Links For Cleaners includes configurable instant quote flows alongside fixed-price, callback and walkthrough options, bringing enquiries, quoting and bookings into one organised system."
      }
    },
    {
      "@type": "Question",
      "name": "What is a clean-fluencer and how do they earn money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A clean-fluencer is a content creator who shares cleaning-related content across platforms such as TikTok, Instagram or YouTube. Many creators generate income by recommending products and services through affiliate programmes, earning commission when qualifying purchases are made through their links. Links For Cleaners allows creators to organise affiliate links, showcase trusted recommendations and manage their audience from one professional profile as part of the Creator Programme."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a website to market my cleaning business online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not always. Many independent cleaning businesses successfully market themselves using a dedicated profile that clearly presents their services, reviews, pricing and enquiry options from a single shareable link. This approach is often quicker to maintain while still providing customers with the information they need. Links For Cleaners brings these capabilities together in one organised system designed specifically for specialist cleaning businesses."
      }
    },
   {
      "@type": "Question",
      "name": "How do I get more cleaning clients without paying for ads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Growing without paid advertising usually depends on converting existing visibility more effectively. Improving social profiles, encouraging reviews, making pricing easier to understand and reducing the steps required to enquire can all increase conversion from organic traffic. Links For Cleaners brings enquiries, reviews, instant quoting and booking journeys together in one organised system, helping businesses make better use of the visitors they already receive."
      }
    },
    {
      "@type": "Question",
      "name": "What are Links For Cleaners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Links For Cleaners is a shareable profile link that brings together everything people need to know about your cleaning business or brand in one place. It can include your services, reviews, social media, recommended products and enquiry options, making it easier for potential customers to discover, trust and contact you. It's designed for cleaning professionals and creators across England (including the North East, North West, Yorkshire and the Humber, East Midlands, West Midlands, East of England, London, South East and South West), as well as Scotland, Wales and Northern Ireland."
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
                  Providing cleaning businesses with personalised marketing pages designed to turn social media engagement into clients.
                </p>

     <div className="lfc-cta-row">
         <GlossyButton as="a" href="https://www.forcleaners.co.uk" target="_blank" rel="noopener noreferrer">
    Visit Site
  </GlossyButton>
                  <a  href="https://links.forcleaners.co.uk/cleansco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lfc-register-link"
                  >
                    See a live profile
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
    <p className="lfc-faq-eyebrow">Frequently Asked Questions</p>
    <h2 className="lfc-faq-heading">
      Common Questions from UK Cleaning Businesses
    </h2>

{([
   {
        q: "What are Links For Cleaners?",
        a: (
          <>
            Links For Cleaners is a shareable profile link that brings together everything people need to know about your cleaning business or brand in one place. It can include your services, reviews, social media, recommended products and enquiry options, making it easier for potential customers to discover, trust and contact you. It's designed for cleaning professionals and creators across England, Scotland, Wales and Northern Ireland. You can read more about claiming a page for your brand by visiting <a href="https://links.forcleaners.co.uk" className="lfc-faq-link">links.forcleaners.co.uk</a>.
          </>
  )
      },
      {
        q: "Can I customise how customers receive quotes?",
        a: "Yes. Every business works differently, so you decide how enquiries are handled. Offer instant quotes, fixed-price services, callback requests, walkthrough bookings or booking-first flows, with pricing bands, discounts and service settings tailored to your business. Links For Cleaners brings these capabilities together in one organised system."
      },
      {
        q: "What happens after someone submits an enquiry?",
        a: "Customers can request a callback, book a walkthrough or continue through your chosen enquiry journey. You'll receive the job details through your dashboard and email, and you can connect your existing scheduling tools to receive notifications there too. Links For Cleaners keeps the entire enquiry journey organised from first click to follow-up."
      },
      {
        q: "Can I see how people interact with my profile?",
        a: "Yes. Profile Analytics shows unique visitors, total profile views, traffic sources, link clicks, enquiry starts and completed bookings, helping you understand how customers discover your business and where opportunities are created. Links For Cleaners brings these insights together in one organised dashboard."
      },
   {
        q: "Can I share my profile anywhere?",
        a: "Yes. Every profile is designed to be shared across social media, messaging apps, QR codes, business cards and printed materials. Your profile is also indexable by search engines, giving customers one professional place to discover your services, pricing and enquiry options."
      }
     
    ] as { q: string; a: React.ReactNode }[]).map(({ q, a }, i) => (
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
  padding-top: 80px;
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
  justify-content: flex-start;
  padding: 12px 24px;
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
  min-height: 550px;
  overflow: hidden;
}

 .lfc-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 120px;
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
  text-shadow: 0 2px 14px rgba(0,0,0,0.6);
}

     .lfc-subheading {
  color: rgba(255,255,255,0.9);
  font-size: 17px;
  line-height: 1.6;
  max-width: 460px;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.55);
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

 
.lfc-hero-image-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 680px;  
  width: 100%;
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
  object-position: top;
}

.lfc-hero-image-tint {
            position: absolute;
            inset: -1px;
            background: ${BANNER_COLOR};
            opacity: 0.2;
            pointer-events: none;
          }

.lfc-hero-image-blend {
  position: absolute;
  inset: -2px;
  background: ${BANNER_COLOR};
  opacity: 0.95;
  -webkit-mask-image: linear-gradient(to top, black -5%, black 22%, transparent 55%);
  mask-image: linear-gradient(to top, black -5%, black 22%, transparent 55%);
  backdrop-filter: blur(45px);
  -webkit-backdrop-filter: blur(45px);
  pointer-events: none;
  border-radius: inherit;
  clip-path: inset(0 round inherit);
  -webkit-clip-path: inset(0 round inherit);
}

.lfc-changelog {
  background: ${BANNER_COLOR};
  padding: 48px 16px 24px;
}

.lfc-changelog-inner {
  max-width: 900px;
  margin: 0 auto;
}

.lfc-changelog-header {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 28px;
  color: #ffffff;
  margin: 0 0 32px;
}
.lfc-entry {
  padding: 24px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
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
  color: #ffffff;
  margin: 0;
}

.lfc-entry-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 999px;
}

.lfc-entry-badge-new {
  background: rgba(92,108,255,0.18);
  color: #8da2ff;
}

.lfc-entry-badge-fix {
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.75);
}

.lfc-entry-date {
  font-size: 12px;
  color: rgba(255,255,255,0.45);
}

.lfc-entry-section {
  margin-top: 10px;
}

.lfc-entry-sublabel {
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  margin: 12px 0 6px;
}

.lfc-entry-list {
  margin: 0;
  padding-left: 18px;
}

.lfc-entry-list li {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  margin-bottom: 6px;
}


          @media (min-width: 600px) {
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
              inset: -1px;
              opacity: 0.94;
              -webkit-mask-image: linear-gradient(to top, black 0%, black 14%, rgba(0,0,0,0.6) 35%, transparent 60%);
              mask-image: linear-gradient(to top, black 0%, black 14%, rgba(0,0,0,0.6) 35%, transparent 60%);
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
              font-size: 45px;
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

@media (min-width: 600px) {
  .lfc-hero-image {
    object-position: top;
  }
}

            .lfc-hero {
              padding: 72px 16px 40px;
            }

       .lfc-hero-card {
              border-radius: 30px;
            }

   
           @media (min-width: 600px) and (max-width: 1025px) {
            .lfc-heading {
              font-size: 35px;
            }
            .lfc-subheading {
              font-size: 16px;
            }
          }

          }
.lfc-faq {
  background: ${BANNER_COLOR};
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
  color: #8da2ff;
  margin: 0 0 12px;
}
.lfc-faq-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 28px;
  color: #ffffff;
  margin: 0 0 40px;
}
.lfc-faq-item {
  padding: 24px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.lfc-faq-q {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px;
}
.lfc-faq-a {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255,255,255,0.65);
  margin: 0;
}
.lfc-faq-link {
  color: #ffffff;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
}
        `}</style>
              </div>
    </>
  );
}
// LinksForCleaners.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import heroImg from '../assets/linksforcleaners@.instantq.jpg';
import shareImg from '../assets/lfc01062602xiwa.jpg';
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
  <title>Product-Innovate With Aima</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta property="og:image" content={shareImg} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={shareImg} />
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
              <button type="button" className="lfc-tell-btn" onClick={handleTellColleague}>
                {copied ? 'Link copied' : 'Tell a colleague'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v14" />
                </svg>
              </button>
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
                  
                  <a  href="https://profile.forcleaners.co.uk/create"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lfc-btn-primary"
                  >
                    Get started
                  </a>
                  
                  <a  href="https://forcleaners.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lfc-btn-secondary"
                  >
                    See how it works
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

        <section className="lfc-changelog">
          <div className="lfc-changelog-inner">
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
  padding: 92px 16px 40px;
}

          .lfc-hero-card {
            max-width: 1180px;
            margin: 0 auto;
            background-color: ${BANNER_COLOR};
            border-radius: 20px;
            overflow: hidden;
            position: relative;
          }

          .lfc-hero-toprow {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px 0;
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
  min-height: 560px;
  overflow: hidden;
}

.lfc-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 80px;
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
  object-position: center;
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
  -webkit-mask-image: linear-gradient(to top, black 0%, black 10%, transparent 45%);
  mask-image: linear-gradient(to top, black 0%, black 10%, transparent 45%);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  pointer-events: none;
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

            .lfc-hero-content {
              flex: 1;
              padding-top: 0;
            }

            .lfc-heading {
              font-size: 42px;
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
  height: 560px;
  border-radius: 16px;
}

            .lfc-hero-image {
              object-position: center top;
            }

          }
        `}</style>
      </div>
    </>
  );
}
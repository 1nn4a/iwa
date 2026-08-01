CREATE TABLE IF NOT EXISTS deals (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  slug             TEXT    NOT NULL UNIQUE,
  company          TEXT    NOT NULL,
  dealTitle        TEXT    NOT NULL,
  savingsLabel     TEXT,
  logo             TEXT,
  category         TEXT    NOT NULL,
  overview         TEXT    NOT NULL,   -- JSON array of strings
  featureSections  TEXT    NOT NULL,   -- JSON array of {heading,text}
  closingLine      TEXT,
  aboutDeal        TEXT,
  eligibility      TEXT,               -- JSON array of strings
  availability     TEXT,
  aboutCompanyName TEXT,
  aboutCompanyText TEXT,
  companySize      TEXT,
  yearFounded      TEXT,
  country          TEXT,
  footerLine       TEXT,
  redirect_url     TEXT,               -- external affiliate link (e.g. tiddly)
  gallery          TEXT,               -- JSON array of image URLs
  locked           INTEGER NOT NULL DEFAULT 0,
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_deals_category
  ON deals (category, sort_order);

INSERT INTO deals (
  slug, company, dealTitle, savingsLabel, logo, category,
  overview, featureSections, closingLine, aboutDeal, eligibility,
  availability, aboutCompanyName, aboutCompanyText, companySize,
  yearFounded, country, footerLine, redirect_url, gallery, sort_order
) VALUES (
  'engagebay-crm',
  'EngageBay CRM',
  'Free CRM with 250 Contacts',
  'Free Forever',
  'https://group.innovatewithaima.com/deals/engagebay/logo.png',
  'Business Tools',
  '["EngageBay is an affordable, all-in-one platform that combines Marketing Automation, Sales CRM, Helpdesk, and AI-powered tools into a single unified system built for small and mid-sized businesses.","Instead of stitching together separate tools for marketing, sales, and support, EngageBay brings everything into one place — helping growing businesses reduce software fragmentation, lower operational costs, and simplify how they manage customers."]',
  '[{"heading":"Sales CRM","text":"Manage your pipeline, track contacts, and move deals forward with a CRM built to keep your sales process organised and visible in one place."},{"heading":"Marketing Automation","text":"Run email campaigns, build automated workflows, and score leads automatically, so your marketing keeps working without constant manual effort."},{"heading":"Helpdesk & Live Chat","text":"Support customers directly through built-in ticketing, a knowledge base, SLA tracking, and real-time live chat, all connected to the same customer record."},{"heading":"AI-Powered Productivity","text":"Use smart replies, predictive analytics, and automation tools to save time on repetitive tasks and focus on growing the business."}]',
  'EngageBay brings marketing, sales, and support together into one platform — giving growing businesses enterprise-style functionality without enterprise-level pricing or complexity.',
  'This deal gives you free access to EngageBay''s CRM with up to 250 contacts, no credit card required.',
  '["Available to new EngageBay users only.","Applies to the Free plan (up to 250 contacts).","One account per business.","Upgrade to paid plans available anytime as your contact list grows.","Subject to availability."]',
  'Worldwide',
  'EngageBay',
  'An all-in-one CRM, marketing automation, and helpdesk platform built for growing SMBs, and a genuine alternative to HubSpot, ActiveCampaign, and Keap at SMB-friendly pricing.',
  '51–200 People',
  '2017',
  'United States',
  'EngageBay replaces multiple tools with one platform, so your marketing, sales, and support finally work from the same customer view.',
  'https://tidd.ly/4w30ZS3',
  '["https://group.innovatewithaima.com/deals/engagebay/gallery-1.png","https://group.innovatewithaima.com/deals/engagebay/gallery-2.png","https://group.innovatewithaima.com/deals/engagebay/gallery-3.png","https://group.innovatewithaima.com/deals/engagebay/gallery-4.png","https://group.innovatewithaima.com/deals/engagebay/gallery-5.png","https://group.innovatewithaima.com/deals/engagebay/gallery-6.png"]',
  10
);
INSERT INTO deals (
  slug, company, dealTitle, savingsLabel, logo, category,
  overview, featureSections, closingLine, aboutDeal, eligibility,
  availability, aboutCompanyName, aboutCompanyText, companySize,
  yearFounded, country, footerLine, sort_order
) VALUES (
  'links-for-cleaners',
  'Links For Cleaners',
  '50% off Annual Plans for 1 year',
  'Save up to £600',
  'https://links.forcleaners.co.uk/linksforcleanerscouk.png',
  'Business Tools',
  '["Links For Cleaners is a professional business profile built specifically for UK cleaning businesses, helping you bring everything your customers need into one place.","From showcasing your services to capturing quote requests, Links For Cleaners gives your business a modern online presence designed to help you stay visible, build trust, and convert more visitors into enquiries."]',
  '[{"heading":"Professional Business Profiles","text":"Create a dedicated profile for your cleaning business with your services, contact details, social links, service areas, reviews, and more — all designed around how cleaning businesses operate."},{"heading":"Service Estimator","text":"Give customers a faster way to enquire with built-in service estimates tailored to your pricing, helping qualify leads before they even get in touch."},{"heading":"Lead Capture","text":"Turn profile visitors into enquiries with conversion-focused calls-to-action, enquiry tools, and customer journeys built specifically for service businesses."},{"heading":"Analytics","text":"Understand how your profile is performing with insights into profile visits, link clicks, and customer engagement, helping you make smarter marketing decisions over time."}]',
  'Links For Cleaners brings together your online presence, lead capture, and business tools into one platform — giving your cleaning business a stronger foundation to grow.',
  'This deal entitles you to 50% off the annual Links For Cleaners Pro plan for your first year.',
  '["Available to new Links For Cleaners Pro subscribers only.","Applies to the Annual Pro plan.","One redemption per business.","Cannot be combined with other promotional offers.","Subject to availability."]',
  'United Kingdom',
  'Links For Cleaners',
  'Professional business profiles built for UK cleaning businesses.',
  '1–10 People',
  '2025',
  'United Kingdom',
  'Links For Cleaners is the foundation of your entire cleaning business online.',
  1
);

INSERT INTO deals (
  slug, company, dealTitle, savingsLabel, logo, category,
  overview, featureSections, closingLine, aboutDeal, eligibility,
  availability, aboutCompanyName, aboutCompanyText, companySize,
  yearFounded, country, footerLine, sort_order
) VALUES (
  'links-for-cleaners-cleanfluencer-program',
  'Links For Cleaners Cleanfluencer Program',
  '£5 Starting Bonus',
  'Save up to £5',
  'https://links.forcleaners.co.uk/linksforcleanerscouk.png',
  'Creator Programs',
  '["The Links For Cleaners Cleanfluencer Program rewards creators and cleaning professionals for recommending products they already use and trust.","Build your own storefront, share your recommendations, and earn commission from qualifying purchases while helping others discover products used by real cleaning businesses."]',
  '[{"heading":"Curated Product Storefront","text":"Create your own personalised product collection featuring the tools, equipment, and supplies you genuinely recommend, all in one place."},{"heading":"Earn Commission","text":"Generate commission from qualifying purchases made through your product recommendations, creating an additional income stream alongside your cleaning business or content."},{"heading":"Business Profile Integration","text":"Your product storefront works alongside your Links For Cleaners profile, giving customers a single destination to discover your business, services, and recommended products."},{"heading":"Built for Growth","text":"Whether you\u2019re an established creator or just getting started, the Cleanfluencer Program provides the tools to begin building long-term affiliate income while growing your online presence."}]',
  'The Links For Cleaners Cleanfluencer Program brings together affiliate marketing, professional business profiles, and trusted product recommendations into one platform — helping cleaning businesses and creators earn beyond the job itself.',
  'This deal entitles you to a £5 starting bonus when you join the Links For Cleaners Cleanfluencer Program and meet the qualifying requirements.',
  '["Available to new Cleanfluencer Program members only.","Must successfully create and publish a Cleanfluencer profile.","One starting bonus per person.","Subject to verification and programme terms.","Subject to availability."]',
  'United Kingdom',
  'Links For Cleaners Cleanfluencer Program',
  'Helping cleaning businesses and creators build an additional income stream through trusted product recommendations.',
  '1–10 People',
  '2026',
  'United Kingdom',
  'The Links For Cleaners Cleanfluencer Program helps your recommendations keep working long after the job is done.',
  2
);
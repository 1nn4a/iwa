-- schema/d1_deals_seed_existing.sql
-- Seeds the two existing Links For Cleaners deals into the `deals` table.
-- Run with: wrangler d1 execute iwa-product-interest --file=./schema/d1_deals_seed_existing.sql --remote

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
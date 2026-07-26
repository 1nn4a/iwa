import lfcIcon from '../assets/lfc-icon.png'

export type Deal = {
  slug: string
  company: string
  dealTitle: string
  savingsLabel?: string
  logo?: string
  category: string
  overview: string[]
  featureSections: { heading: string; text: string }[]
  closingLine: string
  aboutDeal: string
  eligibility: string[]
  availability: string
  aboutCompanyName: string
  aboutCompanyText: string
  companySize: string
  yearFounded: string
  country: string
  footerLine: string
}

 
export const deals: Deal[] = [
  {
    slug: 'links-for-cleaners',
    company: 'Links For Cleaners',
    dealTitle: '50% off Annual Plans for 1 year',
    savingsLabel: 'Save up to £600',
    logo: lfcIcon,
    category: 'Business Tools',
    overview: [
      'Links For Cleaners is a professional business profile built specifically for UK cleaning businesses, helping you bring everything your customers need into one place.',
      'From showcasing your services to capturing quote requests, Links For Cleaners gives your business a modern online presence designed to help you stay visible, build trust, and convert more visitors into enquiries.',
    ],
    featureSections: [
      { heading: 'Professional Business Profiles', text: 'Create a dedicated profile for your cleaning business with your services, contact details, social links, service areas, reviews, and more — all designed around how cleaning businesses operate.' },
      { heading: 'Service Estimator', text: 'Give customers a faster way to enquire with built-in service estimates tailored to your pricing, helping qualify leads before they even get in touch.' },
      { heading: 'Lead Capture', text: 'Turn profile visitors into enquiries with conversion-focused calls-to-action, enquiry tools, and customer journeys built specifically for service businesses.' },
      { heading: 'Analytics', text: 'Understand how your profile is performing with insights into profile visits, link clicks, and customer engagement, helping you make smarter marketing decisions over time.' },
    ],
    closingLine: 'Links For Cleaners brings together your online presence, lead capture, and business tools into one platform — giving your cleaning business a stronger foundation to grow.',
    aboutDeal: 'This deal entitles you to 50% off the annual Links For Cleaners Pro plan for your first year.',
    eligibility: [
      'Available to new Links For Cleaners Pro subscribers only.',
      'Applies to the Annual Pro plan.',
      'One redemption per business.',
      'Cannot be combined with other promotional offers.',
      'Subject to availability.',
    ],
    availability: 'United Kingdom',
    aboutCompanyName: 'Links For Cleaners',
    aboutCompanyText: 'Professional business profiles built for UK cleaning businesses.',
    companySize: '1–10 People',
    yearFounded: '2025',
    country: 'United Kingdom',
    footerLine: 'Links For Cleaners is the foundation of your entire cleaning business online.',
  },
  {
    slug: 'links-for-cleaners-cleanfluencer-program',
    company: 'Links For Cleaners Cleanfluencer Program',
    dealTitle: '£5 Starting Bonus',
   savingsLabel: 'Save up to £5',
    logo: lfcIcon,
    category: 'Creator Programs',
    overview: [
      'The Links For Cleaners Cleanfluencer Program rewards creators and cleaning professionals for recommending products they already use and trust.',
      'Build your own storefront, share your recommendations, and earn commission from qualifying purchases while helping others discover products used by real cleaning businesses.',
    ],
    featureSections: [
      { heading: 'Curated Product Storefront', text: 'Create your own personalised product collection featuring the tools, equipment, and supplies you genuinely recommend, all in one place.' },
      { heading: 'Earn Commission', text: 'Generate commission from qualifying purchases made through your product recommendations, creating an additional income stream alongside your cleaning business or content.' },
      { heading: 'Business Profile Integration', text: 'Your product storefront works alongside your Links For Cleaners profile, giving customers a single destination to discover your business, services, and recommended products.' },
      { heading: 'Built for Growth', text: 'Whether you\u2019re an established creator or just getting started, the Cleanfluencer Program provides the tools to begin building long-term affiliate income while growing your online presence.' },
    ],
    closingLine: 'The Links For Cleaners Cleanfluencer Program brings together affiliate marketing, professional business profiles, and trusted product recommendations into one platform — helping cleaning businesses and creators earn beyond the job itself.',
    aboutDeal: 'This deal entitles you to a £5 starting bonus when you join the Links For Cleaners Cleanfluencer Program and meet the qualifying requirements.',
    eligibility: [
      'Available to new Cleanfluencer Program members only.',
      'Must successfully create and publish a Cleanfluencer profile.',
      'One starting bonus per person.',
      'Subject to verification and programme terms.',
      'Subject to availability.',
    ],
    availability: 'United Kingdom',
    aboutCompanyName: 'Links For Cleaners Cleanfluencer Program',
    aboutCompanyText: 'Helping cleaning businesses and creators build an additional income stream through trusted product recommendations.',
    companySize: '1–10 People',
    yearFounded: '2026',
    country: 'United Kingdom',
    footerLine: 'The Links For Cleaners Cleanfluencer Program helps your recommendations keep working long after the job is done.',
  },
]

export function getDealBySlug(slug: string) {
  return deals.find(d => d.slug === slug)
}
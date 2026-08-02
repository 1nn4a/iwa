import { useState, useEffect } from 'react'
import { Helmet } from "react-helmet-async"
import { Link } from 'react-router-dom'
import applyHero from '../assets/deals-hero.jpg'
import iwaCardImg from '../assets/iwa.png'
import hero from '../assets/iwa.png'
import GlossyButton from '../components/GlossyButton'

const membershipCards = [
  {
    tag: 'STEP 01',
    title: 'Access',
    text: 'Once approved, you gain access to relevant opportunities and professional connections within the network.',
  },
  {
    tag: 'STEP 02',
    title: 'Apply to join the network',
    text: 'Applications are reviewed in limited intake windows to maintain quality and relevance.',
  },
  {
    tag: 'STEP 03',
    title: 'Connect',
    text: 'If your application is accepted, you receive access details and onboarding guidance.',
  },
  {
    tag: 'STEP 04',
    title: 'Share',
    text: 'Members contribute by sharing opportunities that align with the network’s standards.',
  },
]

const membershipFaqs = [
  ['Who can apply for membership?', 'Membership is open to independent professionals, freelancers, and entrepreneurs who meet our suitability criteria. All applications are reviewed individually.'],
  ['How does the application process work?', 'Applicants submit an application for review. If suitable, next steps are shared before any payment is requested. Membership is ongoing and reviewed periodically.'],
  ['What does membership provide?', 'Members gain access to paid opportunities shared by contributing businesses and can submit proposals independently.'],
  ['What does Innovate With Aima do for businesses?', 'The network helps distribute opportunities to vetted professionals without the noise of open-market outreach.'],
  ['Are businesses required to commit long-term?', 'No. Contributions are discussed on a case-by-case basis depending on the nature and volume of opportunities.'],
  ['Does Innovate With Aima take commission or manage contracts?', 'No. We do not take commission on work completed and do not manage contracts, payments, or delivery between parties.'],
  ['How are opportunities shared?', 'Opportunities are reviewed and distributed based on relevance and current demand within the network.'],
  ['Can access be revoked?', 'Yes. Access may be suspended if participation standards are not met or if activity no longer aligns with the network’s purpose.'],
  ['Where can I find the legal definitions and terms?', 'Key definitions and terms governing participation are available on the Definitions page.'],
]

export default function ApplyPage(){
  const [membershipOpen, setMembershipOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'framework' || hash === 'faq') {
      setMembershipOpen(true)
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
      })
    }
  }, [])

return(
<>
<Helmet>
<title>Apply | Innovate With Aima</title>
<meta name="description" content="Apply to join the Innovate With Aima network. Membership is selective and reviewed individually." />
<link rel="canonical" href="https://innovatewithaima.com/apply" />
</Helmet>

<div className="min-h-screen">
<main className="mx-auto max-w-[1100px] px-4 pb-24 pt-32 md:px-8">

<div className="relative left-1/2 -ml-[50vw] -mt-32 w-screen overflow-hidden">
  <div className="relative h-[280px] w-full sm:h-[340px] md:h-[400px]">
    <img
      src={applyHero}
      alt=""
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
     <div className="absolute inset-0 bg-black/45" />

    <div className="relative flex h-full flex-col justify-center px-4 md:px-8">
      <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
        Membership Application
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
        Where your business ideas become clearer.
      </p>

      
       <a href="https://group.innovatewithaima.com/deals"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#083a6f] shadow-lg transition hover:-translate-y-0.5"
      >
        Access Deals
      </a>
    </div>
  </div>
</div>

<div className="mt-10 border-b border-white/10">
  <button
    type="button"
    onClick={() => setMembershipOpen(v => !v)}
    className="flex w-full items-center justify-between py-6 text-left"
    aria-expanded={membershipOpen}
  >
    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">About Membership</h2>
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`shrink-0 ml-4 transition-transform ${membershipOpen ? 'rotate-180' : ''}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </button>

  {membershipOpen && (
    <div className="pb-16">
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {membershipCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[20px] border border-white/10 bg-white/7 p-5 backdrop-blur-md"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8da2ff]">{card.tag}</p>
            <h3 className="mt-4 text-2xl leading-none font-medium">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/65">{card.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/55">How it works</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">For Members</h2>
        </div>
        <div className="max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          Membership provides access to paid opportunities shared by contributing businesses within a controlled professional environment. Members are vetted prior to acceptance and are expected to engage professionally, submit proposals independently, and manage delivery directly with the business once introduced.
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/55">Long-term collaboration</p>
          <h2 className="mt-3 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
            We are designed to support strong long-term working relationships rather than short-term volume.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
            We focus on building meaningful, long-term partnerships rather than short-term engagements. Our network is designed to support professionals who are committed to delivering consistently high-quality work, aligned with our standards and values.
          </p>
        </div>

        <div className="flex justify-start md:justify-end">
          <Link
            to="https://www.innovatewithaima.com/apply"
            className="rounded-full bg-[#5c6cff] px-4 md:px-8 py-2 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#6f7fff]"
          >
            Apply for Network Access
          </Link>
        </div>
      </div>

      <div id="framework" className="mt-16">
        <div className="rounded-[45px] border border-white/10 bg-black/55 px-6 py-16 text-center shadow-2xl shadow-black/30 md:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8da2ff]">How the network works</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Our Operating Framework</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/68 md:text-base">
            For clarity and transparency, we define how the Innovate With Aima Network operates, including key roles, responsibilities, and terms used across the platform.
          </p>
          <Link to="https://www.innovatewithaima.com/definitions" className="mt-8 inline-flex rounded-full bg-[#5c6cff] px-4 md:px-8 py-2 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#6f7fff]">
            Read Definitions
          </Link>
        </div>
      </div>

      <div id="faq" className="mt-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/55">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Have questions about your next gig?</h2>
          <p className="mt-3 text-white/60">Get answers.</p>
        </div>

        <div className="mt-12 grid gap-10 grid-cols-1 md:grid-cols-[1fr_0.95fr] md:items-start">
          <div className="space-y-3">
            {membershipFaqs.map(([q, a], i) => {
              const isOpen = openFaq === i
              return (
                <div key={q} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between py-6 text-left"
                  >
                    <h3 className="text-2xl font-medium tracking-tight">{q}</h3>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className={`shrink-0 ml-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {isOpen && (
                    <p className="pb-6 max-w-2xl text-sm leading-7 text-white/65">{a}</p>
                  )}
                </div>
              )
            })}
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img src={hero} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="rounded-[22px] border border-white/12 bg-black/35 p-8 text-center md:p-14">
          <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Share Opportunities With the Network</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
            If your business has ongoing or repeat work, you can submit opportunities for review and distribution to relevant independent professionals in the network.
          </p>
          <Link to="https://www.innovatewithaima.com/apply" className="mt-7 inline-flex rounded-full bg-[#5c6cff] px-4 md:px-8 py-2 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#6f7fff]">
            Submit an Opportunity
          </Link>
        </div>
      </div>
    </div>
  )}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">

<div>

<h2 className="text-2xl font-semibold mb-6">
Membership Details
</h2>

<p className="text-white/70 leading-7">
Innovate With Aima operates on a selective membership basis.
Applications are reviewed individually. Acceptance is not guaranteed
and depends on suitability, experience, and current network demand.
</p>

<div className="mt-10 text-sm text-white/70 space-y-1">
<p>Monday: 08:00am - 17:00pm</p>
<p>Tuesday: 08:00am - 17:00pm</p>
<p>Wednesday: 08:00am - 17:00pm</p>
<p>Thursday: 08:00am - 17:00pm</p>
<p>Friday: 08:00am - 17:00pm</p>
<p>Saturday: 08:00am - 17:00pm</p>
<p>Sunday: 08:00am - 17:00pm</p>
</div>

</div>

<div className="space-y-6">

<div>
<p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-2">
Application enquiries
</p>

<a href="mailto:apply@innovatewithaima.com"
className="text-2xl font-medium text-[#8da2ff] hover:underline break-all"
>
apply@innovatewithaima.com
</a>
</div>

<div>
<p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-2">
Other enquiries
</p>

<a href="mailto:business@innovatewithaima.com"
className="text-2xl font-medium text-[#8da2ff] hover:underline break-all"
>
business@innovatewithaima.com
</a>
</div>

<p className="text-sm text-white/60 leading-7">
We aim to respond to all messages within 2 days.
</p>

</div>

</div>

<div className="mt-20">
  
   <a href="https://group.innovatewithaima.com/join"
    className="group relative block w-full max-w-[320px] aspect-[660/1020] rounded-[45px] overflow-hidden bg-[#5c6cff] text-left"
  >
    <div
      className="absolute inset-0 bg-cover bg-center select-none"
      style={{ backgroundImage: `url(${iwaCardImg})`, WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
    <div className="absolute top-0 left-0 right-0 h-2/3 flex items-start pointer-events-none">
      <h3 className="pl-[130px] pt-16 text-left text-lg font-black font-['Inter'] text-white leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
        IWA Ambassador
      </h3>
    </div>
    <GlossyButton as="span" shape="circle" className="absolute bottom-4 right-4 z-10">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </GlossyButton>
  </a>
</div>

</main>
</div>
</>
)
}
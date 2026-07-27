import { Helmet } from "react-helmet-async"
import applyHero from '../assets/deals-hero.jpg'
import iwaCardImg from '../assets/iwa.png'
import GlossyButton from '../components/GlossyButton'

export default function ApplyPage(){

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
    <div className="absolute inset-0 bg-black/25" />

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
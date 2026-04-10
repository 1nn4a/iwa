import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import hero from '../assets/iwa.png'
import { Helmet } from "react-helmet-async"

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const cards = [
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
];

const faqs = [
  ['Who can apply for membership?', 'Membership is open to independent professionals, freelancers, and entrepreneurs who meet our suitability criteria. All applications are reviewed individually.'],
  ['How does the application process work?', 'Applicants submit an application for review. If suitable, next steps are shared before any payment is requested. Membership is ongoing and reviewed periodically.'],
  ['What does membership provide?', 'Members gain access to paid opportunities shared by contributing businesses and can submit proposals independently.'],
  ['What does Innovate With Aima do for businesses?', 'The network helps distribute opportunities to vetted professionals without the noise of open-market outreach.'],
  ['Are businesses required to commit long-term?', 'No. Contributions are discussed on a case-by-case basis depending on the nature and volume of opportunities.'],
  ['Does Innovate With Aima take commission or manage contracts?', 'No. We do not take commission on work completed and do not manage contracts, payments, or delivery between parties.'],
  ['How are opportunities shared?', 'Opportunities are reviewed and distributed based on relevance and current demand within the network.'],
  ['Can access be revoked?', 'Yes. Access may be suspended if participation standards are not met or if activity no longer aligns with the network’s purpose.'],
  ['Where can I find the legal definitions and terms?', 'Key definitions and terms governing participation are available on the Definitions page.'],
];

export default function HomePage() {
  return (
<>
<Helmet>
<title>Client acquisition network for specialised businesses</title>

<meta
name="description"
content="Connect with skilled freelancers, contractors and entrepreneurs. We simplify client acquisition and manage relationships for reliable results."
/>
</Helmet>

<main>
      <section className="mx-auto max-w-[1180px] px-4 md:px-8 pt-28 md:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/55">
            Private professional network
          </p>
          <h1 className="max-w-3xl text-5xl leading-[0.95] font-semibold tracking-tight md:text-7xl">
            A Private Professional Network for Specialist Businesses
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
            We provide a selective way for businesses to share paid opportunities with independent professionals. Without being a marketplace.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="https://www.innovatewithaima.com/definitions"
            className="rounded-full bg-black px-4 py-2 text-xs font-medium text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5"
          >
            Learn More
          </a>
          <Link
            to="https://group.innovatewithaima.com/submit-an-opportunity"
            className="rounded-full bg-[#5c6cff] px-4 py-2 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#6f7fff]"
          >
            Submit an Opportunity
          </Link>
        </div>

        <div className="mt-12 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.55, delay: 0.08 * i }}
              className="rounded-[20px] border border-white/10 bg-white/7 p-5 backdrop-blur-md"
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#8da2ff]">{card.tag}</p>
              <h3 className="mt-4 text-2xl leading-none font-medium">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{card.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 md:px-8 py-24 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/55">How it works</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">For Members</h2>
          </div>
          <div className="max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            Membership provides access to paid opportunities shared by contributing businesses within a controlled professional environment. Members are vetted prior to acceptance and are expected to engage professionally, submit proposals independently, and manage delivery directly with the business once introduced.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 md:px-8 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
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
      </section>

      <section id="framework" className="mx-auto max-w-[1180px] px-4 md:px-8 py-12 md:px-8">
        <div className="rounded-[28px] border border-white/10 bg-black/55 px-6 py-16 text-center shadow-2xl shadow-black/30 md:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8da2ff]">How the network works</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Our Operating Framework</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/68 md:text-base">
            For clarity and transparency, we define how the Innovate With Aima Network operates, including key roles, responsibilities, and terms used across the platform.
          </p>
          <Link to="https://www.innovatewithaima.com/definitions" className="mt-8 inline-flex rounded-full bg-[#5c6cff] px-4 md:px-8 py-2 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#6f7fff]">
            Read Definitions
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 md:px-8 py-20 md:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/55">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Have questions about your next gig?</h2>
          <p className="mt-3 text-white/60">Get answers.</p>
          
        </div>
        

        <div className="mt-12 grid gap-10 grid-cols-1 md:grid-cols-[1fr_0.95fr] md:items-start">
          <div className="space-y-7">
            {faqs.map(([q, a]) => (
              <div key={q} className="border-b border-white/10 pb-6">
                <h3 className="text-2xl font-medium tracking-tight">{q}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">{a}</p>
              </div>
              
            ))}
          </div>
          
<div className="rounded-2xl overflow-hidden border border-white/10">
  <img
    src={hero}
    className="w-full h-full object-cover"
  />
</div>
          
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 md:px-8 pb-24 md:px-8">
        <div className="rounded-[22px] border border-white/12 bg-black/35 p-8 text-center md:p-14">
          <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Share Opportunities With the Network</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
            If your business has ongoing or repeat work, you can submit opportunities for review and distribution to relevant independent professionals in the network.
          </p>
          <Link to="https://www.innovatewithaima.com/apply" className="mt-7 inline-flex rounded-full bg-[#5c6cff] px-4 md:px-8 py-2 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#6f7fff]">
            Submit an Opportunity
          </Link>
        </div>
      </section>
          </main>
    </>
  );
}
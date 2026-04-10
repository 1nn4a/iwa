import { motion } from 'framer-motion';

const defs = [
  {
    title: '“ASSOCIATION” / “NETWORK”',
    text: 'Refers to the Innovate With Aima professional network, operated by Innovatewithaima Ltd, through which members may access opportunities, resources, and communications.',
  },
  {
    title: '“BUSINESS HOURS”',
    text: '09:00 to 17:00 on any Business Day, unless otherwise stated.',
  },
  {
    title: '“MEMBER”',
    text: 'An individual or business approved for membership within the Innovate With Aima Network for the purpose of accessing opportunities, resources, or network services, subject to an active membership term.',
  },
  {
    title: '“CONTRIBUTOR”',
    text: 'A business, organisation, or professional that submits opportunities, briefs, or work requests to the Network for consideration and distribution to Members.',
  },
  {
    title: '“CONFIDENTIAL INFORMATION”',
    text: 'Any information disclosed by one party to another in connection with the Network or its services that is marked or reasonably understood to be confidential, including but not limited to commercial terms, opportunity details, personal data, and internal communications.',
  },
  {
    title: '“ENGAGEMENT”',
    text: 'Any interaction, communication, proposal, or working arrangement entered into between a Contributor and a Member as a result of introduction, access, or visibility through the Network.',
  },
  {
    title: '“MEMBERSHIP”',
    text: 'A time-limited, rolling access right granted to a Client or Member, subject to approval, payment (where applicable), and ongoing compliance with Network standards.',
  },
  {
    title: '“OPPORTUNITY”',
    text: 'Any project, role, engagement, brief, collaboration, or commercial requirement shared with the Network by a Contributor for consideration by Members.',
  },
  {
    title: '“PLATFORM”',
    text: 'Refers collectively to Innovate With Aima’s website, communication tools, dashboards, forms, and any associated systems used to operate the Network.',
  },
  {
    title: '“PROPOSAL”',
    text: 'An expression of interest, response, or submission made by a Member in relation to an Opportunity. A Proposal does not constitute a binding agreement unless agreed separately by the relevant parties.',
  },
  {
    title: '“SERVICES”',
    text: 'The facilitation of access, visibility, communication, and structured engagement within the Innovate With Aima Network.',
  },
  {
    title: '“SHARED PERSONAL DATA”',
    text: 'Personal data exchanged between Innovate With Aima and Users for the purposes of operating the Network, limited to contact details, professional information, and verification data where required.',
  },
  {
    title: '“USER”',
    text: 'Any individual or entity accessing or interacting with the Innovate With Aima website or Network, including Members, Contributors, and applicants.',
  },
  {
    title: '“WEBSITE”',
    text: 'The Innovate With Aima website currently accessible at https://www.innovatewithaima.com',
  },
  {
    title: '“INNOVATEWITHAIMA”, “INNOVATE WITH AIMA”, “IWA”, “WE”, “US”, “OUR”',
    text: 'Refers to Innovatewithaima Ltd, a company registered in England and Wales (Company No. 15918798), with its registered office: 124 City Road, London, England, EC1V 2NX.',
  },
];

export default function DefinitionsPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-5 pt-28 md:px-8">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/55">Legal framework</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">Key Definitions</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
          The following definitions apply across the Innovate With Aima website, network, and related agreements unless stated otherwise.
        </p>
      </motion.section>

      <section className="mt-16 space-y-10">
        {defs.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.03 }}
            className="max-w-2xl border-b border-white/10 pb-8"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8da2ff]">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/72 md:text-base">{item.text}</p>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
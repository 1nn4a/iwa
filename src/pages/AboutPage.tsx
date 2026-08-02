// src/pages/AboutPage.tsx
import { Helmet } from 'react-helmet-async';
import iwaCardImg from '../assets/iwa.png';

const timeline = [
  {
    year: '2023',
    items: [
      'Founded InnovateWithAiMA',
      'Developed internal automation systems',
      'Launched infrastructure-led growth initiatives',
    ],
  },
  {
    year: '2025',
    items: [
      'Expanded into service business software',
      'Began development of the For Cleaners ecosystem',
      'Introduced creator partnership infrastructure',
    ],
  },
  {
    year: '2026',
    items: [
      'Launched Links For Cleaners',
      'Released Service Estimator',
      'Released Profile Analytics',
      'Released Professional Gallery',
      'Expanded creator monetisation infrastructure',
      'Introduced Deals & Perks for members',
      'Continued building the connected software ecosystem',
    ],
  },
  {
    year: 'Today',
    items: [
      'IWA continues developing digital infrastructure for service businesses, with products designed to help businesses become more discoverable, operate more efficiently and generate more opportunities online.',
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | Innovate With Aima</title>
        <meta name="description" content="InnovateWithAiMA (IWA) is a digital infrastructure company building software, automation and growth systems for service businesses and creators." />
        <link rel="canonical" href="https://innovatewithaima.com/about" />
      </Helmet>

      <main>
        <section className="mx-auto max-w-[1180px] px-4 pb-24 pt-32 md:px-8">
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">About IWA</h1>

          <div className="mt-10 grid gap-8 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:grid-cols-[1.1fr_1fr] md:items-center md:p-10">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src={iwaCardImg}
                alt="Innovate With Aima"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-sm leading-7 text-white/70 md:text-base">
              <p>
                Founded in 2024, InnovateWithAiMA (IWA) is a digital infrastructure company building software, automation and growth systems for service businesses and creators.
              </p>
              <p className="mt-4">
                Guided by our mission to modernise how service businesses operate online, IWA develops products that help businesses attract customers, manage enquiries, automate repetitive work and create more opportunities for growth.
              </p>
              <p className="mt-4">
                Rather than building standalone software, IWA focuses on connected products that work together across the customer journey — from discovery and marketing through to conversion, operations and long-term business growth.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 pb-24 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Company Timeline</h2>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-10">
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold md:text-xl">Building Digital Infrastructure</p>
              <p className="mt-1 text-sm text-white/55">2024 – Present</p>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {timeline.map((period) => (
                <div key={period.year} className="border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-[#8da2ff]">{period.year}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-white/65">
                    {period.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
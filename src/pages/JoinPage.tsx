// src/pages/JoinPage.tsx
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import dealsHero from '../assets/deals-hero.jpg'
interface AmbassadorPosition {
  slug: string
  title: string
  team: string
  location: string
  posted_at: string
}

export default function JoinPage() {
  const [positions, setPositions] = useState<AmbassadorPosition[]>([])
  const [loading, setLoading] = useState(true)
  const [activePosition, setActivePosition] = useState<AmbassadorPosition | null>(null)

  useEffect(() => {
 fetch('/api/ambassador-positions')
      .then(res => res.json() as Promise<AmbassadorPosition[]>)
      .then(data => setPositions(data))
      .catch(() => setPositions([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet>
        <title>Join | Innovate With Aima Network</title>
        <link rel="canonical" href="https://group.innovatewithaima.com/join" />
      </Helmet>
      <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
        <main className="mx-auto max-w-[1180px] px-4 pb-24 pt-32 md:px-8">
          <div className="relative -mx-4 -mt-32 overflow-hidden md:-mx-8 md:-mt-32">
            <div className="relative h-[280px] w-full sm:h-[340px] md:h-[400px]">
           <img
                src={dealsHero}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/25" />

              <div className="relative flex h-full flex-col justify-center px-4 md:px-8">
                <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Become an IWA Ambassador
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
                  Represent the network. Open positions below.
                </p>
              </div>
            </div>
          </div>

          {loading && <p className="mt-10 text-sm text-[#083a6f]/50">Loading positions…</p>}

          <div className="mt-10 divide-y divide-[#083a6f]/10 border-t border-[#083a6f]/10">
            {positions.map(position => (
              <button
                key={position.slug}
                onClick={() => setActivePosition(position)}
                className="flex w-full items-center justify-between py-5 text-left transition hover:bg-[#5c6cff]/5"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#083a6f]">{position.title}</h3>
                  <p className="mt-1 text-xs font-medium text-[#083a6f]/45">
                    {position.team} | {position.location}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#5c6cff]">View →</span>
              </button>
            ))}
          </div>
        </main>
      </div>

      {activePosition && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActivePosition(null)}
        >
          <div
            className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-[#083a6f]">{activePosition.title}</h3>
            <p className="mt-2 text-sm text-[#083a6f]/50">Details coming soon.</p>
            <button
              onClick={() => setActivePosition(null)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#5c6cff]/15 bg-[#5c6cff]/10 px-5 py-2.5 text-xs font-semibold text-[#5c6cff] hover:bg-[#5c6cff]/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
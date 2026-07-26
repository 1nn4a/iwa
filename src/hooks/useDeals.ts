// src/hooks/useDeals.ts
import { useEffect, useState } from 'react'
import { deals as seedDeals, type Deal } from '../data/deals'

export function useDeals() {
  const [data, setData] = useState<Deal[]>(seedDeals)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
 fetch('/api/deals')
      .then(res => { if (!res.ok) throw new Error('FAILED'); return res.json() as Promise<Deal[]> })
      .then((json) => { if (active && Array.isArray(json) && json.length) setData(json) })
      .catch(() => { /* keep seed fallback */ })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return { deals: data, loading }
}

export function useDeal(slug: string | undefined) {
  const [data, setData] = useState<Deal | null>(seedDeals.find(d => d.slug === slug) ?? null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) { setLoading(false); return }
    let active = true
  fetch(`/api/deals/${slug}`)
      .then(res => { if (!res.ok) throw new Error('FAILED'); return res.json() as Promise<Deal> })
      .then((json) => { if (active && json) setData(json) })
      .catch(() => { /* keep seed fallback */ })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [slug])

  return { deal: data, loading }
}
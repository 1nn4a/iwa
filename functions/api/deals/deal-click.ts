// functions/api/deal-click.ts
 
import { isRateLimited } from '../../../src/lib/rate-limit'
interface Env {
  iwa_product_interest: D1Database
  RATE_LIMIT_KV: KVNamespace
}

const ALLOWED_ORIGIN = 'https://group.innovatewithaima.com'

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin')
  if (origin !== ALLOWED_ORIGIN) {
    return new Response(null, { status: 204 })
  }

  if (await isRateLimited(env, request, 'deal-click', 30, 60)) {
    return new Response(null, { status: 204 })
  }

  let body: { slug?: string; email?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(null, { status: 204 })
  }

  const slug = typeof body.slug === 'string' ? body.slug.slice(0, 200) : ''
  if (!slug) return new Response(null, { status: 204 })

  const email = typeof body.email === 'string' ? body.email.slice(0, 320) : null
  const ip = request.headers.get('cf-connecting-ip') ?? null

  try {
    await env.iwa_product_interest
      .prepare('INSERT INTO deal_click (slug, email, ip) VALUES (?, ?, ?)')
      .bind(slug, email, ip)
      .run()
  } catch {
   }

  return new Response(null, { status: 204 })
}
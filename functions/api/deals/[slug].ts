// functions/api/deals/[slug].ts
import { handleDealBySlug } from '../../../src/worker-routes/deal-by-slug'

 
import { isRateLimited } from '../../../src/lib/rate-limit'

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
  RATE_LIMIT_KV: KVNamespace
}

const ALLOWED_ORIGIN = 'https://group.innovatewithaima.com'

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  const origin = request.headers.get('origin')
  if (origin && origin !== ALLOWED_ORIGIN) {
    return new Response('Forbidden', { status: 403 })
  }
  if (await isRateLimited(env, request, 'deal-by-slug', 60, 60)) {
    return new Response('Too Many Requests', { status: 429 })
  }
  const slug = typeof params.slug === 'string' ? params.slug : ''
  return handleDealBySlug(request, env, slug)
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin':  'https://group.innovatewithaima.com',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
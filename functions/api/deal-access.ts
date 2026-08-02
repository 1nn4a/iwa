// functions/api/deal-access.ts
import { handleDealAccess } from '../../src/worker-routes/deal-access'

 import { isRateLimited } from '../../src/lib/rate-limit'

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
  RATE_LIMIT_KV: KVNamespace
}

const ALLOWED_ORIGIN = 'https://group.innovatewithaima.com'

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin')
  if (origin !== ALLOWED_ORIGIN) {
    return new Response('Forbidden', { status: 403 })
  }
  if (await isRateLimited(env, request, 'deal-access', 5, 300)) {
    return new Response('Too Many Requests', { status: 429 })
  }
  return handleDealAccess(request, env)
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin':  'https://group.innovatewithaima.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
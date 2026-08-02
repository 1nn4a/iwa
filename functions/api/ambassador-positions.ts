// functions/api/ambassador-positions.ts
import { handleAmbassadorPositions } from '../../src/worker-routes/ambassador-positions'

// after
import { isRateLimited } from '../../src/lib/rate-limit'

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
  RATE_LIMIT_KV: KVNamespace
}

const ALLOWED_ORIGIN = 'https://group.innovatewithaima.com'

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin')
  if (origin && origin !== ALLOWED_ORIGIN) {
    return new Response('Forbidden', { status: 403 })
  }
  if (await isRateLimited(env, request, 'ambassador-positions', 60, 60)) {
    return new Response('Too Many Requests', { status: 429 })
  }
  return handleAmbassadorPositions(request, env)
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
import { handleDealsList } from '../../../src/worker-routes/deals-list'

// after
import { isRateLimited } from '../../../src/lib/rate-limit'

interface Env {
  iwa_product_interest: D1Database
  RATE_LIMIT_KV: KVNamespace
}

const ALLOWED_ORIGIN = 'https://group.innovatewithaima.com'

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin')
  if (origin && origin !== ALLOWED_ORIGIN) {
    return new Response('Forbidden', { status: 403 })
  }
  if (await isRateLimited(env, request, 'deals-list', 60, 60)) {
    return new Response('Too Many Requests', { status: 429 })
  }
  return handleDealsList(env)
}
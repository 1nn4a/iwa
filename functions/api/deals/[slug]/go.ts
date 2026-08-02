// functions/api/deals/[slug]/go.ts
import { handleDealRedirect } from '../../../../src/worker-routes/deal-redirect'
import { isRateLimited } from '../../../../src/lib/rate-limit'

interface Env {
  iwa_product_interest: D1Database
  RATE_LIMIT_KV: KVNamespace
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  if (await isRateLimited(env, request, 'deal-redirect', 60, 60)) {
    return new Response('Too Many Requests', { status: 429 })
  }
  const slug = typeof params.slug === 'string' ? params.slug : ''
  return handleDealRedirect(request, env, slug)
}
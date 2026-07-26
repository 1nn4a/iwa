// functions/api/deals/[slug].ts
import { handleDealBySlug } from '../../../src/worker-routes/deal-by-slug'

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
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
// functions/api/deals.ts
import { handleDealsList } from '../../src/worker-routes/deals'

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  return handleDealsList(request, env)
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
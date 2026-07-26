// functions/api/deal-access.ts
import { handleDealAccess } from '../../src/worker-routes/deal-access'

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
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
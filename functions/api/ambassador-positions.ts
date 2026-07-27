// functions/api/ambassador-positions.ts
import { handleAmbassadorPositions } from '../../src/worker-routes/ambassador-positions'

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
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
// src/worker-routes/deal-by-slug.ts
/// <reference types="@cloudflare/workers-types" />
import { deals } from '../data/deals-content'

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://group.innovatewithaima.com',
    },
  })
}

export async function handleDealBySlug(
  request: Request,
  _env: Env,
  slug: string,
): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin':  'https://group.innovatewithaima.com',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405)
  }

  if (!slug || typeof slug !== 'string' || slug.length > 200) {
    return json({ error: 'Invalid slug' }, 400)
  }

  // TODO (migration note): swap for `SELECT * FROM deals WHERE slug = ? LIMIT 1`
  // against D1 once deals content moves off the static file. Keep the
  // response shape identical to `Deal` in src/data/deals.ts.

  const deal = deals.find(d => d.slug === slug)
  if (!deal) {
    return json({ error: 'Deal not found' }, 404)
  }

  return json(deal, 200)
}
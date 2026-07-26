// src/worker-routes/deals.ts
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

export async function handleDealsList(
  request: Request,
  _env: Env,
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

  // TODO (migration note): once deals move to D1, replace the static
  // import above with a query like:
  //   SELECT * FROM deals WHERE published = 1 ORDER BY created_at DESC
  // and map rows back into the same shape returned below, so DealsPage
  // and DealPage don't need to change at all.

const summary = deals.map((d: (typeof deals)[number]) => ({
    slug: d.slug,
    company: d.company,
    dealTitle: d.dealTitle,
    savingsLabel: d.savingsLabel,
    logo: d.logo,
    category: d.category,
  }))

  return json(summary, 200)
}
// src/worker-routes/ambassador-positions.ts
/// <reference types="@cloudflare/workers-types" />

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

export async function handleAmbassadorPositions(
  request: Request,
  env: Env,
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

  const { results } = await env.iwa_product_interest
    .prepare('SELECT slug, title, team, location, posted_at FROM ambassador_positions WHERE is_active = 1 ORDER BY posted_at DESC')
    .all()

  return json(results, 200)
}
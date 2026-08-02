// src/worker-routes/deal-by-slug.ts
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

  const row = await _env.iwa_product_interest
    .prepare('SELECT * FROM deals WHERE slug = ?')
    .bind(slug)
    .first()

  if (!row) {
    return json({ error: 'Deal not found' }, 404)
  }

  return json(mapRow(row), 200)
}

function mapRow(row: any) {
  return {
    slug: row.slug,
    company: row.company,
    dealTitle: row.dealTitle,
    savingsLabel: row.savingsLabel ?? undefined,
    logo: row.logo ?? undefined,
    category: row.category,
    overview: JSON.parse(row.overview),
    featureSections: JSON.parse(row.featureSections),
    closingLine: row.closingLine,
    aboutDeal: row.aboutDeal,
    eligibility: JSON.parse(row.eligibility),
    availability: row.availability,
    aboutCompanyName: row.aboutCompanyName,
    aboutCompanyText: row.aboutCompanyText,
    companySize: row.companySize,
    yearFounded: row.yearFounded,
    country: row.country,
   footerLine: row.footerLine,
    gallery: row.gallery ? JSON.parse(row.gallery) : undefined,
    locked: !!row.locked,
    hasRedirect: !!row.redirect_url,
  }
}
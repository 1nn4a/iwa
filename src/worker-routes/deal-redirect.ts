// src/worker-routes/deal-redirect.ts
/// <reference types="@cloudflare/workers-types" />

interface Env {
  iwa_product_interest: D1Database
}

export async function handleDealRedirect(
  _request: Request,
  env: Env,
  slug: string,
): Promise<Response> {
  if (!slug || typeof slug !== 'string' || slug.length > 200) {
    return new Response('Invalid slug', { status: 400 })
  }

  const row = await env.iwa_product_interest
    .prepare('SELECT redirect_url FROM deals WHERE slug = ?')
    .bind(slug)
    .first<{ redirect_url: string | null }>()

  if (!row || !row.redirect_url) {
    return new Response('Deal not found', { status: 404 })
  }

  return Response.redirect(row.redirect_url, 302)
}
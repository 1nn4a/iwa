/// <reference types="@cloudflare/workers-types" />

 

interface Env {
  iwa_product_interest: D1Database
}
interface Payload {
  name:            string
  email:           string
  products:        string[]
  primary_product: string
}

const VALID_PRODUCTS = new Set(['trades', 'beauty', 'property'])
const EMAIL_RE       = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SERVER_RATE_MS = 60_000    

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': 'https://www.innovatewithaima.com',
    },
  })
}

function err(msg: string, status: number): Response {
  return json({ error: msg }, status)
}

export async function handleProductInterest(
  request: Request,
  env: Env,
): Promise<Response> {
   if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin':  'https://www.innovatewithaima.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (request.method !== 'POST') return err('Method not allowed', 405)

   let payload: Payload
  try {
    payload = await request.json()
  } catch {
    return err('Invalid JSON body', 400)
  }

  const { name, email, products, primary_product } = payload

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 120) {
    return err('Invalid name', 400)
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 320) {
    return err('Invalid email address', 400)
  }
  if (
    !Array.isArray(products) ||
    products.length === 0 ||
    products.length > VALID_PRODUCTS.size ||
    products.some(p => !VALID_PRODUCTS.has(p))
  ) {
    return err('Invalid products selection', 400)
  }
  if (!VALID_PRODUCTS.has(primary_product)) {
    return err('Invalid primary product', 400)
  }

  const cleanName    = name.trim().slice(0, 120)
  const cleanEmail   = email.trim().toLowerCase().slice(0, 320)
  const cleanProds   = JSON.stringify([...new Set(products)])    
  const cleanPrimary = primary_product

 const cutoff = new Date(Date.now() - SERVER_RATE_MS).toISOString()

  const { results: emailRows } = await env.iwa_product_interest.prepare(
    `SELECT id FROM product_interest
     WHERE email = ? AND created_at > ?
     LIMIT 1`,
  )
    .bind(cleanEmail, cutoff)
    .all()

if (emailRows.length > 0) {
    return err('Too many requests. Please wait before submitting again.', 429)
  }

const { results: dupRows } = await env.iwa_product_interest.prepare(
    `SELECT id FROM product_interest
     WHERE email = ? AND primary_product = ?
     LIMIT 1`,
  )
    .bind(cleanEmail, cleanPrimary)
    .all()

  if (dupRows.length > 0) {
    return json({ ok: true }, 201)
  }

    try {
    await env.iwa_product_interest.prepare(
      `INSERT INTO product_interest (name, email, products, primary_product, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
      .bind(
        cleanName,
        cleanEmail,
        cleanProds,
        cleanPrimary,
        new Date().toISOString(),
      )
      .run()
  } catch (e: any) {
    console.error('D1 insert error:', e)
    return err('Server error. Please try again.', 500)
  }

  return json({ ok: true }, 201)
}
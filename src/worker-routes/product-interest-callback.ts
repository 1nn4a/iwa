/// <reference types="@cloudflare/workers-types" />

interface Env {
  iwa_product_interest: D1Database
}
interface CallbackPayload {
  email:          string
  phone:          string | null
  wants_callback: boolean
  preferred_day:  string | null
  preferred_time: string | null
}

const EMAIL_RE       = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE       = /^(\+44\s?|0)[1-9]\d{8,9}$/
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

export async function handleProductInterestCallback(
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

  let payload: CallbackPayload
  try {
    payload = await request.json()
  } catch {
    return err('Invalid JSON body', 400)
  }

  const { email, phone, wants_callback, preferred_day, preferred_time } = payload

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 320) {
    return err('Invalid email address', 400)
  }
if (phone !== null && phone.trim() !== '') {
    const normalizedPhone = phone.replace(/[\s()-]/g, '')
    if (typeof phone !== 'string' || phone.length > 32 || !PHONE_RE.test(normalizedPhone)) {
      return err('Invalid phone number', 400)
    }
  }
  if (typeof wants_callback !== 'boolean') {
    return err('Invalid callback preference', 400)
  }

const cleanEmail = email.trim().toLowerCase().slice(0, 320)
  const cleanPhone = phone ? phone.trim().slice(0, 32) : null

  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
  const cutoff = new Date(Date.now() - SERVER_RATE_MS).toISOString()

  const { results: ipRows } = await env.iwa_product_interest.prepare(
    `SELECT id FROM product_interest
     WHERE ip = ? AND created_at > ?
     LIMIT 1`,
  )
    .bind(ip, cutoff)
    .all()

  if (ipRows.length > 0) {
    return err('Too many requests. Please wait before submitting again.', 429)
  }

  try {
    const result = await env.iwa_product_interest.prepare(
      `UPDATE product_interest
       SET phone = ?, wants_callback = ?, preferred_day = ?, preferred_time = ?
       WHERE id = (
         SELECT id FROM product_interest
         WHERE email = ?
         ORDER BY created_at DESC
         LIMIT 1
       )`,
    )
      .bind(
        cleanPhone,
        wants_callback ? 1 : 0,
        wants_callback ? preferred_day  : null,
        wants_callback ? preferred_time : null,
        cleanEmail,
      )
      .run()

    if (result.meta.changes === 0) {
      return err('No matching submission found', 404)
    }
  } catch (e: any) {
    console.error('D1 update error:', e)
    return err('Server error. Please try again.', 500)
  }

  return json({ ok: true }, 200)
}
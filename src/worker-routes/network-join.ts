// src/worker-routes/network-join.ts
/// <reference types="@cloudflare/workers-types" />

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
}

interface Payload {
  name:            string
  business_name:   string
  email:           string
  turnstile_token: string
  cookie_consent?: string
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  if (!token || typeof token !== 'string') return false
  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', token)
  body.set('remoteip', ip)
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    })
    const data: { success: boolean } = await res.json()
    return data.success === true
  } catch {
    return false
  }
}

const EMAIL_RE       = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SERVER_RATE_MS = 60_000

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://group.innovatewithaima.com',
    },
  })
}

function err(msg: string, status: number): Response {
  return json({ error: msg }, status)
}

export async function handleNetworkJoin(
  request: Request,
  env: Env,
): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin':  'https://group.innovatewithaima.com',
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

  const { name, business_name, email, turnstile_token, cookie_consent } = payload

  const turnstileIp = request.headers.get('CF-Connecting-IP') ?? ''
  const turnstileOk = await verifyTurnstile(turnstile_token, env.TURNSTILE_SECRET_KEY, turnstileIp)
  if (!turnstileOk) return err('Verification failed. Please try again.', 400)

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 120) {
    return err('Invalid name', 400)
  }
  if (!business_name || typeof business_name !== 'string' || business_name.trim().length < 2 || business_name.length > 200) {
    return err('Invalid business name', 400)
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 320) {
    return err('Invalid email address', 400)
  }

  const cleanName         = name.trim().slice(0, 120)
  const cleanBusinessName = business_name.trim().slice(0, 200)
  const cleanEmail        = email.trim().toLowerCase().slice(0, 320)
  const logIp             = cookie_consent === 'accepted' ? turnstileIp : null

  const cutoff = new Date(Date.now() - SERVER_RATE_MS).toISOString()

  const { results: rateRows } = await env.iwa_product_interest.prepare(
    `SELECT id FROM network_join WHERE email = ? AND created_at > ? LIMIT 1`,
  )
    .bind(cleanEmail, cutoff)
    .all()

  if (rateRows.length > 0) {
    return err('Too many requests. Please wait before trying again.', 429)
  }

  try {
    await env.iwa_product_interest.prepare(
      `INSERT INTO network_join (name, business_name, email, ip, created_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT (email) DO NOTHING`,
    )
      .bind(cleanName, cleanBusinessName, cleanEmail, logIp, new Date().toISOString())
      .run()
  } catch (e: any) {
    console.error('D1 insert error:', e)
    return err('Server error. Please try again.', 500)
  }

  return json({ ok: true }, 201)
}
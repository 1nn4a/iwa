/// <reference types="@cloudflare/workers-types" />

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
}

interface BlueprintPayload {
  email:           string
  turnstile_token: string
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

export async function handleBlueprintInterest(
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

  let payload: BlueprintPayload
  try {
    payload = await request.json()
  } catch {
    return err('Invalid JSON body', 400)
  }

  const { email, turnstile_token } = payload

  const turnstileIp = request.headers.get('CF-Connecting-IP') ?? ''
  const turnstileOk = await verifyTurnstile(turnstile_token, env.TURNSTILE_SECRET_KEY, turnstileIp)
  if (!turnstileOk) {
    return err('Verification failed. Please try again.', 400)
  }

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 320) {
    return err('Invalid email address', 400)
  }

  const cleanEmail = email.trim().toLowerCase().slice(0, 320)

  try {
    await env.iwa_product_interest.prepare(
      `INSERT INTO blueprint_interest (email, created_at)
       VALUES (?, ?)
       ON CONFLICT (email) DO NOTHING`,
    )
      .bind(cleanEmail, new Date().toISOString())
      .run()
  } catch (e: any) {
    console.error('D1 insert error:', e)
    return err('Server error. Please try again.', 500)
  }

  return json({ ok: true }, 201)
}
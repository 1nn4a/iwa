/// <reference types="@cloudflare/workers-types" />

interface Env {
  iwa_product_interest: D1Database
  TURNSTILE_SECRET_KEY: string
}

interface Payload {
  business_name:   string
  contact:         string
  category:        string
  description:     string
  timing:          string
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

const VALID_CATEGORIES = new Set([
  'Cleaning',
  'Trades',
  'Property & Facilities',
  'Beauty & Aesthetics',
  'Photography',
  'Design & Print',
  'Education, Coaching & Information Products',
  'Fashion, Beauty & Lifestyle',
  'Legal, Compliance & Professional Services',
  'Logistics, Supply Chain & Physical Ops',
  'Marketing, Paid Ads & Lead Generation',
  'Property, Real Estate & Hospitality',
  'Sales, Partnerships & Business Development',
  'Social Media Management & Growth',
  'Software, Tech & Automation',
  'Video Production & Editing',
  'Health, Wellness & Fitness',
  'Finance, Accounting & Operations',
  'AI, Data & Technical Services',
  'E-commerce & Digital Products',
  'Branding & Creative Services',
  'Web, Product & UX Design',
  'Other',
])
const VALID_TIMING   = new Set(['Immediate', 'Short notice', 'Standard timeframe', 'Flexible/ongoing'])
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

export async function handleSubmitOpportunity(
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

  const { business_name, contact, category, description, timing, turnstile_token } = payload

  const turnstileIp = request.headers.get('CF-Connecting-IP') ?? ''
  const turnstileOk  = await verifyTurnstile(turnstile_token, env.TURNSTILE_SECRET_KEY, turnstileIp)
  if (!turnstileOk) {
    return err('Verification failed. Please try again.', 400)
  }

  if (!business_name || typeof business_name !== 'string' || business_name.trim().length < 2 || business_name.trim().length > 200) {
    return err('Invalid business name', 400)
  }
  if (!contact || typeof contact !== 'string' || contact.trim().length < 3 || contact.trim().length > 320) {
    return err('Invalid contact', 400)
  }
  if (!category || !VALID_CATEGORIES.has(category)) {
    return err('Invalid category', 400)
  }
  if (!description || typeof description !== 'string' || description.trim().length < 10 || description.trim().length > 5000) {
    return err('Invalid description', 400)
  }
  if (!timing || !VALID_TIMING.has(timing)) {
    return err('Invalid timing', 400)
  }

  const cleanBusiness    = business_name.trim().slice(0, 200)
  const cleanContact     = contact.trim().slice(0, 320)
  const cleanCategory    = category
  const cleanDescription = description.trim().slice(0, 5000)
  const cleanTiming      = timing

  const cutoff = new Date(Date.now() - SERVER_RATE_MS).toISOString()

  const { results: contactRows } = await env.iwa_product_interest.prepare(
    `SELECT id FROM submit_opportunity
     WHERE contact = ? AND created_at > ?
     LIMIT 1`,
  )
    .bind(cleanContact, cutoff)
    .all()

  if (contactRows.length > 0) {
    return err('Too many requests. Please wait before submitting again.', 429)
  }

  const { results: dupRows } = await env.iwa_product_interest.prepare(
    `SELECT id FROM submit_opportunity
     WHERE contact = ? AND category = ? AND description = ?
     LIMIT 1`,
  )
    .bind(cleanContact, cleanCategory, cleanDescription)
    .all()

  if (dupRows.length > 0) {
    return json({ ok: true }, 201)
  }

  try {
    await env.iwa_product_interest.prepare(
      `INSERT INTO submit_opportunity (business_name, contact, category, description, timing, ip, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        cleanBusiness,
        cleanContact,
        cleanCategory,
        cleanDescription,
        cleanTiming,
        turnstileIp,
        new Date().toISOString(),
      )
      .run()
  } catch (e: any) {
    console.error('D1 insert error:', e)
    return err('Server error. Please try again.', 500)
  }

  return json({ ok: true }, 201)
}
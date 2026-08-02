 interface RateLimitEnv {
  RATE_LIMIT_KV: KVNamespace
}

export async function isRateLimited(
  env: RateLimitEnv,
  request: Request,
  routeKey: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
  const key = `rl:${routeKey}:${ip}`

  const current = await env.RATE_LIMIT_KV.get(key)
  const count = current ? parseInt(current, 10) : 0

  if (count >= limit) return true

  await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: windowSeconds })
  return false
}
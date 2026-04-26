// Edge-compatible auth using Web Crypto API
export const SESSION_COOKIE = 'ruff_admin_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

async function hmac(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function makeToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET || 'ruff-cms-secret'
  return hmac(secret, 'authenticated')
}

export async function verifyToken(token: string): Promise<boolean> {
  return token === (await makeToken())
}

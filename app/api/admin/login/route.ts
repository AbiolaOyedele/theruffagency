import { NextResponse } from 'next/server'
import { makeToken, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth'

export async function POST(req: Request) {
  const { password } = await req.json()
  if (password !== (process.env.ADMIN_PASSWORD || 'ruff2025')) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const token = await makeToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
  return res
}

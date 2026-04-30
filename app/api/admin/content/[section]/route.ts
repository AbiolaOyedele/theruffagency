import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'
import { verifyToken, SESSION_COOKIE } from '@/lib/auth'
import { readBlobContent, writeBlobContent } from '@/lib/blob-content'

const ALLOWED = ['settings', 'services', 'workflow', 'testimonials', 'faqs', 'pricing', 'blog', 'projects']
const CONTENT_DIR = path.join(process.cwd(), 'content')
const IS_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN

async function isAuthed(): Promise<boolean> {
  const token = cookies().get(SESSION_COOKIE)?.value
  return !!token && (await verifyToken(token))
}

export async function GET(_req: Request, { params }: { params: { section: string } }) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { section } = params
  if (!ALLOWED.includes(section)) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (IS_BLOB) {
    // Try Blob first; fall back to bundled read-only JSON if not yet seeded
    const fromBlob = await readBlobContent(section, null)
    if (fromBlob !== null) return NextResponse.json(fromBlob)
  }

  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, `${section}.json`), 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({ error: 'Read failed' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { section: string } }) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { section } = params
  if (!ALLOWED.includes(section)) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  try {
    const body = await req.json()

    if (IS_BLOB) {
      await writeBlobContent(section, body)
      return NextResponse.json({ ok: true })
    }

    fs.writeFileSync(path.join(CONTENT_DIR, `${section}.json`), JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Content write error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

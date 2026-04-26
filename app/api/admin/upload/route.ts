import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import path from 'path'
import { verifyToken, SESSION_COOKIE } from '@/lib/auth'

async function isAuthed(): Promise<boolean> {
  const token = cookies().get(SESSION_COOKIE)?.value
  return !!token && (await verifyToken(token))
}

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.mp4', '.webm', '.mov']

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const ext = path.extname(file.name).toLowerCase()
    if (!ALLOWED_EXT.includes(ext)) {
      return NextResponse.json({ error: `File type ${ext} not allowed` }, { status: 400 })
    }

    const baseName = path.basename(file.name, ext).replace(/[^a-z0-9_-]/gi, '-').toLowerCase()
    const unique = `${baseName}-${Date.now()}${ext}`

    // Use Vercel Blob in production (persistent CDN), local filesystem in dev
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob')
      const blob = await put(`uploads/${unique}`, file, { access: 'public' })
      return NextResponse.json({ url: blob.url })
    }

    // Local dev fallback — write to public/images/
    const fs = await import('fs')
    const uploadDir = path.join(process.cwd(), 'public', 'images')
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(path.join(uploadDir, unique), buffer)
    return NextResponse.json({ url: `/images/${unique}` })

  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

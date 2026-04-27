/**
 * POST /api/admin/seed
 *
 * One-time route to push local content/*.json files into Vercel Blob.
 * Only works when BLOB_READ_WRITE_TOKEN is set AND the request is authenticated.
 * Safe to call multiple times — it will overwrite existing blobs.
 */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken, SESSION_COOKIE } from '@/lib/auth'
import { writeBlobContent } from '@/lib/blob-content'

// Inline defaults for all sections so we don't need fs on Vercel
import settingsData    from '@/content/settings.json'
import servicesData    from '@/content/services.json'
import workflowData    from '@/content/workflow.json'
import testimonialsData from '@/content/testimonials.json'
import faqsData        from '@/content/faqs.json'
import pricingData     from '@/content/pricing.json'
import blogData        from '@/content/blog.json'
import projectsData    from '@/content/projects.json'

const SECTIONS: Record<string, unknown> = {
  settings:     settingsData,
  services:     servicesData,
  workflow:     workflowData,
  testimonials: testimonialsData,
  faqs:         faqsData,
  pricing:      pricingData,
  blog:         blogData,
  projects:     projectsData,
}

async function isAuthed(): Promise<boolean> {
  const token = cookies().get(SESSION_COOKIE)?.value
  return !!token && (await verifyToken(token))
}

export async function POST() {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN not set' }, { status: 500 })
  }

  const results: Record<string, string> = {}
  for (const [section, data] of Object.entries(SECTIONS)) {
    try {
      await writeBlobContent(section, data)
      results[section] = 'ok'
    } catch (err) {
      results[section] = String(err)
    }
  }

  return NextResponse.json({ seeded: results })
}

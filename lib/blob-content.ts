import { list, put } from '@vercel/blob'

/**
 * Read a content JSON from Vercel Blob.
 * Falls back to `fallback` if the blob doesn't exist or an error occurs.
 */
export async function readBlobContent<T>(section: string, fallback: T): Promise<T> {
  try {
    const { blobs } = await list({ prefix: `content/${section}.json` })
    if (!blobs.length) return fallback
    // Sort descending by uploadedAt so we always get the latest
    const latest = blobs.sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0]
    const res = await fetch(latest.url, { cache: 'no-store' })
    if (!res.ok) return fallback
    return (await res.json()) as T
  } catch {
    return fallback
  }
}

/**
 * Write a content JSON to Vercel Blob.
 * Uses a timestamp suffix so each save is a new blob (avoids delete permission issues).
 * Reads always pick the latest by uploadedAt.
 */
export async function writeBlobContent(section: string, data: unknown): Promise<void> {
  await put(
    `content/${section}.json`,
    JSON.stringify(data, null, 2),
    { access: 'public', contentType: 'application/json', addRandomSuffix: false }
  )
}

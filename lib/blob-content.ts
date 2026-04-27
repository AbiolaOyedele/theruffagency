import { list, put, del } from '@vercel/blob'

/**
 * Read a content JSON from Vercel Blob.
 * Falls back to `fallback` if the blob doesn't exist or an error occurs.
 */
export async function readBlobContent<T>(section: string, fallback: T): Promise<T> {
  try {
    const { blobs } = await list({ prefix: `content/${section}.json` })
    if (!blobs.length) return fallback
    const res = await fetch(blobs[0].url, { cache: 'no-store' })
    if (!res.ok) return fallback
    return (await res.json()) as T
  } catch {
    return fallback
  }
}

/**
 * Write (overwrite) a content JSON in Vercel Blob.
 * Deletes any existing blob with the same prefix first to avoid accumulation.
 */
export async function writeBlobContent(section: string, data: unknown): Promise<void> {
  const { blobs } = await list({ prefix: `content/${section}.json` })
  if (blobs.length) {
    await Promise.all(blobs.map((b) => del(b.url)))
  }
  await put(`content/${section}.json`, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
  })
}

import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const KEY = (section: string) => `cms:${section}`

export async function readRedisContent<T>(section: string, fallback: T): Promise<T> {
  try {
    const data = await redis.get<T>(KEY(section))
    if (data === null || data === undefined) return fallback
    return data
  } catch {
    return fallback
  }
}

export async function writeRedisContent(section: string, data: unknown): Promise<void> {
  await redis.set(KEY(section), data)
}

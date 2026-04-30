import fs from 'fs'
import path from 'path'
import { readRedisContent } from './redis-content'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const IS_REDIS = !!process.env.UPSTASH_REDIS_REST_URL

function readJSON<T>(file: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function read<T>(section: string, fallback: T): Promise<T> {
  if (IS_REDIS) {
    // Try Redis first; fall back to bundled read-only JSON if not yet saved
    const fromRedis = await readRedisContent<T | null>(section, null)
    if (fromRedis !== null) return fromRedis
    return readJSON(`${section}.json`, fallback)
  }
  return readJSON(`${section}.json`, fallback)
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type SiteStat = { value: number; suffix: string; label: string }
export type SiteSettings = {
  studioName: string
  tagline: string
  heroWord: string
  heroFontSize?: string
  heroDescription: string
  email: string
  phone: string
  twitter: string
  instagram: string
  stats: SiteStat[]
  maintenanceMode?: boolean
}

export type Service = {
  id: string
  slug: string
  name: string
  description: string
  tagline?: string
  fullDescription?: string
}
export type WorkflowStep = { number: string; title: string; description: string }
export type Testimonial = { id: number; name: string; role: string; avatar: string; rating: number; body: string }
export type FAQ = { id: number; question: string; answer: string }
export type BlogPost = { slug: string; title: string; category: string; date: string; image: string; excerpt: string }
export type PopularService = { name: string; price: string }
export type PricingTier = {
  name: string; price: string; period: string; features: string[]
  popular?: boolean; popularServices?: PopularService[]
}
export type Pricing = { subscription: PricingTier; project: PricingTier }
export type GalleryItem = { src: string; alt: string; aspect: '4/3' | '16/9' | '3/4' | '1/1' }
export type Project = {
  slug: string
  title: string
  description: string
  liveUrl?: string
  serviceSlug?: string
  categories: string[]
  cover: string
  gallery: GalleryItem[]
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: SiteSettings = {
  studioName: 'Ruff',
  tagline: 'Not just services — we deliver growth, clarity, and real impact.',
  heroWord: 'Studio',
  heroDescription: 'We partner with ambitious brands to build exceptional websites, drive results with SEO, and grow through smart digital marketing.',
  email: 'hello@ruff.studio',
  phone: '+1 (202) 555-0190',
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com',
  stats: [
    { value: 99, suffix: '+', label: 'Completed Projects' },
    { value: 5, suffix: '+', label: 'Years of Experience' },
    { value: 100, suffix: '%', label: 'Happy Clients' },
  ],
}

// ─── Getters (all async) ──────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings> { return read('settings', DEFAULT_SETTINGS) }
export async function getServices(): Promise<Service[]> { return read('services', []) }
export async function getWorkflow(): Promise<WorkflowStep[]> { return read('workflow', []) }
export async function getTestimonials(): Promise<Testimonial[]> { return read('testimonials', []) }
export async function getFAQs(): Promise<FAQ[]> { return read('faqs', []) }
export async function getPricing(): Promise<Pricing> { return read('pricing', {} as Pricing) }
export async function getBlogPosts(): Promise<BlogPost[]> { return read('blog', []) }
export async function getProjects(): Promise<Project[]> { return read('projects', []) }

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getServices()
  return services.find((s) => s.slug === slug)
}
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects()
  return projects.find((p) => p.slug === slug)
}
export async function getProjectsByService(serviceSlug: string): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter((p) => p.serviceSlug === serviceSlug)
}

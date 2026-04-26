import fs from 'fs'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function readJSON<T>(file: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

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

export function getSettings(): SiteSettings { return readJSON('settings.json', DEFAULT_SETTINGS) }
export function getServices(): Service[] { return readJSON('services.json', []) }
export function getServiceBySlug(slug: string): Service | undefined { return getServices().find((s) => s.slug === slug) }
export function getWorkflow(): WorkflowStep[] { return readJSON('workflow.json', []) }
export function getTestimonials(): Testimonial[] { return readJSON('testimonials.json', []) }
export function getFAQs(): FAQ[] { return readJSON('faqs.json', []) }
export function getPricing(): Pricing { return readJSON('pricing.json', {} as Pricing) }
export function getBlogPosts(): BlogPost[] { return readJSON('blog.json', []) }
export function getProjects(): Project[] { return readJSON('projects.json', []) }
export function getProjectBySlug(slug: string): Project | undefined { return getProjects().find((p) => p.slug === slug) }
export function getProjectsByService(serviceSlug: string): Project[] { return getProjects().filter((p) => p.serviceSlug === serviceSlug) }

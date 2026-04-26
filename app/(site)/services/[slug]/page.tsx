import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getServiceBySlug, getProjectsByService, getServices } from '@/lib/content'
import ProjectCard from '@/components/ui/ProjectCard'
import FooterCta from '@/components/sections/FooterCta'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const services = getServices()
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return { title: 'Service — Ruff Agency' }
  return {
    title: `${service.name} — Ruff Agency`,
    description: service.tagline ?? service.description,
  }
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const projects = getProjectsByService(params.slug)

  return (
    <main className="pt-32 pb-0">
      {/* Back link */}
      <div className="px-6 md:px-10 max-w-container mx-auto mb-8">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} /> All Services
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 pb-24 max-w-container mx-auto">
        <div className="mb-4">
          <span className="text-xs font-medium text-muted uppercase tracking-widest">Service</span>
        </div>
        <h1
          className="font-bold tracking-[-0.04em] leading-[0.9] text-ink mb-8"
          style={{ fontSize: 'clamp(40px, 12vw, 180px)' }}
        >
          {service.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20">
          <p className="text-lg md:text-xl leading-relaxed text-muted">
            {service.tagline ?? service.description}
          </p>
          {service.fullDescription && (
            <p className="text-base leading-relaxed text-muted">
              {service.fullDescription}
            </p>
          )}
        </div>

        {/* Projects for this service */}
        {projects.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-ink tracking-tight">
                Related Work
              </h2>
              <Link
                href="/projects"
                className="text-sm text-muted hover:text-ink transition-colors"
              >
                View all projects →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-card rounded-card p-12 text-center">
            <p className="text-muted text-base">No projects yet for this service.</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 mt-4 bg-ink text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-ink/80 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        )}
      </section>

      <FooterCta />
    </main>
  )
}

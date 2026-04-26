import type { Metadata } from 'next'
import { getProjects, getServices } from '@/lib/content'
import ProjectsGridFiltered from '@/components/sections/ProjectsGridFiltered'
import FooterCta from '@/components/sections/FooterCta'

export const metadata: Metadata = {
  title: 'Work — Ruff Agency',
  description: 'Our favourite collaborations — branding, websites, and digital experiences.',
}

export default function ProjectsPage() {
  const projects = getProjects()
  const services = getServices()

  return (
    <main className="pt-32 pb-0">
      {/* Hero */}
      <section className="px-6 md:px-10 pb-16 max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-16">
          <h1
            className="font-bold tracking-[-0.04em] leading-[0.9] text-ink flex-shrink-0"
            style={{ fontSize: 'clamp(72px, 20vw, 320px)' }}
          >
            Work
          </h1>
          <p className="text-base leading-relaxed text-muted max-w-md lg:mt-8 lg:self-center">
            This is the kind of work we live for —{' '}
            <strong className="text-ink">branding</strong>,{' '}
            <strong className="text-ink">websites</strong>, and{' '}
            <strong className="text-ink">digital experiences</strong> that don&apos;t just look
            great, but deliver real results. Scroll through a few of our favourite collaborations.
          </p>
        </div>

        <ProjectsGridFiltered projects={projects} services={services} />
      </section>

      <FooterCta />
    </main>
  )
}

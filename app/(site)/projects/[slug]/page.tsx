import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjects, getProjectBySlug } from '@/lib/content'
import ProjectHero from '@/components/sections/ProjectHero'
import ProjectGallery from '@/components/sections/ProjectGallery'
import FooterCta from '@/components/sections/FooterCta'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}
  return { title: `${project.title} — Ruff`, description: project.description }
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()
  return (
    <main>
      <ProjectHero project={project} />
      <ProjectGallery project={project} />
      <FooterCta />
    </main>
  )
}

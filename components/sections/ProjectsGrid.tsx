import { getProjects } from '@/lib/content'
import ProjectCard from '@/components/ui/ProjectCard'

export default async function ProjectsGrid() {
  const projects = await getProjects()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </div>
  )
}

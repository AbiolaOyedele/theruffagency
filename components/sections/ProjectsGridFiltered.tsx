'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/ui/ProjectCard'
import { cn } from '@/lib/utils'
import type { Project, Service } from '@/lib/content'

interface Props {
  projects: Project[]
  services: Service[]
}

export default function ProjectsGridFiltered({ projects, services }: Props) {
  const [active, setActive] = useState<string>('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.serviceSlug === active)

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActive('all')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            active === 'all'
              ? 'bg-ink text-white'
              : 'bg-card text-muted hover:text-ink hover:bg-ink/5'
          )}
        >
          All Work
        </button>
        {services.map((service) => (
          <button
            key={service.slug}
            onClick={() => setActive(service.slug)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              active === service.slug
                ? 'bg-ink text-white'
                : 'bg-card text-muted hover:text-ink hover:bg-ink/5'
            )}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-2 py-20 text-center"
          >
            <p className="text-muted text-base">No projects in this category yet.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

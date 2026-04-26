'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import CategoryChip from '@/components/ui/CategoryChip'
import type { Project } from '@/lib/data'
import { EASE_OUT_EXPO } from '@/lib/utils'

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="pt-32 pb-12 px-6 md:px-10 max-w-container mx-auto">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
        {/* Left: title + description */}
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO as never }}
            className="font-semibold text-ink tracking-tight leading-none"
            style={{ fontSize: 'clamp(56px, 8vw, 120px)' }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO as never, delay: 0.15 }}
            className="text-muted text-base leading-relaxed mt-6 max-w-sm"
          >
            {project.description}
          </motion.p>
        </div>

        {/* Right: live link + categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO as never, delay: 0.2 }}
          className="flex flex-col items-start lg:items-end gap-4 flex-shrink-0"
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:opacity-60 transition-opacity"
            >
              Live Project <ArrowUpRight size={16} />
            </a>
          )}
          <div className="flex flex-wrap gap-2">
            {project.categories.map((cat) => (
              <CategoryChip key={cat} label={cat} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

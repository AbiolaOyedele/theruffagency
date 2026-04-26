'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import CategoryChip from './CategoryChip'
import { usePreloader } from '@/hooks/usePreloader'
import { EASE_OUT_EXPO } from '@/lib/utils'
import type { Project } from '@/lib/content'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const router = useRouter()
  const { show, hide } = usePreloader()

  const handleClick = () => {
    show()
    setTimeout(() => { router.push(`/projects/${project.slug}`); setTimeout(() => hide(), 900) }, 600)
  }

  const visibleCats = project.categories.slice(0, 1)
  const overflow = project.categories.length - 1

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO as never, delay: (index % 2) * 0.12 }}
      whileHover={{ y: -6 }}
      onClick={handleClick}
      className="bg-card rounded-card p-6 cursor-pointer group shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden mb-5 bg-ink/5">
        <Image src={project.cover} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out" />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-ink tracking-tight">{project.title}</h3>
        <div className="flex items-center gap-2">
          {visibleCats.map((cat) => <CategoryChip key={cat} label={cat} />)}
          {overflow > 0 && <CategoryChip label={`+${overflow}`} />}
        </div>
      </div>
    </motion.div>
  )
}

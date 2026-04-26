'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/utils'
import type { Project } from '@/lib/data'

const ASPECT_CLASSES: Record<string, string> = {
  '16/9': 'aspect-video',
  '4/3':  'aspect-[4/3]',
  '3/4':  'aspect-[3/4]',
  '1/1':  'aspect-square',
}

function GalleryImage({ item, index }: { item: Project['gallery'][number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO as never, delay: index * 0.05 }}
      className={`relative ${ASPECT_CLASSES[item.aspect] ?? 'aspect-video'} rounded-card overflow-hidden bg-ink/5`}
    >
      <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          priority={index === 0}
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  )
}

export default function ProjectGallery({ project }: { project: Project }) {
  return (
    <section className="px-6 md:px-10 pb-24 max-w-container mx-auto flex flex-col gap-6 md:gap-8">
      {project.gallery.map((item, i) => (
        <GalleryImage key={i} item={item} index={i} />
      ))}
    </section>
  )
}

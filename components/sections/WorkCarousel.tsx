'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePreloader } from '@/hooks/usePreloader'
import { useRouter } from 'next/navigation'
import type { Project } from '@/lib/content'

export default function WorkCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )
  const router = useRouter()
  const { show, hide } = usePreloader()

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const handleClick = (slug: string) => {
    show()
    setTimeout(() => { router.push(`/projects/${slug}`); setTimeout(() => hide(), 900) }, 600)
  }

  return (
    <section className="py-8 overflow-hidden relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 md:gap-6">
          {projects.map((project) => (
            <div key={project.slug} className="flex-[0_0_82%] sm:flex-[0_0_70%] md:flex-[0_0_60%] lg:flex-[0_0_45%] min-w-0">
              <div className="relative aspect-[16/10] rounded-card overflow-hidden cursor-pointer group bg-ink/5" onClick={() => handleClick(project.slug)}>
                <Image src={project.cover} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300">
                  <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-semibold text-lg">Our Work</p>
                    <p className="text-white/80 text-sm">Click to see more</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 px-1">
                <h3 className="font-semibold text-ink text-xl">{project.title}</h3>
                <p className="text-muted text-sm mt-1">{project.categories.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-8">
        <button onClick={scrollPrev} className="w-12 h-12 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-colors" aria-label="Previous project">
          <ChevronLeft size={20} />
        </button>
        <button onClick={scrollNext} className="w-12 h-12 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-colors" aria-label="Next project">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}

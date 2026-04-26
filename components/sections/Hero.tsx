'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePreloader } from '@/hooks/usePreloader'
import StatCounter from '@/components/ui/StatCounter'
import { EASE_OUT_EXPO } from '@/lib/utils'
import type { SiteSettings } from '@/lib/content'

export default function Hero({ settings }: { settings: SiteSettings }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLHeadingElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const reduced = useReducedMotion()
  const { isVisible: preloaderVisible } = usePreloader()

  const lines = settings.heroWord.split('\n').filter(Boolean)

  // Fit each line to fill the full container width
  useEffect(() => {
    const fitLines = () => {
      const container = containerRef.current
      if (!container) return
      const containerWidth = container.offsetWidth

      lineRefs.current.forEach((lineEl) => {
        if (!lineEl) return
        // Reset to reference size, measure, then scale to fill container
        lineEl.style.fontSize = '100px'
        const naturalWidth = lineEl.scrollWidth
        if (!naturalWidth) return
        lineEl.style.fontSize = `${(containerWidth / naturalWidth) * 100}px`
      })
    }

    fitLines()
    const ro = new ResizeObserver(fitLines)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.heroWord])

  // GSAP letter animation
  useEffect(() => {
    if (preloaderVisible) return
    const el = wordRef.current
    if (!el) return
    const letters = el.querySelectorAll<HTMLSpanElement>('.letter')
    if (reduced) {
      gsap.set(letters, { yPercent: 0, opacity: 1 })
      return
    }
    gsap.fromTo(
      letters,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 1.2,
        ease: `cubic-bezier(${EASE_OUT_EXPO.join(',')})`,
        delay: 0.2,
      }
    )
  }, [preloaderVisible, reduced])

  return (
    <section className="min-h-screen flex flex-col justify-end pb-20 pt-32 px-6 md:px-10">
      <div ref={containerRef} className="max-w-container mx-auto w-full">
        {/* Hero word — each line auto-fits to fill container width */}
        <h1
          ref={wordRef}
          className="font-semibold tracking-[-0.04em] leading-[0.9] text-ink mb-12"
        >
          {lines.map((line, li) => (
            <div
              key={li}
              ref={(el) => { lineRefs.current[li] = el }}
              className="overflow-hidden whitespace-nowrap"
              style={{ fontSize: '10vw' }}
            >
              {line.split('').map((letter, i) => (
                <span
                  key={i}
                  className={
                    letter === ' '
                      ? 'letter inline-block w-[0.28em]'
                      : 'letter inline-block'
                  }
                  style={{ opacity: reduced ? 1 : 0 }}
                >
                  {letter === ' ' ? ' ' : letter}
                </span>
              ))}
            </div>
          ))}
        </h1>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 items-start">
          {settings.stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
          <div className="md:col-span-1">
            <p
              className="text-base leading-relaxed text-muted"
              dangerouslySetInnerHTML={{
                __html: settings.heroDescription.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-ink font-semibold">$1</strong>'
                ),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

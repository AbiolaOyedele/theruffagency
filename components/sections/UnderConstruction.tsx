'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/utils'

const HEADING = "Yeah, waiting\nfor the Devs\ntoo..."

export default function UnderConstruction() {
  const wordRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
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
  }, [reduced])

  const lines = HEADING.split('\n')

  return (
    <main className="min-h-screen bg-bg flex items-center md:px-16 lg:px-24">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-0 py-24 md:py-0">

        {/* Left — copy */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-0">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-8">
            — Under Construction
          </span>

          <h1
            ref={wordRef}
            className="text-ink leading-[0.92] tracking-[-0.03em] mb-8"
            style={{ fontFamily: "'Valizas', sans-serif", fontWeight: 700, fontSize: 'clamp(44px, 6.5vw, 96px)' }}
          >
            {lines.map((line, li) => (
              <div key={li} className="overflow-hidden">
                {line.split('').map((letter, i) => (
                  <span
                    key={i}
                    className={letter === ' ' ? 'letter inline-block w-[0.28em]' : 'letter inline-block'}
                    style={{ opacity: reduced ? 1 : 0 }}
                  >
                    {letter === ' ' ? ' ' : letter}
                  </span>
                ))}
              </div>
            ))}
          </h1>

          <p className="text-muted text-lg md:text-xl leading-relaxed max-w-sm">
            You should probably check back later.
          </p>
        </div>

        {/* Right — illustration */}
        <div className="flex-1 flex items-center justify-center md:justify-end">
          <div className="w-full md:max-w-none md:w-[120%]">
            <Image
              src="/reading.svg"
              alt="Person reading"
              width={600}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

      </div>
    </main>
  )
}

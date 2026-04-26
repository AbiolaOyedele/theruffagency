'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  light?: boolean
}

export default function StatCounter({ value, suffix = '', prefix = '', label, light = false }: StatCounterProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          observer.disconnect()

          if (reduced) {
            setDisplay(value)
            return
          }

          const duration = 1800
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(ease * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, reduced])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <p
        className={`font-semibold leading-none tracking-tight tabular-nums ${light ? 'text-white' : 'text-ink'}`}
        style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
      >
        {prefix}{display}{suffix}
      </p>
      <p className={`text-sm font-medium ${light ? 'text-white/60' : 'text-muted'}`}>{label}</p>
    </div>
  )
}

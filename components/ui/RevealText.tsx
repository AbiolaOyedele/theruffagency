'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface RevealTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  as?: keyof JSX.IntrinsicElements
}

export default function RevealText({ text, className = '', style, as: Tag = 'p' }: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll<HTMLSpanElement>('.word')

    if (reduced) {
      words.forEach((w) => { w.style.color = '#0E0E0E' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { color: 'rgba(14,14,14,0.15)' },
        {
          color: '#0E0E0E',
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [reduced])

  const wordList = text.split(' ')

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} style={style}>
      {wordList.map((word, i) => (
        <span key={i} className="word inline-block mr-[0.25em]" style={{ color: 'rgba(14,14,14,0.15)' }}>
          {word}
        </span>
      ))}
    </Tag>
  )
}

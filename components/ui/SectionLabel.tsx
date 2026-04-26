'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/utils'

interface SectionLabelProps {
  label: string
  light?: boolean
  className?: string
}

export default function SectionLabel({ label, light = false, className = '' }: SectionLabelProps) {
  const reduced = useReducedMotion()

  return (
    <motion.p
      initial={reduced ? false : { x: -10, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO as never }}
      className={`text-sm font-medium tracking-wide mb-6 ${
        light ? 'text-white/50' : 'text-muted'
      } ${className}`}
    >
      [{label}]
    </motion.p>
  )
}

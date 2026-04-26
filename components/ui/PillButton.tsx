'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PillButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'dark' | 'light' | 'outline'
  className?: string
}

export default function PillButton({
  href,
  onClick,
  children,
  variant = 'dark',
  className,
}: PillButtonProps) {
  const base = cn(
    'relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-opacity',
    {
      'bg-ink text-white hover:opacity-80': variant === 'dark',
      'bg-white text-ink hover:opacity-80': variant === 'light',
      'border border-ink/20 text-ink hover:bg-ink hover:text-white': variant === 'outline',
    },
    className
  )

  const inner = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} className={base}>
        {inner}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={base}>
      {inner}
    </button>
  )
}

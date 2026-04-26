'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/utils'

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={reduced ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO as never }}
      className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 md:px-10"
    >
      <motion.div
        animate={{
          height: scrolled ? 56 : 64,
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(244,244,244,0.88)' : 'transparent',
          borderRadius: scrolled ? '999px' : '0px',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-container mx-auto flex items-center justify-center md:justify-between px-6 border border-transparent"
        style={{ borderColor: scrolled ? 'rgba(14,14,14,0.08)' : 'transparent' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-70 transition-opacity">
          <Image src="/ruff-logo.svg" alt="Ruff" width={52} height={30} className="h-7 w-auto" />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink/70 hover:text-ink transition-colors px-3 py-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/#contact"
          className="hidden md:flex items-center gap-2 bg-ink text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-ink/80 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
          Get in Touch
        </Link>
      </motion.div>
    </motion.header>
  )
}

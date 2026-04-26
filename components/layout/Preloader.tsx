'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { usePreloader } from '@/hooks/usePreloader'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Preloader() {
  const { isVisible, hide } = usePreloader()
  const pathname = usePathname()
  const reduced = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => hide(), reduced ? 400 : 1800)
    return () => clearTimeout(timer)
  }, [pathname, hide, reduced])

  if (reduced) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0E0E0E]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image src="/ruff-logo.svg" alt="Ruff" width={100} height={56} className="invert" />
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0E0E0E]"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [1, 1, 0] }}
            transition={{ duration: 1.6, times: [0, 0.6, 1], ease: 'easeInOut' }}
          >
            <Image src="/ruff-logo.svg" alt="Ruff" width={120} height={68} className="invert" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

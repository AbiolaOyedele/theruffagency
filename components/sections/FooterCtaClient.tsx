'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/lib/utils'

export default function FooterCtaClient() {
  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-10 bg-bg">
      <div className="max-w-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO as never }}
        >
          <h2 className="font-semibold tracking-tight leading-[1.0] text-ink" style={{ fontSize: 'clamp(28px, 8vw, 112px)' }}>
            Your brand deserves better.
          </h2>
          <h2 className="font-semibold tracking-tight leading-[1.0] text-muted" style={{ fontSize: 'clamp(28px, 8vw, 112px)' }}>
            Let&apos;s build it right.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO as never, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <a href="mailto:hello@ruff.studio" className="inline-flex items-center gap-3 bg-ink text-white px-8 py-4 rounded-full font-medium hover:bg-ink/80 transition-colors">
            <span className="w-2 h-2 rounded-full bg-white" />
            Start a Project
            <ArrowRight size={16} />
          </a>
          <a href="/#pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium border border-ink/15 text-ink hover:bg-ink hover:text-white transition-colors">
            View Pricing
          </a>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealText from '@/components/ui/RevealText'
import { EASE_OUT_EXPO } from '@/lib/utils'
import type { WorkflowStep } from '@/lib/content'

export default function Workflow({ steps }: { steps: WorkflowStep[] }) {
  return (
    <section id="workflow" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="lg:sticky lg:top-40 self-start">
            <SectionLabel label="03 Workflow" />
            <RevealText
              text="No guesswork, just a clear path from ideas to results."
              className="font-semibold tracking-tight leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
              as="h2"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO as never, delay: 0.2 }}
              className="bg-darkCard rounded-card p-8 mt-10 relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-6 text-[96px] opacity-10 select-none">😊</div>
              <p className="text-white/50 text-xs font-medium mb-2">[ Let&apos;s Talk ]</p>
              <h3 className="text-white font-semibold text-xl mb-4">Ready to start your project?</h3>
              <a href="/#contact" className="inline-flex items-center gap-2 bg-white text-ink text-sm font-medium py-3 px-6 rounded-full hover:bg-white/90 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-ink inline-block" />
                Get in Touch
              </a>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO as never, delay: i * 0.1 }}
                className="bg-card rounded-card p-8 md:p-10"
              >
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-bold text-ink/10 leading-none flex-shrink-0">{step.number}</span>
                  <div>
                    <h3 className="font-semibold text-ink text-xl mb-2">{step.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

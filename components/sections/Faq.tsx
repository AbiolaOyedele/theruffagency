'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealText from '@/components/ui/RevealText'
import { EASE_OUT_EXPO } from '@/lib/utils'
import type { FAQ } from '@/lib/content'

function AccordionItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO as never }}
      className="bg-card rounded-card overflow-hidden shadow-sm"
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between p-6 md:p-8 text-left" aria-expanded={isOpen}>
        <span className="font-semibold text-ink pr-6">{faq.question}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <Plus size={20} className="text-ink" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null)

  return (
    <section id="faq" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="lg:sticky lg:top-40 self-start">
            <SectionLabel label="07 FAQ" />
            <RevealText text="Smarter decisions start with clear answers." className="font-semibold tracking-tight leading-[1.05]" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }} as="h2" />
            <p className="text-muted text-sm mt-6 max-w-sm">Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll get back to you within 24 hours.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-ink hover:underline">Ask us directly →</a>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} faq={faq} isOpen={openId === faq.id} onToggle={() => setOpenId(openId === faq.id ? null : faq.id)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

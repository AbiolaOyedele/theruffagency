'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealText from '@/components/ui/RevealText'
import PillButton from '@/components/ui/PillButton'
import { EASE_OUT_EXPO } from '@/lib/utils'
import type { Service } from '@/lib/content'

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-container mx-auto">
        <SectionLabel label="01 Services" />
        <RevealText
          text="Not just services — we deliver growth, clarity, and real impact."
          className="font-semibold tracking-tight leading-[1.05] mb-16"
          style={{ fontSize: 'clamp(26px, 6vw, 88px)' }}
          as="h2"
        />

        <div className="flex flex-col gap-3">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO as never, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link
                href={`/services/${service.slug}`}
                className="bg-card rounded-card p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="md:w-64 flex-shrink-0">
                  <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <h3 className="font-semibold text-ink tracking-tight" style={{ fontSize: 'clamp(20px, 3vw, 44px)' }}>
                    {service.name}
                  </h3>
                  <ArrowRight size={24} className="text-muted group-hover:text-ink group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO as never, delay: services.length * 0.08 }}
            className="bg-darkCard rounded-card p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-white font-semibold text-2xl md:text-3xl">Ready to Start?</h3>
              <p className="text-white/50 mt-1 text-sm">Let&apos;s build something remarkable together.</p>
            </div>
            <PillButton href="/#contact" variant="light">
              Get in Touch <ArrowRight size={16} />
            </PillButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

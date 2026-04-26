'use client'

import { motion } from 'framer-motion'
import { Check, Star, ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealText from '@/components/ui/RevealText'
import PillButton from '@/components/ui/PillButton'
import { EASE_OUT_EXPO } from '@/lib/utils'
import type { Pricing as PricingData } from '@/lib/content'

export default function Pricing({ pricing }: { pricing: PricingData }) {
  const { subscription, project } = pricing
  return (
    <section id="pricing" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-container mx-auto">
        <SectionLabel label="06 Pricing" />
        <RevealText text="Flexible plans. Serious impact. We are here for you." className="font-semibold tracking-tight leading-[1.05] mb-4" style={{ fontSize: 'clamp(26px, 6vw, 88px)' }} as="h2" />
        <p className="text-muted text-sm mb-12">All plans include a free 30-minute discovery call. No hidden fees.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO as never }} whileHover={{ y: -2 }}
            className="bg-card rounded-card p-8 md:p-10 flex flex-col border border-transparent hover:border-ink/10 transition-colors shadow-sm"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-ink/5 text-muted self-start mb-4">What&apos;s Included</span>
            <h3 className="text-2xl font-semibold text-ink">{subscription.name}</h3>
            <div className="mt-2 mb-6">
              <span className="text-4xl font-bold text-ink">{subscription.price}</span>
              <span className="text-muted text-sm ml-1">{subscription.period}</span>
            </div>
            <ul className="flex flex-col gap-3 flex-1">
              {subscription.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check size={16} className="text-ink flex-shrink-0" />
                  <span className="text-muted">{f}</span>
                </li>
              ))}
            </ul>
            <PillButton href="/#contact" variant="dark" className="w-full justify-center mt-8">Get Started</PillButton>
          </motion.div>

          {/* Per Project */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO as never, delay: 0.1 }} whileHover={{ y: -2 }}
            className="bg-card rounded-card p-8 md:p-10 flex flex-col border border-transparent hover:border-ink/10 transition-colors shadow-sm relative"
          >
            {project.popular && (
              <div className="absolute top-6 right-6 flex items-center gap-1 bg-ink text-white text-xs font-medium px-3 py-1.5 rounded-full">
                <Star size={10} className="fill-white" /> Popular Choice
              </div>
            )}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-ink/5 text-muted self-start mb-4">What&apos;s Included</span>
            <h3 className="text-2xl font-semibold text-ink">{project.name}</h3>
            <div className="mt-2 mb-6">
              <span className="text-4xl font-bold text-ink">{project.price}</span>
              {project.period && <span className="text-muted text-sm ml-1">{project.period}</span>}
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-x-6 gap-y-4 flex-1">
              <ul className="flex flex-col gap-3">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-ink flex-shrink-0" />
                    <span className="text-muted">{f}</span>
                  </li>
                ))}
              </ul>
              {project.popularServices && (
                <div>
                  <p className="text-xs font-medium text-muted mb-3">Popular Services</p>
                  <ul className="flex flex-col gap-2">
                    {project.popularServices.map((s) => (
                      <li key={s.name} className="flex items-center justify-between text-sm">
                        <span className="text-ink font-medium">{s.name}</span>
                        <span className="text-muted">{s.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <PillButton href="/#contact" variant="dark" className="w-full justify-center mt-8">
              Get Started <ArrowRight size={16} />
            </PillButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

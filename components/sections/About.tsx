'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import LogoMarquee from '@/components/ui/LogoMarquee'
import { EASE_OUT_EXPO } from '@/lib/utils'

const awards = [
  { title: 'CSS Design Awards', year: '2025', body: 'Website of the Year' },
  { title: 'Awwwards', year: '2024', body: 'Site of the Day' },
  { title: 'Awwwards', year: '2024', body: 'Honorable Mention' },
  { title: 'Behance', year: '2023', body: 'Featured Gallery' },
  { title: 'FWA', year: '2023', body: 'FWA of the Day' },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-container mx-auto">
        {/* Dark card wrapper */}
        <div className="bg-darkCard rounded-xl2 p-8 md:p-12 text-white">
          <SectionLabel label="04 About" light />

          {/* Team photo placeholder */}
          <div className="relative w-full aspect-[16/7] rounded-card overflow-hidden bg-white/5 mb-10">
            <Image
              src="/images/team-photo.jpg"
              alt="Ruff Team"
              fill
              className="object-cover grayscale opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 font-semibold text-xl">Team Photo</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { value: '80+', label: 'Projects Delivered' },
              { value: '5+', label: 'Years of Experience' },
              { value: '99%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-bold text-white leading-none tracking-tight"
                  style={{ fontSize: 'clamp(22px, 5vw, 56px)' }}
                >
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/60 leading-relaxed max-w-2xl text-base mb-10">
            We&apos;re a tight-knit team of{' '}
            <strong className="text-white">designers</strong>,{' '}
            <strong className="text-white">developers</strong>, and{' '}
            <strong className="text-white">strategists</strong> who believe great work comes from
            deep collaboration. We move fast, care deeply, and never stop until the work is
            something we&apos;re all proud of.
          </p>

          {/* Team member */}
          <div className="mb-4">
            <p className="text-white/50 text-xs font-medium mb-4">[ Our Team ]</p>
            <div className="flex items-center gap-4 p-6 bg-white/5 rounded-card">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                <Image
                  src="/images/avatar-team.jpg"
                  alt="John Lascose"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div>
                <p className="text-white font-semibold">John Lascose</p>
                <p className="text-white/50 text-sm">Creative Director</p>
              </div>
            </div>
          </div>

          {/* Logo marquee */}
          <LogoMarquee />

          {/* Awards */}
          <div>
            <p className="text-white/50 text-xs font-medium mb-6">[ Awards and Recognition ]</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO as never, delay: i * 0.08 }}
                  className="bg-white/5 rounded-card p-6 hover:bg-white/10 transition-colors"
                >
                  <p className="text-white font-semibold text-base">{award.title}</p>
                  <p className="text-white/40 text-xs mt-1">{award.body} · {award.year}</p>
                </motion.div>
              ))}
              {/* CTA cell */}
              <motion.a
                href="/#contact"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO as never, delay: awards.length * 0.08 }}
                className="bg-white rounded-card p-6 flex flex-col justify-between hover:bg-white/90 transition-colors"
              >
                <span className="text-ink font-semibold text-base">Start a Project</span>
                <span className="text-ink/60 text-xs mt-2">Get in Touch →</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

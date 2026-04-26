'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealText from '@/components/ui/RevealText'
import { EASE_OUT_EXPO } from '@/lib/utils'

const chips = [
  { label: '+200 Countries', rotate: -8 },
  { label: '+240k Likes', rotate: 10 },
  { label: '99% Retention', rotate: -5 },
  { label: 'Top 1% Agency', rotate: 7 },
]

function PhoneMockupCard() {
  const bubbles = [
    { text: "Love the new brand identity! 🔥", delay: 0.4, self: false },
    { text: "The website conversion is up 40%", delay: 1.0, self: true },
    { text: "When can we start the next project?", delay: 1.6, self: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO as never }}
      className="bg-card rounded-card p-8 md:p-10 row-span-2 flex flex-col justify-between shadow-sm"
    >
      <div>
        <p className="text-xs font-medium text-muted mb-4">[ Client Chat ]</p>
        <h3 className="text-2xl font-semibold text-ink tracking-tight">What clients are saying</h3>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: bubble.delay, duration: 0.5 }}
            className={`flex ${bubble.self ? 'justify-end' : 'justify-start'}`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-2xl text-sm font-medium max-w-[80%] ${
                bubble.self
                  ? 'bg-ink text-white rounded-br-sm'
                  : 'bg-subtle text-ink rounded-bl-sm'
              }`}
            >
              {bubble.text}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-ink/10" />
          <div>
            <p className="text-sm font-semibold text-ink">Alex Chen</p>
            <p className="text-xs text-muted">CEO, Momentum</p>
          </div>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            className="ml-auto text-green-500 text-xs font-medium"
          >
            ● Online
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

function ConversionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO as never, delay: 0.1 }}
      className="bg-ink rounded-card p-8 shadow-sm overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              top: `${-10 + i * 8}%`,
              right: `${-5 + i * 3}%`,
              opacity: 0.3 - i * 0.04,
            }}
          />
        ))}
      </div>
      <p className="text-white/50 text-xs font-medium mb-3 relative z-10">[ Outcome ]</p>
      <h3 className="text-white font-semibold text-2xl relative z-10">Higher Conversion Rates</h3>
      <p className="text-white/60 text-sm mt-2 relative z-10">
        Our clients see an average 32% increase in conversions within 90 days.
      </p>
      <div className="mt-6 relative z-10">
        <span className="text-white font-bold" style={{ fontSize: 'clamp(40px, 6vw, 60px)' }}>+32%</span>
        <span className="text-white/50 text-sm ml-2">avg. conversion lift</span>
      </div>
    </motion.div>
  )
}

function SalesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO as never, delay: 0.2 }}
      className="bg-card rounded-card p-8 shadow-sm"
    >
      <p className="text-muted text-xs font-medium mb-3">[ Growth ]</p>
      <h3 className="text-ink font-semibold text-2xl">Increased Sales</h3>
      <p className="text-muted text-sm mt-2">Revenue-first design and strategy.</p>
      <div className="mt-6 flex items-end gap-2">
        {[3, 5, 4, 7, 6, 9, 8].map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
            className="flex-1 bg-ink rounded-t-sm origin-bottom"
            style={{ height: `${h * 6}px` }}
          />
        ))}
      </div>
      <div className="mt-4 inline-flex items-center gap-2 bg-ink/5 rounded-full px-4 py-2">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs font-medium text-ink">3-week results</span>
      </div>
    </motion.div>
  )
}

function PresenceCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5])
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO as never, delay: 0.3 }}
      style={{ rotateX, rotateY, perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-card rounded-card p-8 shadow-sm relative overflow-hidden"
    >
      <p className="text-muted text-xs font-medium mb-3">[ Presence ]</p>
      <h3 className="text-ink font-semibold text-2xl">Stronger Online Presence</h3>
      <p className="text-muted text-sm mt-2">Rank higher, reach wider, convert better.</p>

      <div className="mt-6 relative h-24">
        {chips.map((chip, i) => (
          <motion.span
            key={chip.label}
            className="absolute inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-ink text-white"
            style={{
              rotate: chip.rotate,
              top: `${[0, 30, 55, 15][i]}%`,
              left: `${[0, 35, 10, 60][i]}%`,
            }}
            whileHover={{ scale: 1.1, rotate: 0 }}
          >
            {chip.label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-container mx-auto">
        <SectionLabel label="02 Features" />

        <RevealText
          text="You'll get more than just great design — you'll get results."
          className="font-semibold tracking-tight leading-[1.05] mb-16"
          style={{ fontSize: 'clamp(26px, 6vw, 88px)' }}
          as="h2"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhoneMockupCard />
          <div className="flex flex-col gap-4">
            <ConversionCard />
            <SalesCard />
          </div>
          <PresenceCard />
        </div>
      </div>
    </section>
  )
}

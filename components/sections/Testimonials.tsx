import Image from 'next/image'
import { Star } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Marquee from '@/components/ui/Marquee'
import type { Testimonial } from '@/lib/content'

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-card rounded-card p-6 md:p-8 w-80 md:w-96 flex-shrink-0 mx-3 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-ink/10 flex-shrink-0">
            <Image src={t.avatar} alt={t.name} fill className="object-cover grayscale" />
          </div>
          <div>
            <p className="font-semibold text-ink text-sm">{t.name}</p>
            <p className="text-muted text-xs">{t.role}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={12} className="text-ink fill-ink" />
          ))}
        </div>
      </div>
      <p className="text-muted text-sm leading-relaxed">&ldquo;{t.body}&rdquo;</p>
    </div>
  )
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2))
  const row2 = testimonials.slice(Math.ceil(testimonials.length / 2))

  return (
    <section id="testimonials" className="py-24 md:py-40 overflow-hidden">
      <div className="px-6 md:px-10 max-w-container mx-auto mb-10">
        <SectionLabel label="05 Testimonials" />
        <h2 className="font-semibold tracking-tight leading-[1.05] text-ink" style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}>
          What our clients say
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <Marquee duration={40}>{row1.map((t) => <TestimonialCard key={t.id} t={t} />)}</Marquee>
        {row2.length > 0 && <Marquee duration={36} reverse>{row2.map((t) => <TestimonialCard key={t.id} t={t} />)}</Marquee>}
      </div>
    </section>
  )
}

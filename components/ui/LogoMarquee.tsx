const logos = [
  'Boltshift',
  'Refractional',
  'Ikigai Labs',
  'Eightball',
  'Clandestine',
  'Northwave',
  'Luminary',
  'Vestige',
  'Parity Co.',
  'Driftmark',
]

export default function LogoMarquee() {
  return (
    <div className="logo-marquee-wrapper overflow-hidden py-6 border-y border-white/10 my-10">
      <div className="animate-logo-marquee flex w-max gap-12 items-center">
        {[...logos, ...logos].map((logo, i) => (
          <span
            key={i}
            className="text-white/40 font-semibold text-base tracking-wide whitespace-nowrap hover:text-white/70 transition-colors cursor-default"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  )
}

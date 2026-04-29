import Image from 'next/image'

export default function UnderConstruction() {
  return (
    <main className="min-h-screen bg-bg flex items-center px-6 md:px-16 lg:px-24">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-0 py-24 md:py-0">

        {/* Left — copy */}
        <div className="flex-1 flex flex-col justify-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-8">
            — Under Construction
          </span>

          <h1
            className="text-ink leading-[0.92] tracking-[-0.03em] mb-8"
            style={{ fontFamily: "'Valizas', sans-serif", fontWeight: 700, fontSize: 'clamp(44px, 6.5vw, 96px)' }}
          >
            Yeah, waiting<br />for the Devs<br />too...
          </h1>

          <p className="text-muted text-lg md:text-xl leading-relaxed max-w-sm">
            You should probably check back later.
          </p>
        </div>

        {/* Right — illustration */}
        <div className="flex-1 flex items-center justify-center md:justify-end">
          <div className="w-full max-w-[480px] md:max-w-none md:w-[55%]">
            <Image
              src="/reading.svg"
              alt="Person reading"
              width={600}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

      </div>
    </main>
  )
}

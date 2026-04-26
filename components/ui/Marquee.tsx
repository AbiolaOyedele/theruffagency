import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: React.ReactNode
  duration?: number
  reverse?: boolean
  className?: string
}

export default function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn('marquee-wrapper overflow-hidden', className)}
    >
      <div
        className={cn(
          'flex w-max',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
        style={{ '--duration': `${duration}s` } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

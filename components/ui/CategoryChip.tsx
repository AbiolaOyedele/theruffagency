import { cn } from '@/lib/utils'

interface CategoryChipProps {
  label: string
  dark?: boolean
  className?: string
}

export default function CategoryChip({ label, dark = false, className }: CategoryChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium',
        dark
          ? 'bg-white/10 text-white'
          : 'bg-ink/8 text-ink/70',
        className
      )}
      style={!dark ? { backgroundColor: 'rgba(14,14,14,0.07)' } : undefined}
    >
      {label}
    </span>
  )
}

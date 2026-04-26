import Link from 'next/link'
import Image from 'next/image'
import type { SiteSettings } from '@/lib/content'

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
]

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-ink text-white px-6 md:px-10 py-12">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <nav className="flex flex-wrap gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm text-white/60 hover:text-white transition-colors px-2 py-1">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-1">
            <Link href={settings.twitter} className="text-sm text-white/60 hover:text-white transition-colors px-2 py-1" target="_blank" rel="noopener noreferrer">Twitter</Link>
            <Link href={settings.instagram} className="text-sm text-white/60 hover:text-white transition-colors px-2 py-1" target="_blank" rel="noopener noreferrer">Instagram</Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8">
          <div className="flex items-center gap-3">
            <Image src="/ruff-logo.svg" alt={settings.studioName} width={48} height={27} className="invert" />
            <span className="text-white/40 text-sm">© 2025 {settings.studioName}. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-white/50 hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-white/50">
            <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
            <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

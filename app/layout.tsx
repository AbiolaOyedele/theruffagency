import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getSettings } from '@/lib/content'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const s = getSettings()
  return {
    title: `${s.studioName} — Brand & Digital Agency`,
    description: s.tagline,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}

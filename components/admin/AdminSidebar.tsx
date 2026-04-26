'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Settings, Briefcase, GitBranch,
  MessageSquare, HelpCircle, CreditCard, BookOpen, FolderOpen, LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Dashboard',    href: '/admin/dashboard',     icon: LayoutDashboard },
  { label: 'Settings',     href: '/admin/settings',      icon: Settings },
  { label: 'Services',     href: '/admin/services',      icon: Briefcase },
  { label: 'Workflow',     href: '/admin/workflow',      icon: GitBranch },
  { label: 'Testimonials', href: '/admin/testimonials',  icon: MessageSquare },
  { label: 'FAQs',         href: '/admin/faqs',          icon: HelpCircle },
  { label: 'Pricing',      href: '/admin/pricing',       icon: CreditCard },
  { label: 'Blog',         href: '/admin/blog',          icon: BookOpen },
  { label: 'Projects',     href: '/admin/projects',      icon: FolderOpen },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-60 min-h-screen bg-[#0E0E0E] flex flex-col border-r border-white/8 flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image src="/ruff-logo.svg" alt="Ruff" width={48} height={27} className="invert" />
          <span className="text-white/40 text-xs font-medium">CMS</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout + view site */}
      <div className="px-3 pb-6 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="text-xs">↗</span>
          View Site
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

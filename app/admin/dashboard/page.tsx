import Link from 'next/link'
import {
  Settings, Briefcase, GitBranch, MessageSquare,
  HelpCircle, CreditCard, BookOpen, FolderOpen, ExternalLink,
} from 'lucide-react'
import { getSettings } from '@/lib/content'

const sections = [
  { label: 'Settings',     href: '/admin/settings',     icon: Settings,      desc: 'Studio name, contact, stats' },
  { label: 'Services',     href: '/admin/services',     icon: Briefcase,     desc: '4 service cards' },
  { label: 'Workflow',     href: '/admin/workflow',     icon: GitBranch,     desc: 'Discovery → Launch steps' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare, desc: 'Client reviews & ratings' },
  { label: 'FAQs',         href: '/admin/faqs',         icon: HelpCircle,    desc: 'Accordion Q&A' },
  { label: 'Pricing',      href: '/admin/pricing',      icon: CreditCard,    desc: 'Subscription & per-project plans' },
  { label: 'Blog',         href: '/admin/blog',         icon: BookOpen,      desc: 'Blog posts & excerpts' },
  { label: 'Projects',     href: '/admin/projects',     icon: FolderOpen,    desc: 'Portfolio case studies' },
]

export default async function Dashboard() {
  const settings = await getSettings()

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-white/40 text-sm font-medium mb-1">Welcome back</p>
          <h1 className="text-white font-semibold text-3xl">{settings.studioName} CMS</h1>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/25 px-4 py-2 rounded-xl transition-colors"
        >
          <ExternalLink size={14} />
          View site
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sections.map(({ label, href, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 p-5 bg-white/4 border border-white/8 rounded-2xl hover:bg-white/8 hover:border-white/15 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center group-hover:bg-white/15 transition-colors">
              <Icon size={16} className="text-white/60" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{label}</p>
              <p className="text-white/40 text-xs mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick info */}
      <div className="mt-8 p-5 bg-white/3 border border-white/8 rounded-2xl">
        <p className="text-white/40 text-xs font-medium mb-3">Current site info</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-white/40 text-xs">Studio name</p>
            <p className="text-white text-sm font-medium">{settings.studioName}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs">Email</p>
            <p className="text-white text-sm font-medium">{settings.email}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs">Phone</p>
            <p className="text-white text-sm font-medium">{settings.phone}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs">Hero word</p>
            <p className="text-white text-sm font-medium">{settings.heroWord}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-medium text-muted mb-4">[404]</p>
        <h1 className="text-4xl font-semibold text-ink mb-4">Project not found</h1>
        <Link href="/projects" className="text-sm text-muted hover:text-ink transition-colors">
          ← Back to all projects
        </Link>
      </div>
    </main>
  )
}

import AdminEditor from '@/components/admin/AdminEditor'
import { getProjects, getServices } from '@/lib/content'
import type { SchemaDef } from '@/components/admin/AdminEditor'

export default async function ProjectsAdminPage() {
  const [services, projects] = await Promise.all([getServices(), getProjects()])
  const serviceOptions = ['', ...services.map((s) => s.slug)]

  const schema: SchemaDef = [
    { type: 'text',             key: 'slug',        label: 'URL Slug (e.g. my-project)' },
    { type: 'text',             key: 'title',       label: 'Project Title' },
    { type: 'textarea',         key: 'description', label: 'Short Description', rows: 3 },
    { type: 'url',              key: 'liveUrl',     label: 'Live URL (optional)' },
    { type: 'select',           key: 'serviceSlug', label: 'Service Category', options: serviceOptions },
    { type: 'array-of-strings', key: 'categories',  label: 'Display Tags' },
    { type: 'url',              key: 'cover',       label: 'Cover Image URL' },
    { type: 'gallery',          key: 'gallery',     label: 'Gallery Images' },
  ]

  return (
    <AdminEditor
      section="projects"
      title="Projects"
      description="Manage the portfolio projects grid and detail pages. Assign a Service Category to show the project on that service's page."
      listSchema={schema}
      newItemTemplate={{ slug: '', title: '', description: '', liveUrl: '', serviceSlug: '', categories: [], cover: '', gallery: [] }}
      initialData={projects}
    />
  )
}

import AdminEditor from '@/components/admin/AdminEditor'
import { getServices } from '@/lib/content'
import type { SchemaDef } from '@/components/admin/AdminEditor'

const schema: SchemaDef = [
  { type: 'text',     key: 'id',               label: 'Number (e.g. 01)' },
  { type: 'text',     key: 'slug',             label: 'URL Slug (e.g. brand-strategy)' },
  { type: 'text',     key: 'name',             label: 'Service Name' },
  { type: 'textarea', key: 'description',      label: 'Short Description (homepage card)', rows: 3 },
  { type: 'textarea', key: 'tagline',          label: 'Tagline (service page headline)', rows: 2 },
  { type: 'textarea', key: 'fullDescription',  label: 'Full Description (service page body)', rows: 5 },
]

export default async function ServicesPage() {
  return (
    <AdminEditor
      section="services"
      title="Services"
      description="Edit the service cards on the homepage and their individual service pages."
      listSchema={schema}
      newItemTemplate={{ id: '05', slug: '', name: '', description: '', tagline: '', fullDescription: '' }}
      initialData={await getServices()}
    />
  )
}

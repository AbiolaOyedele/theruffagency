import AdminEditor from '@/components/admin/AdminEditor'
import { getTestimonials } from '@/lib/content'
import type { SchemaDef } from '@/components/admin/AdminEditor'

const schema: SchemaDef = [
  { type: 'text',     key: 'name',   label: 'Client Name' },
  { type: 'text',     key: 'role',   label: 'Role & Company' },
  { type: 'url',      key: 'avatar', label: 'Avatar Image URL' },
  { type: 'number',   key: 'rating', label: 'Rating (1–5)' },
  { type: 'textarea', key: 'body',   label: 'Testimonial Text', rows: 5 },
]

export default async function TestimonialsPage() {
  return (
    <AdminEditor
      section="testimonials"
      title="Testimonials"
      description="Manage client reviews shown in the scrolling marquee."
      listSchema={schema}
      newItemTemplate={{ name: '', role: '', avatar: '', rating: 5, body: '' }}
      initialData={await getTestimonials()}
    />
  )
}

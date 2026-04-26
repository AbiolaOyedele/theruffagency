import AdminEditor from '@/components/admin/AdminEditor'
import { getBlogPosts } from '@/lib/content'
import type { SchemaDef } from '@/components/admin/AdminEditor'

const schema: SchemaDef = [
  { type: 'text',     key: 'slug',     label: 'URL Slug (e.g. my-post-title)' },
  { type: 'text',     key: 'title',    label: 'Post Title' },
  { type: 'text',     key: 'category', label: 'Category' },
  { type: 'text',     key: 'date',     label: 'Date (e.g. March 12, 2025)' },
  { type: 'url',      key: 'image',    label: 'Cover Image URL' },
  { type: 'textarea', key: 'excerpt',  label: 'Excerpt', rows: 3 },
]

export default function BlogPage() {
  return (
    <AdminEditor
      section="blog"
      title="Blog Posts"
      description="Manage posts shown in the [08 Blog] section."
      listSchema={schema}
      newItemTemplate={{ slug: '', title: '', category: '', date: '', image: '', excerpt: '' }}
      initialData={getBlogPosts()}
    />
  )
}

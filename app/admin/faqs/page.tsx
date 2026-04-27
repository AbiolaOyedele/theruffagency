import AdminEditor from '@/components/admin/AdminEditor'
import { getFAQs } from '@/lib/content'
import type { SchemaDef } from '@/components/admin/AdminEditor'

const schema: SchemaDef = [
  { type: 'text',     key: 'question', label: 'Question' },
  { type: 'textarea', key: 'answer',   label: 'Answer', rows: 4 },
]

export default async function FaqsPage() {
  return (
    <AdminEditor
      section="faqs"
      title="FAQs"
      description="Edit the accordion items in the [07 FAQ] section."
      listSchema={schema}
      newItemTemplate={{ question: '', answer: '' }}
      initialData={await getFAQs()}
    />
  )
}

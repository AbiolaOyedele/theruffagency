import AdminEditor from '@/components/admin/AdminEditor'
import { getWorkflow } from '@/lib/content'
import type { SchemaDef } from '@/components/admin/AdminEditor'

const schema: SchemaDef = [
  { type: 'text',     key: 'number',      label: 'Step Number (e.g. 01)' },
  { type: 'text',     key: 'title',       label: 'Step Title' },
  { type: 'textarea', key: 'description', label: 'Description', rows: 4 },
]

export default async function WorkflowPage() {
  return (
    <AdminEditor
      section="workflow"
      title="Workflow"
      description="Edit the [03 Workflow] discovery-to-launch steps."
      listSchema={schema}
      newItemTemplate={{ number: '05', title: '', description: '' }}
      initialData={await getWorkflow()}
    />
  )
}

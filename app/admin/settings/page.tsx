import AdminEditor from '@/components/admin/AdminEditor'
import { getSettings } from '@/lib/content'
import type { SchemaDef } from '@/components/admin/AdminEditor'

const schema: SchemaDef = [
  { type: 'text',     key: 'studioName',       label: 'Studio Name' },
  { type: 'textarea', key: 'heroWord',          label: 'Hero Display Word — one word/phrase per line', rows: 4 },
  { type: 'text',     key: 'heroFontSize',      label: 'Hero Font Size (CSS value, e.g. clamp(96px, 18vw, 280px))' },
  { type: 'textarea', key: 'tagline',           label: 'Tagline' },
  { type: 'textarea', key: 'heroDescription',   label: 'Hero description paragraph' },
  { type: 'text',     key: 'email',             label: 'Contact Email' },
  { type: 'text',     key: 'phone',             label: 'Phone Number' },
  { type: 'url',      key: 'twitter',           label: 'Twitter URL' },
  { type: 'url',      key: 'instagram',         label: 'Instagram URL' },
  { type: 'stats',    key: 'stats',             label: 'Hero Stats' },
]

export default function SettingsPage() {
  const data = getSettings()
  return (
    <AdminEditor
      section="settings"
      title="Settings"
      description="Global site settings — studio name, contact details, hero copy, and stats."
      schema={schema}
      initialData={data}
    />
  )
}

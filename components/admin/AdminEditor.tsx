'use client'

import { useState, useCallback, useRef } from 'react'
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Save, Check, Upload, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Upload helper ──────────────────────────────────────────── */

const IMAGE_KEYS = ['cover', 'image', 'avatar', 'photo', 'src', 'thumbnail', 'banner', 'poster']
const MEDIA_KEYS = [...IMAGE_KEYS, 'video', 'media', 'file']

function isMediaKey(key: string) {
  return MEDIA_KEYS.some((k) => key.toLowerCase().includes(k))
}

function UploadButton({ onUploaded }: { onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) onUploaded(data.url)
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-white/12 text-xs font-medium transition-all disabled:opacity-50 flex-shrink-0"
        title="Upload file"
      >
        {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
        {uploading ? 'Uploading…' : 'Upload'}
      </button>
    </>
  )
}

/* ─── Field descriptors ─────────────────────────────────────── */

export type FieldDef =
  | { type: 'text' | 'textarea' | 'url' | 'number'; key: string; label: string; rows?: number }
  | { type: 'array-of-strings'; key: string; label: string }
  | { type: 'stats'; key: string; label: string }
  | { type: 'gallery'; key: string; label: string }
  | { type: 'select'; key: string; label: string; options: string[] }

export type SchemaDef = FieldDef[]

/* ─── Primitive inputs ────────────────────────────────────────── */

function Field({
  def,
  value,
  onChange,
}: {
  def: FieldDef
  value: unknown
  onChange: (v: unknown) => void
}) {
  const base =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-white/30 transition-colors'

  if (def.type === 'textarea') {
    return (
      <textarea
        className={cn(base, 'resize-none')}
        rows={def.rows ?? 3}
        value={String(value ?? '')}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  if (def.type === 'number') {
    return (
      <input
        type="number"
        className={base}
        value={String(value ?? '')}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    )
  }

  if (def.type === 'select') {
    return (
      <select
        className={cn(base, 'cursor-pointer')}
        value={String(value ?? '')}
        onChange={(e) => onChange(e.target.value)}
      >
        {def.options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#1a1a1a]">{opt}</option>
        ))}
      </select>
    )
  }

  if (def.type === 'array-of-strings') {
    const arr = (Array.isArray(value) ? value : []) as string[]
    return (
      <div className="space-y-2">
        {arr.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={cn(base, 'flex-1')}
              value={item}
              onChange={(e) => {
                const next = [...arr]
                next[i] = e.target.value
                onChange(next)
              }}
            />
            <button
              type="button"
              onClick={() => onChange(arr.filter((_, j) => j !== i))}
              className="text-white/30 hover:text-red-400 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...arr, ''])}
          className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors mt-1"
        >
          <Plus size={12} /> Add item
        </button>
      </div>
    )
  }

  if (def.type === 'stats') {
    type Stat = { value: number; suffix: string; label: string }
    const arr = (Array.isArray(value) ? value : []) as Stat[]
    const inputCls = 'bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 outline-none focus:border-white/30 transition-colors'
    return (
      <div className="space-y-3">
        {arr.map((stat, i) => (
          <div key={i} className="flex gap-2 items-start p-3 bg-white/3 border border-white/8 rounded-xl">
            <div className="flex-1 grid grid-cols-3 gap-2">
              <div>
                <label className="block text-white/40 text-xs mb-1">Value</label>
                <input
                  type="number"
                  className={cn(inputCls, 'w-full')}
                  value={stat.value}
                  onChange={(e) => {
                    const next = [...arr]
                    next[i] = { ...stat, value: Number(e.target.value) }
                    onChange(next)
                  }}
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1">Suffix</label>
                <input
                  className={cn(inputCls, 'w-full')}
                  value={stat.suffix}
                  placeholder="+"
                  onChange={(e) => {
                    const next = [...arr]
                    next[i] = { ...stat, suffix: e.target.value }
                    onChange(next)
                  }}
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1">Label</label>
                <input
                  className={cn(inputCls, 'w-full')}
                  value={stat.label}
                  placeholder="Projects"
                  onChange={(e) => {
                    const next = [...arr]
                    next[i] = { ...stat, label: e.target.value }
                    onChange(next)
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange(arr.filter((_, j) => j !== i))}
              className="mt-5 text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...arr, { value: 0, suffix: '+', label: '' }])}
          className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors"
        >
          <Plus size={12} /> Add stat
        </button>
      </div>
    )
  }

  if (def.type === 'gallery') {
    type GalleryItem = { src: string; alt: string; aspect: string }
    const arr = (Array.isArray(value) ? value : []) as GalleryItem[]
    const inputCls = 'bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 outline-none focus:border-white/30 transition-colors'
    const aspects = ['16/9', '4/3', '3/4', '1/1']
    return (
      <div className="space-y-3">
        {arr.map((item, i) => (
          <div key={i} className="p-3 bg-white/3 border border-white/8 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-xs font-medium">Image {i + 1}</span>
              <button
                type="button"
                onClick={() => onChange(arr.filter((_, j) => j !== i))}
                className="text-white/30 hover:text-red-400 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1">Image / Video</label>
              {item.src && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/8 mb-2">
                  {/\.(mp4|webm|mov)$/i.test(item.src) ? (
                    <video src={item.src} className="w-full h-full object-cover" muted playsInline />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.src} alt={item.alt || 'preview'} className="w-full h-full object-cover" />
                  )}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  className={cn(inputCls, 'flex-1')}
                  value={item.src}
                  placeholder="Upload or paste URL…"
                  onChange={(e) => {
                    const next = [...arr]
                    next[i] = { ...item, src: e.target.value }
                    onChange(next)
                  }}
                />
                <UploadButton
                  onUploaded={(url) => {
                    const next = [...arr]
                    next[i] = { ...item, src: url }
                    onChange(next)
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-white/40 text-xs mb-1">Alt text</label>
                <input
                  className={cn(inputCls, 'w-full')}
                  value={item.alt}
                  placeholder="Image description"
                  onChange={(e) => {
                    const next = [...arr]
                    next[i] = { ...item, alt: e.target.value }
                    onChange(next)
                  }}
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1">Aspect ratio</label>
                <select
                  className={cn(inputCls, 'w-full cursor-pointer')}
                  value={item.aspect}
                  onChange={(e) => {
                    const next = [...arr]
                    next[i] = { ...item, aspect: e.target.value }
                    onChange(next)
                  }}
                >
                  {aspects.map((a) => (
                    <option key={a} value={a} className="bg-[#1a1a1a]">{a}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...arr, { src: '', alt: '', aspect: '16/9' }])}
          className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors"
        >
          <Plus size={12} /> Add image
        </button>
      </div>
    )
  }

  // URL field — show upload button for image/video keys
  if (def.type === 'url') {
    const showUpload = isMediaKey(def.key)
    return (
      <div className="space-y-2">
        {showUpload && String(value ?? '') && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/8">
            {/\.(mp4|webm|mov)$/i.test(String(value)) ? (
              <video src={String(value)} className="w-full h-full object-cover" muted playsInline />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={String(value)} alt="preview" className="w-full h-full object-cover" />
            )}
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="url"
            className={cn(base, 'flex-1')}
            value={String(value ?? '')}
            placeholder={showUpload ? 'Upload or paste URL…' : 'https://…'}
            onChange={(e) => onChange(e.target.value)}
          />
          {showUpload && <UploadButton onUploaded={(url) => onChange(url)} />}
        </div>
      </div>
    )
  }

  return (
    <input
      type="text"
      className={base}
      value={String(value ?? '')}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

/* ─── Object card (one item in a list) ───────────────────────── */

function ObjectCard({
  schema,
  value,
  index,
  total,
  onChange,
  onDelete,
  onMove,
  collapsible = true,
}: {
  schema: SchemaDef
  value: Record<string, unknown>
  index: number
  total: number
  onChange: (v: Record<string, unknown>) => void
  onDelete: () => void
  onMove: (dir: 'up' | 'down') => void
  collapsible?: boolean
}) {
  const [open, setOpen] = useState(index === 0)
  const titleField = schema.find((f) => f.key === 'name' || f.key === 'title' || f.key === 'question')
  const title = titleField ? String(value[titleField.key] ?? `Item ${index + 1}`) : `Item ${index + 1}`

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-white/5 cursor-pointer select-none"
        onClick={() => collapsible && setOpen((o) => !o)}
      >
        <GripVertical size={14} className="text-white/20 flex-shrink-0" />
        <span className="flex-1 text-white text-sm font-medium truncate">{title}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onMove('up') }}
            disabled={index === 0}
            className="p-1 text-white/30 hover:text-white disabled:opacity-20 transition-colors"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onMove('down') }}
            disabled={index === total - 1}
            className="p-1 text-white/30 hover:text-white disabled:opacity-20 transition-colors"
          >
            <ChevronDown size={14} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            className="p-1 text-white/30 hover:text-red-400 transition-colors ml-1"
          >
            <Trash2 size={14} />
          </button>
          {collapsible && (
            <ChevronDown
              size={14}
              className={cn('text-white/30 transition-transform ml-1', open && 'rotate-180')}
            />
          )}
        </div>
      </div>

      {/* Fields */}
      {(!collapsible || open) && (
        <div className="p-4 space-y-4">
          {schema.map((def) => (
            <div key={def.key}>
              <label className="block text-white/50 text-xs font-medium mb-1.5">{def.label}</label>
              <Field
                def={def}
                value={value[def.key]}
                onChange={(v) => onChange({ ...value, [def.key]: v })}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Main editor ─────────────────────────────────────────────── */

interface AdminEditorProps {
  section: string
  title: string
  description?: string
  /** For flat object editing (e.g. settings) */
  schema?: SchemaDef
  /** For list editing (array of objects) */
  listSchema?: SchemaDef
  newItemTemplate?: Record<string, unknown>
  initialData: unknown
}

export default function AdminEditor({
  section,
  title,
  description,
  schema,
  listSchema,
  newItemTemplate,
  initialData,
}: AdminEditorProps) {
  const [data, setData] = useState<unknown>(initialData)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = async () => {
    setSaving(true)
    setSaved(false)
    setError(null)
    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      } else {
        const body = await res.json().catch(() => ({}))
        setError(body.error ?? `Server error ${res.status}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setSaving(false)
    }
  }

  const flatData = data as Record<string, unknown>
  const listData = data as Record<string, unknown>[]

  const moveItem = useCallback(
    (i: number, dir: 'up' | 'down') => {
      const arr = [...(data as Record<string, unknown>[])]
      const j = dir === 'up' ? i - 1 : i + 1
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      setData(arr)
    },
    [data]
  )

  return (
    <div className="w-full">
      {/* Page header — title only */}
      <div className="px-8 pt-8 pb-6 border-b border-white/8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white font-semibold text-2xl">{title}</h1>
          {description && <p className="text-white/40 text-sm mt-0.5">{description}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-8">
        {/* Flat object form */}
        {schema && !listSchema && (
          <div className="space-y-5 bg-white/3 border border-white/8 rounded-2xl p-6">
            {schema.map((def) => (
              <div key={def.key}>
                <label className="block text-white/50 text-xs font-medium mb-1.5">{def.label}</label>
                <Field
                  def={def}
                  value={flatData[def.key]}
                  onChange={(v) => setData({ ...flatData, [def.key]: v })}
                />
              </div>
            ))}
          </div>
        )}

        {/* List editor */}
        {listSchema && (
          <div className="space-y-3">
            {listData.map((item, i) => (
              <ObjectCard
                key={i}
                schema={listSchema}
                value={item}
                index={i}
                total={listData.length}
                onChange={(v) => {
                  const next = [...listData]
                  next[i] = v
                  setData(next)
                }}
                onDelete={() => setData(listData.filter((_, j) => j !== i))}
                onMove={(dir) => moveItem(i, dir)}
              />
            ))}

            {newItemTemplate && (
              <button
                type="button"
                onClick={() => setData([...listData, { ...newItemTemplate, id: Date.now() }])}
                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-white/15 rounded-xl text-white/40 hover:text-white hover:border-white/30 text-sm font-medium transition-colors"
              >
                <Plus size={16} /> Add new item
              </button>
            )}
          </div>
        )}

        {/* Save button — bottom */}
        <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between gap-4">
          <button
            onClick={save}
            disabled={saving}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all',
              saved
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white text-[#0E0E0E] hover:bg-white/90 disabled:opacity-60'
            )}
          >
            {saved ? <><Check size={15} /> Saved</> : saving ? 'Saving…' : <><Save size={15} /> Save changes</>}
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  )
}

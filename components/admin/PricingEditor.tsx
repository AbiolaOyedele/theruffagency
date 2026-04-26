'use client'

import { useState } from 'react'
import { Save, Check, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Pricing } from '@/lib/content'

function FeatureList({
  items,
  onChange,
}: {
  items: string[]
  onChange: (v: string[]) => void
}) {
  const base = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-white/30 transition-colors'
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            className={cn(base, 'flex-1')}
            value={item}
            onChange={(e) => { const n = [...items]; n[i] = e.target.value; onChange(n) }}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="text-white/30 hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors"
      >
        <Plus size={12} /> Add feature
      </button>
    </div>
  )
}

function TierCard({
  label,
  tier,
  onChange,
  showPopularServices,
}: {
  label: string
  tier: Pricing['subscription'] | Pricing['project']
  onChange: (v: typeof tier) => void
  showPopularServices?: boolean
}) {
  const input = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-white/30 transition-colors'
  const pt = tier as Pricing['project']

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-5">
      <h3 className="text-white font-semibold">{label}</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/50 text-xs font-medium mb-1.5">Name</label>
          <input className={input} value={tier.name} onChange={(e) => onChange({ ...tier, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-white/50 text-xs font-medium mb-1.5">Price</label>
          <input className={input} value={tier.price} onChange={(e) => onChange({ ...tier, price: e.target.value })} />
        </div>
        <div>
          <label className="block text-white/50 text-xs font-medium mb-1.5">Period (e.g. /month)</label>
          <input className={input} value={tier.period} onChange={(e) => onChange({ ...tier, period: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="block text-white/50 text-xs font-medium mb-2">Features (checklist)</label>
        <FeatureList items={tier.features} onChange={(v) => onChange({ ...tier, features: v })} />
      </div>

      {showPopularServices && pt.popularServices && (
        <div>
          <label className="block text-white/50 text-xs font-medium mb-2">Popular Services</label>
          <div className="space-y-2">
            {pt.popularServices.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={cn(input, 'flex-1')}
                  value={s.name}
                  placeholder="Service name"
                  onChange={(e) => {
                    const n = [...(pt.popularServices ?? [])]
                    n[i] = { ...n[i], name: e.target.value }
                    onChange({ ...tier, popularServices: n } as typeof tier)
                  }}
                />
                <input
                  className={cn(input, 'w-28')}
                  value={s.price}
                  placeholder="$0,000"
                  onChange={(e) => {
                    const n = [...(pt.popularServices ?? [])]
                    n[i] = { ...n[i], price: e.target.value }
                    onChange({ ...tier, popularServices: n } as typeof tier)
                  }}
                />
                <button
                  type="button"
                  onClick={() => onChange({ ...tier, popularServices: (pt.popularServices ?? []).filter((_, j) => j !== i) } as typeof tier)}
                  className="text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...tier, popularServices: [...(pt.popularServices ?? []), { name: '', price: '' }] } as typeof tier)}
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors"
            >
              <Plus size={12} /> Add service
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PricingEditorClient({ initialData }: { initialData: Pricing }) {
  const [data, setData] = useState(initialData)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = async () => {
    setSaving(true)
    setSaved(false)
    setError(null)
    try {
      const res = await fetch('/api/admin/content/pricing', {
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

  return (
    <div className="w-full">
      {/* Page header — title only */}
      <div className="px-8 pt-8 pb-6 border-b border-white/8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white font-semibold text-2xl">Pricing</h1>
          <p className="text-white/40 text-sm mt-0.5">Edit the two pricing tiers in the [06 Pricing] section.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-8 space-y-4">
        <TierCard
          label="Subscription Plan"
          tier={data.subscription}
          onChange={(v) => setData({ ...data, subscription: v as Pricing['subscription'] })}
        />
        <TierCard
          label="Per Project Plan"
          tier={data.project}
          onChange={(v) => setData({ ...data, project: v as Pricing['project'] })}
          showPopularServices
        />

        {/* Save button — bottom */}
        <div className="pt-6 border-t border-white/8 flex items-center justify-between gap-4">
          <button
            onClick={save}
            disabled={saving}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all',
              saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white text-[#0E0E0E] hover:bg-white/90 disabled:opacity-60'
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

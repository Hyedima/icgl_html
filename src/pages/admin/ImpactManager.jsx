import { useEffect, useMemo, useState } from 'react'
import { Check, Edit3, Plus, RotateCcw, Trash2, X } from 'lucide-react'
import { api } from '../../lib/api'

const resourceDefinitions = {
  overview: {
    label: 'Overview',
    get: 'getImpactOverviews',
    create: 'createImpactOverview',
    update: 'updateImpactOverview',
    remove: 'deleteImpactOverview',
    fields: [
      ['label', 'Label'], ['value', 'Value'], ['delta', 'Delta'],
      ['category', 'Category', 'select', ['impact', 'platform']], ['order', 'Display order', 'number'],
    ],
    defaults: { label: '', value: '', delta: '', category: 'impact', order: 0, isCounter: false },
  },
  sectors: {
    label: 'Economic sectors',
    get: 'getEconomicSectors', create: 'createEconomicSector', update: 'updateEconomicSector', remove: 'deleteEconomicSector',
    fields: [['sector', 'Sector'], ['loansGuaranteed', 'Loans guaranteed'], ['msmesSupported', 'MSMEs supported'], ['jobsCreated', 'Jobs created'], ['femalePercentage', 'Female percentage'], ['youthPercentage', 'Youth percentage'], ['status', 'Status'], ['sortOrder', 'Display order', 'number']],
    defaults: { sector: '', loansGuaranteed: '', msmesSupported: '', jobsCreated: '', femalePercentage: '', youthPercentage: '', status: '', sortOrder: 0 },
  },
  reach: {
    label: 'Geographic reach',
    get: 'getGeographicReach', create: 'createGeographicReach', update: 'updateGeographicReach', remove: 'deleteGeographicReach',
    fields: [['zone', 'Zone'], ['msmesSupported', 'MSMEs supported'], ['sortOrder', 'Display order', 'number']],
    defaults: { zone: '', msmesSupported: '', sortOrder: 0 },
  },
  pfi: {
    label: 'PFI performance',
    get: 'getPfiPerformance', create: 'createPfiPerformance', update: 'updatePfiPerformance', remove: 'deletePfiPerformance',
    fields: [['label', 'Label'], ['count', 'Count'], ['sortOrder', 'Display order', 'number']],
    defaults: { label: '', count: '', sortOrder: 0 },
  },
  ratings: {
    label: 'Ratings & certifications',
    get: 'getRatingCertifications', create: 'createRatingCertification', update: 'updateRatingCertification', remove: 'deleteRatingCertification',
    fields: [['title', 'Title'], ['description', 'Description', 'textarea'], ['issuedYear', 'Issued year', 'number'], ['sortOrder', 'Display order', 'number']],
    defaults: { title: '', description: '', issuedYear: '', sortOrder: 0 },
  },
}

function emptyForm(definition) {
  return { ...definition.defaults }
}

export default function ImpactManager() {
  const [activeKey, setActiveKey] = useState('overview')
  const [records, setRecords] = useState([])
  const [form, setForm] = useState(() => emptyForm(resourceDefinitions.overview))
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)
  const definition = resourceDefinitions[activeKey]

  const loadRecords = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const result = await api[definition.get]()
      setRecords(result.data || [])
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setEditingId(null)
    setForm(emptyForm(definition))
    loadRecords()
  }, [activeKey])

  const columns = useMemo(() => definition.fields.slice(0, 4).map(([key, label]) => ({ key, label })), [definition])

  const updateForm = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setMessage(null)
    try {
      const payload = { ...form }
      for (const [key, , type] of definition.fields) {
        if (type === 'number' && payload[key] !== '') payload[key] = Number(payload[key])
      }
      if (activeKey === 'overview') payload.isCounter = Boolean(form.isCounter)
      if (editingId) await api[definition.update](editingId, payload)
      else await api[definition.create](payload)
      setMessage({ type: 'success', text: editingId ? 'Impact record updated.' : 'Impact record created.' })
      setEditingId(null)
      setForm(emptyForm(definition))
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  const editRecord = (record) => {
    const next = emptyForm(definition)
    definition.fields.forEach(([key]) => { next[key] = record[key] ?? '' })
    if (activeKey === 'overview') next.isCounter = Boolean(record.isCounter)
    setForm(next)
    setEditingId(record.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteRecord = async (id) => {
    if (!window.confirm('Delete this impact record? This cannot be undone.')) return
    setBusy(true)
    try {
      await api[definition.remove](id)
      setMessage({ type: 'success', text: 'Impact record deleted.' })
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mt-10" aria-label="Impact content management">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">Impact content</p><h2 className="font-display mt-1 text-2xl font-medium text-ink">Manage the impact page data</h2></div><button onClick={loadRecords} title="Refresh records" className="inline-flex items-center gap-2 self-start rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-soft transition hover:border-ink hover:text-ink"><RotateCcw size={14} /> Refresh</button></div>
      <div className="flex gap-2 overflow-x-auto border-b border-line pb-2">{Object.entries(resourceDefinitions).map(([key, item]) => <button key={key} onClick={() => setActiveKey(key)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${activeKey === key ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-white hover:text-ink'}`}>{item.label}</button>)}</div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[360px_1fr]">
        <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-5"><div className="flex items-center justify-between"><h3 className="font-display text-xl font-medium text-ink">{editingId ? 'Edit record' : 'Add record'}</h3>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm(definition)) }} title="Cancel editing" className="text-ink-soft hover:text-ink"><X size={17} /></button>}</div><div className="mt-5 space-y-3">{definition.fields.map(([key, label, type, options]) => <label key={key} className="block text-xs font-semibold text-ink">{label}{type === 'select' ? <select name={key} value={form[key]} onChange={updateForm} className="mt-1.5 w-full rounded-lg border border-line bg-cream px-3 py-2.5 text-sm font-normal outline-none focus:border-lime-dark">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : type === 'textarea' ? <textarea name={key} value={form[key]} onChange={updateForm} rows={4} className="mt-1.5 w-full rounded-lg border border-line bg-cream px-3 py-2.5 text-sm font-normal outline-none focus:border-lime-dark" /> : <input name={key} type={type === 'number' ? 'number' : 'text'} value={form[key]} onChange={updateForm} required={key !== 'delta' && key !== 'issuedYear'} className="mt-1.5 w-full rounded-lg border border-line bg-cream px-3 py-2.5 text-sm font-normal outline-none focus:border-lime-dark" />}</label>)}{activeKey === 'overview' && <label className="flex items-center gap-2 text-xs font-semibold text-ink"><input type="checkbox" name="isCounter" checked={form.isCounter} onChange={updateForm} className="accent-lime-dark" /> Display as counter</label>}</div><button disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream transition hover:bg-lime-dark disabled:opacity-50">{editingId ? <Edit3 size={15} /> : <Plus size={15} />}{busy ? 'Saving...' : editingId ? 'Update record' : 'Create record'}</button></form>
        <div className="min-w-0 rounded-2xl border border-line bg-white p-5"><div className="flex items-center justify-between"><div><h3 className="font-display text-xl font-medium text-ink">{definition.label}</h3><p className="mt-1 text-xs text-ink-soft">{records.length} record{records.length === 1 ? '' : 's'}</p></div></div>{message && <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-lime-light text-lime-dark'}`}>{message.type === 'error' ? <X size={14} /> : <Check size={14} />}{message.text}</div>}{loading ? <p className="py-14 text-center text-sm text-ink-soft">Loading impact records...</p> : records.length === 0 ? <p className="py-14 text-center text-sm text-ink-soft">No records yet. Add the first one.</p> : <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead><tr className="border-b border-line text-[11px] uppercase tracking-wider text-ink-soft">{columns.map((column) => <th key={column.key} className="px-3 py-3 font-semibold">{column.label}</th>)}<th className="px-3 py-3 text-right font-semibold">Actions</th></tr></thead><tbody>{records.map((record) => <tr key={record.id} className="border-b border-line last:border-0"><td className="max-w-[180px] truncate px-3 py-4 text-sm font-medium text-ink">{String(record[columns[0].key] ?? '—')}</td>{columns.slice(1).map((column) => <td key={column.key} className="max-w-[220px] truncate px-3 py-4 text-sm text-ink-soft">{String(record[column.key] ?? '—')}</td>)}<td className="px-3 py-4"><div className="flex justify-end gap-2"><button onClick={() => editRecord(record)} title="Edit record" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:border-ink hover:text-ink"><Edit3 size={14} /></button><button onClick={() => deleteRecord(record.id)} title="Delete record" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:border-red-300 hover:text-red-600"><Trash2 size={14} /></button></div></td></tr>)}</tbody></table></div>}</div>
      </div>
    </section>
  )
}

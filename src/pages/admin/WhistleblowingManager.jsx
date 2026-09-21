import { useEffect, useState } from 'react'
import { Check, Edit3, Plus, RotateCcw, Trash2, X } from 'lucide-react'
import { api } from '../../lib/api'

const resources = {
  hero: {
    label: 'Hero',
    title: 'Whistleblowing hero',
    get: 'getWhistleblowingHeroes',
    create: 'createWhistleblowingHero',
    update: 'updateWhistleblowingHero',
    remove: 'deleteWhistleblowingHero',
    fields: [['whistleblowingHeroDescription', 'Description', 'textarea']],
    defaults: { whistleblowingHeroDescription: '' },
  },
  conduct: {
    label: 'Reportable conduct',
    title: 'Reportable conduct',
    get: 'getReportableConduct',
    create: 'createReportableConduct',
    update: 'updateReportableConduct',
    remove: 'deleteReportableConduct',
    fields: [['title', 'Title'], ['list', 'Items (one per line)', 'list']],
    defaults: { title: '', list: '' },
  },
  channels: {
    label: 'Reporting channels',
    title: 'Reporting channels',
    get: 'getReportingChannels',
    create: 'createReportingChannel',
    update: 'updateReportingChannel',
    remove: 'deleteReportingChannel',
    fields: [['title', 'Title'], ['description', 'Description', 'textarea'], ['phone', 'Phone'], ['email', 'Email'], ['website', 'Website URL']],
    defaults: { title: '', description: '', phone: '', email: '', website: '' },
  },
  protections: {
    label: 'Protections',
    title: 'Whistleblower protections',
    get: 'getWhistleblowerProtections',
    create: 'createWhistleblowerProtection',
    update: 'updateWhistleblowerProtection',
    remove: 'deleteWhistleblowerProtection',
    fields: [['title', 'Title'], ['description', 'Description', 'textarea']],
    defaults: { title: '', description: '' },
  },
  reports: {
    label: 'Reports',
    title: 'Submitted reports',
    get: 'getWhistleblowingReports',
    create: 'createWhistleblowingReport',
    update: 'updateWhistleblowingReport',
    remove: 'deleteWhistleblowingReport',
    fields: [['name', 'Name'], ['phone', 'Phone'], ['typeOfConcern', 'Type of concern'], ['descriptionOfConcern', 'Description of concern', 'textarea']],
    defaults: { name: '', phone: '', typeOfConcern: '', descriptionOfConcern: '' },
  },
}

const empty = (resource) => ({ ...resource.defaults })

function Field({ definition, value, onChange }) {
  const [name, label, type] = definition
  const props = {
    name,
    value: value ?? '',
    onChange,
    required: name !== 'name' && name !== 'phone',
    className: 'mt-1.5 w-full rounded-lg border border-line bg-cream px-3 py-2.5 text-sm font-normal outline-none focus:border-lime-dark',
  }

  return (
    <label className="block text-xs font-semibold text-ink">
      {label}
      {type === 'textarea' || type === 'list' ? (
        <textarea {...props} rows={type === 'list' ? 5 : 4} placeholder={type === 'list' ? 'One item per line' : undefined} />
      ) : (
        <input {...props} type="text" />
      )}
    </label>
  )
}

function displayValue(record, field) {
  const value = record[field]
  return Array.isArray(value) ? value.join(' | ') : value
}

export default function WhistleblowingManager() {
  const [activeKey, setActiveKey] = useState('hero')
  const [records, setRecords] = useState([])
  const [form, setForm] = useState(empty(resources.hero))
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)
  const resource = resources[activeKey]

  const loadRecords = async () => {
    setLoading(true)
    try {
      const result = await api[resource.get]()
      setRecords(result.data || [])
    } catch (error) {
      setRecords([])
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setEditingId(null)
    setForm(empty(resource))
    setMessage(null)
    loadRecords()
  }, [activeKey])

  const selectResource = (key) => setActiveKey(key)

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(empty(resource))
  }

  const toPayload = () => {
    const payload = { ...form }
    if (activeKey === 'conduct') payload.list = form.list.split('\n').map((item) => item.trim()).filter(Boolean)
    return payload
  }

  const submitRecord = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      const payload = toPayload()
      if (editingId) await api[resource.update](editingId, payload)
      else await api[resource.create](payload)
      setMessage({ type: 'success', text: editingId ? `${resource.title} updated.` : `${resource.title} created.` })
      resetForm()
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  const editRecord = (record) => {
    setEditingId(record.id)
    const nextForm = { ...empty(resource) }
    resource.fields.forEach(([field]) => {
      nextForm[field] = activeKey === 'conduct' && Array.isArray(record[field]) ? record[field].join('\n') : record[field] ?? ''
    })
    setForm(nextForm)
  }

  const deleteRecord = async (id) => {
    if (!window.confirm(`Delete this ${resource.label.toLowerCase()} record?`)) return
    setBusy(true)
    try {
      await api[resource.remove](id)
      setMessage({ type: 'success', text: `${resource.title} deleted.` })
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mt-10" aria-label="Whistleblowing content management">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">Whistleblowing content</p>
          <h2 className="font-display mt-1 text-2xl font-medium text-ink">Manage the Whistleblowing page data</h2>
        </div>
        <button type="button" onClick={loadRecords} title="Refresh records" className="inline-flex items-center gap-2 self-start rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-soft hover:border-ink hover:text-ink">
          <RotateCcw size={14} /> Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-line pb-3">
        {Object.entries(resources).map(([key, item]) => (
          <button key={key} type="button" onClick={() => selectResource(key)} className={`rounded-lg px-3 py-2 text-xs font-semibold ${activeKey === key ? 'bg-ink text-cream' : 'bg-white text-ink-soft hover:text-ink'}`}>
            {item.label}
          </button>
        ))}
      </div>

      {message && (
        <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-lime-light text-lime-dark'}`}>
          {message.type === 'error' ? <X size={14} /> : <Check size={14} />}
          {message.text}
        </div>
      )}

      <div className="mt-5 grid gap-5 xl:grid-cols-[360px_1fr]">
        <form onSubmit={submitRecord} className="rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-medium text-ink">{editingId ? `Edit ${resource.label.toLowerCase()}` : `Add ${resource.label.toLowerCase()}`}</h3>
            {editingId && <button type="button" onClick={resetForm} title="Cancel editing"><X size={17} /></button>}
          </div>
          <div className="mt-5 space-y-3">
            {resource.fields.map((field) => <Field key={field[0]} definition={field} value={form[field[0]]} onChange={updateForm} />)}
          </div>
          <button type="submit" disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream hover:bg-lime-dark disabled:opacity-50">
            {editingId ? <Edit3 size={15} /> : <Plus size={15} />}
            {busy ? 'Saving...' : editingId ? `Update ${resource.label.toLowerCase()}` : `Create ${resource.label.toLowerCase()}`}
          </button>
        </form>

        <div className="min-w-0 rounded-2xl border border-line bg-white p-5">
          <h3 className="font-display text-xl font-medium text-ink">{resource.title}</h3>
          {loading ? <p className="py-12 text-center text-sm text-ink-soft">Loading records...</p> : records.length === 0 ? <p className="py-12 text-center text-sm text-ink-soft">No records yet.</p> : (
            <div className="mt-4 space-y-3">
              {records.map((record) => (
                <div key={record.id} className="rounded-xl border border-line p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      {resource.fields.map(([field, label]) => <p key={field} className="text-xs text-ink-soft"><span className="font-semibold text-ink">{label}:</span> {displayValue(record, field)}</p>)}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button type="button" onClick={() => editRecord(record)} title="Edit record" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-ink"><Edit3 size={14} /></button>
                      <button type="button" onClick={() => deleteRecord(record.id)} title="Delete record" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

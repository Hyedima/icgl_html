import { useEffect, useState } from 'react'
import { Check, Edit3, Plus, RotateCcw, Trash2, X } from 'lucide-react'
import { api } from '../../lib/api'

const defaults = { title: '', subtitle: '', description: '' }
const fields = [
  ['title', 'Title'],
  ['subtitle', 'Subtitle'],
  ['description', 'Description', 'textarea'],
]

function Field({ definition, value, onChange }) {
  const [name, label, type] = definition
  const props = {
    name,
    value: value ?? '',
    onChange,
    required: true,
    className: 'mt-1.5 w-full rounded-lg border border-line bg-cream px-3 py-2.5 text-sm font-normal outline-none focus:border-lime-dark',
  }

  return (
    <label className="block text-xs font-semibold text-ink">
      {label}
      {type === 'textarea' ? <textarea {...props} rows={6} /> : <input {...props} type="text" />}
    </label>
  )
}

export default function PolicyManager() {
  const [records, setRecords] = useState([])
  const [form, setForm] = useState({ ...defaults })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)

  const loadRecords = async () => {
    setLoading(true)
    try {
      const result = await api.getPolicies()
      setRecords(result.data || [])
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMessage(null)
    loadRecords()
  }, [])

  const resetForm = () => {
    setEditingId(null)
    setForm({ ...defaults })
  }

  const submitRecord = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      if (editingId) await api.updatePolicy(editingId, form)
      else await api.createPolicy(form)
      setMessage({ type: 'success', text: editingId ? 'Policy updated.' : 'Policy created.' })
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
    setForm(Object.fromEntries(fields.map(([key]) => [key, record[key] ?? ''])))
  }

  const deleteRecord = async (id) => {
    if (!window.confirm('Delete this policy?')) return
    setBusy(true)
    try {
      await api.deletePolicy(id)
      setMessage({ type: 'success', text: 'Policy deleted.' })
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mt-10" aria-label="Policy content management">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">Policy content</p>
          <h2 className="font-display mt-1 text-2xl font-medium text-ink">Manage the Policies page data</h2>
        </div>
        <button type="button" onClick={loadRecords} title="Refresh records" className="inline-flex items-center gap-2 self-start rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-soft hover:border-ink hover:text-ink">
          <RotateCcw size={14} /> Refresh
        </button>
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
            <h3 className="font-display text-xl font-medium text-ink">{editingId ? 'Edit policy' : 'Add policy'}</h3>
            {editingId && <button type="button" onClick={resetForm} title="Cancel editing"><X size={17} /></button>}
          </div>
          <div className="mt-5 space-y-3">
            {fields.map((field) => <Field key={field[0]} definition={field} value={form[field[0]]} onChange={(event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))} />)}
          </div>
          <button type="submit" disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream hover:bg-lime-dark disabled:opacity-50">
            {editingId ? <Edit3 size={15} /> : <Plus size={15} />}
            {busy ? 'Saving...' : editingId ? 'Update policy' : 'Create policy'}
          </button>
        </form>

        <div className="min-w-0 rounded-2xl border border-line bg-white p-5">
          <h3 className="font-display text-xl font-medium text-ink">Policies</h3>
          {loading ? <p className="py-12 text-center text-sm text-ink-soft">Loading policy records...</p> : records.length === 0 ? <p className="py-12 text-center text-sm text-ink-soft">No policies yet. Add the first one.</p> : (
            <div className="mt-4 space-y-3">
              {records.map((record) => (
                <div key={record.id} className="rounded-xl border border-line p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{record.title}</p>
                      <p className="mt-1 text-xs font-medium text-lime-dark">{record.subtitle}</p>
                      <p className="mt-2 whitespace-pre-wrap text-xs text-ink-soft">{record.description}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button type="button" onClick={() => editRecord(record)} title="Edit policy" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-ink"><Edit3 size={14} /></button>
                      <button type="button" onClick={() => deleteRecord(record.id)} title="Delete policy" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-red-600"><Trash2 size={14} /></button>
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

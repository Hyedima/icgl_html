import { useEffect, useState } from 'react'
import { Check, Edit3, Plus, RotateCcw, Trash2, X } from 'lucide-react'
import { api } from '../../lib/api'

const tabs = {
  whoWeAre: {
    label: 'Who we are',
    get: 'getContactWhoWeAre',
    create: 'createContactWhoWeAre',
    update: 'updateContactWhoWeAre',
    remove: 'deleteContactWhoWeAre',
    defaults: { description: '', location: '', phone: '', email: '' },
    fields: [['description', 'Description', 'textarea'], ['location', 'Location'], ['phone', 'Phone'], ['email', 'Email']],
  },
  messages: {
    label: 'Messages',
    get: 'getContactMessages',
    create: 'createContactMessage',
    update: 'updateContactMessage',
    remove: 'deleteContactMessage',
    defaults: { fullName: '', email: '', phoneNumber: '', message: '' },
    fields: [['fullName', 'Full name'], ['email', 'Email'], ['phoneNumber', 'Phone number'], ['message', 'Message', 'textarea']],
  },
}

const empty = (values) => ({ ...values })

function Field({ definition, value, onChange, required = true }) {
  const [name, label, type] = definition
  const common = {
    name,
    value: value ?? '',
    onChange,
    required,
    className: 'mt-1.5 w-full rounded-lg border border-line bg-cream px-3 py-2.5 text-sm font-normal outline-none focus:border-lime-dark',
  }

  return (
    <label className="block text-xs font-semibold text-ink">
      {label}
      {type === 'textarea' ? (
        <textarea {...common} rows={4} />
      ) : (
        <input {...common} type="text" />
      )}
    </label>
  )
}

export default function ContactManager() {
  const [activeKey, setActiveKey] = useState('whoWeAre')
  const [records, setRecords] = useState([])
  const [form, setForm] = useState(empty(tabs.whoWeAre.defaults))
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)

  const definition = tabs[activeKey]

  const loadRecords = async () => {
    setLoading(true)
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
    setForm(empty(definition.defaults))
    setMessage(null)
    loadRecords()
  }, [activeKey])

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitSection = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      if (editingId) await api[definition.update](editingId, form)
      else await api[definition.create](form)

      setMessage({ type: 'success', text: editingId ? 'Contact record updated.' : 'Contact record created.' })
      setEditingId(null)
      setForm(empty(definition.defaults))
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  const editRecord = (record) => {
    setEditingId(record.id)
    setForm(Object.fromEntries(definition.fields.map(([key]) => [key, record[key] ?? ''])))
  }

  const deleteRecord = async (id) => {
    if (!window.confirm('Delete this contact record?')) return
    setBusy(true)
    try {
      await api[definition.remove](id)
      setMessage({ type: 'success', text: 'Contact record deleted.' })
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mt-10" aria-label="Contact content management">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">Contact content</p>
          <h2 className="font-display mt-1 text-2xl font-medium text-ink">Manage the Contact page data</h2>
        </div>
        <button
          type="button"
          onClick={loadRecords}
          title="Refresh records"
          className="inline-flex items-center gap-2 self-start rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-soft hover:border-ink hover:text-ink"
        >
          <RotateCcw size={14} /> Refresh
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-line pb-2">
        {Object.entries(tabs).map(([key, item]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveKey(key)}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${activeKey === key ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-white hover:text-ink'}`}
          >
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
        <form onSubmit={submitSection} className="rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-medium text-ink">{editingId ? 'Edit record' : 'Add record'}</h3>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm(empty(definition.defaults)) }} title="Cancel editing">
                <X size={17} />
              </button>
            )}
          </div>

          <div className="mt-5 space-y-3">
            {definition.fields.map((field) => (
              <Field key={field[0]} definition={field} value={form[field[0]]} onChange={updateForm} />
            ))}
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream hover:bg-lime-dark disabled:opacity-50"
          >
            {editingId ? <Edit3 size={15} /> : <Plus size={15} />}
            {busy ? 'Saving...' : editingId ? 'Update record' : 'Create record'}
          </button>
        </form>

        <div className="min-w-0 rounded-2xl border border-line bg-white p-5">
          <h3 className="font-display text-xl font-medium text-ink">{definition.label}</h3>

          {loading ? (
            <p className="py-12 text-center text-sm text-ink-soft">Loading contact records...</p>
          ) : records.length === 0 ? (
            <p className="py-12 text-center text-sm text-ink-soft">No records yet. Add the first one.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {records.map((record) => (
                <div key={record.id} className="rounded-xl border border-line p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{record.fullName || record.location || record.description?.slice(0, 70) || record.email}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-ink-soft">
                        {record.description || record.message || record.location || record.phone || record.email || record.phoneNumber}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button type="button" onClick={() => editRecord(record)} title="Edit record" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-ink">
                        <Edit3 size={14} />
                      </button>
                      <button type="button" onClick={() => deleteRecord(record.id)} title="Delete record" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-red-600">
                        <Trash2 size={14} />
                      </button>
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

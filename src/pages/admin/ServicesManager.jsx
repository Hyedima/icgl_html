import { useEffect, useState } from 'react'
import { Check, Edit3, Plus, RotateCcw, Trash2, X } from 'lucide-react'
import { api } from '../../lib/api'

const tabs = {
  hero: {
    label: 'Hero',
    get: 'getServicesHeroes',
    create: 'createServicesHero',
    update: 'updateServicesHero',
    remove: 'deleteServicesHero',
    defaults: { description: '', mediaUrl: '', mediaType: 'image' },
    fields: [['description', 'Description', 'textarea'], ['mediaUrl', 'Media URL'], ['mediaType', 'Media type']],
  },
  types: {
    label: 'Service types',
    get: 'getServicesTypeSections',
    create: 'createServicesTypeSection',
    update: 'updateServicesTypeSection',
    remove: 'deleteServicesTypeSection',
    defaults: { title: '', description: '', mediaUrl: '', mediaType: '' },
    fields: [['title', 'Section title'], ['description', 'Description', 'textarea'], ['mediaUrl', 'Media URL'], ['mediaType', 'Media type']],
    childDefaults: { title: '', description: '', sortOrder: 0 },
    childFields: [['title', 'Title'], ['description', 'Description', 'textarea'], ['sortOrder', 'Display order', 'number']],
    childCreate: 'createServiceType',
    childUpdate: 'updateServiceType',
    childRemove: 'deleteServiceType',
  },
  whyChooseUs: {
    label: 'Why choose us',
    get: 'getWhyChooseUsSections',
    create: 'createWhyChooseUsSection',
    update: 'updateWhyChooseUsSection',
    remove: 'deleteWhyChooseUsSection',
    defaults: { title: '', description: '' },
    fields: [['title', 'Section title'], ['description', 'Description', 'textarea']],
    childDefaults: { title: '', description: '', sortOrder: 0 },
    childFields: [['title', 'Title'], ['description', 'Description', 'textarea'], ['sortOrder', 'Display order', 'number']],
    childCreate: 'createWhyChooseUsReason',
    childUpdate: 'updateWhyChooseUsReason',
    childRemove: 'deleteWhyChooseUsReason',
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
        <input {...common} type={type === 'number' ? 'number' : 'text'} />
      )}
    </label>
  )
}

export default function ServicesManager() {
  const [activeKey, setActiveKey] = useState('hero')
  const [records, setRecords] = useState([])
  const [form, setForm] = useState(empty(tabs.hero.defaults))
  const [editingId, setEditingId] = useState(null)
  const [selectedSectionId, setSelectedSectionId] = useState(null)
  const [childForm, setChildForm] = useState(empty(tabs.hero.defaults))
  const [childEditingId, setChildEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)

  const definition = tabs[activeKey]
  const nested = Boolean(definition.childDefaults)

  const loadRecords = async () => {
    setLoading(true)
    try {
      const result = await api[definition.get]()
      setRecords(result.data || [])
      if (nested && result.data?.length && !result.data.some((item) => item.id === selectedSectionId)) {
        setSelectedSectionId(result.data[0].id)
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setEditingId(null)
    setForm(empty(definition.defaults))
    setSelectedSectionId(null)
    setChildEditingId(null)
    setChildForm(empty(definition.childDefaults || {}))
    setMessage(null)
    loadRecords()
  }, [activeKey])

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const updateChildForm = (event) => {
    setChildForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const normalize = (data, fields) => {
    const payload = { ...data }
    fields.forEach(([key, , type]) => {
      if (type === 'number' && payload[key] !== '') {
        payload[key] = Number(payload[key])
      }
    })
    return payload
  }

  const submitSection = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      const payload = normalize(form, definition.fields)
      if (editingId) await api[definition.update](editingId, payload)
      else await api[definition.create](payload)

      setMessage({ type: 'success', text: editingId ? 'Services record updated.' : 'Services record created.' })
      setEditingId(null)
      setForm(empty(definition.defaults))
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  const editSection = (record) => {
    setEditingId(record.id)
    setForm(Object.fromEntries(definition.fields.map(([key]) => [key, record[key] ?? ''])))
    if (nested) setSelectedSectionId(record.id)
  }

  const deleteSection = async (id) => {
    if (!window.confirm('Delete this services section?')) return
    setBusy(true)
    try {
      await api[definition.remove](id)
      setMessage({ type: 'success', text: 'Services section deleted.' })
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  const submitChild = async (event) => {
    event.preventDefault()
    if (!selectedSectionId) return
    setBusy(true)
    try {
      const payload = normalize(childForm, definition.childFields)
      if (childEditingId) await api[definition.childUpdate](childEditingId, payload)
      else await api[definition.childCreate](selectedSectionId, payload)

      setMessage({ type: 'success', text: childEditingId ? 'Item updated.' : 'Item added.' })
      setChildEditingId(null)
      setChildForm(empty(definition.childDefaults))
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  const editChild = (item) => {
    setChildEditingId(item.id)
    setChildForm(Object.fromEntries(definition.childFields.map(([key]) => [key, item[key] ?? ''])))
  }

  const deleteChild = async (id) => {
    if (!window.confirm('Delete this item?')) return
    setBusy(true)
    try {
      await api[definition.childRemove](id)
      setMessage({ type: 'success', text: 'Item deleted.' })
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setBusy(false)
    }
  }

  const selectedSection = records.find((record) => record.id === selectedSectionId)

  return (
    <section className="mt-10" aria-label="Services content management">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">Services content</p>
          <h2 className="font-display mt-1 text-2xl font-medium text-ink">Manage the Services page data</h2>
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
            <h3 className="font-display text-xl font-medium text-ink">{editingId ? 'Edit section' : 'Add section'}</h3>
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
            {busy ? 'Saving...' : editingId ? 'Update section' : 'Create section'}
          </button>
        </form>

        <div className="min-w-0 rounded-2xl border border-line bg-white p-5">
          <h3 className="font-display text-xl font-medium text-ink">{definition.label}</h3>

          {loading ? (
            <p className="py-12 text-center text-sm text-ink-soft">Loading services records...</p>
          ) : records.length === 0 ? (
            <p className="py-12 text-center text-sm text-ink-soft">No records yet. Add the first one.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {records.map((record) => (
                <div
                  key={record.id}
                  className={`rounded-xl border p-4 ${selectedSectionId === record.id ? 'border-lime-dark bg-lime-light/40' : 'border-line'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => nested && setSelectedSectionId(record.id)}
                      className="text-left"
                    >
                      <p className="text-sm font-semibold text-ink">{record.title || record.description?.slice(0, 70)}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{record.description}</p>
                    </button>

                    <div className="flex shrink-0 gap-2">
                      <button type="button" onClick={() => editSection(record)} title="Edit section" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-ink">
                        <Edit3 size={14} />
                      </button>
                      <button type="button" onClick={() => deleteSection(record.id)} title="Delete section" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {nested && selectedSectionId === record.id && (
                    <div className="mt-4 border-t border-line pt-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wider text-lime-dark">Items</p>
                        <span className="text-xs text-ink-soft">{record.items?.length || record.reasons?.length || 0} records</span>
                      </div>

                      <div className="space-y-2">
                        {(record.items || record.reasons || []).map((item) => (
                          <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-ink">{item.title}</p>
                              <p className="truncate text-xs text-ink-soft">{item.description}</p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                              <button type="button" onClick={() => editChild(item)} title="Edit item" className="grid h-7 w-7 place-items-center rounded-lg border border-line text-ink-soft hover:text-ink">
                                <Edit3 size={12} />
                              </button>
                              <button type="button" onClick={() => deleteChild(item.id)} title="Delete item" className="grid h-7 w-7 place-items-center rounded-lg border border-line text-ink-soft hover:text-red-600">
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {nested && selectedSectionId && (
        <form onSubmit={submitChild} className="mt-5 rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-medium text-ink">{childEditingId ? 'Edit item' : 'Add item'}</h3>
            {childEditingId && (
              <button type="button" onClick={() => { setChildEditingId(null); setChildForm(empty(definition.childDefaults)) }} title="Cancel editing">
                <X size={17} />
              </button>
            )}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {definition.childFields.map((field) => (
              <div key={field[0]} className={field[2] === 'textarea' || field[0] === 'description' ? 'md:col-span-2' : ''}>
                <Field definition={field} value={childForm[field[0]]} onChange={updateChildForm} />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream hover:bg-lime-dark disabled:opacity-50"
          >
            {childEditingId ? <Edit3 size={15} /> : <Plus size={15} />}
            {busy ? 'Saving...' : childEditingId ? 'Update item' : 'Create item'}
          </button>
        </form>
      )}
    </section>
  )
}

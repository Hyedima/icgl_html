import { useEffect, useState } from 'react'
import { Check, Edit3, Plus, RotateCcw, Trash2, X } from 'lucide-react'
import { api } from '../../lib/api'

const tabs = {
  hero: { label: 'Hero', get: 'getAboutHeroes', create: 'createAboutHero', update: 'updateAboutHero', remove: 'deleteAboutHero', defaults: { description: '', image: '' }, fields: [['description', 'Description', 'textarea'], ['image', 'Image URL']] },
  identity: { label: 'Identity', get: 'getAboutIdentities', create: 'createAboutIdentity', update: 'updateAboutIdentity', remove: 'deleteAboutIdentity', defaults: { description: '', mission: '', vision: '', mandate: '' }, fields: [['description', 'Description', 'textarea'], ['mission', 'Mission', 'textarea'], ['vision', 'Vision', 'textarea'], ['mandate', 'Mandate', 'textarea']] },
  people: { label: 'People', get: 'getAboutPeopleSections', create: 'createAboutPeopleSection', update: 'updateAboutPeopleSection', remove: 'deleteAboutPeopleSection', memberCreate: 'createAboutPerson', memberUpdate: 'updateAboutPerson', memberRemove: 'deleteAboutPerson', defaults: { title: '', description: '' }, fields: [['title', 'Section title'], ['description', 'Description', 'textarea']], memberDefaults: { name: '', image: '', position: '', bio: '', sortOrder: 0 }, memberFields: [['name', 'Name'], ['image', 'Image URL'], ['position', 'Position'], ['bio', 'Bio', 'textarea'], ['sortOrder', 'Display order', 'number']] },
  management: { label: 'Management', get: 'getAboutManagementSections', create: 'createAboutManagementSection', update: 'updateAboutManagementSection', remove: 'deleteAboutManagementSection', memberCreate: 'createAboutManagementMember', memberUpdate: 'updateAboutManagementMember', memberRemove: 'deleteAboutManagementMember', defaults: { title: '', description: '' }, fields: [['title', 'Section title'], ['description', 'Description', 'textarea']], memberDefaults: { name: '', image: '', position: '', bio: '', sortOrder: 0 }, memberFields: [['name', 'Name'], ['image', 'Image URL'], ['position', 'Position'], ['bio', 'Bio', 'textarea'], ['sortOrder', 'Display order', 'number']] },
}

const empty = (values) => ({ ...values })

function Field({ definition, value, onChange, required = true }) {
  const [name, label, type] = definition
  const common = { name, value: value ?? '', onChange, required, className: 'mt-1.5 w-full rounded-lg border border-line bg-cream px-3 py-2.5 text-sm font-normal outline-none focus:border-lime-dark' }
  return <label className="block text-xs font-semibold text-ink">{label}{type === 'textarea' ? <textarea {...common} rows={4} /> : <input {...common} type={type === 'number' ? 'number' : 'text'} />}</label>
}

export default function AboutManager() {
  const [activeKey, setActiveKey] = useState('hero')
  const [records, setRecords] = useState([])
  const [form, setForm] = useState(empty(tabs.hero.defaults))
  const [editingId, setEditingId] = useState(null)
  const [selectedSectionId, setSelectedSectionId] = useState(null)
  const [memberForm, setMemberForm] = useState(empty(tabs.people.memberDefaults))
  const [memberEditingId, setMemberEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)
  const definition = tabs[activeKey]
  const nested = activeKey === 'people' || activeKey === 'management'

  const loadRecords = async () => {
    setLoading(true)
    try {
      const result = await api[definition.get]()
      setRecords(result.data || [])
      if (nested && result.data?.length && !result.data.some((item) => item.id === selectedSectionId)) setSelectedSectionId(result.data[0].id)
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
    setMemberEditingId(null)
    setMemberForm(empty(definition.memberDefaults || {}))
    setMessage(null)
    loadRecords()
  }, [activeKey])

  const updateForm = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const updateMemberForm = (event) => setMemberForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const normalize = (data, fields) => {
    const payload = { ...data }
    fields.forEach(([key, , type]) => { if (type === 'number' && payload[key] !== '') payload[key] = Number(payload[key]) })
    return payload
  }

  const submitSection = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      const payload = normalize(form, definition.fields)
      if (editingId) await api[definition.update](editingId, payload)
      else await api[definition.create](payload)
      setMessage({ type: 'success', text: editingId ? 'About section updated.' : 'About section created.' })
      setEditingId(null)
      setForm(empty(definition.defaults))
      await loadRecords()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally { setBusy(false) }
  }

  const editSection = (record) => {
    setForm(Object.fromEntries(definition.fields.map(([key]) => [key, record[key] ?? ''])))
    setEditingId(record.id)
    if (nested) setSelectedSectionId(record.id)
  }

  const deleteSection = async (id) => {
    if (!window.confirm('Delete this About section and its members?')) return
    setBusy(true)
    try { await api[definition.remove](id); setMessage({ type: 'success', text: 'About section deleted.' }); await loadRecords() } catch (error) { setMessage({ type: 'error', text: error.message }) } finally { setBusy(false) }
  }

  const submitMember = async (event) => {
    event.preventDefault()
    if (!selectedSectionId) return
    setBusy(true)
    try {
      const payload = normalize(memberForm, definition.memberFields)
      if (memberEditingId) await api[definition.memberUpdate](memberEditingId, payload)
      else await api[definition.memberCreate](selectedSectionId, payload)
      setMessage({ type: 'success', text: memberEditingId ? 'Member updated.' : 'Member added.' })
      setMemberEditingId(null)
      setMemberForm(empty(definition.memberDefaults))
      await loadRecords()
    } catch (error) { setMessage({ type: 'error', text: error.message }) } finally { setBusy(false) }
  }

  const editMember = (member) => { setMemberEditingId(member.id); setMemberForm(Object.fromEntries(definition.memberFields.map(([key]) => [key, member[key] ?? '']))) }
  const deleteMember = async (id) => {
    if (!window.confirm('Delete this member?')) return
    setBusy(true)
    try { await api[definition.memberRemove](id); setMessage({ type: 'success', text: 'Member deleted.' }); await loadRecords() } catch (error) { setMessage({ type: 'error', text: error.message }) } finally { setBusy(false) }
  }

  const selectedSection = records.find((record) => record.id === selectedSectionId)

  return <section className="mt-10" aria-label="About content management">
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">About content</p><h2 className="font-display mt-1 text-2xl font-medium text-ink">Manage the About page data</h2></div><button onClick={loadRecords} title="Refresh records" className="inline-flex items-center gap-2 self-start rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-soft hover:border-ink hover:text-ink"><RotateCcw size={14} /> Refresh</button></div>
    <div className="flex gap-2 overflow-x-auto border-b border-line pb-2">{Object.entries(tabs).map(([key, item]) => <button key={key} onClick={() => setActiveKey(key)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${activeKey === key ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-white hover:text-ink'}`}>{item.label}</button>)}</div>
    {message && <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-lime-light text-lime-dark'}`}>{message.type === 'error' ? <X size={14} /> : <Check size={14} />}{message.text}</div>}
    <div className="mt-5 grid gap-5 xl:grid-cols-[360px_1fr]">
      <form onSubmit={submitSection} className="rounded-2xl border border-line bg-white p-5"><div className="flex items-center justify-between"><h3 className="font-display text-xl font-medium text-ink">{editingId ? 'Edit section' : 'Add section'}</h3>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(empty(definition.defaults)) }} title="Cancel editing"><X size={17} /></button>}</div><div className="mt-5 space-y-3">{definition.fields.map((field) => <Field key={field[0]} definition={field} value={form[field[0]]} onChange={updateForm} />)}</div><button disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream hover:bg-lime-dark disabled:opacity-50">{editingId ? <Edit3 size={15} /> : <Plus size={15} />}{busy ? 'Saving...' : editingId ? 'Update section' : 'Create section'}</button></form>
      <div className="min-w-0 rounded-2xl border border-line bg-white p-5"><h3 className="font-display text-xl font-medium text-ink">{definition.label}</h3>{loading ? <p className="py-12 text-center text-sm text-ink-soft">Loading About records...</p> : records.length === 0 ? <p className="py-12 text-center text-sm text-ink-soft">No records yet. Add the first one.</p> : <div className="mt-4 space-y-3">{records.map((record) => <div key={record.id} className={`rounded-xl border p-4 ${selectedSectionId === record.id ? 'border-lime-dark bg-lime-light/40' : 'border-line'}`}><div className="flex items-start justify-between gap-3"><button type="button" onClick={() => nested && setSelectedSectionId(record.id)} className="text-left"><p className="text-sm font-semibold text-ink">{record.title || record.description?.slice(0, 70)}</p><p className="mt-1 line-clamp-2 text-xs text-ink-soft">{record.description}</p></button><div className="flex shrink-0 gap-2"><button onClick={() => editSection(record)} title="Edit section" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-ink"><Edit3 size={14} /></button><button onClick={() => deleteSection(record.id)} title="Delete section" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-soft hover:text-red-600"><Trash2 size={14} /></button></div></div>{nested && selectedSectionId === record.id && <div className="mt-4 border-t border-line pt-4"><div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wider text-lime-dark">Members</p><span className="text-xs text-ink-soft">{record.members?.length || 0} records</span></div><div className="space-y-2">{(record.members || []).map((member) => <div key={member.id} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2"><div className="min-w-0"><p className="truncate text-xs font-semibold text-ink">{member.name}</p><p className="truncate text-xs text-ink-soft">{member.position || member.bio}</p></div><div className="flex shrink-0 gap-1"><button onClick={() => editMember(member)} title="Edit member" className="p-1.5 text-ink-soft hover:text-ink"><Edit3 size={13} /></button><button onClick={() => deleteMember(member.id)} title="Delete member" className="p-1.5 text-ink-soft hover:text-red-600"><Trash2 size={13} /></button></div></div>)}</div><form onSubmit={submitMember} className="mt-4 grid gap-2 sm:grid-cols-2">{definition.memberFields.map((field) => <Field key={field[0]} definition={field} value={memberForm[field[0]]} onChange={updateMemberForm} required={field[0] !== 'image'} />)}<button disabled={busy} className="flex items-center justify-center gap-2 rounded-lg bg-lime px-3 py-2 text-xs font-semibold text-ink hover:bg-lime-dark sm:col-span-2">{memberEditingId ? <Edit3 size={13} /> : <Plus size={13} />}{memberEditingId ? 'Update member' : 'Add member'}</button></form></div>}</div>)}</div>}</div>
    </div>
  </section>
}

import { useEffect, useState } from 'react'
import { ArrowUpRight, BarChart3, FileText, LogOut, MessageSquareWarning, Newspaper, ShieldCheck, Users, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import ImpactManager from './ImpactManager'
import AboutManager from './AboutManager'
import ServicesManager from './ServicesManager'
import CareerManager from './CareerManager'
import ContactManager from './ContactManager'
import NewsManager from './NewsManager'
import FaqManager from './FaqManager'
import PublicationsManager from './PublicationsManager'
import PrivacyPolicyManager from './PrivacyPolicyManager'
import PolicyManager from './PolicyManager'
import WhistleblowingManager from './WhistleblowingManager'
import RatingsManager from './RatingsManager'

const resources = [
  { label: 'News', path: '/resources/news', icon: Newspaper, api: 'getNews', tone: 'bg-lime-light text-lime-dark' },
  { label: 'Publications', path: '/resources/publications', icon: FileText, api: 'getPublications', tone: 'bg-sky-50 text-sky-700' },
  { label: 'Policies', path: '/resources/policies', icon: ShieldCheck, api: 'getPolicies', tone: 'bg-amber-50 text-amber-700' },
  { label: 'Whistleblowing', path: '/resources/whistleblowing', icon: MessageSquareWarning, api: 'getReports', tone: 'bg-rose-50 text-rose-700' },
]

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [counts, setCounts] = useState({})
  const [status, setStatus] = useState('Loading live content...')

  useEffect(() => {
    Promise.all(resources.map(async ({ api: apiMethod, label }) => {
      try {
        const response = await api[apiMethod]()
        return [label, response.data?.length || 0]
      } catch {
        return [label, null]
      }
    })).then((entries) => {
      setCounts(Object.fromEntries(entries))
      setStatus('Live content overview')
    })
  }, [])

  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/admin" className="font-display text-2xl font-medium text-ink">ICGL<span className="text-lime-dark">.</span><span className="ml-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">Workspace</span></Link>
          <div className="flex items-center gap-4"><div className="hidden text-right sm:block"><p className="text-sm font-semibold text-ink">{user?.name}</p><p className="text-xs text-ink-soft">{user?.email}</p></div><button onClick={signOut} title="Sign out" className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ink-soft transition hover:border-ink hover:text-ink"><LogOut size={17} /></button></div>
        </div>
      </header>
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <section className="relative overflow-hidden rounded-2xl bg-ink px-7 py-8 text-cream sm:px-10 sm:py-10"><div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[36px] border-lime/20" /><div className="relative"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">{status}</p><h1 className="font-display mt-3 max-w-2xl text-4xl font-medium leading-tight sm:text-5xl">Good to see you, {user?.name?.split(' ')[0] || 'there'}.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-slate">Your central view of the public-facing content system. Choose a resource to continue shaping the site.</p></div></section>
        <section className="mt-10"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">Content pulse</p><h2 className="font-display mt-1 text-2xl font-medium text-ink">Your resource library</h2></div><span className="hidden text-xs text-ink-soft sm:block">Updated from the API</span></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6"><Link to="#impact-manager" className="group rounded-2xl border border-line bg-ink p-5 text-cream transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-lime text-ink"><BarChart3 size={19} /></span><ArrowUpRight size={17} className="text-slate transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream" /></div><p className="mt-8 text-sm font-semibold">Impact</p><p className="mt-1 font-display text-3xl">Manage</p><p className="mt-1 text-xs text-slate">five API resources</p></Link><Link to="#about-manager" className="group rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-lime-light text-lime-dark"><Info size={19} /></span><ArrowUpRight size={17} className="text-ink-soft transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" /></div><p className="mt-8 text-sm font-semibold text-ink">About</p><p className="mt-1 font-display text-3xl text-ink">Manage</p><p className="mt-1 text-xs text-ink-soft">four API resources</p></Link>{resources.map(({ label, path, icon: Icon, tone }) => <Link key={label} to={path} className="group rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"><div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}><Icon size={19} /></span><ArrowUpRight size={17} className="text-ink-soft transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" /></div><p className="mt-8 text-sm font-semibold text-ink">{label}</p><p className="mt-1 font-display text-3xl text-ink">{counts[label] ?? '—'}</p><p className="mt-1 text-xs text-ink-soft">records available</p></Link>)}</div></section>
        <div id="impact-manager"><ImpactManager /></div>
        <div id="about-manager"><AboutManager /></div>
        <div id="services-manager"><ServicesManager /></div>
        <div id="career-manager"><CareerManager /></div>
        <div id="contact-manager"><ContactManager /></div>
        <div id="news-manager"><NewsManager /></div>
        <div id="faq-manager"><FaqManager /></div>
        <div id="publications-manager"><PublicationsManager /></div>
        <div id="privacy-policy-manager"><PrivacyPolicyManager /></div>
        <div id="policy-manager"><PolicyManager /></div>
        <div id="whistleblowing-manager"><WhistleblowingManager /></div>
        <div id="ratings-manager"><RatingsManager /></div>
        <section className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]"><div className="rounded-2xl border border-line bg-white p-7"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">Quick access</p><h2 className="font-display mt-2 text-2xl font-medium text-ink">Keep the public site close</h2><p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">Open the live site to review how content reads in context, then return here to manage the next update.</p><Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-lime px-4 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark">View public site <ArrowUpRight size={16} /></Link></div><div className="rounded-2xl bg-lime-light p-7"><Users size={20} className="text-lime-dark" /><p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">Account session</p><p className="mt-2 text-sm leading-6 text-ink-soft">You are signed in with an active development session. Sign out when working from a shared machine.</p></div></section>
      </div>
    </main>
  )
}

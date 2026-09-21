import { useState } from 'react'
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AuthPage({ mode = 'sign-in' }) {
  const isSignUp = mode === 'sign-up'
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (isSignUp) await signUp(form)
      else await signIn({ email: form.email, password: form.password })
      navigate(location.state?.from?.pathname || '/admin', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="grid min-h-screen bg-cream lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-ink p-12 text-cream lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-lime/30" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border-[56px] border-slate/20" />
        <Link to="/" className="relative z-10 font-display text-2xl font-medium">ICGL<span className="text-lime">.</span></Link>
        <div className="relative z-10 max-w-lg">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-lime">Content operations</p>
          <h1 className="font-display text-6xl font-medium leading-[0.98]">Keep the story moving.</h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-slate">A focused workspace for the people shaping ICGL&apos;s public information, resources, and impact narrative.</p>
          <div className="mt-10 flex flex-col gap-4 text-sm text-cream/80">
            <span className="flex items-center gap-3"><CheckCircle2 size={18} className="text-lime" /> One place for every content surface</span>
            <span className="flex items-center gap-3"><ShieldCheck size={18} className="text-lime" /> Secure, cookie-based sessions</span>
          </div>
        </div>
        <p className="relative z-10 text-xs text-slate">Impact Credit Guarantee Limited · Admin workspace</p>
      </section>

      <section className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden"><Link to="/" className="font-display text-2xl font-medium">ICGL<span className="text-lime-dark">.</span></Link></div>
          <div className="mb-8">
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-lime-light text-lime-dark"><LockKeyhole size={20} /></div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-dark">Admin workspace</p>
            <h2 className="font-display mt-2 text-4xl font-medium text-ink">{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{isSignUp ? 'Set up your development account and start managing the site.' : 'Sign in to manage ICGL content and submissions.'}</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {isSignUp && <label className="block text-sm font-medium text-ink">Full name<input name="name" value={form.name} onChange={updateField} required className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3.5 font-normal outline-none transition focus:border-lime-dark" placeholder="Your name" /></label>}
            <label className="block text-sm font-medium text-ink">Email address<input type="email" name="email" value={form.email} onChange={updateField} required className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3.5 font-normal outline-none transition focus:border-lime-dark" placeholder="you@company.com" /></label>
            <label className="block text-sm font-medium text-ink">Password<input type="password" name="password" value={form.password} onChange={updateField} required minLength={6} className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3.5 font-normal outline-none transition focus:border-lime-dark" placeholder="At least 6 characters" /></label>
            {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button disabled={busy} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-4 text-sm font-semibold text-cream transition hover:bg-lime-dark disabled:cursor-wait disabled:opacity-60">{busy ? 'Working...' : isSignUp ? 'Create account' : 'Sign in'}<ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button>
          </form>
          <p className="mt-7 text-center text-sm text-ink-soft">{isSignUp ? 'Already have an account?' : 'Need an account?'} <Link to={isSignUp ? '/admin/sign-in' : '/admin/sign-up'} className="font-semibold text-ink underline decoration-lime-dark decoration-2 underline-offset-4">{isSignUp ? 'Sign in' : 'Create one'}</Link></p>
        </div>
      </section>
    </main>
  )
}

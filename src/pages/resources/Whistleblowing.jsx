import { useState } from 'react'
import { useEffect } from 'react'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { Phone, Mail, Globe, ShieldCheck, EyeOff, Scale } from 'lucide-react'
import { api } from '../../lib/api'

export default function Whistleblowing() {
  const [sent, setSent] = useState(false)
  const [reportable, setReportable] = useState([])
  const [protections, setProtections] = useState([])
  const [channels, setChannels] = useState([])
  const [hero, setHero] = useState(null)

  useEffect(() => {
    Promise.all([
      api.getWhistleblowingHeroes(),
      api.getReportableConduct(),
      api.getWhistleblowerProtections(),
      api.getReportingChannels(),
    ]).then(([heroResult, reportableResult, protectionResult, channelResult]) => {
      setHero(heroResult.data?.[0] || null)
      setReportable(reportableResult.data || [])
      setProtections(protectionResult.data || [])
      setChannels(channelResult.data || [])
    }).catch(() => {})
  }, [])

  const submitReport = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      await api.createWhistleblowingReport({
        name: formData.get('name'),
        phone: formData.get('phone'),
        typeOfConcern: formData.get('typeOfConcern'),
        descriptionOfConcern: formData.get('descriptionOfConcern'),
      })
      setSent(true)
    } catch {
      setSent(false)
    }
  }

  return (
    <>
      <PageHero
        title="Speak Up. Your Voice Matters."
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'Whistleblowing' }]}
      />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 lg:px-10">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-soft">
              {hero?.whistleblowingHeroDescription || 'ICGL is committed to maintaining the highest standards of ethics, integrity, and accountability. If you observe or suspect any form of misconduct, fraud, corruption, or unethical behaviour within or involving ICGL, we encourage you to report it. All reports are treated with the strictest confidentiality, and reporters are protected from retaliation.'}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Reportable conduct
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              What can you report?
            </h2>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reportable.map((r) => (
              <StaggerItem key={r.title} className="rounded-2xl border border-ink/10 bg-cream p-6">
                <h3 className="font-display text-lg font-medium text-ink">{r.title}</h3>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {r.list.map((i) => (
                    <li key={i} className="text-xs leading-relaxed text-ink-soft">
                      &bull; {i}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Reporting channels
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              How to make a report
            </h2>
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-8 lg:grid-cols-3">
            {channels.map((channel, index) => {
              const Icon = [Phone, Mail, Globe][index % 3]
              return (
                <StaggerItem key={channel.id} className="rounded-2xl border border-ink/10 p-7">
                  <h3 className="font-display text-lg font-medium text-ink">{channel.title}</h3>
                  <p className="mt-1 text-xs text-ink-soft">{channel.description}</p>
                  <ul className="mt-5 flex flex-col gap-4 text-sm text-ink-soft">
                    {channel.phone && <li className="flex items-center gap-2"><Phone size={16} className="shrink-0 text-lime-dark" />{channel.phone}</li>}
                    {channel.email && <li className="flex items-center gap-2"><Mail size={16} className="shrink-0 text-lime-dark" />{channel.email}</li>}
                    {channel.website && <li className="flex items-center gap-2"><Icon size={16} className="shrink-0 text-lime-dark" /><a href={channel.website} target="_blank" rel="noreferrer" className="underline">{channel.website}</a></li>}
                  </ul>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Whistleblower Protections
            </h2>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {protections.map(({ title, description }, index) => {
              const Icon = [EyeOff, ShieldCheck, EyeOff, Scale][index % 4]
              return (
              <StaggerItem key={title} className="rounded-2xl border border-ink/10 bg-cream p-6">
                <Icon size={20} className="text-lime-dark" />
                <h3 className="font-display mt-3 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
              </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink">
              Submit a Whistleblowing Report
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              You may leave the identity fields blank to submit anonymously.
            </p>

            {sent ? (
              <p className="mt-6 rounded-xl bg-lime-light px-5 py-4 text-sm text-ink">
                Your report has been submitted. ICGL&rsquo;s compliance team
                will review it promptly.
              </p>
            ) : (
              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={submitReport}
              >
                <input
                  name="name"
                  placeholder="Your name (optional)"
                  className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none"
                />
                <input
                  name="phone"
                  placeholder="Phone number (optional)"
                  className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none"
                />
                <select
                  name="typeOfConcern"
                  required
                  defaultValue=""
                  className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink transition focus:border-lime-dark focus:outline-none sm:col-span-2"
                >
                  <option value="" disabled>Type of concern *</option>
                  <option>Financial Misconduct / Fraud</option>
                  <option>Bribery or Corruption</option>
                  <option>Code of Conduct Violation</option>
                  <option>Harassment or Discrimination</option>
                  <option>Regulatory or Legal Violation</option>
                  <option>Data Protection Breach</option>
                  <option>Other</option>
                </select>
                <textarea
                  name="descriptionOfConcern"
                  required
                  rows={5}
                  placeholder="Description of the concern *"
                  className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none sm:col-span-2"
                />
                <button
                  type="submit"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-lime-dark sm:col-span-2"
                >
                  Submit report
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}

import { useState } from 'react'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { Phone, Mail, Globe, ShieldCheck, EyeOff, Scale } from 'lucide-react'

const reportable = [
  {
    title: 'Financial Misconduct',
    items: ['Fraud, embezzlement, or theft of ICGL assets', 'Falsification of financial records or reports', 'Misappropriation of guarantee funds or proceeds', 'Unauthorised transactions or payments', 'Money laundering or facilitation thereof'],
  },
  {
    title: 'Bribery & Corruption',
    items: ['Offering or accepting bribes or kickbacks', 'Soliciting gifts, payments, or benefits improperly', 'Conflicts of interest that are not declared', 'Abuse of authority or position for personal gain', 'Corrupt dealings with government officials or counterparties'],
  },
  {
    title: 'Misconduct & Unethical Behaviour',
    items: ["Violation of ICGL's Code of Conduct", 'Harassment, discrimination, or workplace bullying', 'Unauthorised disclosure of confidential information', 'Falsification of credentials or identity', 'Non-compliance with regulatory requirements'],
  },
  {
    title: 'Regulatory & Legal Violations',
    items: ['Breaches of AML/CFT obligations', 'Violation of data protection and privacy laws', 'Environmental or social policy violations', 'Failure to report material information to regulators', "Deliberate circumvention of ICGL's governance processes"],
  },
]

const protections = [
  { icon: EyeOff, title: 'Confidentiality', body: 'Your identity is kept strictly confidential. Reports are accessible only to authorised compliance personnel.' },
  { icon: ShieldCheck, title: 'No Retaliation', body: 'ICGL strictly prohibits any form of retaliation against anyone who makes a good-faith report under this policy.' },
  { icon: EyeOff, title: 'Anonymity Option', body: 'You may submit a report anonymously. ICGL will investigate all credible reports regardless of whether you identify yourself.' },
  { icon: Scale, title: 'Fair Investigation', body: 'Every report is investigated thoroughly, fairly, and impartially by our independent compliance team.' },
]

export default function Whistleblowing() {
  const [sent, setSent] = useState(false)

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
              ICGL is committed to maintaining the highest standards of ethics,
              integrity, and accountability. If you observe or suspect any form
              of misconduct, fraud, corruption, or unethical behaviour within
              or involving ICGL, we encourage you to report it. All reports are
              treated with the strictest confidentiality, and reporters are
              protected from retaliation.
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
                  {r.items.map((i) => (
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
            <StaggerItem className="rounded-2xl border border-ink/10 p-7">
              <h3 className="font-display text-lg font-medium text-ink">External Channels</h3>
              <p className="mt-1 text-xs text-ink-soft">Managed independently by Deloitte Tip-Offs Anonymous</p>
              <ul className="mt-5 flex flex-col gap-4 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-lime-dark" />
                  0800-TIP-OFFS (0800-847-6337)
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-lime-dark" />
                  tip-offs@deloitte.com.ng
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={16} className="shrink-0 text-lime-dark" />
                  <a
                    href="https://tip-offs.deloitte.com.ng/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    tip-offs.deloitte.com.ng
                  </a>
                </li>
              </ul>
            </StaggerItem>

            <StaggerItem className="rounded-2xl border border-ink/10 p-7">
              <h3 className="font-display text-lg font-medium text-ink">Internal Channels</h3>
              <p className="mt-1 text-xs text-ink-soft">Handled exclusively by ICGL's compliance officers</p>
              <ul className="mt-5 flex flex-col gap-4 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-lime-dark" />
                  0812-048-2163
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-lime-dark" />
                  whistleblow@impactguaranteeng.com
                </li>
              </ul>
            </StaggerItem>

            <StaggerItem className="rounded-2xl border border-ink/10 p-7">
              <h3 className="font-display text-lg font-medium text-ink">Regulatory Channel</h3>
              <p className="mt-1 text-xs text-ink-soft">Central Bank of Nigeria</p>
              <ul className="mt-5 flex flex-col gap-4 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-lime-dark" />
                  +234 700 225 5226
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-lime-dark" />
                  contactcbn@cbn.gov.ng
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={16} className="shrink-0 text-lime-dark" />
                  <a
                    href="https://www.cbn.gov.ng/contacts/complaints/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    cbn.gov.ng/contacts/complaints
                  </a>
                </li>
              </ul>
            </StaggerItem>
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
            {protections.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="rounded-2xl border border-ink/10 bg-cream p-6">
                <Icon size={20} className="text-lime-dark" />
                <h3 className="font-display mt-3 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
              </StaggerItem>
            ))}
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
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <input
                  placeholder="Your name (optional)"
                  className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none"
                />
                <input
                  placeholder="Phone number (optional)"
                  className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none"
                />
                <select
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

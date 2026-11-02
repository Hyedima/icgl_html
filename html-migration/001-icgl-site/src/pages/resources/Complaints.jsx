import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { Headphones, ShieldCheck, Clock, CheckCircle2, Mail, Phone } from 'lucide-react'

const categories = [
  { title: 'Service Quality', body: 'Delays, unclear communication, or a poor experience while dealing with ICGL directly.' },
  { title: 'Guarantee & Claims Processing', body: 'Concerns about how a guarantee application, review, or claim was handled.' },
  { title: 'PFI-Related Issues', body: 'A complaint about how a Participating Financial Institution represented ICGL or its products.' },
  { title: 'Staff Conduct', body: 'Concerns about the professionalism or conduct of an ICGL employee or representative.' },
]

const steps = [
  { n: '01', title: 'Submit your complaint', body: 'Fill in the form below with as much detail as possible, or reach us by phone or email.' },
  { n: '02', title: 'Acknowledgement', body: 'You will receive an acknowledgement within 2 business days confirming your complaint has been logged.' },
  { n: '03', title: 'Investigation', body: 'Our team reviews the complaint, gathers relevant information, and investigates the matter thoroughly.' },
  { n: '04', title: 'Resolution', body: 'We communicate the outcome and any corrective action within 10 business days of acknowledgement.' },
]

const commitments = [
  { icon: Headphones, title: 'We Listen', body: 'Every complaint is read and logged by our customer support team, regardless of size.' },
  { icon: Clock, title: 'Timely Response', body: 'Acknowledged within 2 business days, resolved within 10 business days wherever possible.' },
  { icon: ShieldCheck, title: 'Fair Handling', body: 'Every complaint is investigated objectively, without bias toward any party.' },
  { icon: CheckCircle2, title: 'Follow-Through', body: "We track complaints to resolution and confirm the outcome with you directly." },
]

export default function Complaints() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHero
        eyebrow="Customer Support"
        title="We're Here to Help"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'Complaints' }]}
      />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 lg:px-10">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-soft">
              ICGL is committed to providing a fair, transparent, and
              responsive service to every MSME, Participating Financial
              Institution, and member of the public we deal with. If we have
              fallen short in any way, we want to know about it so we can put
              it right.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              What you can complain about
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Common complaint categories
            </h2>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <StaggerItem
                key={c.title}
                className="rounded-2xl border border-ink/10 bg-cream p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-display text-lg font-medium text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              How it works
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Our resolution process
            </h2>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <StaggerItem
                key={s.n}
                className="rounded-2xl border border-ink/10 bg-lime-light p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="font-display text-2xl font-medium text-lime-dark">{s.n}</span>
                <h3 className="font-display mt-3 text-lg font-medium text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Our commitment to you
            </h2>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="rounded-2xl border border-ink/10 bg-cream p-6">
                <Icon size={20} className="text-lime-dark" />
                <h3 className="font-display mt-3 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section id="submit-complaint" className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink">
              Submit a Complaint
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Prefer to talk to someone directly? Call{' '}
              <a href="tel:+2342019061000" className="font-medium text-ink underline">
                +234 201 906 1000
              </a>{' '}
              or visit our{' '}
              <Link to="/contact" className="font-medium text-ink underline">
                Contact page
              </Link>
              .
            </p>

            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.p
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 rounded-xl bg-lime-light px-5 py-4 text-sm text-ink"
                >
                  Your email app should open with your complaint addressed to
                  ICGL. Send the email to submit it to our team.
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 grid gap-4 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const subject = `PFI enquiry: ${formData.get('category')}`
                    const body = [
                      `Name: ${formData.get('name')}`,
                      `Email: ${formData.get('email')}`,
                      `Phone: ${formData.get('phone') || 'Not provided'}`,
                      '',
                      `Message: ${formData.get('message')}`,
                    ].join('\n')
                    window.location.href = `mailto:info@impactguaranteeng.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                    setSent(true)
                  }}
                >
                  <input
                    required
                    name="name"
                    placeholder="Full name"
                    className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none"
                  />
                  <input
                    name="phone"
                    placeholder="Phone number (optional)"
                    className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none sm:col-span-2"
                  />
                  <select
                    required
                    name="category"
                    defaultValue=""
                    className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink transition focus:border-lime-dark focus:outline-none sm:col-span-2"
                  >
                    <option value="" disabled>Complaint category *</option>
                    <option>Service Quality</option>
                    <option>Guarantee & Claims Processing</option>
                    <option>PFI-Related Issue</option>
                    <option>Staff Conduct</option>
                    <option>Other</option>
                  </select>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Describe your complaint *"
                    className="rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none sm:col-span-2"
                  />
                  <button
                    type="submit"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition duration-150 ease-out hover:bg-lime-dark active:scale-[0.97] sm:col-span-2"
                  >
                    Open email to submit
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>
    </>
  )
}

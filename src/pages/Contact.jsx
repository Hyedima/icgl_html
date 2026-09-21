import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import { MapPin, Phone, Mail } from 'lucide-react'
import { api } from '../lib/api'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [contact, setContact] = useState({})

  useEffect(() => {
    api.getContactWhoWeAre().then((result) => setContact(result.data?.[0] || {})).catch(() => {})
  }, [])

  const submitMessage = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      await api.createContactMessage({ fullName: formData.get('fullName'), email: formData.get('email'), phoneNumber: formData.get('phoneNumber'), message: formData.get('message') })
      setSent(true)
    } catch {
      setSent(false)
    }
  }

  return (
    <>
      <PageHero eyebrow="Contact Us" title="Get in Touch" crumbs={[{ label: 'Contact' }]} />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-5 lg:px-10 lg:py-20">
          <Reveal direction="left" className="lg:col-span-2">
            <h2 className="font-display text-2xl font-medium text-ink">Who We Are</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {contact.description || `ICGL was established to drive the second mandate of DBN, which
              is to provide risk sharing facilities to PFIs with a view to
              alleviating the financing constraint faced by MSMEs and small
              corporates in Nigeria. Less than 5% of Nigeria&rsquo;s 41.5
              million MSMEs have access to finance &mdash; a gap of ₦48
              trillion.`}
            </p>

            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-lime-dark" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">Location</p>
                  <p className="mt-1 text-sm text-ink">{contact.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-lime-dark" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">Phone</p>
                  <a href={`tel:${contact.phone}`} className="mt-1 block text-sm text-ink">
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-lime-dark" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">Email</p>
                  <a href={`mailto:${contact.email}`} className="mt-1 block text-sm text-ink">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10">
              <iframe
                title="ICGL office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6872846196!2d3.4205!3d6.4317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53b7a1b1e49%3A0x0!2sPlot%20952%2F953%20Idejo%20Street%2C%20Victoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border border-ink/10 bg-lime-light p-8">
              <h2 className="font-display text-xl font-medium text-ink">
                Drop us a message and we&rsquo;ll get back to you
              </h2>

              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 rounded-xl bg-cream px-5 py-4 text-sm text-ink"
                  >
                    Your message has been sent. We&rsquo;ll be in touch shortly.
                  </motion.p>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 grid gap-4 sm:grid-cols-2"
                    onSubmit={submitMessage}
                  >
                    <input
                      required
                      name="fullName"
                      placeholder="Full name"
                      className="rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none"
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email address"
                      className="rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none"
                    />
                    <input
                      name="phoneNumber"
                      placeholder="Phone number"
                      className="rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none sm:col-span-2"
                    />
                    <textarea
                      required
                      rows={5}
                      name="message"
                      placeholder="Your message"
                      className="rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition focus:border-lime-dark focus:outline-none sm:col-span-2"
                    />
                    <label className="flex items-start gap-2 text-xs text-ink-soft sm:col-span-2">
                      <input required type="checkbox" className="mt-0.5" />
                      I consent to the processing of my personal data in line
                      with ICGL&rsquo;s Privacy Policy.
                    </label>
                    <button
                      type="submit"
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition duration-150 ease-out hover:bg-lime-dark active:scale-[0.97] sm:col-span-2"
                    >
                      Send message
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

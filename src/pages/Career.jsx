import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem, staggerContainer, staggerItem } from '../components/motion/StaggerGroup'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { ImagePlaceholder } from '../components/Placeholders'
import { api } from '../lib/api'

export default function Career() {
  const [highlights, setHighlights] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [vacancies, setVacancies] = useState([])

  useEffect(() => {
    Promise.all([api.getCareerWhyJoinUsSections(), api.getCareerStaffTestimonials(), api.getCareerVacancies()]).then(([whyResult, testimonialResult, vacancyResult]) => {
      setHighlights((whyResult.data || []).flatMap((section) => (section.cards || []).map((card) => ({ ...card, body: card.description }))))
      setTestimonials(testimonialResult.data || [])
      setVacancies((vacancyResult.data || []).map((vacancy) => ({ ...vacancy, title: vacancy.role, deadline: vacancy.applicationDeadline })))
    }).catch(() => {})
  }, [])

  const testimonial = testimonials[0]

  return (
    <>
      <PageHero eyebrow="ICGL Career" title="Unlock Your Potential" crumbs={[{ label: 'Career' }]} />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">
                Join Impact Credit Guarantee Limited and help us bridge the
                financing gap. Take the first step towards your dream career in
                finance and play a pivotal role in driving economic growth and
                financial inclusion.
              </p>
              <a
                href="#vacancies"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-lime-dark"
              >
                Join our team
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
            <Reveal delay={0.15} direction="right">
              <ImagePlaceholder className="aspect-[4/3] w-full" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Why join us
            </span>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium leading-tight text-ink sm:text-4xl">
              A dynamic and supportive work environment
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">
              At ICGL, we foster continuous learning, diversity, and career
              growth &mdash; giving motivated people a platform to
              collaboratively tackle challenging projects and contribute to
              national development.
            </p>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h) => (
              <StaggerItem
                key={h.title}
                className="rounded-2xl border border-ink/10 bg-cream p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-display text-lg font-medium text-ink">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{h.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ImagePlaceholder label="Headshot placeholder" compact className="h-20 w-20 shrink-0 rounded-full" />
            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                Staff testimonial
              </span>
              <blockquote className="font-display mt-4 text-2xl font-medium leading-snug text-ink">
                &ldquo;{testimonial?.message || 'In a year, I have gained invaluable industry experience, technical skills, and a broader understanding of the field of Cybersecurity.'}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-ink-soft">
                {testimonial ? `${testimonial.staffName} — ${testimonial.staffPosition}` : 'Oluwatowo Akinbode — Information Security Analyst'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="vacancies" className="bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Available Vacancies
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 overflow-x-auto rounded-2xl border border-ink/10">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 bg-cream text-xs uppercase tracking-widest text-ink-soft">
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Application Deadline</th>
                  <th className="px-6 py-4" aria-hidden="true" />
                </tr>
              </thead>
              <motion.tbody
                className="bg-cream"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                {vacancies.map((v) => (
                  <motion.tr
                    key={v.slug}
                    variants={staggerItem}
                    className="group relative cursor-pointer border-b border-ink/10 transition last:border-0 hover:bg-lime-light/40"
                  >
                    <td className="px-6 py-4 font-medium text-ink">
                      <Link to={`/career/${v.slug}`} className="after:absolute after:inset-0">
                        {v.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-ink-soft">{v.location}</td>
                    <td className="px-6 py-4 text-ink-soft">{v.deadline}</td>
                    <td className="px-6 py-4 text-right text-ink-soft">
                      <ChevronRight
                        size={16}
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:text-lime-dark"
                      />
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </Reveal>
          <p className="mt-4 text-sm text-ink-soft">
            To apply, reach out via{' '}
            <a href="mailto:info@impactguaranteeng.com" className="font-medium text-ink underline">
              info@impactguaranteeng.com
            </a>{' '}
            with the role title in the subject line.
          </p>
        </div>
      </section>
    </>
  )
}

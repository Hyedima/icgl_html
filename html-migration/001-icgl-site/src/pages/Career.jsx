import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem, staggerContainer, staggerItem } from '../components/motion/StaggerGroup'
import { ArrowLeft, ArrowUpRight, ArrowRight, ChevronRight } from 'lucide-react'
import { VACANCIES, CORE_VALUES } from '../data/content'
import CareerImage from '../assets/career.jpg'
import TestimonialImage from '../assets/career1.jpg'
import TestimonialImageTwo from '../assets/career1_.jpg'
import TestimonialImageThree from '../assets/career-team.png'

const careerBenefits = [
  {
    title: 'Work Environment',
    body: 'Join a collaborative and supportive team working together on meaningful challenges that expand access to finance for Nigerian businesses.',
  },
  {
    title: 'Work-Life Balance',
    body: 'Build a rewarding career in an environment that values wellbeing, balance, and sustainable performance.',
  },
  {
    title: 'Career Growth & Development',
    body: 'Grow your expertise through continuous learning, varied projects, and opportunities to contribute to ICGL’s mission and national development.',
  },
]

const testimonials = [
  {
    quote: 'In a year, I have gained invaluable industry experience, technical skills, and a broader understanding of the field of Cybersecurity.',
    name: 'Oluwatowo Akinbode',
    role: 'Information Security Analyst',
    image: TestimonialImage,
  },
  {
    quote: 'ICGL has given me the space to grow, collaborate with brilliant people, and make a meaningful contribution to financial inclusion.',
    name: 'Amina Yusuf',
    role: 'Risk & Portfolio Analyst',
    image: TestimonialImageTwo,
  },
  {
    quote: 'Every project brings a new challenge and a new opportunity to learn. It is rewarding to see our work create real impact for businesses.',
    name: 'Chinedu Okafor',
    role: 'Programme Officer',
    image: TestimonialImageThree,
  },
]

export default function Career() {
  const reduceMotion = useReducedMotion()
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false)

  const showTestimonial = (index, direction) => {
    setSlideDirection(direction)
    setTestimonialIndex((index + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (reduceMotion || isTestimonialPaused) return undefined

    const timer = window.setInterval(() => {
      showTestimonial(testimonialIndex + 1, 1)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [isTestimonialPaused, reduceMotion, testimonialIndex])

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
              <motion.div
                className="group relative isolate aspect-[5/3] w-full overflow-hidden rounded-2xl bg-ink"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.img
                  src={CareerImage}
                  alt="Our team at work"
                  className="h-full w-full object-cover"
                  animate={reduceMotion ? undefined : {
                    scale: [1.03, 1.08, 1.03],
                    x: [0, -8, 0],
                    y: [0, 4, 0],
                  }}
                  transition={reduceMotion ? undefined : {
                    duration: 14,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/50 via-transparent to-lime/20 mix-blend-multiply"
                  animate={reduceMotion ? undefined : { opacity: [0.45, 0.2, 0.45] }}
                  transition={reduceMotion ? undefined : { duration: 7, ease: 'easeInOut', repeat: Infinity }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(238,246,218,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(238,246,218,0.18) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                  }}
                  aria-hidden="true"
                />
                <motion.div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-lime shadow-[0_0_18px_4px_rgba(169,208,70,0.65)]"
                  animate={reduceMotion ? undefined : { top: ['0%', '100%'] }}
                  transition={reduceMotion ? undefined : {
                    duration: 5,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-5 border border-cream/30" aria-hidden="true" />
                <div className="pointer-events-none absolute bottom-8 left-8 h-5 w-5 border-b-2 border-l-2 border-lime" aria-hidden="true" />
                <div className="pointer-events-none absolute right-8 top-8 h-5 w-5 border-r-2 border-t-2 border-lime" aria-hidden="true" />
                <span className="absolute bottom-8 right-8 text-[10px] font-medium uppercase tracking-[0.28em] text-cream/80">
                  {/* ICGL Team */}
                </span>
              </motion.div>
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
          <StaggerGroup className="mt-10 grid gap-6 lg:grid-cols-3">
            {careerBenefits.map((benefit) => (
              <StaggerItem
                key={benefit.title}
                className="rounded-2xl border border-ink/10 bg-cream p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-display text-lg font-medium text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{benefit.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              What guides us
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Our core values
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              The principles that shape how we work, lead, and build lasting impact across the communities we serve.
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map(({ icon: Icon, title, body }, index) => (
              <StaggerItem
                key={title}
                className="group rounded-2xl border border-ink/10 bg-cream p-7 transition duration-300 hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-ink">
                    <Icon size={20} />
                  </span>
                  <span className="font-display text-3xl font-medium text-lime/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display mt-7 text-xl font-medium text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
          <Reveal>
            <div
              className="relative"
              aria-roledescription="carousel"
              aria-label="Staff testimonials"
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
              onFocus={() => setIsTestimonialPaused(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsTestimonialPaused(false)
                }
              }}
            >
              <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
                <motion.div
                  key={testimonialIndex}
                  custom={slideDirection}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : slideDirection * 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduceMotion ? 0 : slideDirection * -48 }}
                  transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[240px] flex-col items-start gap-6 sm:flex-row sm:items-center"
                  aria-live="polite"
                >
                  <img
                    src={testimonials[testimonialIndex].image}
                    alt={testimonials[testimonialIndex].name}
                    className="h-24 w-24 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                      Staff testimonial
                    </span>
                    <blockquote className="font-display mt-4 text-2xl font-medium leading-snug text-ink">
                      &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
                    </blockquote>
                    <p className="mt-4 text-sm text-ink-soft">
                      {testimonials[testimonialIndex].name} &mdash; {testimonials[testimonialIndex].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                <div className="flex items-center gap-2" aria-label="Choose testimonial">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial.name}
                      type="button"
                      aria-label={`Show testimonial ${index + 1}`}
                      aria-current={index === testimonialIndex}
                      onClick={() => showTestimonial(index, index > testimonialIndex ? 1 : -1)}
                      className={`h-2 rounded-full transition-all ${
                        index === testimonialIndex ? 'w-8 bg-lime-dark' : 'w-2 bg-ink/20 hover:bg-ink/40'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => showTestimonial(testimonialIndex - 1, -1)}
                    className="rounded-full border border-ink/15 p-2 text-ink transition hover:border-lime-dark hover:text-lime-dark"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => showTestimonial(testimonialIndex + 1, 1)}
                    className="rounded-full border border-ink/15 p-2 text-ink transition hover:border-lime-dark hover:text-lime-dark"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
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
                {VACANCIES.map((v) => (
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

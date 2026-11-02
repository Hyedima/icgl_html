import { GraduationCap, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../components/motion/StaggerGroup'
import IconPop from '../components/motion/IconPop'
import { GUARANTEE_TYPES } from '../data/content'
import servicesImage from '../assets/services-hero.jpg'
import partnershipImage from '../assets/asset-b8c75093.png'
import individualGuaranteeImage from '../assets/kvp-img.jpg'
import blanketGuaranteeImage from '../assets/hero-1.jpg'
import portfolioGuaranteeImage from '../assets/hero-2.jpg'
import technicalAssistanceImage from '../assets/hero-3.jpg'
import OtherImage from '../assets/guarantee.jpg'

const services = [
  { icon: GUARANTEE_TYPES[0].icon, title: GUARANTEE_TYPES[0].title, body: GUARANTEE_TYPES[0].summary, points: GUARANTEE_TYPES[0].points, image: technicalAssistanceImage, alt: 'Business owner reviewing growth figures' },
  { icon: GUARANTEE_TYPES[1].icon, title: GUARANTEE_TYPES[1].title, body: GUARANTEE_TYPES[1].summary, points: GUARANTEE_TYPES[1].points, image: portfolioGuaranteeImage, alt: 'Small business owner serving customers' },
  { icon: GUARANTEE_TYPES[2].icon, title: GUARANTEE_TYPES[2].title, body: GUARANTEE_TYPES[2].summary, points: GUARANTEE_TYPES[2].points, image: portfolioGuaranteeImage, alt: 'Entrepreneur presenting a new product' },
  { icon: GraduationCap, title: 'Technical Assistance', body: 'Specialised capacity building and advisory services to enhance PFI and MSME operational efficiency.', image: blanketGuaranteeImage, alt: 'Business partners working together' },
]

const whyUs = [
  { title: 'Strategic Risk Management', body: 'We leverage deep market insight and rigorous analysis to optimise guarantee portfolio performance and sustainable outcomes.' },
  { title: 'Tailored Guarantee Solutions', body: 'Our approach is never one-size-fits-all; we design guarantee structures that align with each PFI’s lending strategy and risk appetite.' },
  { title: 'Unwavering Integrity', body: 'We operate with complete transparency and adhere to the highest ethical standards in every guarantee we issue.' },
  { title: 'Sector Insight', body: 'Our team brings diverse expertise across MSME segments, providing a holistic view of the Nigerian lending landscape.' },
  { title: 'Proven Track Record', body: 'ICGL has consistently delivered value and stability for its partner financial institutions and the businesses they serve.' },
  { title: 'Partner-Centric Philosophy', body: 'PFI success is our primary metric; we prioritise long-term partnerships through proactive communication and support.' },
]

export default function Services() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <PageHero eyebrow="Our Services" title="What We Do" crumbs={[{ label: 'Services' }]} />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">
                ICGL delivers core services designed to strengthen access to
                finance and support sustainable economic growth. Through its
                services, ICGL shares lending risk with financial institutions,
                encouraging them to extend credit to viable businesses that might
                otherwise face financing constraints. In addition, ICGL provides
                Technical Assistance to partner financial institutions and
                businesses, helping strengthen capacity and improve risk
                management practices.
              </p>
            </Reveal>
            <Reveal delay={0.15} direction="right">
              <motion.div
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink"
                whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={servicesImage}
                  alt="Business partners collaborating on finance and growth"
                  className="h-full w-full object-cover"
                  animate={reduceMotion ? undefined : { scale: [1.02, 1.07, 1.02] }}
                  transition={reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-transparent to-lime/20" aria-hidden="true" />
                <div className="absolute inset-5 rounded-xl border border-cream/35" aria-hidden="true" />
                <span className="absolute bottom-8 left-8 text-xs font-medium uppercase tracking-[0.22em] text-cream">
                  Finance that moves business
                </span>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
            <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {services.map(({ icon: Icon, title, body, points, image, alt }, index) => (
                <StaggerItem
                  key={title}
                  className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
                >
                  <div className="relative h-36 overflow-hidden">
                    <motion.img
                      src={image}
                      alt={alt}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      initial={{ scale: 1.05 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-4 left-5 text-[10px] font-medium uppercase tracking-[0.2em] text-lime">
                      {String(index + 1).padStart(2, '0')} / ICGL offering
                    </span>
                  </div>
                  <div className="p-6">
                    <IconPop delay={0.1} className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream transition group-hover:bg-lime group-hover:text-ink">
                      <Icon size={20} />
                    </IconPop>
                    <h3 className="font-display mt-6 text-lg font-medium text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
                    {points && (
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
                        {points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <motion.div
              className="relative hidden h-[360px] overflow-hidden rounded-2xl bg-ink lg:flex"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <motion.img
                src={partnershipImage}
                alt="Financial partners working together"
                className="absolute inset-0 h-full w-full object-cover opacity-70"
                animate={reduceMotion ? undefined : { scale: [1.04, 1.1, 1.04], x: [0, -8, 0] }}
                transition={reduceMotion ? undefined : { duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10" aria-hidden="true" />
              <motion.div
                className="absolute left-8 top-8 h-20 w-20 rounded-full border border-lime/70"
                animate={reduceMotion ? undefined : { rotate: 360, scale: [1, 1.08, 1] }}
                transition={reduceMotion ? undefined : { rotate: { duration: 12, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                aria-hidden="true"
              />
              <div className="absolute inset-6 rounded-xl border border-cream/25" aria-hidden="true" />
              <div className="relative mt-auto p-8">
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-lime">
                  Built around partnership
                </span>
                <h3 className="font-display mt-3 max-w-none text-2xl font-medium leading-tight text-cream">
                  Shared risk. Greater opportunity.
                </h3>
                <p className="mt-3 max-w-none text-sm leading-relaxed text-cream/85">
                  Our guarantee structures help financial institutions 
                  confidently serve more viable businesses.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Why choose us
            </span>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium leading-tight text-ink sm:text-4xl">
              We merge market intelligence with disciplined execution
            </h2>
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w) => (
              <StaggerItem key={w.title}>
                <h3 className="font-display text-lg font-medium text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-cream sm:text-3xl">
              Ready to explore a guarantee-backed loan?
            </h2>
            <Link
              to="/eligibility"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-lime-dark hover:text-cream"
            >
              Check eligibility
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

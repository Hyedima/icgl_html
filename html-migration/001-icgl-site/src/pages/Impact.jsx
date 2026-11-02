import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem, staggerContainer, staggerItem } from '../components/motion/StaggerGroup'
import Counter from '../components/motion/Counter'
import impactHero from '../assets/impact-hero.jpg'
import impactBusiness from '../assets/kvp-img-web.jpg'
import impactPartnership from '../assets/bg2-web.jpg'
import {
  IMPACT_STATS,
  SECTOR_TABLE,
  ZONE_TABLE,
  PFI_CATEGORIES,
} from '../data/content'

function AnimatedMetric({ value, className = '' }) {
  const match = String(value).match(/^([>+≈₦]*)([\d,]+)(.*)$/)

  if (!match) return <span className={className}>{value}</span>

  const [, prefix, numericValue, suffix] = match
  return (
    <Counter
      value={Number(numericValue.replace(/,/g, ''))}
      prefix={prefix}
      suffix={suffix}
      className={className}
    />
  )
}

const IMPACT_STORIES = [
  {
    image: impactBusiness,
    eyebrow: 'Business growth',
    title: 'From idea to thriving enterprise',
    body: 'Guarantees help ambitious MSMEs access the capital they need to grow their teams, equipment and reach.',
    metric: '191,798+',
    metricLabel: 'jobs supported',
  },
  {
    image: impactHero,
    eyebrow: 'Better access',
    title: 'Finance that moves with business',
    body: 'We work with financial institutions to make funding more accessible for the businesses powering local economies.',
    metric: '₦452bn+',
    metricLabel: 'guarantees issued',
  },
  {
    image: impactPartnership,
    eyebrow: 'Shared momentum',
    title: 'Stronger businesses, stronger communities',
    body: 'Every supported business creates a ripple effect — building confidence, opportunity and resilient communities.',
    metric: '36 + FCT',
    metricLabel: 'states reached',
  },
]

function InteractiveImpactCard({ story, index }) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(50)
  const rotateX = useSpring(useTransform(pointerY, [0, 100], [6, -6]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(pointerX, [0, 100], [-6, 6]), { stiffness: 180, damping: 22 })
  const imageX = useSpring(useTransform(pointerX, [0, 100], [-10, 10]), { stiffness: 140, damping: 24 })
  const imageY = useSpring(useTransform(pointerY, [0, 100], [-10, 10]), { stiffness: 140, damping: 24 })
  const spotlight = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, rgba(169,208,70,0.42), transparent 34%)`

  const handlePointerMove = (event) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100)
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100)
  }

  const resetPointer = () => {
    pointerX.set(50)
    pointerY.set(50)
  }

  return (
    <motion.article
      className="group relative min-h-[460px] overflow-hidden rounded-3xl bg-ink shadow-xl"
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.img
        src={story.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={reduceMotion ? undefined : { x: imageX, y: imageY, scale: 1.12 }}
        transition={{ type: 'spring', stiffness: 140, damping: 24 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5 transition duration-500 group-hover:from-ink/95 group-hover:via-ink/45" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="absolute inset-5 rounded-2xl border border-cream/25 transition duration-500 group-hover:inset-4 group-hover:border-lime/70" />
      <motion.div
        className="absolute right-8 top-8 flex h-16 w-16 items-center justify-center rounded-full bg-lime text-center text-[10px] font-bold uppercase leading-tight tracking-wider text-ink shadow-lg"
        animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, 4, 0] }}
        transition={reduceMotion ? undefined : { duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
      >
        Explore
        <br />
        impact
      </motion.div>
      <div className="absolute inset-x-8 bottom-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-lime">{story.eyebrow}</p>
        <h3 className="font-display mt-3 max-w-xs text-3xl font-medium leading-tight text-cream">{story.title}</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">{story.body}</p>
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-cream/20 pt-4">
          <div>
            <p className="font-display text-2xl font-medium text-lime">
              <AnimatedMetric value={story.metric} />
            </p>
            <p className="text-xs uppercase tracking-widest text-cream/60">{story.metricLabel}</p>
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-cream/70 transition group-hover:text-lime">
            Move to discover
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Impact() {
  return (
    <>
      <PageHero eyebrow="Our Impact" title="Impact Dashboard" crumbs={[{ label: 'Impact' }]} />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal><p className="text-sm text-ink-soft">As of September 2025</p></Reveal>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT_STATS.map((s) => (
              <StaggerItem
                key={s.label}
                className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
              >
                <dt className="text-xs uppercase tracking-widest text-ink-soft">{s.label}</dt>
                <dd className="font-display mt-3 text-3xl font-medium text-lime-dark">
                  <AnimatedMetric value={s.value} />
                </dd>
                <p className="mt-1 text-xs font-medium text-lime-dark">
                  <AnimatedMetric value={s.delta} />
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <StaggerGroup className="mt-4 grid gap-4 sm:grid-cols-2">
            <StaggerItem className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg">
              <dt className="text-xs uppercase tracking-widest text-ink-soft">States + FCT covered</dt>
              <dd className="font-display mt-3 text-3xl font-medium text-ink">
                <Counter value={36} className="text-lime-dark" />
              </dd>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg">
              <dt className="text-xs uppercase tracking-widest text-ink-soft">Accredited PFIs</dt>
              <dd className="font-display mt-3 text-3xl font-medium text-ink">
                <Counter value={23} className="text-lime-dark" />
              </dd>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>
{/* 
      <section className="overflow-hidden border-b border-ink/10 bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime">
              Impact in action
            </span>
            <h2 className="font-display mt-4 max-w-3xl text-3xl font-medium leading-tight text-cream sm:text-5xl">
              When businesses move forward, communities move with them
            </h2>
            <p className="mt-5 max-w-2xl text-cream/65">
              Move across the stories to see how access to finance becomes growth, opportunity and lasting economic momentum.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3" style={{ perspective: '1200px' }}>
            {IMPACT_STORIES.map((story, index) => (
              <InteractiveImpactCard key={story.title} story={story} index={index} />
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Economic sectors
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Sector performance
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 overflow-x-auto rounded-2xl border border-ink/10 bg-cream">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-xs uppercase tracking-widest text-ink-soft">
                  <th className="px-5 py-4">Sector</th>
                  <th className="px-5 py-4">Loans Guaranteed</th>
                  <th className="px-5 py-4">MSMEs Supported</th>
                  <th className="px-5 py-4">Jobs Created</th>
                  <th className="px-5 py-4">Female %</th>
                  <th className="px-5 py-4">Youth %</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <motion.tbody
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                {SECTOR_TABLE.map((row) => (
                  <motion.tr
                    key={row.sector}
                    variants={staggerItem}
                    className="border-b border-ink/10 transition last:border-0 hover:bg-lime-light/60"
                  >
                    <td className="px-5 py-4 font-medium text-ink">{row.sector}</td>
                    <td className="px-5 py-4 font-medium text-lime-dark"><AnimatedMetric value={row.loans} /></td>
                    <td className="px-5 py-4 font-medium text-lime-dark"><AnimatedMetric value={row.msmes} /></td>
                    <td className="px-5 py-4 font-medium text-lime-dark"><AnimatedMetric value={row.jobs} /></td>
                    <td className="px-5 py-4 font-medium text-lime-dark"><AnimatedMetric value={row.female} /></td>
                    <td className="px-5 py-4 font-medium text-lime-dark"><AnimatedMetric value={row.youth} /></td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-lime-light px-2.5 py-1 text-xs font-medium text-lime-dark">
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </Reveal>
        </div>
      </section> */}

      {/* <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Geographic reach
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              MSMEs by geopolitical zone
            </h2>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ZONE_TABLE.map((z) => (
              <StaggerItem
                key={z.zone}
                className="flex items-center justify-between rounded-xl border border-ink/10 px-5 py-4 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
              >
                <span className="text-sm font-medium text-ink">{z.zone}</span>
                <span className="font-display text-lg font-medium text-lime-dark">
                  <AnimatedMetric value={z.msmes} />
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section> */}

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              PFI performance
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Participating financial institutions by category
            </h2>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PFI_CATEGORIES.map((c) => (
              <StaggerItem
                key={c.label}
                className="rounded-2xl border border-ink/10 bg-cream p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="font-display text-2xl font-medium text-lime-dark">
                  <AnimatedMetric value={c.count} />
                </p>
                <p className="mt-1 text-sm text-ink-soft">{c.label}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Ratings &amp; certifications
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Credit ratings &amp; certifications
            </h2>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerItem className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <p className="font-display text-2xl font-medium text-ink">Aa+</p>
              <p className="mt-1 text-sm text-ink-soft">Augusto &amp; Co. — 2026 Assessment</p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <p className="font-display text-lg font-medium text-ink">ISO 27001</p>
              <p className="mt-1 text-sm text-ink-soft">Information Security Management System — Certified 2022</p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <p className="font-display text-lg font-medium text-ink">ISO 22301</p>
              <p className="mt-1 text-sm text-ink-soft">Business Continuity Management System — Certified 2019</p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <p className="font-display text-lg font-medium text-ink">ISO 20000</p>
              <p className="mt-1 text-sm text-ink-soft">IT Service Management System — Certified 2018</p>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

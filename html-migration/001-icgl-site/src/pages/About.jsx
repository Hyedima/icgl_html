import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Eye, Target, ScrollText } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../components/motion/StaggerGroup'
import ImageReveal from '../components/motion/ImageReveal'
import IconPop from '../components/motion/IconPop'
import { BOARD, MANAGEMENT, CORE_VALUES } from '../data/content'
import whoWeAreImage from '../assets/who-we-are.jpg'
import guaranteeImage from '../assets/guarantee.jpg'

// Tall grayscale portrait card, name overlaid bottom-left on a dark
// gradient — modelled on guarantee.green's "Meet our Board" cards. The
// photo desaturates to full color on hover; an optional lime "badge" pill
// (Chair, CEO…) sits top-left for the group's lead. The whole card links
// through to that person's individual bio page.
function PersonCard({ name, role, photo, badge, to }) {
  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ')

  return (
    <Link
      to={to}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ink transition hover:-translate-y-1 hover:shadow-xl"
    >
      {photo ? (
        <ImageReveal duration={0.6} className="absolute inset-0">
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover grayscale transition duration-500 ease-out group-hover:grayscale-0"
          />
        </ImageReveal>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-lime-light font-display text-4xl font-medium text-lime-dark">
          {name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')}
        </div>
      )}

      {badge && (
        <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 text-xs font-medium uppercase tracking-widest text-ink">
          {badge}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/75 to-transparent px-5 pb-5 pt-16">
        <h3 className="font-display text-xl font-medium leading-tight text-cream sm:text-2xl">
          {firstName}
          {lastName && (
            <>
              <br />
              {lastName}
            </>
          )}
        </h3>
        <p className="mt-1.5 text-xs text-cream/70">{role}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-lime opacity-0 transition duration-300 ease-out group-hover:opacity-100">
          Read bio
          <ArrowUpRight size={12} />
        </span>
      </div>
    </Link>
  )
}

export default function About() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <PageHero eyebrow="About Us" title="Who We Are" crumbs={[{ label: 'About' }]} />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">
                Impact Credit Guarantee Limited (ICGL) is a wholly owned subsidiary of the 
                Development Bank of Nigeria Plc (DBN). ICGL was set-up through a project with 
                the World Bank to provide guarantee on loans made to eligible Micro, Small and
                 Medium Scale Enterprises (MSMEs) and small corporates by Participating Financial 
                 Institutions (PFIs) in Nigeria.
              </p>
              <p className="text-lg leading-relaxed text-ink-soft">
               ICGL was established to drive the second mandate of DBN which is to provide risk
                sharing facilities to PFIs with a view to alleviating financing constraint faced
                 by MSMEs and small corporates in Nigeria. The magnitude of this constraint 
                 is reflected in the result 2017 National Survey of Micro, Small & Medium 
                 Enterprises which revealed the existence of 41.5million MSMEs in Nigeria, 
                 with a 49.9% contribution to the GDP. However, less than 5% of the MSMEs 
                 have access to finance, creating a financing gap of N48trillion.
              </p>
            </Reveal>
            <Reveal delay={0.15} direction="right">
              <motion.div
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink"
                whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={whoWeAreImage}
                  alt="Business leaders reviewing growth and financial plans"
                  className="h-full w-full object-cover"
                  animate={reduceMotion ? undefined : { scale: [1.02, 1.07, 1.02], x: [0, -6, 0] }}
                  transition={reduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-transparent to-lime/20" aria-hidden="true" />
                <div className="absolute inset-5 rounded-xl border border-cream/35 transition duration-500 group-hover:inset-4 group-hover:border-lime/70" aria-hidden="true" />
                <span className="absolute bottom-8 left-8 text-xs font-medium uppercase tracking-[0.2em] text-cream">
                  Building access to finance
                </span>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                Our Identity
              </span>
              <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
                ICGL enables MSMEs to access finance, helps PFIs mitigate lending
                risk, and supports sustainable economic growth.
              </h2>
            </Reveal>
            <Reveal delay={0.15} direction="left">
              <motion.div
                className="group relative h-100 w-100 shrink-0 overflow-hidden rounded-2xl bg-ink shadow-lg"
                whileHover={reduceMotion ? undefined : { rotate: -3, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={guaranteeImage}
                  alt="Partners working together to support business growth"
                  className="h-full w-full object-cover"
                  animate={reduceMotion ? undefined : { scale: [1.05, 1.14, 1.05] }}
                  transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-ink/35 mix-blend-multiply" aria-hidden="true" />
                <motion.div
                  className="absolute inset-3 rounded-xl border border-lime/80"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }}
                  aria-hidden="true"
                />
                <span className="absolute bottom-3 left-3 text-[9px] font-medium uppercase tracking-widest text-cream">
                  Our identity
                </span>
              </motion.div>
            </Reveal>
          </div>

          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            <StaggerItem className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <IconPop className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                <Eye size={20} className="text-ink" />
              </IconPop>
              <h3 className="font-display mt-6 text-lg font-medium text-ink">Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                To be a leading nation-wide sustainable Credit Guarantee
                Company, facilitating access to finance to MSMEs through
                eligible PFIs.
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <IconPop delay={0.1} className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                <Target size={20} className="text-ink" />
              </IconPop>
              <h3 className="font-display mt-6 text-lg font-medium text-ink">Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                To improve access to finance for MSMEs in Nigeria through
                provision of partial credit guarantees and providing
                Technical Assistance to PFIs.
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <IconPop delay={0.2} className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                <ScrollText size={20} className="text-ink" />
              </IconPop>
              <h3 className="font-display mt-6 text-lg font-medium text-ink">Mandate</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                To facilitate access to finance among MSMEs through eligible
                PFIs in a sustainable and market-oriented way by providing
                credit guarantees and technical assistance to PFIs.
              </p>
            </StaggerItem>
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
              The principles behind how we serve our partners, support businesses, and create lasting economic impact.
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map(({ icon: Icon, title, body }, index) => (
              <StaggerItem
                key={title}
                className="group rounded-2xl border border-ink/10 bg-cream p-7 transition duration-300 hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <IconPop
                    delay={index * 0.05}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-lime transition-colors group-hover:bg-ink"
                  >
                    <Icon size={20} className="text-ink transition-colors group-hover:text-lime" />
                  </IconPop>
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
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Our People
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Board of Directors
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">
              The Board&rsquo;s strategic oversight and governance guide
              ICGL&rsquo;s vision and ensure the organization operates with
              integrity and accountability.
            </p>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BOARD.map((b) => (
              <StaggerItem key={b.name}>
                <PersonCard {...b} to={`/about/board/${b.slug}`} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.1} className="mt-8">
            <Link
              to={`/about/board/${BOARD[0].slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition duration-150 ease-out hover:bg-lime-dark active:scale-[0.97]"
            >
              Board bio&rsquo;s
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Management Team
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">
              With deep industry experience, the management team drives
              innovation, builds strong partnerships, and ensures effective
              delivery of ICGL&rsquo;s services and initiatives.
            </p>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MANAGEMENT.map((m) => (
              <StaggerItem key={m.name}>
                <PersonCard {...m} to={`/about/management/${m.slug}`} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.1} className="mt-8">
            <Link
              to={`/about/management/${MANAGEMENT[0].slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition duration-150 ease-out hover:bg-lime-dark active:scale-[0.97]"
            >
              Management bio&rsquo;s
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

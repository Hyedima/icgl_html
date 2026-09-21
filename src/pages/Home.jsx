import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  Users,
  Handshake,
  Wallet,
  Building2,
  Briefcase,
  UserRound,
  Sparkles,
  Network,
  Award,
} from 'lucide-react'
import { IMPACT_PERIODS, LOANS_GROWTH, SERVICES, PFI_LIST, NEWS } from '../data/content'
import { PFI_LOGOS } from '../data/pfiLogos'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../components/motion/StaggerGroup'
import MarqueeRow from '../components/motion/MarqueeRow'
import IconPop from '../components/motion/IconPop'
import ImageReveal from '../components/motion/ImageReveal'
import MandateWall from '../components/motion/MandateWall'
import SolutionSeal from '../components/motion/SolutionSeal'
import teamPhoto from '../assets/career-team-web.jpg'
import handshakePhoto from '../assets/hero-2-web.jpg'
import partnersPhoto from '../assets/who-we-are-web.jpg'

// One icon per stat entry, in the same order, for the "Impact at a
// glance" cards below — shared across every period in IMPACT_PERIODS
// since they all have the same 8 labels in the same order.
const impactIcons = [Wallet, Building2, ShieldCheck, Briefcase, UserRound, Sparkles, Network, Award]

// Bar geometry for the mini growth chart on the back of the "Total Loans
// Guaranteed" card — hand-plotted (no chart library) to match the rest of
// the site's hand-rolled SVG graphics (the seal rings, the Nigeria clip path).
const CHART_BAR_WIDTH = 28
const CHART_BAR_GAP = 16
const CHART_BASELINE_Y = 90
const CHART_MAX_BAR_HEIGHT = 80
const loansGrowthMax = LOANS_GROWTH[LOANS_GROWTH.length - 1].value
const loansGrowthBars = LOANS_GROWTH.map((d, i) => {
  const height = (d.value / loansGrowthMax) * CHART_MAX_BAR_HEIGHT
  return {
    ...d,
    x: i * (CHART_BAR_WIDTH + CHART_BAR_GAP) + 8,
    height,
    y: CHART_BASELINE_Y - height,
  }
})

// Entrance animation for each "Impact at a glance" card — overrides the
// StaggerGroup default (fade + slide up): every card glides up into frame,
// staggered in reading order.
const IMPACT_CARD_DURATION = 0.4
const IMPACT_CARD_STAGGER = 0.08

function impactCardVariants(i) {
  const transition = { duration: IMPACT_CARD_DURATION, delay: i * IMPACT_CARD_STAGGER, ease: [0.22, 1, 0.36, 1] }
  return {
    hidden: { opacity: 0, y: 90 },
    show: { opacity: 1, y: 0, transition },
  }
}

// Small pill used on stat cards whose delta is an actual "+N% vs last
// period" figure — kept separate from the plain caption used for deltas
// that are just descriptive (e.g. "2025 assessment").
function TrendPill({ delta, dark }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
        dark ? 'bg-lime/15 text-lime' : 'bg-lime-light text-lime-dark'
      }`}
    >
      <TrendingUp size={11} />
      {delta}
    </span>
  )
}

// Animated circular progress ring for percentage-based stats (Female /
// Youth Borrowers) — the fill sweeps in once it scrolls into view.
function ProgressRing({ percent }) {
  const size = 64
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percent / 100)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 shrink-0" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(51,58,66,0.08)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#a9d046"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

// Hover/click dropdown that swaps which quarterly snapshot the "Impact at
// a glance" dashboard displays. Sits where the Agusto & Co. card's delta
// caption used to be; lists every period except the one currently active,
// newest first.
//
// Driven by React state with a short close delay, rather than a pure CSS
// group-hover toggle: a CSS-only version hides the menu with
// visibility/pointer-events while closed, which excludes it from hit
// testing — the instant the cursor left the trigger (before ever reaching
// the menu, even with zero gap) hover was lost and the menu snapped shut.
// The delay gives the cursor time to travel from the trigger into the menu.
function PeriodDropdown({ periods, activeIndex, onSelect }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const openNow = () => {
    cancelClose()
    setOpen(true)
  }
  const closeSoon = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 250)
  }

  const active = periods[activeIndex]
  const others = periods
    .map((p, i) => ({ ...p, i }))
    .filter((p) => p.i !== activeIndex)
    .reverse()

  return (
    <div className="relative inline-block" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        onClick={() => (open ? closeSoon() : openNow())}
        className="inline-flex items-center gap-1.5 text-sm text-cream/60 transition hover:text-lime"
      >
        As of {active.period}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute right-0 top-full z-20 w-52 pt-2 transition duration-150 ease-out ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-xl border border-cream/10 bg-ink py-1.5 shadow-xl">
          {others.map((p) => (
            <button
              key={p.period}
              type="button"
              onClick={() => {
                onSelect(p.i)
                setOpen(false)
              }}
              className="block w-full px-4 py-2.5 text-left text-sm text-cream/70 transition hover:bg-lime/10 hover:text-lime"
            >
              As of {p.period}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const kvps = [
  { icon: TrendingUp, title: "For Nigeria's Economy", body: 'Sustainable growth through wider access to finance for the MSME segment.' },
  { icon: Handshake, title: 'For Partners', body: 'A trusted platform for collaboration with Participating Financial Institutions.' },
  { icon: Users, title: 'For MSMEs', body: 'Improved access to the finance businesses need to grow and create jobs.' },
  { icon: ShieldCheck, title: 'For PFIs', body: 'Risk mitigation that gives lenders the confidence to extend more credit.' },
]

// Split the PFI list into two disjoint sets (by index parity) so the
// two sliding rows never repeat the same name.
const pfiLine1 = PFI_LIST.filter((_, i) => i % 2 === 0)
const pfiLine2 = PFI_LIST.filter((_, i) => i % 2 === 1)

function CardLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition ${className}`}
    >
      {children}
      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  )
}

export default function Home() {
  // Defaults to the most recent quarter (last entry in IMPACT_PERIODS).
  const [periodIndex, setPeriodIndex] = useState(IMPACT_PERIODS.length - 1)
  const activePeriod = IMPACT_PERIODS[periodIndex]
  const stats = activePeriod.stats

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10">
        {/* Video background — a real market/trading scene grounding the
            "Guaranteeing Success" message — with a dark scrim so the light
            text stays legible over any frame. */}
        <div className="absolute inset-0 z-0">
          <video
            className="h-full w-full object-cover"
            src="/videos/hero-bg.mp4"
            poster="/videos/hero-bg-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent" />
        </div>

        <motion.div
          className="pointer-events-none absolute -right-40 -top-40 z-0 h-96 w-96 rounded-full bg-lime/30 blur-3xl animate-drift-a"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -left-32 top-40 z-0 h-72 w-72 rounded-full bg-lime/15 blur-3xl animate-drift-b"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute right-1/4 top-10 z-0 h-40 w-40 rounded-full bg-lime-dark/10 blur-2xl animate-drift-c"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10 lg:pb-28 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-1.5"
          >
            {/* Rotating beam: an oversized, mostly-transparent conic
                gradient spins behind an inset solid layer, so only a thin
                bright arc shows, sweeping continuously around the pill. */}
            <span
              aria-hidden="true"
              className="animate-badge-beam absolute left-1/2 top-1/2 h-[420px] w-[420px]"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, var(--color-lime-dark) 338deg, var(--color-lime) 360deg)',
              }}
            />
            <span className="absolute inset-[1.5px] rounded-full border border-cream/15 bg-ink/70 backdrop-blur" aria-hidden="true" />
            <span className="relative text-xs font-medium uppercase tracking-widest text-cream/85">
              A subsidiary of the Development Bank of Nigeria
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-7xl"
          >
            Guaranteeing Success.
            <br />
            <span className="italic text-lime">Driving growth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75"
          >
            Empowering MSMEs across Nigeria with accessible credit guarantee
            solutions that unlock economic potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <CardLink to="/about" className="bg-lime text-ink hover:bg-lime-dark">
              Read More
            </CardLink>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 text-sm font-medium text-cream transition hover:border-cream hover:bg-cream/10"
            >
              Learn about our services
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator, bottom-center of the hero — same cue as
            guarantee.green's mouse icon. */}
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
          aria-hidden="true"
        >
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-cream/30 p-1.5">
            <span className="animate-scroll-bob h-1.5 w-1 rounded-full bg-cream/60" />
          </div>
        </div>
      </section>

      {/* Impact at a glance — white section + oblong stat cards (one dark
          "hero" card, rest light gray), in the style of guarantee.green's
          "Capital in motion" cards. */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-white">
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <Reveal
                as={motion.span}
                direction="up"
                className="block text-xs font-medium uppercase tracking-widest text-lime-dark"
              >
                Impact at a glance
              </Reveal>
              <Reveal
                as={motion.h2}
                direction="up"
                delay={0.12}
                className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl"
              >
                As of {activePeriod.period}
              </Reveal>
              <Reveal
                as={motion.p}
                direction="up"
                delay={0.24}
                className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft"
              >
                The measurable reach of our guarantees, updated quarterly across
                every PFI partnership nationwide.
              </Reveal>
            </div>
            <Reveal delay={0.32}>
              <Link
                to="/impact"
                className="group inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-lime-dark"
              >
                See our impact
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>

          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.slice(0, 7).map((s, i) => {
              const Icon = impactIcons[i]
              const isTrend = s.delta.startsWith('+')
              const percentMatch = /^(\d+)%$/.exec(s.value)
              const cardVariants = impactCardVariants(i)

              if (i === 0) {
                // "Total Loans Guaranteed" — the dashboard's feature card:
                // spans two columns, carries a real photo behind a dark
                // scrim, and flips on hover to reveal the 5-year growth
                // chart. The outer StaggerItem just handles scroll-in +
                // perspective; an inner motion.div does the flip, with two
                // absolutely stacked, backface-hidden faces.
                return (
                  <StaggerItem
                    key={s.label}
                    variants={cardVariants}
                    className="relative min-h-[280px] transition hover:shadow-xl hover:shadow-lime/20 sm:col-span-2"
                    style={{ perspective: 1200, WebkitPerspective: 1200 }}
                  >
                    <motion.div
                      className="relative h-full w-full"
                      style={{
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                      }}
                      whileHover={{ rotateY: 180 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Front face — looping video backdrop under a dark scrim */}
                      <div
                        className="absolute inset-0 flex min-h-[280px] flex-col overflow-hidden rounded-2xl bg-ink p-7"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        <video
                          className="absolute inset-0 h-full w-full object-cover opacity-30"
                          src="/videos/impact-card-bg-2.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" aria-hidden="true" />

                        <div className="relative z-10 flex items-center justify-between">
                          {/* Icon ringed by the same rotating conic-gradient beam
                              used on the hero badge and "Partner with ICGL" button. */}
                          <IconPop className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full">
                            <span
                              aria-hidden="true"
                              className="animate-badge-beam absolute left-1/2 top-1/2 h-36 w-36"
                              style={{
                                background:
                                  'conic-gradient(from 0deg, transparent 0deg, transparent 280deg, var(--color-lime-dark) 330deg, var(--color-lime) 360deg)',
                              }}
                            />
                            <span className="absolute inset-[1.5px] rounded-full bg-ink" aria-hidden="true" />
                            <Icon size={18} className="relative text-lime" />
                          </IconPop>
                          <TrendPill delta={s.delta} dark />
                        </div>

                        <div className="relative z-10 mt-auto">
                          <dt className="text-xs uppercase leading-tight tracking-widest text-cream/70">
                            {s.label}
                          </dt>
                          <dd className="font-display mt-3 text-5xl font-medium text-cream">
                            {s.value}
                          </dd>
                          <p className="mt-3 text-xs text-cream/50">Hover to see 5-year growth</p>
                        </div>
                      </div>

                      {/* Back face — cumulative growth over the last 5 years */}
                      <div
                        className="absolute inset-0 flex min-h-[280px] flex-col justify-center rounded-2xl bg-ink p-7"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <span className="text-xs uppercase leading-tight tracking-widest text-cream/70">
                          Cumulative growth, 2021–2025
                        </span>
                        <svg viewBox="0 0 220 110" className="mt-5 h-24 w-full" aria-hidden="true">
                          {loansGrowthBars.map((d, i) => (
                            <g key={d.year}>
                              <rect
                                x={d.x}
                                y={d.y}
                                width={CHART_BAR_WIDTH}
                                height={d.height}
                                rx={4}
                                fill={i === loansGrowthBars.length - 1 ? '#a9d046' : 'rgba(248,248,242,0.25)'}
                              />
                              <text
                                x={d.x + CHART_BAR_WIDTH / 2}
                                y={CHART_BASELINE_Y + 14}
                                textAnchor="middle"
                                fontSize="9"
                                fill="rgba(248,248,242,0.6)"
                              >
                                {d.year}
                              </text>
                            </g>
                          ))}
                        </svg>
                        <p className="mt-3 text-xs text-cream/60">
                          <span className="font-display text-sm font-medium text-lime">{s.value}</span> guaranteed to
                          date — up from ₦85bn in 2021.
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                )
              }

              // Percentage stats (Female / Youth Borrowers) get an animated
              // progress ring instead of a plain figure.
              if (percentMatch) {
                return (
                  <StaggerItem
                    key={s.label}
                    variants={cardVariants}
                    className="flex min-h-[280px] flex-col rounded-2xl bg-neutral-100 p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-lime/20"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconPop className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-lime">
                        <Icon size={20} className="text-ink" />
                      </IconPop>
                      <dt className="text-xs uppercase leading-tight tracking-widest text-ink-soft">
                        {s.label}
                      </dt>
                    </div>
                    <div className="mt-auto flex items-center gap-4 pt-8">
                      <ProgressRing percent={Number(percentMatch[1])} />
                      <div>
                        <dd className="font-display text-4xl font-medium text-ink">{s.value}</dd>
                        <p className="mt-1 text-xs text-ink-soft">{s.delta}</p>
                      </div>
                    </div>
                  </StaggerItem>
                )
              }

              return (
                <StaggerItem
                  key={s.label}
                  variants={cardVariants}
                  className="flex min-h-[280px] flex-col rounded-2xl bg-neutral-100 p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-lime/20"
                >
                  <div className="flex items-center gap-2.5">
                    <IconPop className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-lime">
                      <Icon size={20} className="text-ink" />
                    </IconPop>
                    <dt className="text-xs uppercase leading-tight tracking-widest text-ink-soft">
                      {s.label}
                    </dt>
                  </div>
                  <dd className="font-display mt-auto pt-8 text-5xl font-medium text-ink">
                    {s.value}
                  </dd>
                  {isTrend ? (
                    <div className="mt-4 border-t border-ink/10 pt-4">
                      <TrendPill delta={s.delta} />
                    </div>
                  ) : (
                    <p className="mt-4 border-t border-ink/10 pt-4 text-xs text-ink-soft">{s.delta}</p>
                  )}
                </StaggerItem>
              )
            })}
          </StaggerGroup>

          {/* Closing rating banner — the Agusto & Co. certification, kept
              as a compact full-width strip rather than an eighth grid tile.
              Doubles as the dashboard's period switcher: hovering "As of
              [date]" reveals the other quarters. */}
          {stats[7] && (
            <Reveal delay={0.1} className="mt-4">
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-ink px-8 py-4 sm:flex-row sm:justify-between">
                <div>
                  <dt className="text-xs uppercase leading-tight tracking-widest text-cream/70">
                    {stats[7].label}
                  </dt>
                  <dd className="font-display mt-1 text-3xl font-medium text-cream">
                    {stats[7].value}
                  </dd>
                </div>
                <PeriodDropdown periods={IMPACT_PERIODS} activeIndex={periodIndex} onSelect={setPeriodIndex} />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Key value propositions
            </span>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium leading-tight text-ink sm:text-4xl">
              ICGL enables MSMEs to access finance, helps PFIs mitigate lending
              risk, and supports sustainable economic growth.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            <StaggerGroup className="grid gap-6 sm:grid-cols-2">
              {kvps.map(({ icon: Icon, title, body }) => (
                <StaggerItem
                  key={title}
                  className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <IconPop delay={0.1} className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                    <Icon size={20} className="text-ink" />
                  </IconPop>
                  <h3 className="font-display mt-6 text-lg font-medium text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* Auto-scrolling photo wall, echoing guarantee.green's "Our
                Mandate" section — graphic only, no accompanying copy.
                Absolutely positioned so it never contributes to the row's
                height — the cards alone define it, at their natural size,
                and the graphic just fills whatever that turns out to be,
                ending exactly where "For MSMEs" / "For PFIs" end. */}
            <div className="relative hidden lg:block">
              <MandateWall className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
            <Reveal>
              <span className="text-xs font-medium uppercase tracking-widest text-lime">
                About us
              </span>
              <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium leading-tight text-cream sm:text-4xl">
                Why we exist
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/60">
                Impact Credit Guarantee Limited (ICGL) bridges the financing gap
                faced by Nigerian MSMEs by reducing the risks that limit access
                to credit. As a wholly owned subsidiary of the Development Bank
                of Nigeria (DBN), ICGL partners with financial institutions to
                share lending risk through tailored credit guarantee solutions.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium text-cream transition"
                >
                  {/* Same rotating conic-gradient beam as the hero badge,
                      circling a dark fill so the button stays dark even on
                      this dark section — the beam ring is what defines its
                      edge. */}
                  <span
                    aria-hidden="true"
                    className="animate-badge-beam absolute left-1/2 top-1/2 h-[500px] w-[500px]"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, var(--color-lime-dark) 338deg, var(--color-lime) 360deg)',
                    }}
                  />
                  <span className="absolute inset-[1.5px] rounded-full border border-cream/10 bg-ink transition group-hover:bg-lime-dark" aria-hidden="true" />
                  <span className="relative">Partner with ICGL</span>
                  <ArrowUpRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-lime-dark"
                >
                  Read more
                </Link>
              </div>
            </Reveal>

            {/* Photo composition — one sharp "main" card up front, two
                softly blurred cards tucked behind it, echoing guarantee.
                green's "Our impact" project cards on the homepage. */}
            <Reveal delay={0.15}>
              <div className="relative h-[380px] sm:h-[460px] lg:h-[500px]" aria-hidden="true">
                <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-lime/10 blur-3xl" />

                {/* Blurred background card 1 — outer div only handles
                    position/rotation, so the ImageReveal below (including
                    its border, shadow and blur) is what actually slides in. */}
                <div className="absolute right-[6%] top-[0%] z-0 w-[68%] -rotate-12 sm:w-[62%]">
                  <ImageReveal
                    delay={0.1}
                    from="top"
                    className="overflow-hidden rounded-2xl border-[6px] border-white/80 opacity-70 shadow-xl shadow-black/40 blur-[2px]"
                  >
                    <img
                      src={handshakePhoto}
                      alt=""
                      className="h-44 w-full object-cover sm:h-52"
                    />
                  </ImageReveal>
                </div>

                {/* Blurred background card 2 */}
                <div className="absolute bottom-[0%] right-[-8%] z-0 w-[70%] rotate-12 sm:w-[64%]">
                  <ImageReveal
                    delay={0.2}
                    from="bottom"
                    className="overflow-hidden rounded-2xl border-[6px] border-white/80 opacity-70 shadow-xl shadow-black/40 blur-[2px]"
                  >
                    <img
                      src={partnersPhoto}
                      alt=""
                      className="h-44 w-full object-cover sm:h-52"
                    />
                  </ImageReveal>
                </div>

                {/* Sharp main card, up front — hover lift/rotate stays on
                    this outer div (plain CSS), separate from the framer-
                    motion transform on the ImageReveal card inside it. */}
                <div className="absolute left-1/2 top-1/2 z-10 w-[70%] -translate-x-1/2 -translate-y-1/2 -rotate-2 transition duration-500 hover:-translate-y-[52%] hover:rotate-0 sm:w-[64%]">
                  <ImageReveal
                    delay={0.3}
                    from="right"
                    className="overflow-hidden rounded-2xl border-[6px] border-white shadow-2xl shadow-black/50"
                  >
                    <img
                      src={teamPhoto}
                      alt="ICGL team members meeting inside a modern office"
                      className="h-52 w-full object-cover sm:h-64"
                    />
                  </ImageReveal>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                Our services
              </span>
              <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
                What we do
              </h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-lime-dark"
            >
              View services
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            {/* "Our Solution" rotating seal — graphic only, no copy. */}
            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <SolutionSeal />
            </div>

            <StaggerGroup className="grid gap-6 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <StaggerItem
                  key={s.slug}
                  className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
                >
                  <IconPop delay={0.1} className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                    <s.icon size={20} className="text-ink" />
                  </IconPop>
                  <h3 className="font-display mt-6 text-lg font-medium text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.summary}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-ink/10 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">
            Participating Financial Institutions
          </span>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
            To drive inclusive economic growth, we partner with a robust
            network of accredited lenders across Nigeria.
          </p>
        </div>
        <div className="mt-8">
          <MarqueeRow
            items={pfiLine1}
            direction="left"
            speed={36}
            itemKeyPrefix="pfi-1"
            renderItem={(p) => (
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-white p-3 shadow-sm">
                <img
                  src={PFI_LOGOS[p]}
                  alt={p}
                  title={p}
                  className="h-full w-full object-contain"
                />
              </span>
            )}
          />
        </div>
        <div className="mt-3">
          <MarqueeRow
            items={pfiLine2}
            direction="right"
            speed={36}
            itemKeyPrefix="pfi-2"
            renderItem={(p) => (
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-white p-3 shadow-sm">
                <img
                  src={PFI_LOGOS[p]}
                  alt={p}
                  title={p}
                  className="h-full w-full object-contain"
                />
              </span>
            )}
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              News
            </span>
            <Link
              to="/resources/news"
              className="group inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-lime-dark"
            >
              All news
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-6 lg:grid-cols-3">
            {NEWS.slice(0, 3).map((n) => (
              <StaggerItem
                key={n.title}
                className="overflow-hidden rounded-2xl border border-ink/10 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
              >
                <ImageReveal>
                  <img src={n.image} alt="" className="h-44 w-full object-cover" />
                </ImageReveal>
                <div className="p-7">
                  <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                    {n.category}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-medium leading-snug text-ink">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-xs text-ink-soft">{n.date}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

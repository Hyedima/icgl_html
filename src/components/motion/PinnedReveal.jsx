import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * A scroll-jacked hero-style section: pins in place while the user
 * scrolls through it, cross-fading through a sequence of big stat
 * "phases" and growing a ring/glow behind them as progress increases.
 * Mirrors the guarantee.green pattern of a pinned panel that reveals a
 * story as you scroll, rather than firing once when it enters view.
 */
export default function PinnedReveal({ phases, vhPerPhase = 90 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const ringScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.8])
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 2.4])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.5, 0.5, 0.25])

  return (
    <section ref={ref} className="relative bg-ink" style={{ height: `${phases.length * vhPerPhase}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full bg-lime/20 blur-3xl"
          aria-hidden
        />
        <motion.div
          style={{ scale: ringScale }}
          className="pointer-events-none absolute h-72 w-72 rounded-full border border-lime/30 sm:h-96 sm:w-96"
          aria-hidden
        />
        <motion.div
          style={{ scale: ringScale }}
          className="pointer-events-none absolute h-48 w-48 rounded-full border border-lime/20 sm:h-64 sm:w-64"
          aria-hidden
        />

        {phases.map((phase, i) => (
          <Phase key={phase.label} index={i} total={phases.length} scrollYProgress={scrollYProgress} phase={phase} />
        ))}

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5">
          {phases.map((_, i) => (
            <ProgressDot key={i} index={i} total={phases.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Phase({ index, total, scrollYProgress, phase }) {
  const seg = 1 / total
  const start = index * seg
  const end = start + seg
  const fadeIn = start + seg * 0.18
  const fadeOutStart = end - seg * 0.18

  const isLast = index === total - 1
  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOutStart, end],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  )
  const y = useTransform(scrollYProgress, [start, fadeIn], [28, 0])
  const countProgress = useTransform(scrollYProgress, [fadeIn, fadeOutStart], [0, 1], { clamp: true })
  const countText = useTransform(countProgress, phase.format)

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <span className="text-xs font-medium uppercase tracking-widest text-lime">{phase.label}</span>
      <motion.span className="font-display mt-4 text-6xl font-medium text-cream sm:text-7xl lg:text-8xl">
        {countText}
      </motion.span>
      <p className="mt-6 max-w-md text-cream/70">{phase.caption}</p>
    </motion.div>
  )
}

function ProgressDot({ index, total, scrollYProgress }) {
  const seg = 1 / total
  const start = index * seg
  const end = start + seg
  const opacity = useTransform(scrollYProgress, [start, start + seg * 0.2, end - seg * 0.2, end], [0.25, 1, 1, 0.25])
  return <motion.span style={{ opacity }} className="h-1.5 w-1.5 rounded-full bg-lime" />
}

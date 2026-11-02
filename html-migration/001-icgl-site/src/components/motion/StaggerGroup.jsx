import { motion, useReducedMotion } from 'framer-motion'

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

// Reduced-motion variant: same fade, no position/scale movement and no
// stagger delay between children — the whole group settles at once.
const staggerContainerReduced = {
  hidden: {},
  show: { transition: { staggerChildren: 0, delayChildren: 0 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerItemReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

/**
 * Wrap a grid/list of cards in this, then wrap each card in
 * <StaggerItem> — children animate in one after another as the
 * group scrolls into view.
 */
export default function StaggerGroup({ children, className, amount = 0.2, once = true, ...rest }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={reduceMotion ? staggerContainerReduced : staggerContainer}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, variants, ...rest }) {
  const reduceMotion = useReducedMotion()
  // A caller may pass its own `variants` (e.g. Home.jsx's directional card
  // entrances) to override the default. Under prefers-reduced-motion we
  // ignore that override too — every StaggerItem falls back to a plain
  // opacity-only settle, regardless of what motion the caller asked for.
  const activeVariants = reduceMotion ? staggerItemReduced : variants ?? staggerItem
  return (
    <motion.div className={className} variants={activeVariants} {...rest}>
      {children}
    </motion.div>
  )
}

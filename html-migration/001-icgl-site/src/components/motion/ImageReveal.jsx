import { motion, useReducedMotion } from 'framer-motion'

// Optional starting offset for the directional variant — describes where
// the photo slides in FROM (e.g. from="right" starts to the right of its
// final position and slides left into place).
const FROM = {
  right: { x: 60, y: 0 },
  left: { x: -60, y: 0 },
  top: { x: 0, y: -60 },
  bottom: { x: 0, y: 60 },
  none: { x: 0, y: 0 },
}

/**
 * Wraps a photo so it settles into place — a soft zoom-out (scale down
 * to 1) combined with a fade — as it scrolls into view. Meant for photo
 * cards / headshots / hero-adjacent imagery, distinct from the plain
 * fade+slide used for text via <Reveal>.
 *
 * Pass `from` ("right" | "left" | "top" | "bottom") to add a directional
 * slide on top of the default fade + zoom-out — used when a group of
 * photos should each arrive from a different side.
 */
export default function ImageReveal({
  children,
  delay = 0,
  duration = 0.8,
  className,
  once = true,
  amount = 0.3,
  from = 'none',
}) {
  const reduceMotion = useReducedMotion()
  const offset = reduceMotion ? { x: 0, y: 0 } : FROM[from] ?? FROM.none
  const fromScale = reduceMotion ? 1 : 1.15

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: fromScale, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduceMotion ? 0.2 : duration, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

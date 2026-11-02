import { motion, useReducedMotion } from 'framer-motion'

const DIRECTIONS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none: { y: 0, x: 0 },
}

/**
 * Fades + slides an element in once it scrolls into view.
 * Mirrors the "reveal on scroll" pattern used throughout guarantee.green.
 *
 * Respects prefers-reduced-motion: position/scale offsets are dropped so
 * only a short opacity fade remains — comprehension-aiding feedback stays,
 * movement doesn't.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  scale = true,
  className,
  as: Component = motion.div,
  once = true,
  amount = 0.2,
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const offset = reduceMotion ? { x: 0, y: 0 } : DIRECTIONS[direction] ?? DIRECTIONS.up
  const fromScale = reduceMotion ? 1 : scale ? 0.96 : 1

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: fromScale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration: reduceMotion ? 0.2 : duration, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  )
}

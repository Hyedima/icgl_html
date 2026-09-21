import { motion, useReducedMotion } from 'framer-motion'

/**
 * Wraps an icon badge so it pops in with a slight overshoot (scale + a
 * small rotation settle) once it scrolls into view — a livelier accent
 * than the plain fade/slide used for surrounding text.
 *
 * Scale floor is 0.92 (never below 0.9) — a scroll reveal carries no prior
 * gesture/momentum, so the bounce is kept subtle (damping 24) rather than
 * the loose, flick-style overshoot a dragged/thrown element would earn.
 * Under prefers-reduced-motion, drops to a plain opacity fade.
 */
export default function IconPop({ children, delay = 0, className, once = true, amount = 0.4 }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 0.2, delay: 0 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.92, rotate: -18 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.55, delay, type: 'spring', stiffness: 260, damping: 24 }}
    >
      {children}
    </motion.div>
  )
}

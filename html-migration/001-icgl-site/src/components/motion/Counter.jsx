import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

/**
 * Animates a number counting up from 0 once it scrolls into view.
 * `value` is the target number, `prefix`/`suffix` wrap the formatted output.
 */
export default function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.4,
  grouped = true,
  className,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })
  const nodeRef = useRef(null)

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, value, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (!nodeRef.current) return
      const fixed = latest.toFixed(decimals)
      const formatted = grouped
        ? Number(fixed).toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed
      nodeRef.current.textContent = `${prefix}${formatted}${suffix}`
    })
  }, [spring, prefix, suffix, decimals, grouped])

  return (
    <motion.span ref={ref} className={className}>
      <span ref={nodeRef}>{prefix}0{suffix}</span>
    </motion.span>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { Image as ImageIcon, Sparkles } from 'lucide-react'

// Dashed, dot-grid-textured placeholder standing in for a real photo —
// clearly marked as a placeholder (dashed border + label) rather than
// dressed up to look like finished content. Swap for a real <img> once
// ICGL supplies photography for a given section.
// `compact` drops the label and shrinks the icon/padding, for small spots
// like an avatar or thumbnail where the full labelled version would overflow.
export function ImagePlaceholder({ label = 'Image placeholder', compact = false, className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-ink/20 bg-cream ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden
      />
      {compact ? (
        <ImageIcon size={18} className="relative text-ink-soft" aria-label={label} />
      ) : (
        <div className="relative flex flex-col items-center gap-3 p-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
            <ImageIcon size={20} className="text-ink-soft" />
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">{label}</span>
        </div>
      )}
    </div>
  )
}

// Same placeholder language, but animated — a slow rotating dashed ring
// and a soft pulsing glow — standing in for a future motion graphic.
// Purely decorative, so the loop stops outright under reduced motion
// rather than continuing gently, matching the rest of the site's ambient
// loops (see index.css).
export function MotionGraphicPlaceholder({ label = 'Motion graphic placeholder', className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-ink/20 bg-cream ${className}`}
    >
      <motion.div
        className="absolute h-32 w-32 rounded-full border-2 border-dashed border-lime-dark/40"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      />
      <motion.div
        className="absolute h-20 w-20 rounded-full bg-lime/20 blur-2xl"
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
          <Sparkles size={20} className="text-ink-soft" />
        </span>
        <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">{label}</span>
      </div>
    </div>
  )
}

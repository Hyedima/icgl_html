import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import FloatingIcons from './motion/FloatingIcons'

export default function PageHero({ eyebrow, title, crumbs = [] }) {
  return (
    <section
      className="relative overflow-hidden border-b border-ink/10"
      style={{ backgroundImage: 'linear-gradient(to bottom left, #3d454e 0%, var(--color-ink) 45%, #1b1f24 100%)' }}
    >
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 z-0 h-72 w-72 rounded-full bg-lime/20 blur-3xl animate-drift-a"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-20 top-10 z-0 h-56 w-56 rounded-full bg-lime-dark/15 blur-3xl animate-drift-b"
        aria-hidden
      />

      <FloatingIcons />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-32">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-medium uppercase tracking-widest text-lime"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-4 text-4xl font-medium leading-tight text-cream sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center gap-1 text-sm text-cream/60"
        >
          <Link to="/" className="hover:text-cream">
            Home
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight size={14} />
              {c.to ? (
                <Link to={c.to} className="hover:text-cream">
                  {c.label}
                </Link>
              ) : (
                <span className="text-cream">{c.label}</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

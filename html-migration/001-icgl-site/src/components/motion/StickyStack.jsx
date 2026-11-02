import { motion } from 'framer-motion'

/**
 * Pins each card in turn as you scroll past it, so the next card slides
 * up and covers the previous one — the "stacked cards" scroll effect
 * used throughout guarantee.green (rating / capacity / SDG cards).
 * Pure CSS position:sticky drives the pin (robust across browsers);
 * framer-motion handles the entrance polish for each card.
 */
export default function StickyStack({ items, renderItem, topOffset = 96, step = 28, minHeight = '62vh' }) {
  return (
    <div className="relative">
      {items.map((item, i) => (
        <div
          key={item.key ?? i}
          className="sticky flex justify-center px-4"
          style={{ top: topOffset + i * step, zIndex: i + 1, minHeight }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {renderItem(item, i)}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

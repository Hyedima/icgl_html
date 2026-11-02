import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import { FAQ_SECTIONS } from '../../data/content'

function FaqGroup({ title, items, groupDelay }) {
  const [openIndex, setOpenIndex] = useState(-1)
  return (
    <Reveal delay={groupDelay} className="mb-10 last:mb-0">
      <h2 className="font-display text-xl font-medium text-ink">{title}</h2>
      <div className="mt-4 flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
        {items.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={item.q} className="px-6">
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span className="text-sm font-medium text-ink">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-lime-dark"
                >
                  <Plus size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Reveal>
  )
}

export default function Faqs() {
  return (
    <>
      <PageHero
        title="FAQs"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'FAQs' }]}
      />
      <section className="bg-lime-light">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
          {FAQ_SECTIONS.map((s, i) => (
            <FaqGroup key={s.title} {...s} groupDelay={i * 0.05} />
          ))}
        </div>
      </section>
    </>
  )
}

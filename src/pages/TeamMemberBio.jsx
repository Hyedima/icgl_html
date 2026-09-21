import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Linkedin, ArrowLeft } from 'lucide-react'
import ImageReveal from '../components/motion/ImageReveal'
import { BOARD, MANAGEMENT } from '../data/content'
import brandBar from '../assets/asset-89738e53.jpg'

const GROUPS = {
  board: { data: BOARD, label: 'Board of Directors', switcherTitle: 'Board of Directors' },
  management: { data: MANAGEMENT, label: 'Management Team', switcherTitle: 'Management Team' },
}

// Modelled directly on guarantee.green's individual board-member bio page
// (https://www.guarantee.green/board-members/...): a dark hero holding a
// large light "stage" card with the portrait bleeding past its top-right
// corner and the person's name overlapping its bottom-left corner, then a
// two-column body — a member switcher + LinkedIn button on the left, bio
// copy on the right.
export default function TeamMemberBio() {
  const { group, slug } = useParams()
  const config = GROUPS[group]
  const person = config?.data.find((p) => p.slug === slug)

  if (!config || !person) {
    return <Navigate to="/about" replace />
  }

  // Split so any leading title (Dr., etc.) stays on the same line as the
  // given name(s), with only the surname (final word) on the second line —
  // e.g. "Dr. Tony Okpanachi" → "Dr. Tony" / "Okpanachi".
  const TITLES = ['dr.', 'mr.', 'mrs.', 'ms.', 'prof.']
  const nameWords = person.name.trim().split(' ')
  const surname = nameWords.length > 1 ? nameWords[nameWords.length - 1] : ''
  const firstLine = nameWords.length > 1 ? nameWords.slice(0, -1).join(' ') : nameWords[0]
  const firstName = nameWords.find((w) => !TITLES.includes(w.toLowerCase())) ?? nameWords[0]

  return (
    <>
      <section
        className="relative z-10 border-b border-ink/10"
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

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-40">
          {/* "Stage" — light card with dot-grid texture, photo bleeding
              above its top edge, name sitting inside its bottom edge. Pulled
              down with a negative margin so it overlaps the section below. */}
          <div className="relative z-20 mb-[-90px] sm:mb-[-110px] lg:mb-[-130px]">
            <ImageReveal duration={0.7} className="relative mx-auto h-[190px] w-3/4 overflow-hidden rounded-[2rem] bg-cream shadow-2xl sm:h-[230px] sm:rounded-[2.25rem] lg:h-[260px]">
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: 'radial-gradient(circle, var(--color-ink) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
                aria-hidden
              />

              {person.photo && (
                <motion.img
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  src={person.photo}
                  alt={person.name}
                  className="absolute inset-y-2 right-2 z-10 h-[calc(100%-1rem)] w-auto max-w-[50%] rounded-3xl object-cover object-top sm:inset-y-3 sm:right-3 sm:h-[calc(100%-1.5rem)] sm:max-w-[42%]"
                />
              )}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="font-display absolute bottom-4 left-4 z-20 max-w-[46%] text-2xl font-medium leading-[1.05] text-ink sm:bottom-6 sm:left-6 sm:max-w-[52%] sm:text-3xl lg:text-4xl"
              >
                {firstLine}
                {surname && (
                  <span className="mt-1 flex items-center gap-1.5 text-lg sm:text-xl lg:text-2xl">
                    <span className="h-1.5 w-3 shrink-0 rounded-full bg-lime-dark/70" aria-hidden />
                    {surname}
                    <span className="h-1.5 w-3 shrink-0 rounded-full bg-lime" aria-hidden />
                  </span>
                )}
              </motion.h1>
            </ImageReveal>
          </div>
        </div>
      </section>

      <img src={brandBar} alt="" aria-hidden="true" className="block h-1.5 w-full object-cover" />

      <section className="bg-white">
        <div className="mx-auto grid max-w-4xl gap-10 px-6 pb-16 pt-16 lg:grid-cols-4 lg:px-10 lg:pb-20 lg:pt-20">
          {/* Left column — switcher list of every member in this group,
              the current one highlighted, plus a LinkedIn connect button. */}
          <div className="lg:col-span-1">
            <ul className="flex flex-col divide-y divide-ink/10 overflow-hidden rounded-2xl border border-ink/10">
              {config.data.map((p) => {
                const active = p.slug === person.slug
                return (
                  <li key={p.slug}>
                    <Link
                      to={`/about/${group}/${p.slug}`}
                      className={`flex items-center gap-4 pr-4 text-sm transition ${
                        active
                          ? 'bg-gradient-to-r from-lime to-lime-dark font-medium text-ink'
                          : 'text-ink-soft hover:bg-lime-light'
                      }`}
                    >
                      <img
                        src={p.photo}
                        alt=""
                        aria-hidden="true"
                        className={`h-16 w-16 shrink-0 object-cover ${active ? '' : 'grayscale'}`}
                      />
                      {p.name}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center gap-3 rounded-xl bg-ink px-4 py-3.5 text-xs font-medium uppercase tracking-widest text-cream transition duration-150 ease-out hover:bg-lime-dark hover:text-ink active:scale-[0.97]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cream/10">
                <Linkedin size={14} />
              </span>
              Connect with {firstName}
            </a>
          </div>

          {/* Right column — bio paragraphs (placeholder copy). */}
          <div className="lg:col-span-3">
            <div className="flex max-w-2xl flex-col gap-5">
              {person.bio.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating back-to-About button, pinned to the viewport corner. */}
      <Link
        to="/about"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-medium text-ink shadow-lg transition duration-150 ease-out hover:bg-lime-dark active:scale-[0.97]"
      >
        <ArrowLeft size={16} />
        Back to About
      </Link>
    </>
  )
}

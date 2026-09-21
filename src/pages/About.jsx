import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Eye, Target, ScrollText } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../components/motion/StaggerGroup'
import ImageReveal from '../components/motion/ImageReveal'
import IconPop from '../components/motion/IconPop'
import { ImagePlaceholder, MotionGraphicPlaceholder } from '../components/Placeholders'
import { api } from '../lib/api'

// Tall grayscale portrait card, name overlaid bottom-left on a dark
// gradient — modelled on guarantee.green's "Meet our Board" cards. The
// photo desaturates to full color on hover; an optional lime "badge" pill
// (Chair, CEO…) sits top-left for the group's lead. The whole card links
// through to that person's individual bio page.
function PersonCard({ name, role, photo, badge, to }) {
  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ')

  return (
    <Link
      to={to}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ink transition hover:-translate-y-1 hover:shadow-xl"
    >
      {photo ? (
        <ImageReveal duration={0.6} className="absolute inset-0">
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover grayscale transition duration-500 ease-out group-hover:grayscale-0"
          />
        </ImageReveal>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-lime-light font-display text-4xl font-medium text-lime-dark">
          {name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')}
        </div>
      )}

      {badge && (
        <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 text-xs font-medium uppercase tracking-widest text-ink">
          {badge}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/75 to-transparent px-5 pb-5 pt-16">
        <h3 className="font-display text-xl font-medium leading-tight text-cream sm:text-2xl">
          {firstName}
          {lastName && (
            <>
              <br />
              {lastName}
            </>
          )}
        </h3>
        <p className="mt-1.5 text-xs text-cream/70">{role}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-lime opacity-0 transition duration-300 ease-out group-hover:opacity-100">
          Read bio
          <ArrowUpRight size={12} />
        </span>
      </div>
    </Link>
  )
}

export default function About() {
  const [identity, setIdentity] = useState(null)
  const [board, setBoard] = useState([])
  const [management, setManagement] = useState([])

  useEffect(() => {
    Promise.all([api.getAboutIdentities(), api.getAboutPeopleSections(), api.getAboutManagementSections()]).then(([identityResult, peopleResult, managementResult]) => {
      const mapMembers = (result) => (result.data || []).flatMap((section) => (section.members || []).map((member) => ({ ...member, photo: member.image, role: member.position, slug: member.id })))
      setIdentity(identityResult.data?.[0] || null)
      setBoard(mapMembers(peopleResult))
      setManagement(mapMembers(managementResult))
    }).catch(() => {})
  }, [])

  return (
    <>
      <PageHero eyebrow="About Us" title="Who We Are" crumbs={[{ label: 'About' }]} />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">
                {identity?.description || 'ICGL was established to drive the second mandate of DBN, which is to provide risk sharing facilities to PFIs with a view to alleviating the financing constraints faced by MSMEs and small corporates in Nigeria. The magnitude of this constraint is reflected in the 2017 National Survey of Micro, Small & Medium Enterprises, which revealed the existence of 41.5 million MSMEs in Nigeria, contributing 49.9% to GDP. However, less than 5% of MSMEs have access to finance, creating a financing gap of N48 trillion.'}
              </p>
            </Reveal>
            <Reveal delay={0.15} direction="right">
              <ImagePlaceholder className="aspect-[4/3] w-full" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                Our Identity
              </span>
              <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
                {identity?.description || 'ICGL enables MSMEs to access finance, helps PFIs mitigate lending risk, and supports sustainable economic growth.'}
              </h2>
            </Reveal>
            <Reveal delay={0.15} direction="left">
              <MotionGraphicPlaceholder className="h-36 w-36 shrink-0" />
            </Reveal>
          </div>

          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            <StaggerItem className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <IconPop className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                <Eye size={20} className="text-ink" />
              </IconPop>
              <h3 className="font-display mt-6 text-lg font-medium text-ink">Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {identity?.vision || 'To be a leading nation-wide sustainable Credit Guarantee Company, facilitating access to finance to MSMEs through eligible PFIs.'}
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <IconPop delay={0.1} className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                <Target size={20} className="text-ink" />
              </IconPop>
              <h3 className="font-display mt-6 text-lg font-medium text-ink">Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {identity?.mission || 'To improve access to finance for MSMEs in Nigeria through provision of partial credit guarantees and providing Technical Assistance to PFIs.'}
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <IconPop delay={0.2} className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                <ScrollText size={20} className="text-ink" />
              </IconPop>
              <h3 className="font-display mt-6 text-lg font-medium text-ink">Mandate</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {identity?.mandate || 'To facilitate access to finance among MSMEs through eligible PFIs in a sustainable and market-oriented way by providing credit guarantees and technical assistance to PFIs.'}
              </p>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Our People
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Board of Directors
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">
              The Board&rsquo;s strategic oversight and governance guide
              ICGL&rsquo;s vision and ensure the organization operates with
              integrity and accountability.
            </p>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {board.map((b) => (
              <StaggerItem key={b.name}>
                <PersonCard {...b} to={`/about/board/${b.slug}`} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.1} className="mt-8">
            <Link
              to={board[0] ? `/about/board/${board[0].slug}` : '/about'}
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition duration-150 ease-out hover:bg-lime-dark active:scale-[0.97]"
            >
              Board bio&rsquo;s
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Management Team
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">
              With deep industry experience, the management team drives
              innovation, builds strong partnerships, and ensures effective
              delivery of ICGL&rsquo;s services and initiatives.
            </p>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {management.map((m) => (
              <StaggerItem key={m.name}>
                <PersonCard {...m} to={`/about/management/${m.slug}`} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.1} className="mt-8">
            <Link
              to={management[0] ? `/about/management/${management[0].slug}` : '/about'}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition duration-150 ease-out hover:bg-lime-dark active:scale-[0.97]"
            >
              Management bio&rsquo;s
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

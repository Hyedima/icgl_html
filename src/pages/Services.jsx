import { FileCheck2, Layers, PieChart, GraduationCap, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../components/motion/StaggerGroup'
import IconPop from '../components/motion/IconPop'
import { ImagePlaceholder, MotionGraphicPlaceholder } from '../components/Placeholders'

import { api } from '../lib/api'

export default function Services() {
  const [services, setServices] = useState([])
  const [whyUs, setWhyUs] = useState([])

  useEffect(() => {
    Promise.all([api.getServicesTypeSections(), api.getWhyChooseUsSections()]).then(([servicesResult, whyResult]) => {
      const icons = [FileCheck2, Layers, PieChart, GraduationCap]
      setServices((servicesResult.data || []).flatMap((section) => (section.items || []).map((item, index) => ({ ...item, body: item.description, icon: icons[index % icons.length] }))))
      setWhyUs((whyResult.data || []).flatMap((section) => (section.reasons || []).map((reason) => ({ ...reason, body: reason.description }))))
    }).catch(() => {})
  }, [])

  return (
    <>
      <PageHero eyebrow="Our Services" title="What We Do" crumbs={[{ label: 'Services' }]} />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">
                ICGL delivers core services designed to strengthen access to
                finance and support sustainable economic growth. Through its
                services, ICGL shares lending risk with financial institutions,
                encouraging them to extend credit to viable businesses that might
                otherwise face financing constraints. In addition, ICGL provides
                Technical Assistance to partner financial institutions and
                businesses, helping strengthen capacity and improve risk
                management practices.
              </p>
            </Reveal>
            <Reveal delay={0.15} direction="right">
              <ImagePlaceholder className="aspect-[4/3] w-full" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            <StaggerGroup className="grid gap-6 sm:grid-cols-2">
              {services.map(({ icon: Icon, title, body }) => (
                <StaggerItem
                  key={title}
                  className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
                >
                  <IconPop delay={0.1} className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream">
                    <Icon size={20} />
                  </IconPop>
                  <h3 className="font-display mt-6 text-lg font-medium text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <MotionGraphicPlaceholder className="hidden lg:flex" />
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Why choose us
            </span>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium leading-tight text-ink sm:text-4xl">
              We merge market intelligence with disciplined execution
            </h2>
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w) => (
              <StaggerItem key={w.title}>
                <h3 className="font-display text-lg font-medium text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-cream sm:text-3xl">
              Ready to explore a guarantee-backed loan?
            </h2>
            <Link
              to="/eligibility"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-lime-dark hover:text-cream"
            >
              Check eligibility
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

import { useEffect, useState } from 'react'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'

export default function Policies() {
  const [policies, setPolicies] = useState([])

  useEffect(() => {
    api.getPolicies().then((result) => setPolicies(result.data || [])).catch(() => setPolicies([]))
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Governance & Compliance"
        title="Our Corporate Policies"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'Policies' }]}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-soft">
              ICGL operates under a comprehensive framework of policies that
              govern our conduct, protect our stakeholders, and ensure
              compliance with applicable laws and international best
              practices. Our policies are reviewed periodically and approved by
              the Board of Directors.
            </p>
          </Reveal>
          <StaggerGroup className="mt-10 flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10">
            {policies.map((p) => (
              <StaggerItem key={p.title} className="p-7 transition hover:bg-lime-light/30">
                <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                  {p.subtitle}
                </span>
                <h2 className="font-display mt-2 text-lg font-medium text-ink">{p.title}</h2>
                {p.description && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.description}</p>
                )}
                {p.link && (
                  <Link
                    to={p.link.to}
                    className="mt-3 inline-block text-sm font-medium text-ink underline hover:text-lime-dark"
                  >
                    {p.link.label}
                  </Link>
                )}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem, staggerContainer, staggerItem } from '../components/motion/StaggerGroup'
import Counter from '../components/motion/Counter'
import { api } from '../lib/api'

export default function Impact() {
  const [impactStats, setImpactStats] = useState([])
  const [sectors, setSectors] = useState([])
  const [zones, setZones] = useState([])
  const [pfiCategories, setPfiCategories] = useState([])
  const [certifications, setCertifications] = useState([])

  useEffect(() => {
    Promise.all([
      api.getImpactOverviews(),
      api.getEconomicSectors(),
      api.getGeographicReach(),
      api.getPfiPerformance(),
      api.getRatingCertifications(),
    ]).then(([stats, sectorResult, zoneResult, pfiResult, certificationResult]) => {
      setImpactStats((stats.data || []).filter((item) => item.category === 'impact'))
      setSectors(sectorResult.data || [])
      setZones(zoneResult.data || [])
      setPfiCategories(pfiResult.data || [])
      setCertifications(certificationResult.data || [])
    }).catch(() => {})
  }, [])

  return (
    <>
      <PageHero eyebrow="Our Impact" title="Impact Dashboard" crumbs={[{ label: 'Impact' }]} />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal><p className="text-sm text-ink-soft">As of September 2025</p></Reveal>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((s) => (
              <StaggerItem
                key={s.label}
                className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
              >
                <dt className="text-xs uppercase tracking-widest text-ink-soft">{s.label}</dt>
                <dd className="font-display mt-3 text-3xl font-medium text-ink">{s.value}</dd>
                <p className="mt-1 text-xs text-ink-soft">{s.delta}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <StaggerGroup className="mt-4 grid gap-4 sm:grid-cols-2">
            <StaggerItem className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg">
              <dt className="text-xs uppercase tracking-widest text-ink-soft">States + FCT covered</dt>
              <dd className="font-display mt-3 text-3xl font-medium text-ink">
                <Counter value={36} />
              </dd>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg">
              <dt className="text-xs uppercase tracking-widest text-ink-soft">Accredited PFIs</dt>
              <dd className="font-display mt-3 text-3xl font-medium text-ink">
                <Counter value={23} />
              </dd>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Economic sectors
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Sector performance
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 overflow-x-auto rounded-2xl border border-ink/10 bg-cream">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-xs uppercase tracking-widest text-ink-soft">
                  <th className="px-5 py-4">Sector</th>
                  <th className="px-5 py-4">Loans Guaranteed</th>
                  <th className="px-5 py-4">MSMEs Supported</th>
                  <th className="px-5 py-4">Jobs Created</th>
                  <th className="px-5 py-4">Female %</th>
                  <th className="px-5 py-4">Youth %</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <motion.tbody
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                {sectors.map((row) => (
                  <motion.tr
                    key={row.sector}
                    variants={staggerItem}
                    className="border-b border-ink/10 transition last:border-0 hover:bg-lime-light/60"
                  >
                    <td className="px-5 py-4 font-medium text-ink">{row.sector}</td>
                    <td className="px-5 py-4 text-ink-soft">{row.loansGuaranteed}</td>
                    <td className="px-5 py-4 text-ink-soft">{row.msmesSupported}</td>
                    <td className="px-5 py-4 text-ink-soft">{row.jobsCreated}</td>
                    <td className="px-5 py-4 text-ink-soft">{row.femalePercentage}</td>
                    <td className="px-5 py-4 text-ink-soft">{row.youthPercentage}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-lime-light px-2.5 py-1 text-xs font-medium text-lime-dark">
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Geographic reach
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              MSMEs by geopolitical zone
            </h2>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((z) => (
              <StaggerItem
                key={z.zone}
                className="flex items-center justify-between rounded-xl border border-ink/10 px-5 py-4 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
              >
                <span className="text-sm font-medium text-ink">{z.zone}</span>
                <span className="font-display text-lg font-medium text-lime-dark">{z.msmesSupported}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              PFI performance
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Participating financial institutions by category
            </h2>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pfiCategories.map((c) => (
              <StaggerItem
                key={c.label}
                className="rounded-2xl border border-ink/10 bg-cream p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="font-display text-2xl font-medium text-ink">{c.count}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.label}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Ratings &amp; certifications
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Credit ratings &amp; certifications
            </h2>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((certification) => (
              <StaggerItem key={certification.id} className="rounded-2xl border border-ink/10 p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <p className="font-display text-lg font-medium text-ink">{certification.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{certification.description}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

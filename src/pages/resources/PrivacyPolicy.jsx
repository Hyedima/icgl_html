import { useEffect, useState } from 'react'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import { api } from '../../lib/api'

export default function PrivacyPolicy() {
  const [sections, setSections] = useState([])

  useEffect(() => {
    api.getPrivacyPolicies().then((result) => setSections((result.data || []).map((section) => ({ ...section, id: section.id, body: section.description.split('\n').filter(Boolean) })))).catch(() => setSections([]))
  }, [])

  return (
    <>
      <PageHero
        title="Privacy Policy"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'Privacy Policy' }]}
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 lg:grid-cols-4 lg:px-10">
          <nav className="hidden lg:col-span-1 lg:block">
            <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">Contents</p>
            <ul className="mt-4 flex flex-col gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm text-ink-soft transition hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-10 lg:col-span-3">
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={Math.min(i * 0.04, 0.2)} id={s.id}>
                <h2 className="font-display text-xl font-medium text-ink">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

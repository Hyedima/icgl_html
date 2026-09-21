import { useEffect, useState } from 'react'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { api } from '../../lib/api'

export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    api.getNews().then((result) => setNews(result.data || [])).catch(() => setNews([]))
  }, [])

  return (
    <>
      <PageHero
        title="News & Updates"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'News' }]}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
          <StaggerGroup className="flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10">
            {news.map((n) => (
              <StaggerItem
                key={n.title}
                className="flex flex-col gap-5 p-7 transition hover:bg-lime-light/30 sm:flex-row sm:items-start"
              >
                {n.image && (
                  <img
                    src={n.image}
                    alt=""
                    aria-hidden="true"
                    className="h-32 w-full shrink-0 rounded-xl object-cover sm:h-24 sm:w-32"
                  />
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-ink-soft">
                    <span className="rounded-full bg-lime-light px-2.5 py-1 font-medium text-lime-dark">
                      {n.newsType}
                    </span>
                    <span>{n.date}</span>
                    <span>&middot;</span>
                    <span>{n.readTime || ''}</span>
                  </div>
                  <h2 className="font-display mt-3 text-lg font-medium leading-snug text-ink">
                    {n.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{n.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

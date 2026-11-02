import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { NEWS } from '../../data/content'

export default function News() {
  const [year, setYear] = useState('all')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const years = useMemo(
    () => [...new Set(NEWS.map((item) => item.year).filter(Boolean))],
    [],
  )
  const categories = useMemo(
    () => [...new Set(NEWS.map((item) => item.category))],
    [],
  )
  const filteredNews = NEWS.filter((item) => {
    const matchesYear = year === 'all' || item.year === year
    const matchesCategory = category === 'all' || item.category === category
    const searchableText = `${item.title} ${item.body} ${item.category} ${item.article
      .flatMap((section) => [section.heading, ...section.paragraphs])
      .join(' ')}`.toLowerCase()
    const matchesQuery = searchableText.includes(query.trim().toLowerCase())
    return matchesYear && matchesCategory && matchesQuery
  })

  return (
    <>
      <PageHero
        title="News & Updates"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'News' }]}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
          <div className="rounded-2xl border border-ink/10 bg-lime-light p-4 sm:p-5">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-lime-dark">
              <SlidersHorizontal size={15} />
              Filter news
            </div>
            <div className={`mt-4 grid gap-3 ${years.length > 0 ? 'md:grid-cols-[1fr_170px_190px]' : 'md:grid-cols-[1fr_190px]'}`}>
              <label className="relative block">
                <span className="sr-only">Search news</span>
                <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by keyword..."
                  className="w-full rounded-xl border border-ink/15 bg-cream py-3 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-lime-dark"
                />
              </label>
              {years.length > 0 && (
                <label>
                  <span className="sr-only">Filter by year</span>
                  <select
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-lime-dark"
                  >
                    <option value="all">All years</option>
                    {years.map((itemYear) => <option key={itemYear} value={itemYear}>{itemYear}</option>)}
                  </select>
                </label>
              )}
              <label>
                <span className="sr-only">Filter by category</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-lime-dark"
                >
                  <option value="all">All categories</option>
                  {categories.map((itemCategory) => <option key={itemCategory} value={itemCategory}>{itemCategory}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-ink-soft">
              <span>{filteredNews.length} {filteredNews.length === 1 ? 'story' : 'stories'} found</span>
              {(year !== 'all' || category !== 'all' || query) && (
                <button
                  type="button"
                  onClick={() => {
                    setYear('all')
                    setCategory('all')
                    setQuery('')
                  }}
                  className="font-medium text-ink underline underline-offset-2 hover:text-lime-dark"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {filteredNews.length > 0 ? (
            <StaggerGroup className="mt-6 flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10">
            {filteredNews.map((n) => (
              <StaggerItem
                key={n.slug}
                className="transition hover:bg-lime-light/30"
              >
                <Link
                  to={`/resources/news/${n.slug}`}
                  className="flex h-full flex-col gap-5 p-7 sm:flex-row sm:items-start"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-ink-soft">
                      <span className="rounded-full bg-lime-light px-2.5 py-1 font-medium text-lime-dark">
                        {n.category}
                      </span>
                      <span>{n.dateLabel}</span>
                      <span>&middot;</span>
                      <span>{n.readTime}</span>
                    </div>
                    <h2 className="font-display mt-3 text-lg font-medium leading-snug text-ink">
                      {n.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{n.body}</p>
                    <span className="mt-4 inline-flex text-sm font-medium text-lime-dark">
                      Read full story <span className="ml-1" aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
            </StaggerGroup>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-ink/20 px-6 py-14 text-center">
              <h2 className="font-display text-xl font-medium text-ink">No news found</h2>
              <p className="mt-2 text-sm text-ink-soft">Try another keyword, year, or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

import { useMemo, useState } from 'react'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { Download, Search, SlidersHorizontal } from 'lucide-react'
import annualReportImage from '../../assets/who-we-are-web.jpg'
import researchImage from '../../assets/hero-2-web.jpg'
import guidelinesImage from '../../assets/services-hero.jpg'
import pressKitImage from '../../assets/career-team-web.jpg'

const publications = [
  { category: 'Annual Report', year: '2025', title: 'ICGL Annual Report & Financial Statements 2025', body: "Comprehensive review of ICGL's guarantee operations, financial performance, portfolio overview, and strategic developments for the year 2025.", meta: 'PDF · 4.2 MB', image: annualReportImage, alt: 'Partners reviewing financial charts' },
  { category: 'Annual Report', year: '2024', title: 'ICGL Annual Report & Financial Statements 2024', body: "A detailed account of ICGL's operations, guarantee issuances, financial position, and impact metrics for the 2024 financial year.", meta: 'PDF · 3.8 MB', image: annualReportImage, alt: 'Partners reviewing financial charts' },
  { category: 'Research', year: '2025', title: 'MSME Finance Gap in Nigeria: Insights & Opportunities', body: 'An analysis of the current financing gap facing MSMEs in Nigeria, the role of credit guarantee schemes, and strategies for expanding access to affordable credit.', meta: 'PDF · 2.1 MB', image: researchImage, alt: 'Business partners discussing a financial plan' },
  { category: 'Research', year: '2024', title: 'Credit Guarantee Effectiveness: Evidence from the Nigerian Market', body: 'A study examining the additionality and impact of partial credit guarantees on MSME loan volumes, default rates, and economic outcomes in the Nigerian financial sector.', meta: 'PDF · 1.7 MB', image: researchImage, alt: 'Business partners discussing a financial plan' },
  { category: 'Guidelines', year: '2025', title: 'PFI Onboarding & Participation Guidelines (Revised 2025)', body: 'The revised guidelines for financial institutions seeking to become or maintain their status as ICGL Participating Financial Institutions.', meta: 'PDF · 1.2 MB', image: guidelinesImage, alt: 'Financial partners collaborating on a service plan' },
  { category: 'Press Kit', year: '2026', title: 'ICGL Media & Press Kit 2026', body: 'Official ICGL press kit including brand assets, executive bios, key facts and figures, and approved descriptions of ICGL’s mandate and products for media use.', meta: 'ZIP · 8.4 MB', image: pressKitImage, alt: 'ICGL team working together' },
]

export default function Publications() {
  const [year, setYear] = useState('all')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const years = useMemo(() => [...new Set(publications.map((item) => item.year))], [])
  const categories = useMemo(() => [...new Set(publications.map((item) => item.category))], [])
  const filteredPublications = publications.filter((publication) => {
    const matchesYear = year === 'all' || publication.year === year
    const matchesCategory = category === 'all' || publication.category === category
    const searchableText = `${publication.title} ${publication.body} ${publication.category}`.toLowerCase()
    const matchesQuery = searchableText.includes(query.trim().toLowerCase())
    return matchesYear && matchesCategory && matchesQuery
  })

  return (
    <>
      <PageHero
        eyebrow="Knowledge Centre"
        title="Reports & Publications"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'Publications' }]}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
              Access ICGL&rsquo;s annual reports, research insights,
              operational guidelines, and policy documents. Our publications
              promote transparency and contribute to the development of the
              MSME finance ecosystem in Nigeria.
            </p>
          </Reveal>
          <div className="mt-10 rounded-2xl border border-ink/10 bg-lime-light p-4 sm:p-5">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-lime-dark">
              <SlidersHorizontal size={15} />
              Filter publications
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_170px_190px]">
              <label className="relative block">
                <span className="sr-only">Search publications</span>
                <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by keyword..."
                  className="w-full rounded-xl border border-ink/15 bg-cream py-3 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-lime-dark"
                />
              </label>
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
              <span>{filteredPublications.length} {filteredPublications.length === 1 ? 'publication' : 'publications'} found</span>
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

          {filteredPublications.length > 0 ? (
          <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2">
            {filteredPublications.map((p) => (
              <StaggerItem
                key={p.title}
                className="flex flex-col rounded-2xl border border-ink/10 p-7 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-ink">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[0.2em] text-cream">
                    {p.category}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
                  <span className="rounded-full bg-lime-light px-2.5 py-1 font-medium text-lime-dark">
                    {p.category}
                  </span>
                  <span>{p.year}</span>
                </div>
                <h3 className="font-display mt-3 text-lg font-medium leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                  <span className="text-xs text-ink-soft">{p.meta}</span>
                  <span className="group inline-flex items-center gap-1 text-sm font-medium text-ink">
                    <Download size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                    Download
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-ink/20 px-6 py-14 text-center">
              <h2 className="font-display text-xl font-medium text-ink">No publications found</h2>
              <p className="mt-2 text-sm text-ink-soft">Try another keyword, year, or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

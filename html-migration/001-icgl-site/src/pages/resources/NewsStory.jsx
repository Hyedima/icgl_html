import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import { NEWS } from '../../data/content'

export default function NewsStory() {
  const { slug } = useParams()
  const story = NEWS.find((item) => item.slug === slug)

  if (!story) return <Navigate to="/resources/news" replace />

  return (
    <>
      <PageHero
        eyebrow={story.category}
        title={story.title}
        crumbs={[
          { label: 'Resources', to: '/resources/news' },
          { label: 'News', to: '/resources/news' },
          { label: story.title },
        ]}
      />

      <article className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-soft">
              <span className="rounded-full bg-lime-light px-2.5 py-1 font-medium text-lime-dark">
                {story.category}
              </span>
              <span>{story.dateLabel}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{story.readTime}</span>
            </div>
            <p className="font-display mt-8 text-xl leading-relaxed text-ink">
              {story.body}
            </p>
          </Reveal>

          <div className="mt-10 space-y-10">
            {story.article.map((section) => (
              <Reveal key={section.heading}>
                <h2 className="font-display text-2xl font-medium text-ink">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-ink-soft">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 border-t border-ink/10 pt-6">
            <h2 className="text-xs font-medium uppercase tracking-widest text-ink-soft">
              Sources
            </h2>
            <ul className="mt-3 space-y-2">
              {story.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-lime-dark hover:text-ink"
                  >
                    {source.label}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Link
            to="/resources/news"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition hover:border-lime-dark hover:text-lime-dark"
          >
            <ArrowLeft size={16} />
            Back to news
          </Link>
        </div>
      </article>
    </>
  )
}

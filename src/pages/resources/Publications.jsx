import { useEffect, useState } from 'react'
import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { Download } from 'lucide-react'
import { ImagePlaceholder } from '../../components/Placeholders'
import { api } from '../../lib/api'

export default function Publications() {
  const [publications, setPublications] = useState([])

  useEffect(() => {
    api.getPublications().then((result) => setPublications(result.data || [])).catch(() => setPublications([]))
  }, [])

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
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            {publications.map((p) => (
              <StaggerItem
                key={p.title}
                className="flex flex-col rounded-2xl border border-ink/10 p-7 transition hover:-translate-y-1 hover:border-lime-dark hover:shadow-lg"
              >
                <ImagePlaceholder label="Cover placeholder" className="aspect-[16/9] w-full" />
                <div className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
                  <span className="rounded-full bg-lime-light px-2.5 py-1 font-medium text-lime-dark">
                    {p.publicationType}
                  </span>
                  <span>{p.year}</span>
                </div>
                <h3 className="font-display mt-3 text-lg font-medium leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                  <span className="text-xs text-ink-soft">{p.document ? 'Download document' : ''}</span>
                  <a href={p.document || '#'} className="group inline-flex items-center gap-1 text-sm font-medium text-ink">
                    <Download size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                    Download
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

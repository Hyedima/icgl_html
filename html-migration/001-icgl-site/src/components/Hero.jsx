import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-ink/10">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-lime/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-lime/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-ink-soft">
          A subsidiary of the Development Bank of Nigeria
        </div>

        <h1 className="font-display max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Growth for MSMEs,
          <br />
          <span className="italic text-lime-dark">guaranteed.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
          Impact Credit Guarantee Limited shares risk with participating
          financial institutions, giving them the confidence to lend more to
          Nigeria&rsquo;s Micro, Small and Medium Scale Enterprises.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#eligibility"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-lime-dark"
          >
            Check eligibility
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium text-ink transition hover:border-ink"
          >
            Learn more
          </a>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-ink/10 pt-10 sm:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-soft">
              MSMEs in Nigeria
            </dt>
            <dd className="font-display mt-2 text-3xl font-medium text-ink sm:text-4xl">
              41.5m
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-soft">
              Max. guarantee cover
            </dt>
            <dd className="font-display mt-2 text-3xl font-medium text-ink sm:text-4xl">
              60%
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-soft">
              Max. tenor
            </dt>
            <dd className="font-display mt-2 text-3xl font-medium text-ink sm:text-4xl">
              5&ndash;8 yrs
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-soft">
              Guarantee products
            </dt>
            <dd className="font-display mt-2 text-3xl font-medium text-ink sm:text-4xl">
              3
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

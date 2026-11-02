import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

const criteria = [
  'Must be a licensed Bank Financial Institution operating in Nigeria',
  'Must meet ICGL’s minimum eligibility requirements for participating financial institutions',
  'Lending must be directed to eligible MSMEs and small corporates',
]

export default function Eligibility() {
  return (
    <section id="eligibility" className="border-b border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
            Eligibility
          </span>
          <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Is your institution eligible for a guarantee?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            To obtain a partial credit guarantee from ICGL, a participating
            financial institution must meet our minimum eligibility
            requirements.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-lime-dark"
          >
            Get in touch to apply
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-lime-light p-8 sm:p-10">
          <h3 className="font-display text-xl font-medium text-ink">
            To qualify, a PFI should
          </h3>
          <ul className="mt-6 flex flex-col gap-4">
            {criteria.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-lime-dark"
                />
                <span className="text-sm leading-relaxed text-ink-soft">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

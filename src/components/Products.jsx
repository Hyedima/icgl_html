import { FileCheck2, Layers, PieChart, GraduationCap } from 'lucide-react'

const products = [
  {
    icon: FileCheck2,
    title: 'Individual Guarantee',
    body: 'A partial credit guarantee issued against a single, specific loan facility extended by a PFI to an eligible MSME.',
  },
  {
    icon: Layers,
    title: 'Blanket Guarantee',
    body: 'Cover extended across a defined class of qualifying loans, letting PFIs scale lending to MSMEs without seeking approval loan-by-loan.',
  },
  {
    icon: PieChart,
    title: 'Portfolio Guarantee',
    body: 'Risk-sharing applied across a PFI’s wider MSME loan portfolio, diversifying exposure across many borrowers.',
  },
]

const characteristics = [
  { label: 'Maximum guarantee cover', value: '60% of loan disbursed' },
  { label: 'Maximum loan size', value: 'Defined from time to time' },
  { label: 'Maximum tenor', value: '5 years (up to 8 for special projects)' },
  { label: 'Eligible sectors', value: 'All sectors within the MSME segment' },
]

export default function Products() {
  return (
    <section id="products" className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
            Our products
          </span>
          <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Guarantee products built for PFIs
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            ICGL currently offers three guarantee products to participating
            financial institutions, plus technical assistance to strengthen
            MSME financing capabilities.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {products.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-2xl border border-ink/10 p-8 transition hover:border-lime-dark hover:bg-lime-light"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream transition group-hover:bg-lime group-hover:text-ink">
                <Icon size={20} />
              </div>
              <h3 className="font-display mt-6 text-xl font-medium text-ink">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-dashed border-ink/20 p-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-light">
            <GraduationCap size={20} className="text-lime-dark" />
          </div>
          <div>
            <h3 className="font-display text-xl font-medium text-ink">
              Technical Assistance
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              On a need basis, ICGL also provides technical assistance to
              support PFIs in enhancing their MSME financing capabilities.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-ink p-8 text-cream sm:p-10">
          <h3 className="text-xs font-medium uppercase tracking-widest text-lime">
            Guarantee characteristics
          </h3>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {characteristics.map((c) => (
              <div key={c.label}>
                <dt className="text-xs uppercase tracking-widest text-cream/60">
                  {c.label}
                </dt>
                <dd className="font-display mt-2 text-lg font-medium leading-snug text-cream">
                  {c.value}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

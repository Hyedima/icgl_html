import { ShieldCheck, TrendingUp, Users } from 'lucide-react'

const points = [
  {
    icon: ShieldCheck,
    title: 'Risk sharing',
    body: 'ICGL shares the credit risk with participating financial institutions, absorbing a portion of losses on qualifying MSME loans.',
  },
  {
    icon: TrendingUp,
    title: 'More lending',
    body: 'With risk shared, PFIs gain the confidence to extend more credit to MSMEs and small corporates across every sector.',
  },
  {
    icon: Users,
    title: 'Economic growth',
    body: 'Greater access to finance for MSMEs creates more jobs and spurs broader economic growth across Nigeria.',
  },
]

export default function Solution() {
  return (
    <section id="about" className="border-b border-ink/10 bg-lime-light">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
            Our solution
          </span>
          <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Shared risk in lending creates more financing for MSMEs.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Impact Credit Guarantee Limited (ICGL) is a wholly owned
            subsidiary of the Development Bank of Nigeria Plc (DBN), set up
            through a project with the World Bank to provide credit
            guarantees on loans made to eligible MSMEs and small corporates
            by participating financial institutions in Nigeria.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {points.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-ink/10 bg-cream p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
                <Icon size={20} className="text-ink" />
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
      </div>
    </section>
  )
}

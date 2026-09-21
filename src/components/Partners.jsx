const backers = [
  { name: 'Development Bank of Nigeria', note: 'Parent company' },
  { name: 'The World Bank', note: 'Founding project partner' },
]

export default function Partners() {
  return (
    <section className="border-b border-ink/10 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">
          Backed by
        </span>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {backers.map((b) => (
            <div
              key={b.name}
              className="rounded-xl border border-ink/10 bg-white px-6 py-5"
            >
              <p className="font-display text-lg font-medium text-ink">
                {b.name}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{b.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Our potential partners &mdash; the participating financial
          institutions we guarantee lending through &mdash; are all licensed
          Bank Financial Institutions in Nigeria.
        </p>
      </div>
    </section>
  )
}

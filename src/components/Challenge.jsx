export default function Challenge() {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
            The challenge
          </span>
          <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Nigeria&rsquo;s MSMEs drive the economy, but can&rsquo;t get the
            credit they need.
          </h2>
        </div>
        <div className="flex flex-col justify-center gap-6 text-ink-soft">
          <p className="text-lg leading-relaxed">
            Nigeria is home to an estimated 41.5 million Micro, Small and
            Medium Scale Enterprises &mdash; a segment that underpins jobs and
            local economic growth across the country.
          </p>
          <p className="text-lg leading-relaxed">
            Yet participating financial institutions are often unwilling or
            unable to extend credit to this segment, constrained by the risk
            of lending to businesses without the collateral or track record
            banks typically require.
          </p>
        </div>
      </div>
    </section>
  )
}

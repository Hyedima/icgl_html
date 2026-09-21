import { ArrowUpRight, Mail } from 'lucide-react'

export default function Cta() {
  return (
    <section id="contact" className="bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-28">
        <span className="text-xs font-medium uppercase tracking-widest text-lime">
          Ready to talk?
        </span>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-medium leading-tight text-cream sm:text-4xl">
          Let&rsquo;s unlock more financing for Nigeria&rsquo;s MSMEs
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
          If your institution meets our guarantee criteria and is ready to
          extend more credit to MSMEs, we would like to hear from you.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:info@impactguaranteeng.com"
            className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-lime-dark hover:text-cream"
          >
            <Mail size={16} />
            Contact ICGL
          </a>
          <a
            href="#eligibility"
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-sm font-medium text-cream transition hover:border-cream"
          >
            Review eligibility
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

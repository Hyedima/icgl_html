import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Eligibility', href: '#eligibility' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            ICGL
          </span>
          <span className="hidden text-xs uppercase tracking-widest text-ink-soft sm:inline">
            Impact Credit Guarantee
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#eligibility"
          className="hidden items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-lime hover:text-ink lg:inline-flex"
        >
          Check eligibility
          <ArrowUpRight size={16} />
        </a>

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-cream px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink-soft"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#eligibility"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream"
            >
              Check eligibility
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

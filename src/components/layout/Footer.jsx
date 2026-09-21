import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, X, Instagram, Linkedin } from 'lucide-react'
import { CONTACT, CERTIFICATIONS, FOOTER_LINKS, SOCIALS } from '../../data/content'
import brandBar from '../../assets/asset-89738e53.jpg'

const SOCIAL_ICONS = { Facebook, X, Instagram, LinkedIn: Linkedin }

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-ink">
      <img
        src={brandBar}
        alt=""
        aria-hidden="true"
        className="h-1.5 w-full object-cover"
      />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-medium text-cream">
              Impact Credit Guarantee Limited
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">
              ICGL is a wholly owned subsidiary of the Development Bank of
              Nigeria Plc (DBN). ICGL was set up through a project with the
              World Bank to provide guarantees on loans made to MSMEs and
              small corporates by PFIs in Nigeria.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-cream/40">
              Useful Links
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-cream/70 hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-cream/40">
              Contact Us
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-lime" />
                {CONTACT.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-lime" />
                <a href={CONTACT.phoneHref} className="hover:text-cream">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-lime" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-cream">
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition hover:border-lime hover:text-lime"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-cream/40">
              Certifications & Ratings
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {CERTIFICATIONS.map((c) => (
                <li
                  key={c.code}
                  className={`flex flex-nowrap gap-2.5 text-sm text-cream/70 ${
                    c.code === 'Agusto & Co.' ? 'items-start' : 'items-center'
                  }`}
                >
                  {c.icon && (
                    <img
                      src={c.icon}
                      alt=""
                      aria-hidden="true"
                      className={`shrink-0 object-contain ${
                        c.code === 'Agusto & Co.' ? '-mt-[41px] h-[120px] w-[120px]' : 'h-10 w-10'
                      }`}
                    />
                  )}
                  <span>
                    <span className="font-medium text-cream">{c.code}</span>{' '}
                    {c.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {year}, All rights reserved. Copyright by Impact Credit Guarantee Limited.</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/resources/privacy-policy" className="hover:text-cream">
              Privacy Policy
            </Link>
            <a
              href="https://www.devbankng.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cream"
            >
              Parent Company
            </a>
            <Link to="/about" className="hover:text-cream">
              Corporate Philosophy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

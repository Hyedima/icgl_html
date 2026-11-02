import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { Link } from 'react-router-dom'
import esrmPolicy from '../../assets/files/Environmental-and-Social-Risk-Management-ESRM-Policy.pdf'
import imsPolicy from '../../assets/files/ICGL-Integrated-Management-System-Policy.pdf'
import privacyPolicy from '../../assets/files/IMPACT-DATA-PROTECTION-AND-PRIVACY-POLICY.pdf'
import antiBriberyPolicy from '../../assets/files/Anti-Bribery-Corruption-Policy-ICGL-2025.pdf'

const policies = [
  {
    tag: 'ESG',
    title: 'Environmental and Social Risk Management (ESRM)',
    body: "ICGL integrates environmental and social risk considerations into its guarantee decision-making process. Our ESRM policy ensures that guaranteed loans do not support activities that cause significant environmental harm, violate human rights, or exploit vulnerable populations, in alignment with World Bank Group safeguard standards.",
    link: { href: esrmPolicy, label: 'Read ESRM policy' },
  },
  {
    tag: 'Operations',
    title: 'Integrated Management System (IMS)',
    body: "ICGL's Integrated Management System brings together its ISO-certified quality, information security, business continuity, and service management frameworks into a single, cohesive governance structure.",
    link: { href: imsPolicy, label: 'Read IMS policy' },
  },
  {
    tag: 'Data',
    title: 'Data Protection and Privacy',
    body: null,
    link: { href: privacyPolicy, label: 'Read Data Protection and Privacy policy' },
  },
  {
    tag: 'Ethics',
    title: 'Anti-Bribery & Corruption',
    body: 'ICGL has zero tolerance for bribery and corruption in any form. This policy prohibits offering, accepting, or facilitating any improper payments or advantages in connection with ICGL’s business, and applies to all staff and business partners.',
    link: { href: antiBriberyPolicy, label: 'Read Anti-Bribery & Corruption policy' },
  },
  {
    tag: 'Compliance',
    title: 'Whistleblowing Policy',
    body: 'ICGL is committed to the highest standards of transparency and accountability, providing a safe, confidential channel to report suspected misconduct without fear of retaliation.',
    link: { href: antiBriberyPolicy, label: 'Read Whistleblowing policy' },
  },
]

export default function Policies() {
  return (
    <>
      <PageHero
        eyebrow="Governance & Compliance"
        title="Our Corporate Policies"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'Policies' }]}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-soft">
              ICGL operates under a comprehensive framework of policies that
              govern our conduct, protect our stakeholders, and ensure
              compliance with applicable laws and international best
              practices. Our policies are reviewed periodically and approved by
              the Board of Directors.
            </p>
          </Reveal>
          <StaggerGroup className="mt-10 flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10">
            {policies.map((p) => (
              <StaggerItem key={p.title} className="p-7 transition hover:bg-lime-light/30">
                <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                  {p.tag}
                </span>
                <h2 className="font-display mt-2 text-lg font-medium text-ink">{p.title}</h2>
                {p.body && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                )}
                {p.link && (
                  p.link.href ? (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-lime-dark"
                    >
                      {p.link.label}
                    </a>
                  ) : (
                    <Link
                      to={p.link.to}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-lime-dark"
                    >
                      {p.link.label}
                    </Link>
                  )
                )}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

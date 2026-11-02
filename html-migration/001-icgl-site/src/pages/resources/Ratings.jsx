import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'
import StaggerGroup, { StaggerItem } from '../../components/motion/StaggerGroup'
import { CheckCircle2 } from 'lucide-react'
import { MotionGraphicPlaceholder } from '../../components/Placeholders'
import quarantee from '../../assets/guarantee.jpg'

const strengths = [
  'Strong capital base and financial buffers in excess of regulatory requirements',
  'Robust risk management framework aligned with international best practices',
  'Backed by the Development Bank of Nigeria Plc (DBN), a AAA-rated institution',
  'Consistent growth in guarantee portfolio with maintained loss rates',
  'Strong governance, transparency, and compliance culture',
]

const isoCerts = [
  {
    code: 'ISO 27001:2022',
    title: 'Information Security Management',
    body: "This certification demonstrates ICGL's commitment to protecting sensitive information assets — including client data, financial records, and operational systems — through a structured Information Security Management System (ISMS).",
    scope: [
      'Data classification and access control policies',
      'Cyber threat monitoring and incident response',
      'Vendor and third-party risk management',
      'Employee security awareness and training',
    ],
  },
  {
    code: 'ISO 22301:2019',
    title: 'Business Continuity Management',
    body: "ICGL's Business Continuity Management System (BCMS) certification ensures operations can continue and recover rapidly from disruption — protecting partners, clients, and the guarantee obligations we underwrite.",
    scope: [
      'Business impact analysis and risk assessment',
      'Disaster recovery planning and testing',
      'Crisis communication and escalation protocols',
      'Recovery time and point objectives (RTO/RPO)',
    ],
  },
  {
    code: 'ISO 20000:2018',
    title: 'IT Service Management',
    body: "This IT Service Management System (ITSMS) certification confirms ICGL delivers and manages IT services in alignment with international best practices.",
    scope: [
      'IT service delivery and support processes',
      'Change, configuration, and release management',
      'Service level agreements and performance tracking',
      'Continual service improvement framework',
    ],
  },
]

const compliance = [
  { title: 'CBN Regulatory Compliance', body: 'Full compliance with all applicable Central Bank of Nigeria regulations and guidelines governing guarantee institutions.' },
  { title: 'AML / CFT Framework', body: 'Robust anti-money laundering and counter-financing of terrorism policies aligned with FATF recommendations.' },
  { title: 'ESG Standards', body: "Environmental, Social, and Governance considerations are embedded in ICGL's investment and guarantee decision-making process." },
  { title: 'World Bank Safeguards', body: "ICGL's guarantee operations comply with World Bank environmental and social safeguard standards applicable to its portfolio." },
]

export default function Ratings() {
  return (
    <>
      <PageHero
        eyebrow="Trust & Credibility"
        title="Our Ratings & Certifications"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'Ratings' }]}
      />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-ink/10 bg-lime-light p-8 text-center lg:col-span-1">
              <p className="font-display text-5xl font-medium text-ink">AA</p>
              <p className="mt-2 text-sm font-medium text-ink-soft">Agusto &amp; Co. — 2025 Rating</p>
            </div>
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-medium text-ink">
                AA Credit Rating — Agusto &amp; Co.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                ICGL has been assigned an AA credit rating by Agusto &amp;
                Co., Nigeria&rsquo;s foremost credit rating agency. This
                rating reflects ICGL&rsquo;s strong institutional capacity,
                sound governance structures, robust financial management, and
                consistent track record of honouring its guarantee
                obligations, placing ICGL among the highest-rated guarantee
                institutions in Nigeria.
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-lime-dark" />
                    <span className="text-sm text-ink-soft">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              International standards
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              ISO Certifications
            </h2>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 lg:grid-cols-3">
            {isoCerts.map((c) => (
              <StaggerItem
                key={c.code}
                className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-medium uppercase tracking-widest text-lime-dark">{c.code}</p>
                <h3 className="font-display mt-2 text-lg font-medium text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-widest text-ink-soft">
                  Scope coverage
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {c.scope.map((s) => (
                    <li key={s} className="text-xs text-ink-soft">
                      &bull; {s}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                Regulatory compliance
              </span>
              <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
                Additional compliance frameworks
              </h2>
            </Reveal>
            <Reveal delay={0.15} direction="left">
              {/* <MotionGraphicPlaceholder className="h-36 w-36 shrink-0" /> */}
              <img
                src={quarantee}
                alt="ICGL team members in a meeting"
                className="h-100 w-100 shrink-0 rounded-2xl object-cover shadow-lg"
              />
            </Reveal>
          </div>
          <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {compliance.map((c) => (
              <StaggerItem key={c.title}>
                <h3 className="font-display text-lg font-medium text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

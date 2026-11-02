import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import StaggerGroup, { StaggerItem, staggerContainer, staggerItem } from '../components/motion/StaggerGroup'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowUpRight, XCircle } from 'lucide-react'
import eligibilityImage from '../assets/kvp-img.jpg'

const msmeCriteria = [
  'Must be a Micro, Small or Medium Enterprise (MSME) or small corporate registered in Nigeria',
  'Business must be operational and generating, or capable of generating, revenue',
  'Must be seeking a loan through an ICGL-approved Participating Financial Institution',
  'Business must not be involved in activities on ICGL’s exclusion list',
  'Owner(s) must not be on any financial crime or credit blacklist',
  'Business must demonstrate a viable purpose for the loan (working capital, equipment, expansion, etc.)',
  'Must be willing to meet the PFI’s documentation and compliance requirements',
]

const pfiCriteria = [
  'hold a duly issued and valid license from CBN to carry on business as a financial institution',

'demonstrate within the three most recent financial years, two years of profitable operations, with effective risk management procedures, controls, and acceptable levels of loan portfolio quality and performance',

'ensure that its shareholders and Board of Directors shall be qualified persons of proven integrity and shall be knowledgeable in business and financial matters, in accordance with the applicable regulatory guidelines on fit and proper persons',

'show evidence of compliance with all applicable laws and applicable CBN regulations. Where there is short term or temporary noncompliance, evidence of regularization shall be provided to ICGL',

'have qualified and experienced management, adequate organization and institutional capacity for its specific risk profile',

'have well defined policies and written procedures for management of all types of financial risks (liquidity, credit, currency, interest rate and market risk, as well as risks associated with balance sheet and income statement structures)',

'maintain adequate capital as prescribed by prudential regulations issued by the CBN',

'maintain adequate liquidity in line with required levels as prescribed by the CBN',

'has in place adequate procedures for Anti-Money Laundering (AML) and Combatting the Financing of Terrorism (CFT) in line with ICGL requirements',

'comply with KYC circulars issued by CBN',

'has in place an Environmental and Social Management System compliant with ICGL requirements',

'comply with all existing applicable laws and regulation on consumer protection, including measures to review each customer’s ability to repay before entering the lending agreement',

'have an arrangement with at least two credit bureaus',

'have an adequate portfolio quality in line with the financial institution’s criteria',

'conduct, maintain and enforce adequate internal audits and controls for its specific risk profile',

'have adequate management information systems; and ',

'demonstrate commitment to serving the MSME sector by having in place, a satisfactory MSME/Small Corporate loan approval processes and risk management procedures',

 
  // 'Must be a licensed financial institution regulated by the Central Bank of Nigeria (CBN)',
  // 'Must have an active MSME lending portfolio or demonstrable appetite to develop one',
  // 'Must meet ICGL’s minimum capital adequacy and financial health requirements',
  // 'Must have satisfactory AML/CFT compliance and governance frameworks in place',
  // 'Must sign and adhere to the ICGL Participation Agreement and all applicable guidelines',
  // 'Must commit to reporting obligations and information-sharing as required by ICGL',
  // 'Must not be under regulatory sanction or enforcement action at the time of application',
]

const sizeTable = [
  { cat: 'MSME', turnover: 'Up to 2.812 bn', employees: '< 250', assets: 'Up to 2.812 bn' },
  { cat: 'Small Cooperate', turnover: '₦13.500 bn', employees: '< 500', assets: '₦13.500 bn' },
  // { cat: 'Medium Enterprise', turnover: '₦100m – ₦1 billion', employees: '50 – 199 employees', assets: '₦100m – ₦1 billion' },
]

const steps = [
  { n: '01', title: 'Approach a PFI', body: 'Visit any ICGL-approved Participating Financial Institution and express your interest in accessing a guaranteed loan.' },
  { n: '02', title: 'PFI Credit Assessment', body: 'The PFI conducts its own credit analysis and determines whether your loan qualifies for an ICGL guarantee.' },
  { n: '03', title: 'ICGL Guarantee Review', body: 'The PFI submits a guarantee application to ICGL, which reviews it against its eligibility criteria and policies.' },
  { n: '04', title: 'Guarantee Issued', body: 'Upon approval, ICGL issues a guarantee certificate to the PFI, which then disburses the loan to your business.' },
]

const excluded = [
  'Production or trade in illegal goods or substances',
  'Activities involving forced or child labour',
  'Gambling, casinos, and related activities',
  'Weapons, munitions, and military hardware',
  'Tobacco and tobacco-related products',
  'Activities with significant environmental or social harm',
  'Speculative real estate transactions',
  'Businesses with unresolved regulatory sanctions',
]

export default function Eligibility() {
  return (
    <>
      <PageHero
        eyebrow="Who Qualifies"
        title="Eligibility for ICGL Guarantee Support"
        crumbs={[{ label: 'Services', to: '/services' }, { label: 'Eligibility' }]}
      />

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">
                ICGL does not lend directly to businesses. Our guarantee support
                is accessed through approved Participating Financial Institutions
                (PFIs). To benefit, both the borrowing business and the PFI must
                meet the relevant eligibility criteria outlined below.
              </p>
            </Reveal>
            <Reveal delay={0.15} direction="right">
              <img
                src={eligibilityImage}
                alt="A small business owner discussing financing options with a financial partner"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <StaggerGroup className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-20">
          <StaggerItem className="rounded-2xl border border-ink/10 bg-cream p-8">
            <h3 className="font-display text-xl font-medium text-ink">
              MSME / Borrower Eligibility
            </h3>
            <p className="mt-1 text-sm text-ink-soft">Criteria for businesses seeking guaranteed loans</p>
            <ul className="mt-6 flex flex-col gap-3">
              {msmeCriteria.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-lime-dark" />
                  <span className="text-sm leading-relaxed text-ink-soft">{c}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>
          <StaggerItem className="rounded-2xl border border-ink/10 bg-cream p-8">
            <h3 className="font-display text-xl font-medium text-ink">PFI Eligibility</h3>
            <p className="mt-1 text-sm text-ink-soft">To be eligible to start cooperation with ICGL, the financial institution shall:</p>
            <ul className="mt-6 flex flex-col gap-3">
              {pfiCriteria.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-lime-dark" />
                  <span className="text-sm leading-relaxed text-ink-soft">{c}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              Coverage & Classification
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Coverage & Classification Thresholds
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Maximum 60% on principal subject to a maximum loan amount of (MSME - N450 million, Small Corporate - N1.5 billion).
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 overflow-x-auto rounded-2xl border border-ink/10">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 bg-lime-light text-xs uppercase tracking-widest text-ink-soft">
                  <th className="px-6 py-4">Categorization</th>
                  <th className="px-6 py-4">Employees Count</th>
                  <th className="px-6 py-4">Annual Turnover</th>
                  <th className="px-6 py-4">Total Assets</th>
                </tr>
              </thead>
              <motion.tbody
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                {sizeTable.map((row) => (
                  <motion.tr
                    key={row.cat}
                    variants={staggerItem}
                    className="border-b border-ink/10 transition last:border-0 hover:bg-lime-light/40"
                  >
                    <td className="px-6 py-4 font-medium text-ink">{row.cat}</td>
                    <td className="px-6 py-4 text-ink-soft">{row.employees}</td>
                    <td className="px-6 py-4 text-ink-soft">{row.turnover}</td>
                    <td className="px-6 py-4 text-ink-soft">{row.assets}</td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </Reveal>
          <p className="mt-3 text-xs text-ink-soft">
            * Classification thresholds are aligned with the SMEDAN
            definition and may be updated from time to time in line with
            regulatory guidance.
          </p>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-lime-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
              How it works
            </span>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Application process
            </h2>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <StaggerItem
                key={s.n}
                className="rounded-2xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="font-display text-2xl font-medium text-lime-dark">{s.n}</span>
                <h3 className="font-display mt-3 text-lg font-medium text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Excluded Activities &amp; Sectors
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              ICGL will not provide guarantee support for loans related to the
              following activities:
            </p>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {excluded.map((e) => (
              <StaggerItem key={e} className="flex items-start gap-2 rounded-xl border border-ink/10 p-4">
                <XCircle size={16} className="mt-0.5 shrink-0 text-ink-soft" />
                <span className="text-sm text-ink-soft">{e}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-cream sm:text-3xl">
              Ready to apply?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-cream/70">
              Speak to one of our approved Participating Financial Institutions
              today, or contact ICGL directly for guidance on the next steps.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-lime-dark hover:text-cream"
              >
                Contact us
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/resources/faqs"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-sm font-medium text-cream transition hover:border-cream"
              >
                Read FAQs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

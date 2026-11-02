import PageHero from '../../components/PageHero'
import Reveal from '../../components/motion/Reveal'

const sections = [
  {
    id: 's1',
    title: '1. About Impact Credit Guarantee Limited',
    body: [
      'Impact Credit Guarantee Limited ("ICGL" or "the Company") is a guarantee company devoted principally to providing partial credit guarantee coverage to Partner Financial Institutions (PFIs) on repayment obligations arising from certain eligible loans which have been granted to Micro, Small and Medium Enterprises (MSMEs) and Small Corporates.',
      'To achieve this objective, the Company gathers and processes certain personally identifiable information about individuals with whom it has relationships for various purposes, including employees, Partner Financial Institutions, MSMEs, suppliers and other third parties.',
    ],
  },
  {
    id: 's2',
    title: '2. Privacy Policy',
    body: [
      'ICGL exists to alleviate financing constraints faced by MSMEs in Nigeria through providing partial credit guarantees and technical assistance to eligible Partner Financial Institutions on a sustainable basis. Customers (PFIs and potential customers) can access ICGL’s services through channels including its website.',
      'By accessing ICGL’s services through e-channels and/or subscribing to any of its products, customers provide certain personally identifiable information, including information of consumers (end borrowers). ICGL’s staff are also required to provide certain personally identifiable information before, during and after recruitment.',
    ],
  },
  {
    id: 's3',
    title: '3. Internet Communications',
    body: [
      'To maintain ICGL’s security systems, protect staff, record transactions, and in certain circumstances prevent and detect crime or unauthorised activities, ICGL reserves the right to monitor internet communications including web and email traffic into and out of its domains.',
    ],
  },
  {
    id: 's4',
    title: '4. Cookies',
    body: [
      'ICGL may use a "cookie" and/or similar files or programs which may place certain information on your computer’s hard drive when you visit ICGL’s website, to improve internet service and understand how you use the site.',
      'Cookies do not enable ICGL to gather personal information about you unless you give the information to ICGL’s server. Most browsers allow blocking of cookies or a warning before one is stored.',
    ],
  },
  {
    id: 's5',
    title: '5. Where We Store Your Information',
    body: [
      'ICGL recognises the importance of protecting data from unauthorised access and data corruption, and develops security measures including firewalls, encryption technologies, restricted access, and continuous staff capacity building.',
    ],
  },
  {
    id: 's6',
    title: '6. Third-Party Sites & Services',
    body: [
      'ICGL’s website may contain links to third-party websites, products and services governed by those third parties’ own privacy practices. ICGL is not liable for any breach of confidentiality or privacy on such sites.',
      'Staff may only share Personal Data with third parties where there is a need to know, consent has been obtained, adequate security measures are in place, and a fully executed contract with NDPR-approved clauses exists.',
    ],
  },
  {
    id: 's7',
    title: '7. How We Use Your Data',
    body: ['ICGL may use your data to email or SMS you about forthcoming events and other products or services.'],
  },
  {
    id: 's8',
    title: '8. What Data Do We Collect?',
    body: ['Our Company collects personal identification information such as name, email address, and phone number.'],
  },
  {
    id: 's9',
    title: '9. How Long We Store Your Information',
    body: [
      'ICGL adheres to the principles of the Nigeria Data Protection Regulation to ensure information is properly collected, used only for the purpose for which it was collected, and disposed of safely when no longer needed.',
      'ICGL reserves the right to amend its Data Protection and Privacy Policy at any time and will place amendments on its website as they occur.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        crumbs={[{ label: 'Resources', to: '/resources/news' }, { label: 'Privacy Policy' }]}
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 lg:grid-cols-4 lg:px-10">
          <nav className="hidden lg:col-span-1 lg:block">
            <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">Contents</p>
            <ul className="mt-4 flex flex-col gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm text-ink-soft transition hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-10 lg:col-span-3">
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={Math.min(i * 0.04, 0.2)} id={s.id}>
                <h2 className="font-display text-xl font-medium text-ink">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

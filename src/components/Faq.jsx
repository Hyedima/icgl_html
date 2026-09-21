import { useState } from 'react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'What is Impact Credit Guarantee Limited?',
    a: 'ICGL is a wholly owned subsidiary of the Development Bank of Nigeria Plc (DBN), set up through a project with the World Bank to provide credit guarantees on loans made to eligible MSMEs and small corporates by participating financial institutions (PFIs) in Nigeria.',
  },
  {
    q: 'Who can partner with ICGL?',
    a: 'Our potential partners are all licensed Bank Financial Institutions operating in Nigeria that meet our minimum eligibility requirements.',
  },
  {
    q: 'What guarantee products does ICGL offer?',
    a: 'ICGL currently offers three types of guarantee products to PFIs on facilities granted to MSMEs: Individual Guarantee, Blanket Guarantee, and Portfolio Guarantee.',
  },
  {
    q: 'How much of a loan can ICGL guarantee?',
    a: 'ICGL provides a maximum guarantee cover of 60% of the loan disbursed, with a maximum tenor of 5 years, extendable to 8 years for special projects.',
  },
  {
    q: 'Does ICGL offer support beyond guarantees?',
    a: 'Yes. On a need basis, ICGL offers technical assistance to help PFIs enhance their MSME financing capabilities.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="border-b border-ink/10 bg-lime-light">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
            FAQs
          </span>
          <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
            In case you missed anything
          </h2>
        </div>

        <div className="mt-12 flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-cream">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q} className="px-6 sm:px-8">
                <button
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span className="font-display text-lg font-medium text-ink">
                    {item.q}
                  </span>
                  <Plus
                    size={20}
                    className={`shrink-0 text-lime-dark transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-6 text-sm leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-7xl border-t border-cream/10 px-6 py-10 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-medium text-cream">
              Impact Credit Guarantee Limited
            </p>
            <p className="mt-1 max-w-md text-sm text-cream/60">
              A wholly owned subsidiary of the Development Bank of Nigeria
              Plc, set up through a project with the World Bank.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-cream/60 sm:text-right">
            <a
              href="https://www.devbankng.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cream"
            >
              devbankng.com &rarr;
            </a>
            <span>&copy; {year} Impact Credit Guarantee Limited. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

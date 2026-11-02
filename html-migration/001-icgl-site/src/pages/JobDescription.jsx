import { useParams, Link, Navigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/motion/Reveal'
import {
  MapPin,
  Briefcase,
  Building2,
  UserCheck,
  Mail,
  CalendarClock,
  ArrowLeft,
  ArrowUpRight,
} from 'lucide-react'
import { VACANCIES } from '../data/content'

function JobSection({ title, body }) {
  return (
    <div>
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}

export default function JobDescription() {
  const { slug } = useParams()
  const job = VACANCIES.find((v) => v.slug === slug)

  if (!job) {
    return <Navigate to="/career" replace />
  }

  const mailtoHref = `mailto:${job.contactEmail}?subject=${encodeURIComponent(
    `Application: ${job.title}`
  )}`

  const details = [
    { icon: MapPin, label: 'Location', value: job.location },
    { icon: Briefcase, label: 'Employment Type', value: job.employmentType },
    { icon: Building2, label: 'Department', value: job.department },
    { icon: UserCheck, label: 'Reports To', value: job.reportsTo },
    { icon: Mail, label: 'Contact Email', value: job.contactEmail },
    { icon: CalendarClock, label: 'Application Deadline', value: job.deadline },
  ]

  const otherVacancies = VACANCIES.filter((v) => v.slug !== job.slug)

  return (
    <>
      <PageHero
        eyebrow="Available Vacancy"
        title={job.title}
        crumbs={[{ label: 'Career', to: '/career' }, { label: job.title }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-8">
            <Link
              to="/career#vacancies"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-ink"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Back to Job Listing
            </Link>
            <a
              href={mailtoHref}
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition duration-150 ease-out hover:bg-lime-dark active:scale-[0.97]"
            >
              Apply Now
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Reveal>
                <span className="text-xs font-medium uppercase tracking-widest text-lime-dark">
                  {job.department}
                </span>
                <h2 className="font-display mt-2 text-2xl font-medium text-ink sm:text-3xl">
                  {job.title}
                </h2>
                <p className="mt-1 text-sm text-ink-soft">{job.location}</p>
              </Reveal>

              <div className="mt-10 flex flex-col gap-10">
                <JobSection title="Description" body={job.description} />
                <JobSection title="Background" body={job.background} />
                <JobSection title="Objective" body={job.objective} />

                <div>
                  <h3 className="font-display text-lg font-medium text-ink">Scope of Work</h3>
                  <ol className="mt-3 flex flex-col gap-2.5">
                    {job.scopeOfWork.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                        <span className="font-display shrink-0 text-sm font-medium text-lime-dark">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <JobSection title="Conduct of Work" body={job.conductOfWork} />
                <JobSection title="Reporting Obligations" body={job.reportingObligations} />
              </div>

              <Reveal className="mt-12 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-8">
                <Link
                  to="/career#vacancies"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-ink"
                >
                  <ArrowLeft
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                  Back to Job Listing
                </Link>
                <a
                  href={mailtoHref}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition duration-150 ease-out hover:bg-lime-dark active:scale-[0.97]"
                >
                  Apply Now
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              <Reveal delay={0.1} direction="left" className="rounded-2xl bg-lime-light p-6">
                <ul className="flex flex-col gap-4">
                  {details.map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cream text-lime-dark">
                        <Icon size={16} />
                      </span>
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-widest text-ink-soft">
                          {label}
                        </span>
                        <span className="block text-sm font-medium text-ink">{value}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.15} direction="left" className="rounded-2xl border border-ink/10 p-6">
                <h3 className="font-display text-base font-medium text-ink">Application Process</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{job.applicationProcess}</p>
              </Reveal>

              <Reveal delay={0.2} direction="left" className="rounded-2xl border border-ink/10 p-6">
                <h3 className="font-display text-base font-medium text-ink">Required Qualification</h3>
                <ol className="mt-3 flex flex-col gap-2">
                  {job.requiredQualifications.map((q, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                      <span className="shrink-0 font-medium text-lime-dark">{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.25} direction="left" className="rounded-2xl border border-ink/10 p-6">
                <h3 className="font-display text-base font-medium text-ink">Payment Schedule</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{job.paymentSchedule}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {otherVacancies.length > 0 && (
        <section className="border-t border-ink/10 bg-lime-light">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <Reveal>
              <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
                Other Vacancies
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {otherVacancies.map((v) => (
                <Link
                  key={v.slug}
                  to={`/career/${v.slug}`}
                  className="group flex flex-col rounded-2xl border border-ink/10 bg-cream p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="font-display text-lg font-medium text-ink">{v.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {v.location} &middot; {v.deadline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                    View role
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

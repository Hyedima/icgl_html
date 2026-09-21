import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'
import { NAV } from '../../data/content'
import logo from '../../assets/icgl-logo.png'

function linkClass({ isActive }) {
  return `text-sm font-medium transition hover:text-ink ${
    isActive ? 'text-ink' : 'text-ink-soft'
  }`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <motion.nav
        initial={false}
        animate={{
          maxWidth: scrolled ? 1120 : 1280,
          paddingLeft: scrolled ? 20 : 24,
          paddingRight: scrolled ? 20 : 24,
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled ? 10 : 16,
          borderRadius: scrolled ? 999 : 24,
          boxShadow: scrolled
            ? '0 10px 30px -12px rgba(16,20,12,0.18)'
            : '0 0px 0px rgba(16,20,12,0)',
        }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex items-center justify-between border border-ink/10 bg-cream/90 backdrop-blur"
      >
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Impact Credit Guarantee Limited" className="h-10 w-auto sm:h-11" />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium text-ink-soft transition hover:text-ink">
                  {item.label}
                  <ChevronDown size={14} />
                </button>
                <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="flex flex-col gap-1 rounded-xl border border-ink/10 bg-white p-2 shadow-lg">
                    {item.children.map((c) => (
                      <NavLink
                        key={c.to}
                        to={c.to}
                        className={({ isActive }) =>
                          `rounded-lg px-3 py-2 text-sm transition hover:bg-lime-light ${
                            isActive ? 'bg-lime-light text-ink' : 'text-ink-soft'
                          }`
                        }
                      >
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                {item.label}
              </NavLink>
            )
          )}
        </div>

        <Link
          to="/eligibility"
          className="group hidden items-center gap-1 overflow-hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition duration-150 ease-out hover:bg-lime-dark hover:text-ink active:scale-[0.97] lg:inline-flex"
        >
          Check eligibility
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <Link
          to="/admin/sign-in"
          className="hidden text-sm font-medium text-ink-soft transition hover:text-ink lg:inline-flex"
        >
          Admin sign in
        </Link>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-7xl overflow-hidden lg:hidden"
          >
            <div className="mt-2 max-h-[80vh] overflow-y-auto rounded-2xl border border-ink/10 bg-cream px-6 py-4 shadow-lg">
              <div className="flex flex-col gap-1">
                {NAV.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-ink-soft"
                        onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={mobileResourcesOpen ? 'rotate-180 transition' : 'transition'}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileResourcesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 flex flex-col gap-1 border-l border-ink/10 pl-3">
                              {item.children.map((c) => (
                                <Link
                                  key={c.to}
                                  to={c.to}
                                  onClick={() => setOpen(false)}
                                  className="py-2 text-sm text-ink-soft"
                                >
                                  {c.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="py-2.5 text-sm font-medium text-ink-soft"
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <Link
                  to="/eligibility"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-transform duration-150 ease-out active:scale-[0.97]"
                >
                  Check eligibility
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  to="/admin/sign-in"
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm font-medium text-ink-soft"
                >
                  Admin sign in
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

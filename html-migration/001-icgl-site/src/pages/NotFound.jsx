import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { MotionGraphicPlaceholder } from '../components/Placeholders'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <MotionGraphicPlaceholder label="Illustration placeholder" className="mb-6 h-28 w-28" />
      <span className="font-display text-6xl font-medium text-lime-dark">404</span>
      <h1 className="font-display mt-4 text-2xl font-medium text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-lime-dark"
      >
        Back to home
        <ArrowUpRight size={16} />
      </Link>
    </section>
  )
}

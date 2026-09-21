import { Fragment, useRef, useState } from 'react'
import { useAnimationFrame } from 'framer-motion'

/**
 * An infinitely-looping horizontal row that eases its speed down to a
 * halt on hover, and — while hovered — steers based on where the cursor
 * sits horizontally: hovering close to the left edge pushes the tiles to
 * the right, hovering close to the right edge pushes them to the left.
 * Away from hover it drifts at its normal base speed/direction.
 * `items` should already be duplicated-friendly (it gets rendered twice
 * back-to-back for a seamless loop).
 */
export default function MarqueeRow({
  items,
  direction = 'left',
  speed = 40, // px/sec at full speed, base drift
  hoverSpeed, // px/sec at full speed, edge-proximity push (defaults to speed)
  ease = 3.5, // higher = snappier speed transitions
  itemKeyPrefix = 'item',
  renderItem,
}) {
  const baseVelocity = direction === 'left' ? speed : -speed
  const pushSpeed = hoverSpeed ?? speed

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const currentSpeedRef = useRef(baseVelocity)
  const mouseRatioRef = useRef(0.5)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0.5
    mouseRatioRef.current = Math.min(1, Math.max(0, ratio))
  }

  useAnimationFrame((_, delta) => {
    const el = trackRef.current
    if (!el) return

    // Near the left edge (ratio -> 0) pushes tiles right (negative offset
    // velocity); near the right edge (ratio -> 1) pushes them left.
    const target = hovered ? (mouseRatioRef.current - 0.5) * 2 * pushSpeed : baseVelocity

    const dt = Math.min(delta / 1000, 0.05)
    currentSpeedRef.current += (target - currentSpeedRef.current) * Math.min(ease * dt, 1)

    offsetRef.current += currentSpeedRef.current * dt

    const trackWidth = el.scrollWidth / 2
    if (trackWidth > 0) {
      offsetRef.current = ((offsetRef.current % trackWidth) + trackWidth) % trackWidth
    }

    el.style.transform = `translateX(${-offsetRef.current}px)`
  })

  return (
    <div
      ref={containerRef}
      className="relative flex items-center overflow-hidden py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div ref={trackRef} className="flex shrink-0 items-center gap-3 pr-3 will-change-transform">
        {[...items, ...items].map((item, i) => (
          <Fragment key={`${itemKeyPrefix}-${i}`}>{renderItem(item, i)}</Fragment>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import iconNotepad from '../../assets/hero-icon-notepad.png'
import iconSearch from '../../assets/hero-icon-search.png'
import iconDocument from '../../assets/hero-icon-document.png'
import iconPieChart from '../../assets/hero-icon-pie-chart.png'
import iconNetwork from '../../assets/hero-icon-network.png'
import iconBriefcase from '../../assets/hero-icon-briefcase.png'
import iconGrowth from '../../assets/hero-icon-growth.png'

// Ported from the standalone news-hero-demo.html reference build — floating
// 3D icons, each given real volume by stacking many copies of the same PNG
// a fraction of a pixel apart along Z (shaded darker toward the back), then
// bobbing/drifting/tilting continuously via the Web Animations API.
const ICONS = [iconNotepad, iconSearch, iconDocument, iconPieChart, iconNetwork, iconBriefcase, iconGrowth]

// Depth tiers: size, blur and opacity move together. Blur floor is 1.2px —
// nothing on screen is ever fully sharp.
const TIERS = {
  near: { blur: 1.2, opacity: 1, size: [70, 86] },
  mid: { blur: 2.6, opacity: 0.86, size: [46, 58] },
  far: { blur: 4.2, opacity: 0.66, size: [26, 38] },
}
const TIER_ORDER = ['near', 'mid', 'far']

// 15 instances = the 7 icons distributed across the hero, scattered.
const POSITIONS = [
  [8, 4], [4, 22], [14, 40], [6, 58], [10, 76], [4, 92],
  [40, 2], [46, 18], [34, 34], [44, 52], [38, 70], [42, 88],
  [74, 10], [78, 30], [70, 50],
]

const DRIFT_AXES = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [0, 1, 1], [1, 0, 1]]
const SLICE_COUNT = 16
const MIN_DIST = 30 // in top/left percentage-space

function lerp(a, b, t) {
  return a + (b - a) * t
}
function shuffle(arr) {
  const copy = arr.slice()
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
function posDist(a, b) {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  return Math.sqrt(dx * dx + dy * dy)
}

function buildConfigs() {
  // Randomize which icon sits in which slot, then repel same-icon instances
  // apart so duplicates of the same icon never end up next to each other.
  let iconSeq = []
  ;[3, 2, 2, 2, 2, 2, 2].forEach((count, iconIdx) => {
    for (let k = 0; k < count; k++) iconSeq.push(iconIdx)
  })
  iconSeq = shuffle(iconSeq)

  for (let pass = 0; pass < 10; pass++) {
    let changed = false
    for (let i = 0; i < iconSeq.length; i++) {
      for (let j = i + 1; j < iconSeq.length; j++) {
        if (iconSeq[i] !== iconSeq[j]) continue
        if (posDist(POSITIONS[i], POSITIONS[j]) >= MIN_DIST) continue
        for (let k = 0; k < iconSeq.length; k++) {
          if (k === i || k === j || iconSeq[k] === iconSeq[i]) continue
          if (posDist(POSITIONS[i], POSITIONS[k]) >= MIN_DIST) {
            ;[iconSeq[j], iconSeq[k]] = [iconSeq[k], iconSeq[j]]
            changed = true
            break
          }
        }
      }
    }
    if (!changed) break
  }

  const tiers = shuffle(TIER_ORDER.flatMap((t) => Array(5).fill(t))) // 5 near, 5 mid, 5 far

  return POSITIONS.map((pos, i) => {
    const iconIndex = iconSeq[i]
    const tierName = tiers[i]
    const tier = TIERS[tierName]
    const size = Math.round(lerp(tier.size[0], tier.size[1], Math.random()))
    const driftAxis = DRIFT_AXES[Math.floor(Math.random() * DRIFT_AXES.length)]
    const dir = Math.random() < 0.5 ? 1 : -1
    const ampBase = tierName === 'near' ? 30 : tierName === 'mid' ? 23 : 17
    const rotBase = tierName === 'near' ? 26 : tierName === 'mid' ? 20 : 15
    return {
      key: `${i}-${iconIndex}`,
      top: pos[0],
      left: pos[1],
      size,
      blur: tier.blur,
      opacity: tier.opacity,
      icon: ICONS[iconIndex],
      driftDuration: 4200 + Math.random() * 3600,
      delay: Math.round(Math.random() * 650),
      ampY: ampBase * dir,
      ampX: ampBase * 0.55 * (Math.random() < 0.5 ? 1 : -1),
      rotDeg: rotBase * dir,
      driftAxis,
    }
  })
}

export default function FloatingIcons({ className = '' }) {
  // Randomized once per mount, matching the demo's "randomize on load" feel.
  const configs = useMemo(() => buildConfigs(), [])
  const floatRefs = useRef([])
  const cardRefs = useRef([])
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    // Under prefers-reduced-motion, skip the infinite bob/drift/tilt loop
    // entirely — this is pure ambient decoration with no informational
    // content, so it's dropped rather than "gentled." Icons still fade in.
    const animations = reduceMotion
      ? []
      : configs.map((cfg, i) => {
          const float = floatRefs.current[i]
          if (!float) return null
          const [dx, dy, dz] = cfg.driftAxis
          return float.animate(
            [
              { transform: `translate3d(0,0,0) rotate3d(${dx},${dy},${dz},0deg)` },
              { transform: `translate3d(${cfg.ampX}px, ${cfg.ampY}px, 0) rotate3d(${dx},${dy},${dz},${cfg.rotDeg}deg)` },
              { transform: `translate3d(0,0,0) rotate3d(${dx},${dy},${dz},0deg)` },
            ],
            { duration: cfg.driftDuration, iterations: Infinity, easing: 'ease-in-out' }
          )
        })

    const timers = configs.map((cfg, i) =>
      setTimeout(
        () => {
          cardRefs.current[i]?.classList.add('play')
        },
        reduceMotion ? 0 : cfg.delay
      )
    )

    return () => {
      animations.forEach((a) => a && a.cancel())
      timers.forEach((t) => clearTimeout(t))
    }
  }, [configs, reduceMotion])

  return (
    <div className={`hero-icons-layer ${className}`} aria-hidden="true">
      {configs.map((cfg, i) => {
        const depth = cfg.size * 0.42
        return (
          <div
            key={cfg.key}
            ref={(el) => (cardRefs.current[i] = el)}
            className="hero-icon-card"
            style={{
              top: `${cfg.top}%`,
              left: `${cfg.left}%`,
              '--size': `${cfg.size}px`,
              '--target-opacity': cfg.opacity,
              filter: `blur(${cfg.blur}px)`,
            }}
          >
            <div ref={(el) => (floatRefs.current[i] = el)} className="hero-icon-float">
              <div className="hero-icon-extrude" style={{ width: cfg.size, height: cfg.size }}>
                {Array.from({ length: SLICE_COUNT }).map((_, s) => {
                  const t = s / (SLICE_COUNT - 1) // 0 = back, 1 = front
                  const z = -depth / 2 + depth * t
                  return (
                    <div
                      key={s}
                      className="hero-icon-slice"
                      style={{
                        transform: `translateZ(${z.toFixed(2)}px)`,
                        '--slice-brightness': (1 - (1 - t) * 0.55).toFixed(2),
                      }}
                    >
                      <img src={cfg.icon} alt="" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

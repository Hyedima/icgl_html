import careerTeam from '../../assets/career-team-web.jpg'
import hero2 from '../../assets/hero-2-web.jpg'
import whoWeAre from '../../assets/who-we-are-web.jpg'
import kvpImg from '../../assets/kvp-img-web.jpg'
import bg2 from '../../assets/bg2-web.jpg'

// Three columns of photos, each doubled so a translateY(-50%) scroll loops
// seamlessly. Middle column runs in reverse for the alternating effect seen
// on guarantee.green's "Our Mandate" section.
const COLUMNS = [
  { photos: [careerTeam, hero2, whoWeAre], duration: 22, reverse: false },
  { photos: [kvpImg, bg2, careerTeam], duration: 27, reverse: true },
  { photos: [hero2, whoWeAre, kvpImg], duration: 19, reverse: false },
]

export default function MandateWall({ className = '' }) {
  return (
    <div
      className={`flex gap-2.5 overflow-hidden rounded-2xl bg-white p-2.5 ${className}`}
    >
      {COLUMNS.map((col, i) => (
        <div key={i} className="relative min-h-0 flex-1 overflow-hidden rounded-xl">
          <ul
            className={`m-0 flex list-none flex-col gap-2.5 p-0 ${
              col.reverse ? 'animate-scroll-up-reverse' : 'animate-scroll-up'
            }`}
            style={{ animationDuration: `${col.duration}s` }}
          >
            {[...col.photos, ...col.photos].map((src, j) => (
              <li key={j} className="aspect-square w-full flex-none overflow-hidden rounded-xl">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

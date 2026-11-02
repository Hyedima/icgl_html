import logo from '../../assets/icgl-logo.png'

// Rotating seal badge — a contiguous 6-color ring (approved palette),
// the real ICGL logo centered on top, and a ring of looping text spinning
// slowly behind it. Graphic only, no copy.
export default function SolutionSeal({ className = '' }) {
  return (
    <div className={`relative mx-auto aspect-square h-full max-h-full w-auto max-w-full ${className}`}>
      <div className="absolute inset-0 animate-seal-spin-ring">
        <svg viewBox="0 0 130 130" aria-hidden="true" className="h-full w-full">
          <g transform="rotate(-90 65 65)">
            <circle cx="65" cy="65" r="44" fill="none" stroke="#333a42" strokeWidth="11" strokeDasharray="57.60 218.86" transform="rotate(0 65 65)" />
            <circle cx="65" cy="65" r="44" fill="none" stroke="#5b6973" strokeWidth="11" strokeDasharray="34.56 241.90" transform="rotate(75 65 65)" />
            <circle cx="65" cy="65" r="44" fill="none" stroke="#a0bbc9" strokeWidth="11" strokeDasharray="42.24 234.22" transform="rotate(120 65 65)" />
            <circle cx="65" cy="65" r="44" fill="none" stroke="#a0a8c4" strokeWidth="11" strokeDasharray="30.72 245.74" transform="rotate(175 65 65)" />
            <circle cx="65" cy="65" r="44" fill="none" stroke="#6dbe4a" strokeWidth="11" strokeDasharray="49.92 226.54" transform="rotate(215 65 65)" />
            <circle cx="65" cy="65" r="44" fill="none" stroke="#a9d046" strokeWidth="11" strokeDasharray="61.44 215.02" transform="rotate(280 65 65)" />
          </g>
        </svg>
      </div>

      <div className="absolute inset-0 animate-seal-spin-text">
        <svg viewBox="0 0 130 130" aria-hidden="true" className="h-full w-full">
          <path id="solutionSealTextPath" d="M 65,65 m -52.5,0 a 52.5,52.5 0 1,1 105,0 a 52.5,52.5 0 1,1 -105,0" fill="none" />
          <text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '6.4px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              fill: '#333a42',
            }}
          >
            <textPath href="#solutionSealTextPath" startOffset="0%">
              GUARANTEED FINANCE &#8226; RISK SHARED &#8226; GUARANTEED FINANCE &#8226; RISK SHARED &#8226;
            </textPath>
          </text>
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <img src={logo} alt="Impact Credit Guarantee Limited" className="w-[46%]" />
      </div>
    </div>
  )
}

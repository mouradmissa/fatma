import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

function starPoints(cx, cy, outer, inner, points = 8) {
  const coords = [];
  for (let index = 0; index < points * 2; index += 1) {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (index * Math.PI) / points;
    coords.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
  }
  return coords.join(" ");
}

const SOFT_STAR = starPoints(80, 80, 52, 22, 8);

export function Slipper() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="slipper-wrap"
      initial={reduced ? false : { y: -46, opacity: 0, rotate: -10 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 12 }}
    >
      <div className="slipper-bob">
        <svg className="slipper" viewBox="0 0 260 140" role="img" aria-label="شلّاكة خضراء">
          <ellipse cx="132" cy="120" rx="78" ry="9" fill="rgba(0,0,0,0.35)" />
          <path
            d="M40 98c24 16 72 22 116 16 36-5 66-18 78-32-8 20-52 36-102 38-46 2-84-10-100-22 2-2 4-2 8 0z"
            fill="#c6a15a"
          />
          <path
            d="M48 96c4-30 26-50 58-52 20-1 32 10 50 14 30 6 54 1 74 8 12 4 16 16 8 24-16 8-58 16-104 16-40 0-78-4-86-10z"
            fill="#1f8a62"
          />
          <path
            d="M62 90c20-22 46-30 66-26 6 12 2 24-12 30-24 8-50 6-72 0 6-2 12-4 18-4z"
            fill="#176848"
            opacity="0.85"
          />
          <path
            d="M42 94c-16-6-24-22-16-32 7-9 18-4 24 8 4 9 2 18-8 24z"
            fill="#187a56"
          />
          <path
            d="M30 68c10-2 16 6 14 14"
            fill="none"
            stroke="#e6d3a1"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M84 78c22-10 46-10 70 2"
            fill="none"
            stroke="#f3e2bc"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M96 88c18-5 36-4 54 3"
            fill="none"
            stroke="#fff6e4"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M156 64c0-5 7-7 9-2 2-5 9-3 9 2 0 7-9 12-9 12s-9-5-9-12z"
            fill="#f6f0e4"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export function RouteMap() {
  return (
    <div className="route">
      <div className="city">
        <span className="pin" aria-hidden="true" />
        <strong>سوسة</strong>
      </div>
      <div className="route-track" aria-hidden="true">
        <svg viewBox="0 0 300 80" preserveAspectRatio="none">
          <path className="route-glow" d="M8 52 C 70 54, 92 16, 150 18 S 230 64, 292 30" />
          <path className="route-dash" d="M8 52 C 70 54, 92 16, 150 18 S 230 64, 292 30" />
        </svg>
        <span className="traveler" />
      </div>
      <div className="city">
        <span className="pin" aria-hidden="true" />
        <strong>تطاوين</strong>
      </div>
    </div>
  );
}

export function MadinahLight() {
  return (
    <svg
      className="madinah-art"
      viewBox="0 0 640 340"
      role="img"
      aria-label="أجواء خضراء وبيضاء مستوحاة من حلم زيارة المدينة المنوّرة"
    >
      <defs>
        <linearGradient id="madinah-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7fbf8" />
          <stop offset="100%" stopColor="#d7efe3" />
        </linearGradient>
        <linearGradient id="madinah-dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#46c48c" />
          <stop offset="48%" stopColor="#14915c" />
          <stop offset="100%" stopColor="#0c6a44" />
        </linearGradient>
        <radialGradient id="madinah-glow" cx="50%" cy="46%" r="46%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="68%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="340" fill="url(#madinah-sky)" />
      <circle cx="320" cy="176" r="148" fill="url(#madinah-glow)" />
      <rect x="248" y="198" width="144" height="70" fill="#fbfefc" />
      <path className="dome-glow" d="M248 200 C248 112 392 112 392 200 Z" fill="url(#madinah-dome)" />
      <rect x="248" y="194" width="144" height="7" fill="#e6d3a1" />
      <rect x="317" y="118" width="6" height="16" rx="1" fill="#e6d3a1" />
      <circle cx="320" cy="114" r="5" fill="#f4e7c4" />
      <rect x="0" y="268" width="640" height="72" fill="#f4faf6" />
    </svg>
  );
}

export function SoftLight() {
  return (
    <div className="soft-light" aria-hidden="true">
      <svg viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="18" fill="rgba(255, 224, 176, 0.18)" />
        <circle cx="80" cy="80" r="34" fill="none" stroke="#e6d3a1" strokeWidth="0.7" />
        <circle cx="80" cy="80" r="58" fill="none" stroke="#e6d3a1" strokeWidth="0.45" opacity="0.7" />
        <polygon points={SOFT_STAR} fill="none" stroke="#f0e2c0" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export function PlaneMark() {
  return (
    <svg viewBox="0 0 96 40" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 21 H34 L46 8 H54 L44 21 H86 L92 17 H96 L90 24 L96 31 H92 L86 27 H44 L54 40 H46 L34 27 H18 L12 36 H6 L14 25 Z"
      />
    </svg>
  );
}

export function OfficialStamp({ children }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.p
      className="stamp"
      initial={reduced ? false : { scale: 1.5, opacity: 0, rotate: -18 }}
      animate={{ scale: 1, opacity: 1, rotate: -8 }}
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 250, damping: 13 }}
    >
      {children}
    </motion.p>
  );
}

export function Spark() {
  return (
    <div className="spark" aria-hidden="true">
      <span>💚</span>
      <span>✦</span>
      <span>❤️</span>
      <span>✦</span>
      <span>✨</span>
    </div>
  );
}

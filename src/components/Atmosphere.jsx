const STARS = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  top: `${(index * 37) % 100}%`,
  left: `${(index * 53 + 7) % 100}%`,
  size: 1 + (index % 3),
  delay: `${(index % 8) * 0.4}s`,
  duration: `${2.8 + (index % 5) * 0.55}s`,
}));

const HEARTS = [
  { top: "16%", left: "7%", delay: "0s", size: "13px" },
  { top: "72%", left: "88%", delay: "2.4s", size: "11px" },
  { top: "38%", left: "93%", delay: "4.2s", size: "10px" },
  { top: "84%", left: "10%", delay: "1.3s", size: "12px" },
];

export default function Atmosphere({ showHearts = true }) {
  return (
    <div className="atmosphere" aria-hidden="true">
      {STARS.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            "--delay": star.delay,
            "--dur": star.duration,
          }}
        />
      ))}
      {showHearts
        ? HEARTS.map((heart) => (
            <span
              key={`${heart.top}-${heart.left}`}
              className="float-heart"
              style={{
                top: heart.top,
                left: heart.left,
                fontSize: heart.size,
                "--delay": heart.delay,
              }}
            >
              ♥
            </span>
          ))
        : null}
    </div>
  );
}

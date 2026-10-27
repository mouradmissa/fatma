import { NAV } from "../copy";

export default function ProgressNav({ chapter, maxReached, onJump }) {
  return (
    <nav className="topnav" aria-label="تقدّم الحكاية">
      <p className="brand">حكاية فاطمة</p>
      <div className="dots">
        {NAV.map((item, index) => {
          const locked = index > maxReached;
          return (
            <button
              key={item.id}
              type="button"
              className="dot"
              aria-label={item.label}
              aria-current={index === chapter ? "step" : undefined}
              disabled={locked}
              onClick={() => onJump(index)}
            >
              <span />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

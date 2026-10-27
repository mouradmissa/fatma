import { useEffect, useMemo, useRef, useState } from "react";
import { letter, letterText } from "../copy";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { splitGraphemes } from "../utils/text";
import StoryButton from "./StoryButton";

function EnvelopeVisual({ open }) {
  return (
    <div className={`env-visual ${open ? "is-open" : ""}`} aria-hidden="true">
      <svg className="env-svg" viewBox="0 0 360 250">
        <rect x="28" y="78" width="304" height="150" rx="16" fill="#e5d5b8" />
        <rect className="env-paper" x="52" y="92" width="256" height="112" rx="8" fill="#fffaf3" />
        <path
          className="env-flap env-flap-open"
          d="M28 86 L180 6 L332 86 L318 74 L180 24 L42 74 Z"
          fill="#f7f1e3"
          stroke="#d4af37"
          strokeWidth="1.4"
        />
        <path
          className="env-flap env-flap-closed"
          d="M28 84 L180 164 L332 84 L318 72 L42 72 Z"
          fill="#f4e8d2"
          stroke="#d4af37"
          strokeWidth="1.4"
        />
        <path
          d="M28 146 L180 206 L332 146 L332 210 Q332 228 314 228 L46 228 Q28 228 28 210 Z"
          fill="#f7f1e4"
          stroke="#e0cbA4"
          strokeWidth="1"
        />
        {open ? null : (
          <g>
            <circle cx="180" cy="150" r="26" fill="#0f5c42" />
            <circle cx="180" cy="150" r="20" fill="none" stroke="#e6d3a1" strokeWidth="2" />
            <text className="env-seal" x="180" y="160" textAnchor="middle">
              ف
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

export default function EnvelopeLetter({ onRestart }) {
  const reduced = usePrefersReducedMotion();
  const parts = useMemo(() => splitGraphemes(letterText), []);
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);
  const focusedRef = useRef(false);
  const shownCount = !open || instant || reduced ? (open ? parts.length : 0) : count;
  const done = open && shownCount >= parts.length;
  const shown = parts.slice(0, shownCount).join("");
  const blocks = shown.length ? shown.split("\n\n") : [""];

  useEffect(() => {
    if (!open || instant || reduced || count >= parts.length) return undefined;
    const id = window.setTimeout(() => setCount((value) => value + 1), 12);
    return () => window.clearTimeout(id);
  }, [open, instant, reduced, count, parts.length]);

  useEffect(() => {
    if (!open || focusedRef.current) return;
    const letterNode = document.getElementById("love-letter");
    if (!letterNode) return;
    focusedRef.current = true;
    letterNode.focus({ preventScroll: true });
  }, [open, done]);

  useEffect(() => {
    if (!done || doneRef.current) return;
    doneRef.current = true;
    if (document.activeElement?.id === "letter-instant") {
      document.getElementById("letter-finale")?.focus({ preventScroll: true });
    }
  }, [done]);

  return (
    <div className="letter-scene">
      <p className="eyebrow eyebrow-text">{letter.kicker}</p>
      {open ? (
        <EnvelopeVisual open />
      ) : (
        <button
          type="button"
          className="env-hit"
          onClick={() => setOpen(true)}
        >
          <EnvelopeVisual open={false} />
          <span className="env-hint">{letter.open}</span>
        </button>
      )}

      {open ? (
        <article className="letter-paper" id="love-letter" tabIndex={-1}>
          <p className="letter-mark" aria-hidden="true">
            ✦
          </p>
          <div className="sr-only">{letterText}</div>
          <div aria-hidden="true">
            {blocks.map((block, index) => (
              <p key={index}>
                {block}
                {index === blocks.length - 1 && !done ? <span className="caret" /> : null}
              </p>
            ))}
          </div>
        </article>
      ) : null}

      {open && !done ? (
        <StoryButton id="letter-instant" variant="ghost" onClick={() => setInstant(true)}>
          {letter.instant}
        </StoryButton>
      ) : null}

      {done ? (
        <>
          <p className="closing" id="letter-finale" tabIndex={-1}>
            {letter.finale}
          </p>
          <p className="signature" dir="ltr" lang="en">
            {letter.signature}
          </p>
          <StoryButton onClick={onRestart}>{letter.restart}</StoryButton>
        </>
      ) : null}
    </div>
  );
}

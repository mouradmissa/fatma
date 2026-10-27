import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ESCAPE_LIMIT, RUNAWAY_JOKES, game } from "../copy";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function RunawayButton({ onCatch }) {
  const areaRef = useRef(null);
  const buttonRef = useRef(null);
  const posRef = useRef(null);
  const escapesRef = useRef(0);
  const lockedRef = useRef(false);
  const caughtRef = useRef(false);
  const cooling = useRef(false);
  const ignoreClick = useRef(false);
  const onCatchRef = useRef(onCatch);
  const [pos, setPos] = useState(null);
  const [placed, setPlaced] = useState(false);
  const [escapes, setEscapes] = useState(0);
  const [joke, setJoke] = useState("");
  const [caught, setCaught] = useState(false);
  const reduced = usePrefersReducedMotion();
  const locked = escapes >= ESCAPE_LIMIT;

  useEffect(() => {
    onCatchRef.current = onCatch;
  }, [onCatch]);

  useLayoutEffect(() => {
    const area = areaRef.current;
    const button = buttonRef.current;
    if (!area || !button) return;
    const next = {
      x: Math.max(0, (area.clientWidth - button.offsetWidth) / 2),
      y: Math.max(0, (area.clientHeight - button.offsetHeight) / 2),
    };
    posRef.current = next;
    setPos(next);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPlaced(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return undefined;

    const clamp = () => {
      const button = buttonRef.current;
      if (!button || !posRef.current) return;
      const maxX = Math.max(0, area.clientWidth - button.offsetWidth);
      const maxY = Math.max(0, area.clientHeight - button.offsetHeight);
      const x = Math.min(Math.max(0, posRef.current.x), maxX);
      const y = Math.min(Math.max(0, posRef.current.y), maxY);
      if (x === posRef.current.x && y === posRef.current.y) return;
      const next = { x, y };
      posRef.current = next;
      setPos(next);
    };

    const observer = new ResizeObserver(clamp);
    observer.observe(area);
    window.addEventListener("resize", clamp);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", clamp);
    };
  }, []);

  function move(pointer) {
    const area = areaRef.current;
    const button = buttonRef.current;
    if (!area || !button) return;

    const areaRect = area.getBoundingClientRect();
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    const visibleLeft = Math.max(areaRect.left, 8);
    const visibleTop = Math.max(areaRect.top, 8);
    const visibleRight = Math.min(areaRect.right, window.innerWidth - 8);
    const visibleBottom = Math.min(areaRect.bottom, window.innerHeight - 8);

    let minX = visibleLeft - areaRect.left;
    let minY = visibleTop - areaRect.top;
    let maxX = visibleRight - areaRect.left - buttonWidth;
    let maxY = visibleBottom - areaRect.top - buttonHeight;

    if (maxX < minX + 4 || maxY < minY + 4) {
      minX = 0;
      minY = 0;
      maxX = Math.max(0, area.clientWidth - buttonWidth);
      maxY = Math.max(0, area.clientHeight - buttonHeight);
    }

    minX = Math.max(0, minX);
    minY = Math.max(0, minY);
    maxX = Math.max(minX, maxX);
    maxY = Math.max(minY, maxY);

    const current = posRef.current || { x: minX, y: minY };
    let best = null;
    let bestScore = -Infinity;

    for (let attempt = 0; attempt < 18; attempt += 1) {
      const x = minX + Math.random() * (maxX - minX);
      const y = minY + Math.random() * (maxY - minY);
      const centerX = areaRect.left + x + buttonWidth / 2;
      const centerY = areaRect.top + y + buttonHeight / 2;
      const pointerDistance = pointer
        ? Math.hypot(centerX - pointer.x, centerY - pointer.y)
        : 180;
      if (pointer && pointerDistance < 100) continue;
      const moved = Math.hypot(x - current.x, y - current.y);
      const score = pointerDistance + moved * 0.35;
      if (score > bestScore) {
        bestScore = score;
        best = { x, y };
      }
    }

    if (!best) {
      const towardLeft = pointer ? pointer.x > areaRect.left + areaRect.width / 2 : true;
      const towardTop = pointer ? pointer.y > areaRect.top + areaRect.height / 2 : false;
      best = {
        x: towardLeft ? minX : maxX,
        y: towardTop ? minY : maxY,
      };
    }

    posRef.current = best;
    setPos(best);
  }

  function dodge(pointer) {
    if (cooling.current || lockedRef.current || caughtRef.current) return;
    cooling.current = true;
    const next = escapesRef.current + 1;
    escapesRef.current = next;
    if (next >= ESCAPE_LIMIT) lockedRef.current = true;
    setEscapes(next);
    setJoke(RUNAWAY_JOKES[(next - 1) % RUNAWAY_JOKES.length]);
    move(pointer);
    window.setTimeout(() => {
      cooling.current = false;
      ignoreClick.current = false;
    }, 420);
  }

  function onPointerMove(event) {
    if (event.pointerType === "touch") return;
    if (lockedRef.current || caughtRef.current || cooling.current) return;
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const margin = 28;
    const near =
      event.clientX > rect.left - margin &&
      event.clientX < rect.right + margin &&
      event.clientY > rect.top - margin &&
      event.clientY < rect.bottom + margin;
    if (!near) return;
    dodge({ x: event.clientX, y: event.clientY });
  }

  function onPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (lockedRef.current || caughtRef.current) return;
    ignoreClick.current = true;
    event.preventDefault();
    event.stopPropagation();
    dodge({ x: event.clientX, y: event.clientY });
  }

  function onKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (lockedRef.current || caughtRef.current) return;
    ignoreClick.current = true;
    event.preventDefault();
    dodge(null);
  }

  function onClick() {
    if (ignoreClick.current) {
      ignoreClick.current = false;
      return;
    }
    if (!lockedRef.current || caughtRef.current) return;
    caughtRef.current = true;
    setCaught(true);
    onCatchRef.current?.();
  }

  return (
    <div className="play-intro">
      <p className="sr-only">{game.keyboard}</p>
      <p className="attempts" aria-live="polite">
        المحاولات: {escapes} / {ESCAPE_LIMIT}
      </p>
      <div ref={areaRef} className="playfield" onPointerMove={onPointerMove}>
        {caught ? null : (
          <button
            ref={buttonRef}
            type="button"
            className={`runaway ${locked ? "is-calm" : ""}`}
            style={{
              left: pos ? `${pos.x}px` : 0,
              top: pos ? `${pos.y}px` : 0,
              visibility: pos ? "visible" : "hidden",
              transition:
                placed && !reduced
                  ? "left 320ms cubic-bezier(.2,.8,.2,1), top 320ms cubic-bezier(.2,.8,.2,1)"
                  : "none",
            }}
            onPointerDown={onPointerDown}
            onKeyDown={onKeyDown}
            onClick={onClick}
          >
            {game.button}
          </button>
        )}
      </div>
      <p className="joke-slot" aria-live="polite">
        <span key={escapes}>{joke}</span>
      </p>
      {locked && !caught ? <p className="soft">{game.tired}</p> : null}
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { splitGraphemes } from "../utils/text";

export default function Typewriter({ text, speed = 36, onDone, className }) {
  const reduced = usePrefersReducedMotion();
  const parts = useMemo(() => splitGraphemes(text), [text]);
  const [typed, setTyped] = useState(0);
  const count = reduced ? parts.length : typed;
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduced || typed >= parts.length) return undefined;
    const id = window.setTimeout(() => setTyped((value) => value + 1), speed);
    return () => window.clearTimeout(id);
  }, [typed, parts.length, reduced, speed]);

  useEffect(() => {
    if (count < parts.length || doneRef.current) return;
    doneRef.current = true;
    onDoneRef.current?.();
  }, [count, parts.length]);

  const shown = parts.slice(0, count).join("");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {shown}
        {count < parts.length ? <span className="caret" /> : null}
      </span>
    </span>
  );
}

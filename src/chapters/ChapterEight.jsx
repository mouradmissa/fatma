import { useEffect, useState } from "react";
import StoryButton from "../components/StoryButton";
import StoryChapter from "../components/StoryChapter";
import { poem } from "../copy";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function ChapterEight({ onNext }) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(reduced);

  useEffect(() => {
    if (reduced) return undefined;
    const id = window.setTimeout(() => setReady(true), 4500);
    return () => window.clearTimeout(id);
  }, [reduced]);

  return (
    <StoryChapter>
      <p className="eyebrow" aria-hidden="true">
        08
      </p>
      <div className="poem">
        <h1 id="story-heading" tabIndex={-1} className="poem-line" style={{ "--i": 0 }}>
          {poem.lines[0]}
        </h1>
        {poem.lines.slice(1).map((line, index) => (
          <p key={line} className="poem-line" style={{ "--i": index + 1 }}>
            {line}
          </p>
        ))}
      </div>
      <p className="body-copy serif-copy poem-moral">{poem.moral}</p>
      {ready ? (
        <div className="actions">
          <StoryButton onClick={onNext}>{poem.cta}</StoryButton>
        </div>
      ) : null}
    </StoryChapter>
  );
}

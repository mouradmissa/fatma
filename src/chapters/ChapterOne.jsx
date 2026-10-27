import { useState } from "react";
import ChapterHeading from "../components/ChapterHeading";
import StoryButton from "../components/StoryButton";
import StoryChapter from "../components/StoryChapter";
import Typewriter from "../components/Typewriter";
import { opening } from "../copy";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function ChapterOne({ onNext }) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(reduced ? 2 : 0);

  return (
    <StoryChapter className="chapter-open">
      <ChapterHeading index="01" serif hero>
        {reduced ? (
          opening.hello
        ) : (
          <Typewriter text={opening.hello} onDone={() => setPhase((value) => Math.max(value, 1))} />
        )}
      </ChapterHeading>
      {phase >= 1 ? (
        <p className="lead">
          {reduced ? (
            opening.caseLine
          ) : (
            <Typewriter
              text={opening.caseLine}
              speed={28}
              onDone={() => setPhase((value) => Math.max(value, 2))}
            />
          )}
        </p>
      ) : null}
      {phase >= 2 ? (
        <div className="actions">
          <StoryButton onClick={onNext}>{opening.cta}</StoryButton>
        </div>
      ) : null}
    </StoryChapter>
  );
}

import { useEffect, useState } from "react";
import BoardingPass from "../components/BoardingPass";
import ChapterHeading from "../components/ChapterHeading";
import StoryButton from "../components/StoryButton";
import StoryChapter from "../components/StoryChapter";
import { flight } from "../copy";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function ChapterSix({ onNext }) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (phase !== 1) return undefined;
    const id = window.setTimeout(() => setPhase(2), reduced ? 0 : 1700);
    return () => window.clearTimeout(id);
  }, [phase, reduced]);

  return (
    <StoryChapter>
      <ChapterHeading index="06">{flight.title}</ChapterHeading>
      <BoardingPass flying={phase >= 1} />
      {phase === 0 ? (
        <div className="actions">
          <StoryButton onClick={() => setPhase(reduced ? 2 : 1)}>{flight.cta}</StoryButton>
        </div>
      ) : null}
      {phase >= 1 ? <p className="body-copy">{flight.reveal}</p> : null}
      {phase >= 2 ? (
        <>
          <p className="punch">{flight.punchline}</p>
          <div className="actions">
            <StoryButton onClick={onNext}>{flight.next}</StoryButton>
          </div>
        </>
      ) : null}
    </StoryChapter>
  );
}

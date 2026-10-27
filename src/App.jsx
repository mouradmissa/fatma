import { useEffect, useState } from "react";
import Atmosphere from "./components/Atmosphere";
import ProgressNav from "./components/ProgressNav";
import ChapterEight from "./chapters/ChapterEight";
import ChapterFive from "./chapters/ChapterFive";
import ChapterFour from "./chapters/ChapterFour";
import ChapterNine from "./chapters/ChapterNine";
import ChapterOne from "./chapters/ChapterOne";
import ChapterSeven from "./chapters/ChapterSeven";
import ChapterSix from "./chapters/ChapterSix";
import ChapterThree from "./chapters/ChapterThree";
import ChapterTwo from "./chapters/ChapterTwo";
import { NAV } from "./copy";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const TONES = ["night", "night", "night", "dusk", "sacred", "night", "night", "poetry", "letter"];

export default function App() {
  const reduced = usePrefersReducedMotion();
  const [chapter, setChapter] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [session, setSession] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => {
      document.getElementById("story-heading")?.focus({ preventScroll: true });
    }, reduced ? 0 : 60);
    return () => window.clearTimeout(id);
  }, [chapter, session, reduced]);

  function goNext() {
    setChapter((current) => {
      const next = Math.min(current + 1, NAV.length - 1);
      setMaxReached((reached) => Math.max(reached, next));
      return next;
    });
  }

  function jump(index) {
    if (index > maxReached) return;
    setChapter(index);
  }

  function restart() {
    setSession((value) => value + 1);
    setChapter(0);
    setMaxReached(0);
  }

  let content = null;
  if (chapter === 0) content = <ChapterOne onNext={goNext} />;
  if (chapter === 1) content = <ChapterTwo onNext={goNext} />;
  if (chapter === 2) content = <ChapterThree onNext={goNext} />;
  if (chapter === 3) content = <ChapterFour onNext={goNext} />;
  if (chapter === 4) content = <ChapterFive onNext={goNext} />;
  if (chapter === 5) content = <ChapterSix onNext={goNext} />;
  if (chapter === 6) content = <ChapterSeven onNext={goNext} />;
  if (chapter === 7) content = <ChapterEight onNext={goNext} />;
  if (chapter === 8) content = <ChapterNine onRestart={restart} />;

  return (
    <div className={`app tone-${TONES[chapter]} relative min-h-dvh`}>
      <a className="skip" href="#story">
        امشي للحكاية
      </a>
      <Atmosphere showHearts={chapter !== 4} />
      <div className="grain" aria-hidden="true" />
      <ProgressNav chapter={chapter} maxReached={maxReached} onJump={jump} />
      <main id="story" className="stage">
        <div key={`${session}-${chapter}`} className="chapter-host">
          {content}
        </div>
      </main>
    </div>
  );
}

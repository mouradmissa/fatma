import EnvelopeLetter from "../components/EnvelopeLetter";
import StoryChapter from "../components/StoryChapter";
import { letter } from "../copy";

export default function ChapterNine({ onRestart }) {
  return (
    <StoryChapter className="chapter-letter">
      <h1 id="story-heading" className="sr-only" tabIndex={-1}>
        {letter.heading}
      </h1>
      <EnvelopeLetter onRestart={onRestart} />
    </StoryChapter>
  );
}

import ChapterHeading from "../components/ChapterHeading";
import { SoftLight } from "../components/Illustrations";
import StoryButton from "../components/StoryButton";
import StoryChapter from "../components/StoryChapter";
import { umrah } from "../copy";

export default function ChapterFive({ onNext }) {
  return (
    <StoryChapter className="chapter-letter">
      <SoftLight />
      <ChapterHeading index="05" serif>
        {umrah.title}
      </ChapterHeading>
      <p className="serif-copy">{umrah.body}</p>
      <div className="actions">
        <StoryButton onClick={onNext}>{umrah.cta}</StoryButton>
      </div>
    </StoryChapter>
  );
}

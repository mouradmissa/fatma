import ChapterHeading from "../components/ChapterHeading";
import Reveal from "../components/Reveal";
import { Slipper } from "../components/Illustrations";
import StoryButton from "../components/StoryButton";
import StoryChapter from "../components/StoryChapter";
import { slipper } from "../copy";

export default function ChapterTwo({ onNext }) {
  return (
    <StoryChapter>
      <ChapterHeading index="02">{slipper.title}</ChapterHeading>
      <Reveal>
        <div className="panel">
          {slipper.lines.map((line) => (
            <p className="case-line" key={line}>
              {line}
            </p>
          ))}
        </div>
      </Reveal>
      <Slipper />
      <Reveal delay={0.12}>
        <p className="warning">{slipper.warning}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="note">{slipper.note}</p>
      </Reveal>
      <div className="actions">
        <StoryButton onClick={onNext}>{slipper.cta}</StoryButton>
      </div>
    </StoryChapter>
  );
}

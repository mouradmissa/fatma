import { useState } from "react";
import ChapterHeading from "../components/ChapterHeading";
import { OfficialStamp } from "../components/Illustrations";
import Reveal from "../components/Reveal";
import StoryButton from "../components/StoryButton";
import StoryChapter from "../components/StoryChapter";
import { jealousy } from "../copy";

export default function ChapterThree({ onNext }) {
  const [choice, setChoice] = useState(null);
  const selected = jealousy.verdicts.find((item) => item.id === choice);

  return (
    <StoryChapter>
      <ChapterHeading index="03">{jealousy.title}</ChapterHeading>
      <Reveal>
        <p className="body-copy">{jealousy.lead}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="body-copy">{jealousy.heart}</p>
      </Reveal>
      <OfficialStamp>{jealousy.stamp}</OfficialStamp>
      <div className="choices">
        {jealousy.verdicts.map((item) => (
          <StoryButton
            key={item.id}
            variant="choice"
            pressed={choice === item.id}
            onClick={() => setChoice(item.id)}
          >
            {item.label}
          </StoryButton>
        ))}
      </div>
      {selected ? (
        <p className="verdict" role="status">
          {selected.response}
        </p>
      ) : null}
      {selected ? (
        <div className="actions">
          <StoryButton onClick={onNext}>{jealousy.cta}</StoryButton>
        </div>
      ) : null}
    </StoryChapter>
  );
}

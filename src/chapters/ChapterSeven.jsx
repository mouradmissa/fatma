import { useState } from "react";
import ChapterHeading from "../components/ChapterHeading";
import RunawayButton from "../components/RunawayButton";
import StoryButton from "../components/StoryButton";
import StoryChapter from "../components/StoryChapter";
import { game } from "../copy";

export default function ChapterSeven({ onNext }) {
  const [caught, setCaught] = useState(false);

  return (
    <StoryChapter>
      <ChapterHeading index="07">{game.title}</ChapterHeading>
      <p className="body-copy">{game.intro}</p>
      <p className="soft">{game.hint}</p>
      {caught ? null : <RunawayButton onCatch={() => setCaught(true)} />}
      {caught ? <p className="success">{game.success}</p> : null}
      {caught ? (
        <div className="actions">
          <StoryButton onClick={onNext}>{game.cta}</StoryButton>
        </div>
      ) : null}
    </StoryChapter>
  );
}

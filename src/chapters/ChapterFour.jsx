import { useState } from "react";
import ChapterHeading from "../components/ChapterHeading";
import { MedinaArt, RouteMap, Spark } from "../components/Illustrations";
import StoryButton from "../components/StoryButton";
import StoryChapter from "../components/StoryChapter";
import { cities } from "../copy";

export default function ChapterFour({ onNext }) {
  const [dreamed, setDreamed] = useState(false);

  return (
    <StoryChapter>
      <ChapterHeading index="04" serif>
        {cities.title}
      </ChapterHeading>
      <RouteMap />
      <article className="medina-card">
        <MedinaArt />
        <div className="medina-copy">
          <h2>{cities.cardTitle}</h2>
          <p>{cities.card}</p>
        </div>
      </article>
      <div className="actions">
        <div className="spark-wrap">
          <StoryButton onClick={() => setDreamed(true)} disabled={dreamed}>
            {cities.dream}
          </StoryButton>
          {dreamed ? <Spark /> : null}
        </div>
        {dreamed ? <p className="soft">{cities.after}</p> : null}
        {dreamed ? <StoryButton onClick={onNext}>{cities.cta}</StoryButton> : null}
      </div>
    </StoryChapter>
  );
}

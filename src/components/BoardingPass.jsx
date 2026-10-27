import { flight } from "../copy";
import { PlaneMark } from "./Illustrations";

export default function BoardingPass({ flying = false }) {
  return (
    <div>
      <div className="sky-lane" aria-hidden="true">
        <div className={`plane ${flying ? "is-flying" : ""}`}>
          <PlaneMark />
        </div>
      </div>
      <article className="pass" aria-label="تذكرة خيالية">
        <p className="pass-kicker">رحلة خيالية</p>
        <ul className="pass-fields">
          {flight.fields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
        <p className="pass-foot">{flight.disclaimer}</p>
      </article>
    </div>
  );
}

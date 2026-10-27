export default function ChapterHeading({ index, children, serif = false, hero = false }) {
  const className = [serif ? "heading-serif" : "", hero ? "hero-line" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className="chapter-head">
      {index ? (
        <p className="eyebrow" aria-hidden="true">
          {index}
        </p>
      ) : null}
      <h1 id="story-heading" tabIndex={-1} className={className || undefined}>
        {children}
      </h1>
    </header>
  );
}

export default function StoryChapter({ children, className = "" }) {
  return <section className={`chapter ${className}`.trim()}>{children}</section>;
}

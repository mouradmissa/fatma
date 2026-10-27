export function splitGraphemes(text) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    return Array.from(
      new Intl.Segmenter("ar", { granularity: "grapheme" }).segment(text),
      (part) => part.segment,
    );
  }
  return Array.from(text);
}

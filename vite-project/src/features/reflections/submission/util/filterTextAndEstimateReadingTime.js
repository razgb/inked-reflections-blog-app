export function filterTextAndEstimateReadingTime(postContent) {
  const text = filterTextsFromContent(postContent);
  return estimatePostReadingTime(text);
}

/**
 * Filters out all texts from a user's post and returns as large concatinated string.
 * @param {Array} postContent
 * @returns {String}
 */
function filterTextsFromContent(postContent) {
  if (!Array.isArray(postContent)) {
    console.warn(
      "filterTextsFromContent function only accepts a single array as an argument."
    );
    return;
  }

  return postContent
    .filter(
      (widget) => widget.component !== "image" && widget.component !== "title"
    )
    .map((widget) => widget.value)
    .join(" ");
}

/**
 * Accepts a text string and returns the minutes it takes to read (240 words/min assumption).
 * @param {String} text
 * @returns {Number} Number of minutes
 */
function estimatePostReadingTime(text) {
  if (typeof text !== "string") {
    console.warn(
      "estimatePostReadingTime function only accepts a single string as an argument."
    );
    return;
  }

  const wordCount = text.split(" ").length;
  const readingTime = Math.round(wordCount / 240);
  return readingTime > 0 ? readingTime : 1;
}

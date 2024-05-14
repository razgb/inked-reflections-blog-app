/**
 * Filters out empty image components from the user's content.
 * @param {Array} userContentWithValues - The user's content with text values.
 * @returns {Array} - The filtered user content.
 */
export function filterEmptyImageComponents(userContentWithValues) {
  return userContentWithValues.filter((widget) => {
    if (widget.component !== "image") return true;
    else if (widget.file) {
      return true;
    } else return false;
  });
}

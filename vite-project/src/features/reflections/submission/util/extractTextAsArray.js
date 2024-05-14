/**
 * Extracts all text from the userContentValueEntries array.
 * Ignores images and cover-images.
 * @param {Array} userContentValueEntries - Array of key-value pairs each contained in an array.
 * @returns {Array} - An array of all the text from the userContentValueEntries array.
 */
export function extractText(userContentValueEntries) {
  const allWidgetTexts = [];

  userContentValueEntries.forEach(([key, value]) => {
    if (!key.includes("image")) {
      allWidgetTexts.push(value);
    }
  });

  return allWidgetTexts;
}

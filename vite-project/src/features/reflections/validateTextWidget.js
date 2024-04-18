/**
 * Validates whether input text contains only alphanumerical characters and $, #, !, ().
 * @param {string} text
 * @returns
 */
export function validateTextWidget(text) {
  const noWhiteSpaceText = text.split(" ").join("");
  if (!noWhiteSpaceText.length) return false; // empty text

  const regex = /^[a-zA-Z0-9$#!]+$/;
  return regex.test(noWhiteSpaceText);
}

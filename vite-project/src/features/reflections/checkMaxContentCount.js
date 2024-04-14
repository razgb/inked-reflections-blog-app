/**
 * Checks the count of the widget before 1 being added to it due to widget count increase and content update happening at the same time)
 * @param {string} widget The name of the widget
 * @param {number} value The current count - 1 of the widget
 * @param {number} maxValue The max count value of the widget
 * @returns {object} returns passed (boolean), title (string), and message (string)
 */
export function checkMaxContentCount(widget, value, maxValue) {
  if (value === maxValue - 1) {
    return {
      passed: true,
      title: "Max paragraphs limit",
      message: `You have reached the max number of ${widget}s.`,
    };
  } else if (value === maxValue) {
    return {
      passed: false,
      title: `Cannot add more ${widget}s`,
      message: `You have maxed your limit of ${widget} uses`,
    };
  } else {
    return {
      passed: true,
      title: null,
      message: null,
    };
  }
}

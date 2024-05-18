/**
 * Processes request and can retry 2 more times upon error.
 * @param {promise} promiseOrBatch - Single promise or array of promises.
 * @param {number} maxAttempts - Number of attemps allowed
 * @returns {promise} - Returns what the function passed in returns.
 */
export async function requestWithRetry(promiseOrBatch, maxAttempts = 3) {
  let promise = Array.isArray(promiseOrBatch)
    ? Promise.all(promiseOrBatch)
    : promiseOrBatch;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      return await promise;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

/**
 * Processes request and can retry 2 more times upon error.
 * @param {promise} promiseOrBatch - Single promise or array of promises.
 * @param {number} maxAttempts - Number of attemps allowed
 * @returns {promise} - Returns what the function passed in returns.
 */
export async function requestWithRetry(promiseOrBatch, maxAttempts = 3) {
  let promise = null;
  if (Array.isArray(promiseOrBatch)) {
    promise = Promise.all(promiseOrBatch);
  } else {
    promise = promiseOrBatch;
  }

  async function attemptAsyncRequest() {
    return await promise;
  }

  let attempts = 1;
  try {
    // console.log(`Attempt ${attempts}`);
    return await attemptAsyncRequest();
  } catch (error) {
    if (attempts > maxAttempts) {
      attempts++;
      throw new Error();
    } else {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await attemptAsyncRequest();
    }
  }
}

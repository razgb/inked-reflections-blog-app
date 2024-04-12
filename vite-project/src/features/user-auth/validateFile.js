/**
 * Validates user file on various criteria.
 * @param {File} file File API object
 * @param {Image} image Image object processed from file param
 * @param {Object} options Options object for image validation
 * @param {number} [options.minWidth=200] The minimum width of the image.
 * @param {number} [options.minHeight=200] The minimum height of the image.
 * @param {number} [options.maxWidth=1080] The maximum width of the image.
 * @param {number} [options.maxHeight=1920] The maximum height of the image.
 * @param {number} [options.maxSizeBytes=2] The maximum size in megabytes of the image.
 * @returns {Object} success Boolean & message string
 */
export function validateFile(
  file,
  image,
  {
    minWidth = 200,
    minHeight = 200,
    maxWidth = 2560,
    maxHeight = 1440,
    maxSizeBytes = 15,
  } = {}
) {
  const maxSize = maxSizeBytes * 1024 * 1024; // Product of 2 magic numbers are the size of 1MB in bytes
  const mimeValidated = file.type.startsWith("image/");
  const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
  const extension = file.name.split(".").pop().toLowerCase();
  const extensionValidated = allowedExtensions.includes(extension);
  const fileSizeValidated = file.size <= maxSize;
  const contentValidated = image.width > 0 && image.height > 0;

  const maximumBoundariesValidated =
    image.width <= maxWidth && image.height <= maxHeight;
  const minimumBoundariesValidated =
    image.width >= minWidth && image.height >= minHeight;

  const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.]/g, "_");

  const defaultErrorMessage =
    "File uploaded is not a valid image. Please try again.";
  if (
    mimeValidated &&
    extensionValidated &&
    fileSizeValidated &&
    contentValidated &&
    maximumBoundariesValidated &&
    minimumBoundariesValidated
  ) {
    return {
      valid: true,
      message: "Success",
      name: sanitizedFilename,
    };
  } else if (!mimeValidated || !extensionValidated || !contentValidated) {
    return {
      valid: false,
      message: defaultErrorMessage,
    };
  } else if (!fileSizeValidated) {
    return {
      valid: false,
      message: `File uploaded is too large (max ${maxSizeBytes}MB). Please try again.`,
    };
  } else if (!minimumBoundariesValidated) {
    return {
      valid: false,
      message: `File uploaded is too small in dimensions (less than ${minWidth}x${minHeight}px). Please try again.`,
    };
  } else if (!maximumBoundariesValidated) {
    return {
      valid: false,
      message: `File uploaded is too large in dimensions (more than ${maxWidth}x${maxHeight}px). Please try again.`,
    };
  } else {
    return {
      valid: false,
      message: defaultErrorMessage,
    };
  }
}

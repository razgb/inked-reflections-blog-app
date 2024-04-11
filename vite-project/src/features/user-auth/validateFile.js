/**
 * Validates user file on various criteria.
 * @param {File} file File API object
 * @param {Image} image Image object processed from file param
 * @param {Object} options Options object for image validation
 * @param {number} [options.minWidth=200] The minimum width of the image.
 * @param {number} [options.minHeight=200] The minimum height of the image.
 * @param {number} [options.maxWidth=1080] The maximum width of the image.
 * @param {number} [options.maxHeight=1920] The maximum height of the image.
 * @param {number} [options.maxSizeBytes=2]
 * @returns {Object} success Boolean & message string
 */
export function validateFile(
  file,
  image,
  options = {
    minWidth: 200,
    minHeight: 200,
    maxWidth: 1080,
    maxHeight: 1920,
    maxSizeBytes: 2,
  }
) {
  const maxSize = options.maxSizeBytes * 1024 * 1024; // 2MB
  const mimeValidated = file.type.startsWith("image/");
  const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
  const extension = file.name.split(".").pop().toLowerCase();
  const extensionValidated = allowedExtensions.includes(extension);
  const fileSizeValidated = file.size <= maxSize;
  const contentValidated = image.width > 0 && image.height > 0;

  const maximumBoundariesValidated =
    image.width <= options.maxWidth && image.height <= options.maxHeight;
  const minimumBoundariesValidated =
    image.width >= options.minWidth && image.height >= options.minHeight;

  const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.]/g, "_");

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
      message: "File uploaded is not a valid image. Please try again.",
    };
  } else if (!fileSizeValidated) {
    return {
      valid: false,
      message: "File uploaded is too large (max 2MB). Please try again.",
    };
  } else if (!minimumBoundariesValidated) {
    return {
      valid: false,
      message:
        "File uploaded is too small in dimensions (less than 200x200px). Please try again.",
    };
  } else if (!maximumBoundariesValidated) {
    return {
      valid: false,
      message:
        "File uploaded is too large in dimensions (more than 1920x1080px). Please try again.",
    };
  } else {
    return {
      valid: false,
      message: "File uploaded is not a valid image. Please try again.",
    };
  }
}

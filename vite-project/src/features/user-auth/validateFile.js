/**
 * Validates and Sanitizes user file ensuring it matches all rules disclosed to the user in the UI.
 * Validation includes size, MIME, extension ending, width and height.
 * @param {File} file File API object
 * @param {Image} image Image object processed from file param
 * @returns {Object} success Boolean & message string
 */
export function validateFile(file, image) {
  const maxSizeBytes = 2 * 1024 * 1024; // 5MB
  const minWidth = 100;
  const minHeight = 100;
  const maxWidth = 2000;
  const maxHeight = 2000;

  const mimeValidated = file.type.startsWith("image/");
  const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
  const extension = file.name.split(".").pop().toLowerCase();
  const extensionValidated = allowedExtensions.includes(extension);
  const fileSizeValidated = file.size <= maxSizeBytes;
  const contentValidated = image.width > 0 && image.height > 0;
  const dimensionsValidated =
    image.width >= minWidth &&
    image.height >= minHeight &&
    image.width <= maxWidth &&
    image.height <= maxHeight;

  const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.]/g, "_");

  if (
    mimeValidated &&
    extensionValidated &&
    fileSizeValidated &&
    contentValidated &&
    dimensionsValidated
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
  } else if (!dimensionsValidated || !fileSizeValidated) {
    return {
      valid: false,
      message: "File uploaded is too large. Please try again.",
    };
  } else {
    return {
      valid: false,
      message: "File uploaded is not a valid image. Please try again.",
    };
  }
}

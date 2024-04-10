/**
 * Checks whether the name received contains only alphabetical chars and max 3 words in length.
 * @param {string} name User's displayName.
 * @returns {Object} Retuns success boolean & message as string.
 */
export function validateName(name) {
  const regex = /^[a-zA-Z]+$/;
  const nameArray = name.split(" ");
  const lengthValidated = nameArray.length <= 3;
  const alphabeticalValidated = nameArray.every((name) => regex.test(name));

  if (lengthValidated && alphabeticalValidated) {
    return {
      success: true,
      message: "Success",
    };
  } else if (!lengthValidated && alphabeticalValidated) {
    return {
      success: false,
      message: "Name is too long! (max 3 words)",
    };
  } else if (lengthValidated && !alphabeticalValidated) {
    return {
      success: false,
      message: "Only alphabetical characters allowed.",
    };
  } else {
    return {
      success: false,
      message: "Use max 3 alphabetic words for your name.",
    };
  }
}

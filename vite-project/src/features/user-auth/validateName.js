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
      message: "Your name must be maximum 3 words.",
    };
  } else if (lengthValidated && !alphabeticalValidated) {
    return {
      success: false,
      message: "Your name must contain only alphabetical characters.",
    };
  } else {
    return {
      success: false,
      message:
        "Your name must contain only alphabetical characters and maximum 3 words.",
    };
  }
}

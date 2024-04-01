// prettier-ignore
const lowercaseAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// prettier-ignore
const uppercaseAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',];
// prettier-ignore
const specialCharacters = ['~', '`', '!', ' ', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '\'', '<', ',', '>', '.', '?', '/', '"', '\\'];
// prettier-ignore
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function validateEmail(email) {
  const emailArray = email.split("");
  const containsEmailSign = emailArray.includes("@");
  const containsDot = emailArray.includes(".");

  if (containsEmailSign && containsDot) {
    // console.log("Email validated");
    return true;
  }
  return false;
}

function removeRepeatChars(string) {
  return [...new Set(string)].join("");
}

function containsAtleastOneItem(array, string) {
  return string.split("").some((char) => array.includes(char));
}

function checkPasswordLength(password) {
  if (password.length >= 8) return true;
  return false;
}

function checkForInvalidChars(password) {
  const allowedChars = lowercaseAlphabet.concat(
    uppercaseAlphabet,
    numbers,
    specialCharacters
  );

  const passwordAsArray = removeRepeatChars(password).split("");
  return passwordAsArray.every((char) => allowedChars.includes(char));
}

export function validatePassword(password) {
  const lengthIsValid = checkPasswordLength(password);
  const allCharsAreValid = checkForInvalidChars(password);
  // const containsOneNumber = containsAtleastOneItem(numbers, password);
  // // prettier-ignore
  // const containsOneUppercase = containsAtleastOneItem(uppercaseAlphabet, password)
  // // prettier-ignore
  // const containsOneSpecial = containsAtleastOneItem(specialCharacters, password)

  if (lengthIsValid && allCharsAreValid) {
    return {
      valid: true,
    };
  } else if (!lengthIsValid && allCharsAreValid) {
    return {
      valid: false,
      message: "Password length less than 8",
    };
  } else if (lengthIsValid && !allCharsAreValid) {
    return {
      valid: false,
      message: "Invalid character in password",
    };
  }
}

export function validateSignupDetails(email, password, confirmPassword) {
  const emailIsValidated = validateEmail(email);
  const passwordState = validatePassword(password);
  const passwordsAreEqual = password === confirmPassword;

  if (!emailIsValidated && !passwordState.state) {
    return {
      valid: false,
      emailError: true,
      emailMessage: "Invalid email",
      passwordError: true,
      passwordMessage: passwordState.message,
    };
  } else if (!emailIsValidated) {
    return {
      valid: false,
      emailError: true,
      emailMessage: "Invalid email",
      passwordError: false,
      passwordMessage: "",
    };
  } else if (!passwordState.valid) {
    return {
      valid: false,
      emailError: false,
      emailMessage: "",
      passwordError: true,
      passwordMessage: passwordState.message,
    };
  } else if (!passwordsAreEqual) {
    return {
      valid: false,
      emailError: false,
      emailMessage: "",
      passwordError: true,
      passwordMessage: "Passwords are not equal",
    };
  } else {
    return {
      valid: true,
      emailError: false,
      emailMessage: "",
      passwordError: false,
      passwordMessage: "",
    };
  }
}

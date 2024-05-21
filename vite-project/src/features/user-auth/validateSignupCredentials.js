// prettier-ignore
const lowercaseAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// prettier-ignore
const uppercaseAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',];
// prettier-ignore
const specialCharacters = [
  '!', '@', '#', '$', '%', '^', '&', '', '(', ')', '', '+', '-', '=',
  '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/',
  '|', '\\', '~', ''];
// prettier-ignore
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function validateEmail(email) {
  const emailArray = email.split("");
  const containsEmailSign = emailArray.includes("@");
  const containsDot = emailArray.includes(".");

  if (containsEmailSign && containsDot) {
    return true;
  }
  return false;
}

function removeRepeatChars(string) {
  return [...new Set(string)].join("");
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

export function validateSignupCredentials(email, password, confirmPassword) {
  const emailIsValidated = validateEmail(email);
  const passwordValid = checkForInvalidChars(password);
  const passwordsAreEqual = password === confirmPassword;
  const length = password.length;
  const passwordTooLong = length > 32;
  const passwordTooShort = length < 8;

  if (!emailIsValidated && !passwordValid) {
    return {
      valid: false,
      emailError: true,
      emailMessage: "Invalid email",
      passwordError: true,
      passwordMessage: "Invalid character in password",
    };
  } else if (!emailIsValidated) {
    return {
      valid: false,
      emailError: true,
      emailMessage: "Invalid email",
      passwordError: false,
      passwordMessage: "",
    };
  } else if (!passwordValid) {
    return {
      valid: false,
      emailError: false,
      emailMessage: "",
      passwordError: true,
      passwordMessage: "Invalid character in password",
    };
  } else if (passwordTooShort) {
    return {
      valid: false,
      emailError: false,
      emailMessage: "",
      passwordError: true,
      passwordMessage: "Password too short (min 8 characters)",
    };
  } else if (passwordTooLong) {
    return {
      valid: false,
      emailError: false,
      emailMessage: "",
      passwordError: true,
      passwordMessage: "Password too long (max 32 characters)",
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

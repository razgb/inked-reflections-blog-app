/**
 * Validates username by checking max 1 word & max 32 letters & passing a alphabet, underscore and dot regex.
 * @param {string} username
 * @returns {object} Object with success boolean & message as string.
 */
export async function validateUsername(username) {
  const trimmedUsername = username.trim();
  const usernameArray = trimmedUsername.split(" ");
  const maxOneWord = usernameArray.length === 1;
  const max32letters = trimmedUsername.length <= 32;
  console.log(trimmedUsername);
  const regex = /^[a-z0-9_]+$/;
  const regexValidated = regex.test(trimmedUsername);

  if (maxOneWord && max32letters && regexValidated) {
    // const usernameIsUnique = await <insertFirebase function>
    return {
      success: true,
      message: "Success",
    };
  } else if (!maxOneWord) {
    return {
      success: false,
      message: "No spaces allowed in username.",
    };
  } else if (!max32letters) {
    return {
      success: false,
      message: "Username must be shorter than 32 letters.",
    };
  } else {
    return {
      success: false,
      message: "Username must contain letters, numbers, and underscores only.",
    };
  }
}

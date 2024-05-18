import { auth } from "../../main";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function signupUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log(user);

    return {
      isValidated: user.emailVerified,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../main";

export async function signupUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log(user);

    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

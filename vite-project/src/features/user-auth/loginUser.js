import { auth } from "../../main";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Making it an object so that in the future I can add more data if needed.
    return {
      loginState: true,
    };
  } catch (error) {
    return {
      loginState: false,
      error: error,
    };
  }
}

/*
{
  loginState: true,
  uid: user.uid,
  email: user.email,
  emailVerified: user.emailVerified,
  displayName: user.displayName,
  photoURL: user.photoURL,
};
*/

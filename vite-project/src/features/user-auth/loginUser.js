import { auth } from "../../main";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error.code);
    if (error.code === "auth/invalid-credential") {
      return {
        success: false,
        message: "Incorrect password",
      };
    }
    // if (error.code === 'auth/invalid-credential') {
    //   return {
    //     success: false,
    //     message: 'Incorrect password',
    //   }
    // }
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

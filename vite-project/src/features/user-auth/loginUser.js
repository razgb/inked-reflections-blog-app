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

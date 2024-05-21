import { auth } from "../../main";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function signupUser(email, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      ...user,
      photoURL: user.providerData[0].photoURL,
      createdAt: user.metadata.createdAt,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

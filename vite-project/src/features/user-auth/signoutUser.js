import { signOut } from "firebase/auth";
import { auth } from "../../main";

export async function signoutUser() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

import { auth } from "../../main.jsx";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export async function reAuthenticateUser(email, password) {
  const user = auth.currentUser;
  console.log(user, email, password);

  const credentials = EmailAuthProvider.credential(email, password);
  const promise = reauthenticateWithCredential(user, credentials);

  try {
    await requestWithRetry(promise);
    console.log("Re-authenticated user");
    return true;
  } catch (error) {
    // TODO: Add error handling for different cases such as wrong password, etc.

    console.error("Error re-authenticating user:", error); // temp
    return false;
  }
}

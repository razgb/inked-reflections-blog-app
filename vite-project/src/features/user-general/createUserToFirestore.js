import { doc, setDoc } from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

/**
 * Receives user data copy and uploads to firestore database.
 * @param {object} userDataFromSignup Copy of user info from the signup forms in the flow components.
 * @returns {object} success bool & message
 */
export async function createUserToFirestore(userData) {
  if (!userData) {
    console.warn("Error no user data to send.");
    return;
  }

  const { uid, displayName, photoURL } = userData;
  const userRef = doc(db, "users", uid);

  try {
    const promise = setDoc(userRef, {
      uid,
      displayName,
      photoURL: photoURL || null,
    });
    await requestWithRetry(promise);
    console.log("Success upload of user.");

    return {
      success: true,
      message: "Success",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        "There seems to be a connection issue. Please refresh the page and try again.",
    };
  }
}

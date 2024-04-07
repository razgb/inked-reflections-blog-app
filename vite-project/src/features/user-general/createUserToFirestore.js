import { doc, setDoc } from "firebase/firestore";
import { db } from "../../main";

/**
 * Receives user data copy and uploads to firestore database.
 * @param {object} userDataFromSignup Copy of user info from the signup forms in the flow components.
 * @returns {object} success bool & message
 */
export async function createUserToFirebase(userData) {
  if (!userData) {
    console.log("Error no user data to send.");
    return;
  }
  const userRef = doc(db, "users", userData.uid);

  try {
    await setDoc(userRef, {
      email: userData.email,
      displayName: userData.displayName,
      emailVerified: userData.emailVerified,
      photoURL: userData.photoURL || null,
    });
    console.log("Success upload of user.");
    return {
      success: true,
      message: "Success",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error, please refresh the page and try again.",
    };
  }
}

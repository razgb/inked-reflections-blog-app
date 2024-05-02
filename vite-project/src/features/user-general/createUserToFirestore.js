import { doc, setDoc } from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";
import { initialiseUserPostsForNewUser } from "../reflections/userPosts-collection-functions/initialiseUserPostsForNewUser";

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
    const promise = setDoc(userRef, {
      email: userData.email,
      displayName: userData.displayName,
      emailVerified: userData.emailVerified,
      photoURL: userData.photoURL || null,
    });
    await requestWithRetry(promise);
    console.log("Success upload of user.");
    await initialiseUserPostsForNewUser(userData.uid);
    console.log("Success intialise of posts doc userPosts collection.");

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

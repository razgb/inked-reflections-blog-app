import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../main";

/**
 * General user updating function that can take in single fields to update too.
 * Used in both creating user and updating in profile/edit path.
 * @param {object} updatedUserData Copy of user info from the signup forms in the flow components. Consists of uid: "", email: "", displayName: "", emailVerified: false, photoURL: "",
 * @returns {object} An object with `success` (boolean) and `message` (string) properties.
 */
export async function updateUserInUsersCollection(updatedUserData) {
  if (!updatedUserData.uid) {
    throw new Error(
      "Please include a uid in order to update the user in firestore. "
    );
  }

  const userRef = doc(db, "users", updatedUserData.uid);

  try {
    await updateDoc(userRef, {
      ...updatedUserData,
    });
    return true;
  } catch (error) {
    console.error("Error updating user document:", error);
    return false;
  }
}

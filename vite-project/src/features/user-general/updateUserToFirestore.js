import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../main";

/**
 * Updates a user document in the Firestore database with new information.
 * @param {object} userData Copy of user info from the signup forms in the flow components.
 * @returns {object} An object with `success` (boolean) and `message` (string) properties.
 */
export async function updateUserInFirebase(updatedUserData) {
  if (!updatedUserData || !updatedUserData.uid) {
    console.log("Error: No user data or user ID provided.");
    return {
      success: false,
      message: "Error: No user data or user ID provided.",
    };
  }

  const userRef = doc(db, "users", updatedUserData.uid);

  try {
    await updateDoc(userRef, {
      ...updatedUserData,
    });
    console.log("Success: User document updated.");
    return {
      success: true,
      message: "Success: User document updated.",
    };
  } catch (error) {
    console.error("Error updating user document:", error);
    return {
      success: false,
      message: "Error: Unable to update user document. Please try again later.",
    };
  }
}

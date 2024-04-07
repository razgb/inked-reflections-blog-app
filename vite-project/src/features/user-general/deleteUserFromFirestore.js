import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../main";
/**
 * Deletes a user document from the Firestore database.
 * @param {object} userData Copy of user info from the signup forms in the flow components.
 * @returns {object} success bool & message
 */
export async function deleteUserFromFirebase(userData) {
  if (!userData || !userData.uid) {
    console.log("Error: No user data or user ID provided.");
    return {
      success: false,
      message: "Error: No user data or user ID provided.",
    };
  }

  const userRef = doc(db, "users", userData.uid);

  try {
    await deleteDoc(userRef);
    console.log("Success: User document deleted.");
    return {
      success: true,
      message: "Success: User document deleted.",
    };
  } catch (error) {
    console.error("Error deleting user document:", error);
    return {
      success: false,
      message: "Error: Unable to delete user document. Please try again later.",
    };
  }
}

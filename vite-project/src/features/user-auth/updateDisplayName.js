import { auth } from "../../main";
import { updateProfile } from "firebase/auth";
import { updateUserInUsersCollection } from "../user-general/updateUserToFirestore";

/**
 * Sends request to firebase to update user displayName and profile. (does not update username)
 * @param {string} name Name of user in string (max 3 words all alphabetical chars)
 * @param {string} firebaseImageReference Name of the file the user uploaded
 * @returns {Promise<Boolean>} Promise boolean based on success of function
 */
export async function updateDisplayNameAndProfile(
  uid,
  name,
  firebaseImageReference
) {
  try {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: firebaseImageReference,
    });

    await updateUserInUsersCollection({
      uid: uid,
      photoURL: firebaseImageReference,
    });

    // send new displayName to users collection.

    return "success";
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      return "invalid-credential";
    }

    return "error";
  }
}

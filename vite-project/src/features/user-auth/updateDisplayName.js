import { db } from "../../main";
import { auth } from "../../main";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
// const usersRef = collection(db, "users");

/**
 * Sends request to firebase to update user displayName and profile. (does not update username)
 * @param {string} name Name of user in string (max 3 words all alphabetical chars)
 * @param {string} profilePath Name of the file the user uploaded
 * @returns {Promise<Boolean>} Promise boolean based on success of function
 */
export async function updateDisplayNameAndProfile(name, profilePath) {
  try {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profilePath,
    });
    return true;
  } catch (error) {
    return false;
  }
}

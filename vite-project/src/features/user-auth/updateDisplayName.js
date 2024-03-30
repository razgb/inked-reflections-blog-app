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

export async function updateDisplayName(name) {
  const usersRef = collection(db, "users");

  try {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: "",
    });
    return true;
  } catch (error) {
    return false;
  }
}

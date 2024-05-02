import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../main";
import { requestWithRetry } from "../../../shared/util/requestWithRetry";

// FUNCTION NEEDS A WAY TO DELETE MULTIPLE USER POSTS FOR A LEAVING USER.
export async function deleteAllUserPostsForLeavingUser(uid) {
  if (!uid) return;
}

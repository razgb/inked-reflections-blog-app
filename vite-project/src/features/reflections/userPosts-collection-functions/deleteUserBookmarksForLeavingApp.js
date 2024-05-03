import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../main";
import { requestWithRetry } from "../../../shared/util/requestWithRetry";

// FUNCTION NEEDS A WAY TO DELETE MULTIPLE USER POSTS FOR A LEAVING USER.
export async function deleteUserPost(uid) {
  if (!uid) return;

  const userRef = doc(db, "userPosts", uid);
  const promise = deleteDoc(userRef);

  try {
    await requestWithRetry(promise);
    return {
      error: false,
      title: null,
      message: null,
    };
  } catch (error) {
    console.log(error);

    // WE NEED TO KNOW THE EXACT ERROR FROM FUICKING FIREBASE AND THEN UPDATE THE ERROR MESSAGE AND TITLE ACCORDINGLY.
    return {
      error: true,
      title: "Connection issues deleting your account.",
      message:
        "Please check your internet connection and try again in a couple minutes.",
    };
  }
}

import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../main";
import { requestWithRetry } from "../../../shared/util/requestWithRetry";

export async function removePostIdFromUserPosts(uid, postId) {
  if (!uid || !postId) return;

  const userRef = doc(db, "userPosts", uid);
  const promise = updateDoc(userRef, {
    posts: arrayRemove(postId),
  });

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
      title: "Connection issues deleting your reflection.",
      message:
        "Please check your internet connection and try again in a couple minutes.",
    };
  }
}

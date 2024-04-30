import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export async function addPostIdToUser(uid, postId) {
  if (!uid || !postId) return;

  const userRef = doc(db, "users", uid);
  const promise = updateDoc(userRef, {
    posts: arrayUnion(postId),
  });

  try {
    await requestWithRetry(promise);
    return {
      error: false,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      title: "Could not update your post",
      message:
        "Please check your internet connection and try again in a couple minutes.",
    };
  }
}

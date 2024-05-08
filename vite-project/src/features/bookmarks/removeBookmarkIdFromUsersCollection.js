import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export async function removeBookmarkIdFromUsersCollection(uid, postId) {
  if (!uid || !postId) return;

  const userRef = doc(db, "users", uid);
  const promise = updateDoc(userRef, {
    bookmarks: arrayRemove(postId),
  });

  try {
    await requestWithRetry(promise);
    return {
      error: false,
      title: "Success",
      message: "Bookmark removed.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      title: "Connection issues removing bookmark",
      message:
        "Please check your internet connection and try again in a couple minutes.",
    };
  }
}

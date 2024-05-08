import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export async function addBookmarkIdToUsersCollection(uid, postId) {
  if (!uid || !postId) return;

  const userRef = doc(db, "users", uid);
  const promise = updateDoc(userRef, {
    bookmarks: arrayUnion(postId),
  });

  try {
    await requestWithRetry(promise);
    return {
      error: false,
      title: "Success",
      message: "Your post has been bookmarked.",
    };
  } catch (error) {
    console.log(error);
    throw new Error(
      JSON.stringify({
        error: true,
        title: "Connection issues bookmarking post.",
        message:
          "Please check your internet connection and try again in a couple minutes.",
      })
    );
  }
}

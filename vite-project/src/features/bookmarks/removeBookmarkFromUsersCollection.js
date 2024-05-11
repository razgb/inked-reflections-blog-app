import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export async function removeBookmarkFromUsersCollection(uid, postId) {
  if (!uid || !postId)
    throw new Error(
      "Both uid and postId are required to remove a bookmark from the user's collection."
    );

  const bookmarkRef = doc(db, "users", uid, "bookmarks", postId);
  const promise = deleteDoc(bookmarkRef);

  try {
    await requestWithRetry(promise);
    return {
      error: false,
      title: "Success",
      message: "Your post has been removed from your bookmarks.",
    };
  } catch (error) {
    console.log(error);
    throw new Error(
      JSON.stringify({
        error: true,
        title: "Connection issues removing bookmark",
        message:
          "Please check your internet connection and try again in a couple minutes.",
      })
    );
  }
}

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

/**
 * Adds a bookmark to a user's bookmarks collection.
 * @param {string} uid - The user's unique identifier.
 * @param {string} postId - The post's unique identifier.
 * @returns {Promise<{error: boolean, title: string, message: string}>} - A promise that resolves to an object containing an error boolean, a title string, and a message string.
 */
export async function addBookmarkToUsersCollection(uid, postId) {
  if (!uid || !postId)
    throw new Error(
      "Add uid and postId for function send bookmark to user's bookmark collection."
    );

  // console.log(uid, postId);
  const bookmarkRef = doc(db, "users", uid, "bookmarks", postId);
  const promise = setDoc(bookmarkRef, {});

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

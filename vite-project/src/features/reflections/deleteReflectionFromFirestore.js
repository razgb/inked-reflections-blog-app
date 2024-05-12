import { db } from "../../main";
import { deleteDoc, doc } from "firebase/firestore";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

/**
 * Deletes a user's post if authorized. Known as a 'danger' function internally in this app (DangerModal.jsx).
 * @param {string} postId post id inside firestore posts collection.
 */
export async function deleteReflectionFromFirestore({ uid, postId, postUid }) {
  if (uid !== postUid) throw new Error("Post does not belong to user.");
  const promise = deleteDoc(doc(db, "posts-new", postId));

  try {
    await requestWithRetry(promise);
    console.log("Post deleted from firestore. ");
    return {
      error: false,
      title: null,
      message: null,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      title: "There was an issue wiwh deleting your post",
      message: "Please check your internet connnection and try again.",
    };
  }
}

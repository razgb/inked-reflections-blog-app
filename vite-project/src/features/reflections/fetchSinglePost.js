import { db } from "../../main";
import { getDoc, doc } from "firebase/firestore";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export async function fetchSinglePost(uid, postId) {
  const promise = getDoc(doc(db, "posts-new", postId));
  const bookmarkRef = doc(db, "users", uid, "bookmarks", postId);
  const bookmarkPromise = getDoc(bookmarkRef);

  try {
    const docSnap = await requestWithRetry(promise);
    const bookmarkSnap = await requestWithRetry(bookmarkPromise);

    return {
      id: docSnap.id,
      ...docSnap.data(),
      isBookmarked: bookmarkSnap.exists(),
    };
  } catch (error) {
    throw new Error(error);
  }
}

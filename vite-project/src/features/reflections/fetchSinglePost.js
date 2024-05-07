import { db } from "../../main";
import { getDoc, doc } from "firebase/firestore";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export async function fetchSinglePost(postId) {
  const promise = getDoc(doc(db, "posts-new", postId));

  try {
    const docSnap = await requestWithRetry(promise);
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    throw new Error(error);
  }
}

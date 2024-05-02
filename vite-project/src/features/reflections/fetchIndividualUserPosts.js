import { collection, getDocs } from "firebase/firestore";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export async function fetchIndividualUserPosts(uid) {
  const postQuery = getDocs(collection("users", uid));
  const querySnapshot = await requestWithRetry(postQuery);

  const posts = querySnapshot.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

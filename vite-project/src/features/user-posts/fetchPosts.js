import { db } from "../../main";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { filterTextAndEstimateReadingTime } from "../reflections/submission/util/filterTextAndEstimateReadingTime.js";
import { fetchBookmarkIdsForPostIds } from "../bookmarks/fetchBookmarkIdsForPostIds.js";
import { requestWithRetry } from "../../shared/util/requestWithRetry.js";

let lastVisibleDoc = null;
let fetchCount = 0;
export async function fetchPosts(uid) {
  // const postsRef = collection(db, "posts");
  const postsRef = collection(db, "posts-new");
  let q;

  if (lastVisibleDoc) {
    q = query(
      postsRef,
      orderBy("createdAt", "desc"),
      startAfter(lastVisibleDoc),
      limit(10)
    );
  } else {
    q = query(postsRef, orderBy("createdAt", "desc"), limit(10));
  }
  const querySnapshot = await getDocs(q);
  lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; // last document in the last received set of posts

  const postsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const postIds = postsData.map((post) => post.id);
  const bookmarkIdsPromise = fetchBookmarkIdsForPostIds(uid, postIds);
  const bookmarkIds = await requestWithRetry(bookmarkIdsPromise);

  return postsData.map((post) => ({
    ...post,
    isBookmarked: bookmarkIds.includes(post.id),
  }));

  // ++fetchCount;
}

import { db } from "../../main.jsx";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { fetchBookmarkIdsForPostIds } from "../bookmarks/fetchBookmarkIdsForPostIds.js";
import { requestWithRetry } from "../../shared/util/requestWithRetry.js";

let lastVisibleDoc = null;
export async function fetchMainFeedPosts(uid) {
  if (!uid) return;
  const postsRef = collection(db, "posts-new");
  let q;

  if (lastVisibleDoc) {
    q = query(postsRef, startAfter(lastVisibleDoc), limit(10));
  } else {
    q = query(postsRef, limit(10));
  }
  const querySnapshot = await getDocs(q);
  lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; // last document in the last received set of posts

  const postsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (!postsData.length) {
    return [];
  }

  const postIds = postsData.map((post) => post.id);
  const bookmarkIdsPromise = fetchBookmarkIdsForPostIds(uid, postIds);
  const bookmarkIds = await requestWithRetry(bookmarkIdsPromise);

  const posts = postsData.map((post) => ({
    ...post,
    isBookmarked: bookmarkIds.includes(post.id),
  }));

  shuffleArray(posts);
  return posts;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

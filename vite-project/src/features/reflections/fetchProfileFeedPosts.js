import { db } from "../../main";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  where,
} from "firebase/firestore";
import { requestWithRetry } from "../../shared/util/requestWithRetry";
import { fetchBookmarkIdsForPostIds } from "../bookmarks/fetchBookmarkIdsForPostIds";

let lastVisibleDoc = null;

/**
 * Fetches 5 posts at a time using a user's UID.
 * @param {string} uid Universal ID contained in every post/reflection. Uid matches the uid of the author of the post.
 * @returns {object} returnObject: error (bool), title (str), message (str), and posts (array).
 */
export async function fetchProfileFeedPosts(uid) {
  if (!uid) return;

  const postsRef = collection(db, "posts-new");
  let q;

  if (lastVisibleDoc) {
    q = query(
      postsRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      startAfter(lastVisibleDoc),
      limit(10)
    );
  } else {
    q = query(
      postsRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );
  }

  const promise = getDocs(q);
  const querySnapshot = await requestWithRetry(promise);
  lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; // last document in the last received set of posts

  const postsData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  if (postsData.length === 0) {
    return [];
  }

  const postIds = postsData.map((post) => post.id);
  const bookmarkIdsPromise = fetchBookmarkIdsForPostIds(uid, postIds);
  const bookmarkIds = await requestWithRetry(bookmarkIdsPromise);

  const postDataWthBookmarks = postsData.map((post) => ({
    ...post,
    isBookmarked: bookmarkIds.includes(post.id),
  }));

  try {
    return postDataWthBookmarks;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      title: "Connection issues loading posts.",
      message:
        "Please check your internet connection and try again in a couple minutes.",
    };
  }
}

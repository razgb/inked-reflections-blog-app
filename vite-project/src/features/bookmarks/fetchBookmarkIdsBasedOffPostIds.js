import {
  collection,
  doc,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

/**
 * Fetches bookmark ids based off post ids.
 * @param {string} uid - The user's unique identifier.
 * @param {string[]} postIds - An array of post ids.
 */
export async function fetchBookmarkIdsBasedOffPostIds(uid, postIds) {
  if (!Array.isArray(postIds)) {
    throw new Error("Post IDs are required to fetch bookmarks.");
  } else if (!postIds) {
    throw new Error("Post IDs are required to fetch bookmarks.");
  } else if (postIds.length > 10) {
    throw new Error(
      "Too many post ids request at once. Only change this if block if more than 10 posts are requested at once."
    );
  }

  const userRef = doc(db, "users", uid);
  const bookmarksRef = collection(userRef, "bookmarks"); // users sub collection
  const q = query(bookmarksRef, where(documentId(), "in", postIds));
  const promise = getDocs(q);

  try {
    const documentSnapshots = await requestWithRetry(promise);
    const bookmarkIds = documentSnapshots.docs.map((doc) => doc.id);
    return bookmarkIds;
  } catch (error) {
    console.error(error);

    // Used inside fetchPosts function for isBookmarked checks.
    throw new Error({
      title: "Failed to fetch posts",
      message: "Please check internet connection and try again.",
    });
  }
}

import { db } from "../../main";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  doc,
} from "firebase/firestore";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

let lastVisibleDoc = null;

/**
 * Attempts 3 times to fecth bookmark ids for a given user. Used inside BookmarksPage && RecentBookmarksContainer.
 * @param {string} uid - The user's id.
 * @param {number} queryLimit - The number of bookmarks to fetch.
 * @returns {Promise<string[]>} - A promise that resolves to an array of bookmark ids.
 */
export async function fetchBookmarkIdsForUser(uid, queryLimit = 10) {
  const userRef = doc(db, "users", uid);
  const bookmarkCollectionRef = collection(userRef, "bookmarks");

  let q;
  if (lastVisibleDoc) {
    q = query(
      bookmarkCollectionRef,
      startAfter(lastVisibleDoc),
      limit(10),
      orderBy("createdAt", "desc")
    );
  } else {
    q = query(
      bookmarkCollectionRef,
      limit(queryLimit),
      orderBy("createdAt", "desc")
    );
  }

  const bookmarkIdsQueryPromise = getDocs(q);
  const bookmarkIdQuerySnapshots = await requestWithRetry(
    bookmarkIdsQueryPromise
  );

  const bookmarkIds = bookmarkIdQuerySnapshots.docs.map((doc) => doc.id);
  return bookmarkIds;
}

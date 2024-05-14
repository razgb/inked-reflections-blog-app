import {
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";
import { fetchBookmarkIdsForUser } from "./fetchBookmarkIdsForUser";

let lastVisibleDoc = null;

export async function fetchBookmarkFeedPosts(uid, postsLimit = 10) {
  if (!uid) throw new Error("uid is required inside fetchBookmarkFeedPosts");

  const bookmarkIds = await fetchBookmarkIdsForUser(uid, limit);
  if (!bookmarkIds.length) return [];

  const postsRef = collection(db, "posts-new");

  let q;
  if (lastVisibleDoc) {
    q = query(
      postsRef,
      orderBy("createdAt", "desc"),
      startAfter(lastVisibleDoc),
      limit(postsLimit),
      where(documentId(), "in", bookmarkIds)
    );
  } else {
    q = query(
      postsRef,
      orderBy("createdAt", "desc"),
      limit(postsLimit),
      where(documentId(), "in", bookmarkIds)
    );
  }

  const postsPromise = getDocs(q);
  const querySnapshots = await requestWithRetry(postsPromise);
  lastVisibleDoc = querySnapshots.docs[querySnapshots.docs.length - 1];

  return querySnapshots.docs.map((doc) => ({
    id: doc.id,
    isBookmarked: true,
    ...doc.data(),
  }));
}

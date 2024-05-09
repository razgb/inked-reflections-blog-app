import {
  collection,
  doc,
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
import { filterTextAndEstimateReadingTime } from "../../shared/util/filterTextAndEstimateReadingTime";

let lastVisibleDoc = null;

export async function fetchBookmarkPosts(uid, postsLimit = 10) {
  if (!uid) throw new Error("uid is required inside fetchBookmarkPosts");

  const bookmarkIds = await fetchBookmarkIdsForUser(uid, limit);
  if (!bookmarkIds.length) return [];

  const postsRef = collection(db, "posts-new");

  let q;
  if (lastVisibleDoc) {
    q = query(
      postsRef,
      startAfter(lastVisibleDoc),
      orderBy("createdAt", "desc"),
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

  const posts = querySnapshots.docs.map((doc) => ({
    id: doc.id,
    isBookmarked: true,
    ...doc.data(),
  }));

  const postDataWithReadingTime = posts.map((doc) => {
    const readingTime = filterTextAndEstimateReadingTime(doc.postContent);
    return {
      ...doc,
      readingTime,
    };
  });

  return postDataWithReadingTime;
}

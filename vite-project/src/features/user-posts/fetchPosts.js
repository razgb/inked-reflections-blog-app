import { db } from "../../main";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { filterTextAndEstimateReadingTime } from "../../shared/util/filterTextAndEstimateReadingTime.js";
import { fetchBookmarkIdsBasedOffPostIds } from "../bookmarks/fetchBookmarkIdsBasedOffPostIds.js";

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
    ...doc.data(),
    id: doc.id,
  }));

  const postIds = postsData.map((post) => post.id);
  const bookmarkIds = await fetchBookmarkIdsBasedOffPostIds(uid, postIds);
  // console.log(bookmarkIds);

  const postIdsWithBookmarkBools = postsData.map((post) => ({
    ...post,
    isBookmarked: bookmarkIds.includes(post.id),
  }));

  const postDataWithReadingTime = postIdsWithBookmarkBools.map((doc) => {
    const readingTime = filterTextAndEstimateReadingTime(doc.postContent);
    return {
      ...doc,
      readingTime,
    };
  });

  ++fetchCount;
  // console.log(`fetchPosts function invoked: ${fetchCount}x`);
  // console.log(postDataWithReadingTime);
  return postDataWithReadingTime;
}

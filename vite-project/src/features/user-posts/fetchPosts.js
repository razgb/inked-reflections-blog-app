import { db } from "../../main";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

let lastVisibleDoc = null;
let fetchCount = 0;
export async function fetchPosts() {
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

  ++fetchCount;
  console.log(`fetchPosts function invoked: ${fetchCount}x`);

  return postsData;
}

/* 
// SAVE OF OLD FETCH POSTS FUNCTION WITHOUT REACT QUERY
export function fetchPosts() {
  return async (dispatch) => {
    async function getData() {
      const postsRef = collection(db, "posts");
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
      return postsData;
    }

    try {
      // Note: resesarch how getDocs firestore function throws errors
      const postsData = await getData();
      dispatch(updatePostsFeed(postsData));
    } catch (error) {
      // Temp
      console.log("Could not fetch data. Error: ", error);
    }
  };
}
*/

import { updatePostsFeed } from "../../entities/posts/posts-slice";
import db from "../../main";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

let lastVisibleDoc = null; // initialise

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
      const postsData = await getData();
      // console.log(postsData);
      dispatch(updatePostsFeed(postsData));
    } catch (error) {
      // Temp
      console.log("Could not fetch data. Error: ", error);
    }
  };
}

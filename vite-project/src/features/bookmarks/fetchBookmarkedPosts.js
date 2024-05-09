import { db } from "../../main";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  where,
  getDoc,
} from "firebase/firestore";

let lastVisibleDoc = null;
export async function fetchBookmarkedPosts(uid) {
  const userRef = collection(db, "users");

  const userSnapshot = await getDoc(userRef, uid);

  // const querySnapshot = await getDocs(q);
  // lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; // last document in the last received set of posts
  // const postsData = querySnapshot.docs.map((doc) => ({
  //   ...doc.data(),
  //   id: doc.id,
  // }));

  // return postsData;
}

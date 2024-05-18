import { db } from "../../../main.jsx";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { requestWithRetry } from "../../../shared/util/requestWithRetry.js";

export async function updateAllPostsWithNewValues({ uid, ...newUserData }) {
  const postsRef = collection(db, "posts-new");
  const q = query(postsRef, where("uid", "==", uid));

  try {
    const querySnapshot = await requestWithRetry(getDocs(q));
    const promises = querySnapshot.docs.map((doc) =>
      updateDoc(doc.ref, { ...newUserData })
    );

    await requestWithRetry(promises);
    return true;
  } catch (error) {
    console.error("Error updating all posts:", error);
    return false;
  }
}

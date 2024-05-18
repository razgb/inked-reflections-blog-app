import { db } from "../../../main.jsx";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export async function updateAllPostsWithNewValues(newUserData) {
  const postsRef = collection(db, "posts-new");
  const q = query(postsRef, where("uid", "==", newUserData.uid));

  try {
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map((doc) =>
      updateDoc(doc.ref, { ...newUserData })
    );

    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error("Error updating all posts:", error);
    return false;
  }
}

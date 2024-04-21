import { db } from "../../main";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Creates a new post document in firestore with the user's reflection.
 * @param {Object} postContent array of user's reflection composed of widgets and their text values.
 * @param {Array} imageReferences array of image name references.
 */
export async function uploadReflectionToFirestore(
  postContent,
) {
  const data = {
    postContent,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, "posts"), data);
    console.log("worked");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

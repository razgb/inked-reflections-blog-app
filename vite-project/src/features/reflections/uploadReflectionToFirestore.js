import { db } from "../../main";
import { collection, addDoc } from "firebase/firestore";

/**
 * Creates a new post document in firestore with the user's reflection.
 * @param {Object} postContent array of user's reflection composed of widgets and their text values.
 * @param {displayName} displayName
 * @param {authorId} authorId
 * @param {Array} imageReferences array of image name references.
 */
export async function uploadReflectionToFirestore(data) {
  const createdAt = new Date().getTime();

  const post = {
    ...data,
    createdAt,
    updatedAt: null,
  };

  try {
    const id = await addDoc(collection(db, "posts-new"), post);
    console.log("Sent post to firestore.");
    return id;
  } catch (error) {
    console.log(error);
    return false;
  }
}

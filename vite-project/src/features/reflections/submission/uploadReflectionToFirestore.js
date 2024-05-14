import { db } from "../../../main";
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
    postUid: data.uid,
    createdAt,
    updatedAt: null,
  };

  // console.log(post);

  try {
    const docRef = await addDoc(collection(db, "posts-new"), post);
    const id = docRef.id;

    return { id, createdAt };
  } catch (error) {
    console.log(error);
    return false;
  }
}

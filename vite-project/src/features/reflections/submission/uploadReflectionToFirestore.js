import { db } from "../../../main";
import { collection, addDoc } from "firebase/firestore";
import { filterTextAndEstimateReadingTime } from "./util/filterTextAndEstimateReadingTime";

/**
 * Creates a new post document in firestore with the user's reflection.
 * @param {Object} postContent array of user's reflection composed of widgets and their text values.
 * @param {displayName} displayName
 * @param {authorId} authorId
 * @param {Array} imageReferences array of image name references.
 */
export async function uploadReflectionToFirestore({
  uid,
  displayName,
  profilePhotoReference,
  postContent,
}) {
  const createdAt = new Date().getTime();
  const readingTime = filterTextAndEstimateReadingTime(postContent);

  const post = {
    uid,
    displayName,
    profilePhotoReference,
    postContent,
    readingTime,
    createdAt,
    updatedAt: null,
  };

  try {
    const docRef = await addDoc(collection(db, "posts-new"), post);
    const id = docRef.id;

    return { id, createdAt };
  } catch (error) {
    console.log(error);
  }
}

import { deleteObject, ref } from "firebase/storage";
import { postsRef, profileRef } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export async function deleteImageFromFirebase(storageReference, fileName) {
  const acceptedStorageRefs = ["posts", "profile"];
  if (!acceptedStorageRefs.includes(storageReference)) return false;

  let reference;
  if (storageReference === "posts") {
    reference = ref(postsRef, fileName);
  } else {
    reference = ref(profileRef, fileName);
  }

  const promise = deleteObject(reference);

  try {
    await requestWithRetry(promise);
    return true;
  } catch (error) {
    return false;
  }
}

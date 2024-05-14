import { profileRef, postsRef } from "../../main";
import { uploadBytes, ref } from "firebase/storage";

/**
 * Accepts a validated and sanitized file and sends to firebase storage.
 * @param {File} file The validated and sanitized file to be uploaded.
 * @param {string} uid The unique ID from the userSlice redux state.
 * @param {object} ref Name of storage reference for firebase.
 * @returns {Promise<object>} Contains success, message, and fileName properties.
 */
export async function uploadImageToFirebase(file, uid, storageReference) {
  const acceptedStorageRefs = ["posts", "profile"];
  if (!acceptedStorageRefs.includes(storageReference)) return;

  let reference;
  if (storageReference === "posts") {
    reference = postsRef;
  } else reference = profileRef;

  const lastModifiedTimestamp = file.lastModified;
  const uniqueFileName = `${uid}__${lastModifiedTimestamp}__${file.name}`;
  const metadata = {
    contentType: file.type,
    name: file.name,
    size: file.size,
  };

  const imageRef = ref(reference, uniqueFileName);

  try {
    await uploadBytes(imageRef, file, metadata);
    return {
      success: true,
      message: "Success",
      fileName: uniqueFileName,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occured while uploading your data, please try again.",
      fileName: null,
    };
  }
}

/*
Notes: 
------
profileRef.parent navigates to the parent folder while 
profileRef.root navigates to the root directory of all 
the images in this specific storage bucket. (one in this project)

profileRef.fullPath is similar to how folders are stored on computer disks. 
metadata can also be included in the uploadBytes function. MIME
*/

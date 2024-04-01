import { profileRef } from "../../main";
import { uploadBytes, ref } from "firebase/storage";

/**
 * Accepts a validated and sanitized file and sends to firebase storage/profiles directory
 * @param {File} file The validated and sanitized file to be uploaded.
 * @param {string} uid The unique ID from the userSlice redux state.
 * @returns {Promise<boolean>} A promise that resolves to true if file is uploaded successfully, else returns false.
 */
export async function uploadImageToFirebase(file, uid) {
  const lastModifiedTimestamp = file.lastModified;
  const uniqueFileName = `${uid}__${lastModifiedTimestamp}__${file.name}`;
  const metadata = {
    contentType: file.type,
    name: file.name,
    size: file.size,
  };
  const imageRef = ref(profileRef, uniqueFileName);

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

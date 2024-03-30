import { profileRef } from "../../main";
import { uploadBytes, ref } from "firebase/storage";

/**
 * Accepts a validated and sanitized file and sends to firebase storage/profiles directory
 * @param {*} file
 */
export async function uploadImageToFirebase(file) {
  const metadata = {
    contentType: file.type,
    name: file.name,
    size: file.size,
  };
  const imageRef = ref(profileRef, file.name);
  try {
    await uploadBytes(imageRef, file, metadata);
    return true;
  } catch (error) {
    return false;
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

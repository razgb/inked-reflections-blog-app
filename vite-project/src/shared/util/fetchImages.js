import { ref, getDownloadURL } from "firebase/storage";
import { assetsRef, profileRef, postsRef } from "../../main";
import { requestWithRetry } from "./requestWithRetry";

/**
 * Takes in image name(s) and folder location and returns public URLs.
 * @param {string|array} referenceInput firebase storage file name.
 * @param {string} folderPath firebase storage folder.
 */
export async function fetchImages(referenceInput, folderPath) {
  if (!folderPath || !referenceInput)
    throw new Error(
      "Please use a string or an array for the referenceInput and a string for the folderPath"
    );
  let reference = null;
  switch (folderPath) {
    case "posts":
      reference = postsRef;
      break;
    case "profile":
      reference = profileRef;
      break;
    case "assets":
      reference = assetsRef;
      break;
  }

  let promise = null;
  if (Array.isArray(referenceInput)) {
    promise = referenceInput.map((fileName) =>
      getDownloadURL(ref(reference, fileName))
    );
  } else if (typeof referenceInput === "string") {
    promise = getDownloadURL(ref(reference, referenceInput));
  }

  try {
    const publicImageLinkOrLinks = await requestWithRetry(promise);
    return publicImageLinkOrLinks;
  } catch (error) {
    return false;
  }
}

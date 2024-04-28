import { ref, getBlob } from "firebase/storage";
import { assetsRef, profileRef, postsRef } from "../../main";

/**
 * Gets download blob(s) (binary large object) directly from firebase storage as a promise(s).
 * @param {string|Array} fileNameInput File name with extension
 * @param {string} folderName Firebase folder name
 * @returns {Promise}
 */
export async function fetchFirebaseImageSrc(fileNameInput, folderName) {
  if (!folderName || !fileNameInput)
    throw new Error(
      "Please use a string or an array for the fileNameInput and a string for the folderName"
    );
  const storageFolder = getStorageFolder(folderName);

  const { inputType, timeoutSeconds, promiseOrPromises } = getInputDetails(
    fileNameInput,
    storageFolder
  );

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Image fetching timed out."));
    }, 1000 * timeoutSeconds);
  });

  let blobOrBlobs = null;
  try {
    blobOrBlobs = await Promise.race([promiseOrPromises, timeoutPromise]);
  } catch (error) {
    console.log(error);
    throw new Error("Could not retrieve blob or blobs from firebase.");
  }

  const processBlob = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () =>
        reject(new Error("Failed to process blob in file reader."));
      reader.readAsDataURL(blob);
    });
  };

  let getImageOrImages;
  if (inputType === "array") {
    getImageOrImages = blobOrBlobs.map((blob) => processBlob(blob));
  } else {
    getImageOrImages = processBlob(blobOrBlobs);
  }

  let src;
  try {
    // src = await Promise.race([getImageOrImages, timeoutPromise]);
    src = await getImageOrImages;
  } catch (error) {
    // throw new Error("Blobs took too long to process.");
    throw new Error("Could not process blob(s) into image(s).");
  }

  return src;
}

// Helper functions:
function getStorageFolder(folderName) {
  switch (folderName) {
    case "posts":
      return postsRef;
    case "profile":
      return profileRef;
    case "assets":
      return assetsRef;
    default:
      throw new Error(
        "Invalid folderName. Allowed values: posts, profile, assets"
      );
  }
}

function getInputDetails(fileNameInput, storageFolder) {
  if (Array.isArray(fileNameInput)) {
    const promises = fileNameInput.map((fileName) => {
      const reference = ref(storageFolder, fileName);
      return getBlob(reference);
    });
    return {
      inputType: "array",
      timeoutSeconds: 10,
      promiseOrPromises: Promise.all(promises),
    };
  } else if (typeof fileNameInput === "string") {
    const reference = ref(storageFolder, fileNameInput);
    return {
      inputType: "string",
      timeoutSeconds: 5,
      promiseOrPromises: getBlob(reference),
    };
  }
}

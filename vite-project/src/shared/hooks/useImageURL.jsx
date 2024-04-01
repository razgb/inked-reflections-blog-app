import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { assetsRef, profileRef } from "../../main";

/**
 * Receives folderName and path url as a string and gets public path to image from firebase.
 * @param {string} folderName folder name in firebase storage where image path is stored (e.g. assets, profile, posts)
 * @param {string} path image ref path in firebase storage
 * @returns {string|null} public path to image
 */
const useImageURL = function (folderName, path) {
  const [logoURL, setLogoURL] = useState(null);
  let folderRef = null;
  switch (folderName) {
    case "assets":
      folderRef = assetsRef;
      break;
    case "profile":
      folderRef = profileRef;
      break;
    case "posts":
      folderRef = profileRef;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (!folderRef) return; // guard
    async function getLogoUrl() {
      try {
        const url = await getDownloadURL(ref(folderRef, path));
        setLogoURL(url);
      } catch (error) {
        console.log(error);
      }
    }
    getLogoUrl();
  }, [folderRef, folderName, path]);

  return logoURL;
};

export default useImageURL;

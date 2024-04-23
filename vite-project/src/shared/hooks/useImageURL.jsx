import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { assetsRef, profileRef, postsRef } from "../../main";

/**
 * Receives folderName and path url as a string and gets public path to image from firebase.
 * @param {string} folderName folder name in firebase storage where image path is stored (e.g. assets, profile, posts)
 * @param {string} path image ref path in firebase storage
 * @returns {object} public path to image and loading state
 */
const useImageURL = function (folderName, path) {
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  let folderRef = null;
  switch (folderName) {
    case "assets":
      folderRef = assetsRef;
      break;
    case "profile":
      folderRef = profileRef;
      break;
    case "posts":
      folderRef = postsRef;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (!folderRef) return; // guard
    setLoading(true);
    async function getImageURL() {
      try {
        if (path === null) {
          setImageURL(null);
          setLoading(false);
          return;
        }
        const url = await getDownloadURL(ref(folderRef, path));
        setImageURL(url);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getImageURL();
  }, [folderRef, folderName, path]);

  return { imageURL, loading };
};

export default useImageURL;

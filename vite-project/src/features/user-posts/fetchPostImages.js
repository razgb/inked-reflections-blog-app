import { getDownloadURL, ref } from "firebase/storage";
import { postsRef } from "../../main";

export async function fetchPostImages(imageArray) {
  function getimageURL(path) {
    return getDownloadURL(ref(postsRef, `bot/${path}`));
  }

  const promiseArray = imageArray.map((imageName) => {
    return getimageURL(imageName);
  });

  const images = await Promise.all(promiseArray);
  console.log(images);
  return images;
}

/*
  const imageArray = [
    "bot_post__1.jpg",
    "bot_post__2.jpg",
    "bot_post__3.jpg",
    "bot_post__4.jpg",
    "bot_post__5.jpg",
    "bot_post__6.jpg",
    "bot_post__7.jpg",
    "bot_post__8.jpg",
    "bot_post__9.jpg",
    "bot_post__10.jpg",
  ];
 */

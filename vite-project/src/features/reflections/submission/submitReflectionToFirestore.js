import { requestWithRetry } from "../../../shared/util/requestWithRetry";
import { uploadImageToFirebase } from "../../user-general/uploadImageToFirebase";
import { uploadReflectionToFirestore } from "./uploadReflectionToFirestore";
import { extractText } from "./util/extractTextAsArray.js";
import { validateTextArray } from "./util/validateTextArray.js";
import { addTextValuesToUserContent } from "./util/addTextValuesToUserContent.js";
import { filterEmptyImageComponents } from "./util/filterEmptyImageComponents.js";
import { replaceFileObjectsWithReferences } from "./util/replaceFileObjectsWithReferences.js";

const DEFAULT_ERROR = {
  isError: true,
  title: "Error uploading your reflection.",
  message: "Check your internet connection and please try again.",
};

/**
 * Uploads user reflection to firestore posts collection, and then uploads post id to users collection.
 *
 * @param {Function} dispatch redux dispatch function created from useDispatch hook.
 * @param {Event} event HTML default form submission event.
 * @param {Object} userinfo Contains universal-ID, firebase displayName, and firebase reference to profilePhoto.
 * @returns {Object} Fields: error, title, message.
 */
export async function submitReflectionToFirestore({
  event,
  uid,
  displayName,
  profilePhotoReference,
  userContent,
}) {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const userContentValueEntries = Array.from(formdata.entries());
  const widgetTextsAsArray = extractText(userContentValueEntries);

  const textValidator = validateTextArray(widgetTextsAsArray);
  if (textValidator.isError) {
    return {
      error: {
        ...textValidator,
      },
      post: null,
    };
  }

  const userContentWithValues = addTextValuesToUserContent(
    userContent,
    userContentValueEntries
  );

  const validUserContent = filterEmptyImageComponents(userContentWithValues);

  const imagePromises = validUserContent
    .filter((widget) => widget.file)
    .map((widget) => {
      return uploadImageToFirebase(widget.file, uid, "posts");
    });

  const imageNames = [];
  if (imagePromises.length) {
    try {
      const uploadObject = await requestWithRetry(imagePromises);
      // console.log("Upload Object:", uploadObject);

      uploadObject.forEach((item) => imageNames.push(item.fileName));
    } catch (error) {
      return {
        error: {
          ...DEFAULT_ERROR,
        },
        post: null,
      };
    }
  }

  const userContentToUpload = replaceFileObjectsWithReferences(
    validUserContent,
    imageNames
  );

  // EDGE CASE SCENARIO WITH NO COVER-IMAGE. Due to all images being filtered out above.
  if (!imageNames.length) {
    userContentToUpload.unshift({
      id: "cover-image",
      component: "image",
      title: "cover-image",
      firebaseStorageReference: null,
    });
    // console.log(userContentToUpload);
  }

  try {
    const promise = uploadReflectionToFirestore({
      uid,
      displayName,
      profilePhotoReference,
      postContent: userContentToUpload,
    });

    const { id, createdAt, readingTime } = await requestWithRetry(promise); // auto-gen post id by firestore.

    const post = {
      id,
      createdAt,
      displayName,
      profilePhotoReference,
      postUid: uid,
      readingTime,
      postContent: userContentToUpload,
    };

    return {
      error: {
        isError: false,
        title: null,
        message: null,
      },
      post,
    };
  } catch (error) {
    console.log(error);

    return {
      error: {
        ...DEFAULT_ERROR,
      },
      post: null,
    };
  }
}

import { requestWithRetry } from "../../shared/util/requestWithRetry";
import { validateTextWidget } from "./validateTextWidget";
import { uploadImageToFirebase } from "../user-general/uploadImageToFirebase";
import { uploadReflectionToFirestore } from "./uploadReflectionToFirestore";
import { addPostIdToUser } from "./addPostIDToUser.js";

/*
There needs to be a fallback way of saving user reflections in local storage as a fallback. 
*/

/**
 * Uploads user reflection to firestore posts collection, and then uploads post id to users collection.
 * @param {Event} event HTML default form submission event.
 * @param {Object} userinfo Contains universal-ID, firebase displayName, and firebase reference to profilePhoto.
 * @returns {Object} Fields: error, title, message.
 */
export async function submitReflectionToFirestore(
  event,
  { uid, displayName, profilePhotoReference, userContent }
) {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const userContentValueEntries = Array.from(formdata.entries());

  // PUT ALL WIDGET FORMDATA VALUES INTO SINGLE TEXT ARRAY FOR VALIDATION.
  const allWidgetTexts = [];
  userContentValueEntries.forEach(([key, value]) => {
    if (!key.includes("image")) {
      allWidgetTexts.push(value);
    }
  });

  // VALIDATE ARRAY OF TEXTS
  const allTextIsValid = allWidgetTexts.every((text) =>
    validateTextWidget(text)
  );
  if (!allTextIsValid) {
    return {
      error: true,
      title: "Invalid character used.",
      message:
        "Allowed special characters: $, #, !, %, brackets, commas, single & double quotes, and semicolons.",
    };
  }

  // COMBINE USERCONTENT STATE WITH IT'S FORMDATA TEXT VALUES.
  const userContentWithValues = userContent.map((widget, index) => {
    const { component, title, id, file } = widget;
    if (component === "image") {
      return {
        component,
        title,
        id,
        file,
      };
    } else
      return {
        ...widget,
        value: userContentValueEntries[index][1],
      };
  });

  // FILTERING EMPTY IMAGE COMPONENTS
  const validUserContent = userContentWithValues.filter((widget) => {
    if (widget.component !== "image") return true;
    else if (widget.file) {
      return true;
    } else return false;
  });

  const imagePromises = validUserContent
    .filter((widget) => widget.file)
    .map((widget) => {
      return uploadImageToFirebase(widget.file, uid, "posts");
    });

  const imageNames = [];
  if (imagePromises.length) {
    try {
      const uploadObject = await requestWithRetry(imagePromises);

      console.log("Upload Object:", uploadObject);
      uploadObject.forEach((item) => imageNames.push(item.fileName));
    } catch (error) {
      return {
        error: true,
        title: "Error uploading your reflection",
        message: "Please try again.",
      };
    }
  }

  // MAPPING FIREBASE STORAGE IMAGE REFERENCES TO UPLOAD CONTENT
  let nameIndex = 0;
  const userContentToUpload = validUserContent.map((widget) => {
    if (widget.component !== "image") return widget;
    const { component, title, id } = widget;
    const imageName = imageNames[nameIndex];
    nameIndex++;
    return {
      component,
      title,
      id,
      firebaseStorageReference: imageName,
    };
  });

  // EDGE CASE SCENARIO WITH NO COVER-IMAGE.
  if (!imageNames.length) {
    // Adding cover-image back as null. (useful for UserPost & expanded components)
    userContentToUpload.unshift({
      id: "cover-image",
      component: "image",
      title: "cover-image",
      firebaseStorageReference: null,
    });
    console.log(userContentToUpload);
  }

  try {
    const promise = uploadReflectionToFirestore({
      postContent: userContentToUpload,
      displayName,
      uid,
      profilePhotoReference,
    });
    const post = await requestWithRetry(promise); // auto-gen post id by firestore.
    await addPostIdToUser(uid, post.id);
  } catch (error) {
    return {
      title: "Error uploading your reflection.",
      message: "Please try again in a couple minutes.",
    };
  }

  return {
    error: false,
    title: "Success",
    message: "Your post has been uploaded.",
  };
}

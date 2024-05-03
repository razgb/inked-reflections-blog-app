import styles from "./CreateReflectionPage.module.css";
import Button from "../../shared/ui/buttons/Button.jsx";

import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReflectionsTools from "../../widgets/create-reflection-widgets/ReflectionsTools.jsx";
import ReflectionTitle from "../../widgets/create-reflection-widgets/ReflectionTitle";
import ReflectionParagraph from "../../widgets/create-reflection-widgets/ReflectionParagraph";
import ReflectionBlockQuote from "../../widgets/create-reflection-widgets/ReflectionBlockQuote.jsx";
import ReflectionImage from "../../widgets/create-reflection-widgets/ReflectionImage.jsx";

import { activateAppError } from "../../entities/app-error/app-error-slice.js";
import { checkMaxContentCount } from "../../features/reflections/checkMaxContentCount.js";
import { submitReflectionToFirestore } from "../../features/reflections/submitReflectionToFirestore.js";

const maxContentCount = {
  images: 3,
  paragraphs: 5,
  quotes: 5,
};

const componentMap = {
  title: ReflectionTitle,
  image: ReflectionImage,
  paragraph: ReflectionParagraph,
  quote: ReflectionBlockQuote,
};

export default function CreateReflectionPage() {
  const {
    uid,
    displayName,
    photoURL: profilePhotoReference,
  } = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
  const [contentCount, setContentCount] = useState({
    images: 1,
    paragraphs: 1,
    quotes: 0,
  });
  const [userContent, setUserContent] = useState([
    {
      component: "image",
      id: "cover-image",
      title: "Cover image",
      file: null,
    },
    {
      component: "title",
      id: "title",
      title: "title",
    },
    {
      component: "paragraph",
      id: "paragraph-1",
      title: "paragraph",
    },
  ]);

  function handleAddWidget(widget = "paragraph") {
    const acceptedWidgets = ["paragraph", "quote", "image"];
    if (!acceptedWidgets.includes(widget)) return; // guard

    const timestamp = new Date().getTime();
    const inputId = `${widget}__${timestamp}`; // unique name for FormData object

    const widgetProperty = `${widget}s`;
    const { passed, title, message } = checkMaxContentCount(
      widget,
      contentCount[widgetProperty],
      maxContentCount[widgetProperty]
    );

    if (passed && title) {
      dispatch(
        activateAppError({
          title,
          message,
        })
      );
    } else if (!passed) {
      dispatch(
        activateAppError({
          title,
          message,
        })
      );
      return; // exits function to not add to count.
    }

    setContentCount((prev) => {
      return {
        ...prev,
        [widgetProperty]: prev[widgetProperty] + 1,
      };
    });
    setUserContent((prev) => {
      const newWidget = {
        component: widget,
        id: inputId,
        title: widget,
      };
      if (widget === "image") {
        newWidget.fileInput = {
          file: null,
          src: null,
        };
      }
      return [...prev, newWidget];
    });
  }

  function handleDeleteWidget(widget, id) {
    const widgetProperty = `${widget}s`;
    setContentCount((prev) => ({
      ...prev,
      [widgetProperty]: --prev[widgetProperty],
    }));
    setUserContent((prev) => prev.filter((widget) => widget.id !== id));
  }

  /**
   * Uses id to update image widget with new file upload.
   * @param {File} File Contains sanitized file object form useFileValidator.
   */
  const addFileToState = useCallback(function (file, id) {
    setUserContent((prev) => {
      return prev.map((widget) => {
        if (widget.id === id) {
          return {
            ...widget,
            file,
          };
        } else return widget; // leave textComponents as they are.
      });
    });
  }, []);

  async function handleSubmit(event) {
    const { error, title, message } = await submitReflectionToFirestore(event, {
      uid,
      displayName,
      profilePhotoReference,
      userContent,
    });

    if (error) {
      dispatch(
        activateAppError({
          title,
          message,
        })
      );
    } else {
      // -> redirect to user reflections or posts feed.
    }
  }

  const output = userContent.map((item) => {
    const ReflectionComponent = componentMap[item.component];
    if (!ReflectionComponent) return;

    const component = item.component;
    const props = {
      id: item.id,
      title: item.title,
    };

    if (component !== "title") props.deleteWidget = handleDeleteWidget;
    if (component === "image") props.addFileToState = addFileToState;

    return <ReflectionComponent key={item.id} {...props} />;
  });

  output.push(
    <ReflectionsTools key="reflection-tools" addWidget={handleAddWidget} />
  );

  return (
    <div>
      <div className={styles["canvas"]}>
        <form onSubmit={handleSubmit} className={styles["canvas__container"]}>
          <div className={styles["heading__container"]}>
            <h2 className={styles["heading"]}>Write a reflection</h2>
            <div className={styles["preview-save-container"]}>
              <Button type="button">Preview</Button>

              {/* We need a drafts section in the user collection */}
              {/* <Button type="button">Save</Button> */}

              <Button>Save & Publish</Button>
            </div>
          </div>
          {output}
        </form>
      </div>
    </div>
  );
}

/*
  async function handleSubmit(event) {
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
      dispatch(
        activateAppError({
          title: "Invalid character used.",
          message:
            "Allowed special characters: $, #, !, %, brackets, commas, single & double quotes, and semicolons.",
        })
      );
      return;
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
        // const uploadObject = await Promise.all(imagesPromises);
        const uploadObject = await requestWithRetry(imagePromises);
        console.log("Upload Object:", uploadObject);
        uploadObject.forEach((item) => imageNames.push(item.fileName));
      } catch (error) {
        dispatch(
          activateAppError({
            title: "Error uploading your reflection",
            message: "Please try again.",
          })
        );
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
      await requestWithRetry(promise);
    } catch (error) {
      dispatch(
        activateAppError({
          title: "Error uploading your reflection.",
          message: "Please try again in a couple minutes",
        })
      );
    }
  }
*/

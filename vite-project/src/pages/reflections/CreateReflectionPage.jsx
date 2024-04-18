import styles from "./CreateReflectionPage.module.css";
import Button from "../../shared/ui/buttons/Button.jsx";

import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReflectionsTools from "../../widgets/create-reflection-widgets/ReflectionsTools.jsx";
import ReflectionTitle from "../../widgets/create-reflection-widgets/ReflectionTitle";
import ReflectionParagraph from "../../widgets/create-reflection-widgets/ReflectionParagraph";
import ReflectionBlockQuote from "../../widgets/create-reflection-widgets/ReflectionBlockQuote.jsx";
import ReflectionImage from "../../widgets/create-reflection-widgets/ReflectionImage.jsx";

import { validateTextWidget } from "../../features/reflections/validateTextWidget.js";
import { activateAppError } from "../../entities/app-error/app-error-slice.js";
import { checkMaxContentCount } from "../../features/reflections/checkMaxContentCount.js";
import { uploadImageToFirebase } from "../../features/user-general/uploadImageToFirebase.js";

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
  const uid = useSelector((state) => state.user.info.uid);
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
      fileInput: {
        file: null,
        src: null,
      },
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
      // title existing means user is on last component allowed.
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
   * @param {object} fileInput Contains both File object & validated src.
   */
  const addFileToState = useCallback(function (fileInput, id) {
    setUserContent((prev) => {
      return prev.map((widget) => {
        if (widget.id === id) {
          return {
            ...widget,
            fileInput: { ...fileInput },
          };
        } else return widget; // leave textComponents as they are.
      });
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const userContentValueEntries = Array.from(formdata.entries());

    // Put all widget text into single array.
    const allWidgetTexts = [];
    userContentValueEntries.forEach(([key, value]) => {
      if (!key.includes("image")) {
        allWidgetTexts.push(value);
      }
    });

    // Validate array of texts.
    const allTextIsValid = allWidgetTexts.every((text) =>
      validateTextWidget(text)
    ); // In case I want to show individual errors one day.
    if (!allTextIsValid) {
      dispatch(
        activateAppError({
          title: "Invalid character used.",
          message:
            "Allowed special characters: $, #, !, %, brackets, commas, single & double quotes, and semicolons.",
        })
      );
      return; // stop submission upon error.
    }

    // Feed the userContent array with the validated text.
    const userContentWithValues = userContent.map((widget, index) => {
      const { component, title, id, fileInput } = widget;
      if (component === "image") {
        return {
          component,
          title,
          id,
          fileInput: fileInput.file ? fileInput : null,
        };
      } else
        return {
          ...widget,
          value: userContentValueEntries[index][1],
        };
    });

    // Filter image components with null file inside.
    const userContentToUpload = userContentWithValues.filter((widget) => {
      if (widget.component !== "image") return true;
      else if (widget.fileInput) {
        return true;
      } else return false;
    });
    console.log(userContentToUpload);

    // -> Upload userContent function to firebase.

    const images = userContentToUpload.filter((widget) => {
      if (widget.component === "image") {
        return true;
      }
    });
    if (!images.length) return; // returns on 0 images.

    let attempts = 0;
    const maxAttempts = 3;
    async function uploadImages() {
      async function uploadData() {
        const imagesToUpload = images.map((image) => {
          const { file, src } = image.fileInput;
          return uploadImageToFirebase(file, uid, 'posts');
        });

        return Promise.all(imagesToUpload);
      }

      try {
        attempts++;
        await uploadData();
      } catch (error) {
        if (attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 500)); // delay to allow internet to stabalise.
          await uploadImages();
        } else {
          throw new Error();
        }
      }
    }

    try {
      await uploadImages();
    } catch (error) {
      dispatch(
        activateAppError({
          title: "Could not save and publish files.",
          message: "Please check your internet connection and try again.",
        })
      );
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

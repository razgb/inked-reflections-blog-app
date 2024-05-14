import styles from "./CreateReflectionPage.module.css";
import Button from "../../shared/ui/buttons/Button.jsx";

import ReflectionsTools from "../../widgets/create-reflection-widgets/ReflectionsTools.jsx";
import ReflectionTitle from "../../widgets/create-reflection-widgets/ReflectionTitle";
import ReflectionParagraph from "../../widgets/create-reflection-widgets/ReflectionParagraph";
import ReflectionBlockQuote from "../../widgets/create-reflection-widgets/ReflectionBlockQuote.jsx";
import ReflectionImage from "../../widgets/create-reflection-widgets/ReflectionImage.jsx";

import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { activateAppError } from "../../entities/app-error/app-error-slice.js";
import { addPostToProfileFeed } from "../../entities/posts/profileFeedSlice.js";

import { checkMaxContentCount } from "../../features/reflections/checkMaxContentCount.js";
import { submitReflectionToFirestore } from "../../features/reflections/submission/submitReflectionToFirestore.js";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    uid,
    displayName,
    photoURL: profilePhotoReference,
  } = useSelector((state) => state.user.info);
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

  const handleAddWidget = useCallback(
    (widget = "paragraph") => {
      const acceptedWidgets = ["paragraph", "quote", "image"];
      if (!acceptedWidgets.includes(widget)) return;

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

      setContentCount((prev) => ({
        ...prev,
        [widgetProperty]: prev[widgetProperty] + 1,
      }));

      setUserContent((prev) => [
        ...prev,
        {
          component: widget,
          id: inputId,
          title: widget,
          ...(widget === "image" && { fileInput: { file: null, src: null } }),
        },
      ]);
    },
    [contentCount, dispatch]
  );

  function handleDeleteWidget(widget, id) {
    const widgetProperty = `${widget}s`;

    setContentCount((prev) => ({
      ...prev,
      [widgetProperty]: --prev[widgetProperty],
    }));
    setUserContent((prev) => prev.filter((widget) => widget.id !== id));
  }

  const addFileToState = useCallback((file, id) => {
    setUserContent((prev) =>
      prev.map((widget) => (widget.id === id ? { ...widget, file } : widget))
    );
  }, []);

  async function handleSubmit(event) {
    const { error, post } = await submitReflectionToFirestore({
      event,
      uid,
      displayName,
      profilePhotoReference,
      userContent,
    });

    if (error.isError) {
      console.log(error);
      dispatch(activateAppError(error));
    } else {
      console.log(post);
      dispatch(addPostToProfileFeed(post));
      navigate("/profile");
    }
  }

  const output = userContent.map((item) => {
    const ReflectionComponent = componentMap[item.component];
    if (!ReflectionComponent) return;

    const component = item.component;
    const props = {
      id: item.id,
      title: item.title,
      ...(component !== "title" && {
        deleteWidget: handleDeleteWidget,
      }),
      ...(component === "image" && { addFileToState }),
    };

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
              <Button type="submit">Save & Publish</Button>
            </div>
          </div>
          {output}
        </form>
      </div>
    </div>
  );
}

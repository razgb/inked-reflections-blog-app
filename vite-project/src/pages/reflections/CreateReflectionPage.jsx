import styles from "./CreateReflectionPage.module.css";
import Button from "../../shared/ui/buttons/Button.jsx";

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import ReflectionsTools from "../../widgets/create-reflection-widgets/ReflectionsTools.jsx";
import ReflectionTitle from "../../widgets/create-reflection-widgets/ReflectionTitle";
import ReflectionParagraph from "../../widgets/create-reflection-widgets/ReflectionParagraph";
import ReflectionBlockQuote from "../../widgets/create-reflection-widgets/ReflectionBlockQuote.jsx";
import ReflectionImage from "../../widgets/create-reflection-widgets/ReflectionImage.jsx";

import validateText from "../../features/reflections/validateText.js";
import {
  activateAppError,
  resetAppError,
} from "../../entities/app-error/app-error-slice.js";
import { checkMaxContentCount } from "../../features/reflections/checkMaxContentCount.js";

const maxContentCount = {
  images: 3,
  paragraphs: 3,
  quotes: 3,
};

export default function CreateReflectionPage() {
  const dispatch = useDispatch();
  const [contentCount, setContentCount] = useState({
    images: 1,
    paragraphs: 1,
    quotes: 0,
  });
  // console.log(contentCount);
  const [userContent, setUserContent] = useState([
    {
      component: "image",
      id: "cover-image",
      title: "Cover image",
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
    const inputId = `${widget}-${timestamp}}`; // unique name for FormData object

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
      ); // allows one more widget add.
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
      // console.log(prev[widgetProperty]);
      return {
        ...prev,
        [widgetProperty]: prev[widgetProperty] + 1,
      };
    });
    setUserContent((prev) => [
      ...prev,
      {
        component: widget,
        id: inputId,
        title: widget,
      },
    ]);
  }

  function handleDeleteWidget(widget, id) {
    const widgetProperty = `${widget}s`;
    setContentCount((prev) => ({
      ...prev,
      [widgetProperty]: --prev[widgetProperty],
    }));
    setUserContent((prev) => prev.filter((widget) => widget.id !== id));
  }

  // Outsource this function and then import it once complete.
  function handleSubmit(event) {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const entries = formdata.entries();
    const data = {
      title: "",
      paragraphs: [],
      quotes: [],
      images: [], // Use file api to validate.
    };
    for (const [key, value] of entries) {
      if (key === "title") data[key] = value;
      else if (key.includes("paragraph")) {
        data.paragraphs.push(value);
      } else if (key.includes("quote")) {
        data.quotes.push(value);
      } else if (key.includes("image")) {
        //
      }
    }
    if (data.title === "" || data.paragraphs[0] === "") return; // set error messages

    console.log(data);
    const textToValidate = [data.title, ...data.paragraphs];
    const textValidated = textToValidate.every((p) => validateText(p));
  }

  const output = userContent.map((item) => {
    const id = item.id;
    switch (item.component) {
      case "title":
        return <ReflectionTitle key={id} id={id} title={item.title} />;
      case "paragraph":
        return (
          <ReflectionParagraph
            key={id}
            id={id}
            title={item.title}
            deleteWidget={handleDeleteWidget}
          />
        );
      case "quote":
        return (
          <ReflectionBlockQuote
            key={id}
            id={id}
            title={item.title}
            deleteWidget={handleDeleteWidget}
          />
        );
      case "image":
        return (
          <ReflectionImage
            key={id}
            id={id}
            title={item.title}
            deleteWidget={handleDeleteWidget}
          />
        );
    }
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
              <Button>Save</Button>
            </div>
          </div>
          {output}
        </form>
      </div>
    </div>
  );
}

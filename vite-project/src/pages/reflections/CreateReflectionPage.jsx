import { useMemo, useState } from "react";
import styles from "./CreateReflectionPage.module.css";
import Button from "../../shared/ui/buttons/Button.jsx";

import ReflectionsTools from "../../widgets/create-reflection-widgets/ReflectionsToolTip";
import ReflectionTitle from "../../widgets/create-reflection-widgets/ReflectionTitle";
import ReflectionParagraph from "../../widgets/create-reflection-widgets/ReflectionParagraph";
import ReflectionBlockQuote from "../../widgets/create-reflection-widgets/ReflectionBlockQuote.jsx";
import ReflectionImage from "../../widgets/create-reflection-widgets/ReflectionImage.jsx";

import validateText from "../../features/reflections/validateText.js";

const maxContentCount = {
  images: 3,
  paragraphs: 10,
  blockQuotes: 10,
};

export default function CreateReflectionPage() {
  const [toolsHidden, setToolsHidden] = useState(true);
  const [contentTracker, setContentTracker] = useState({
    images: 1,
    paragraphs: 1,
    blockQuotes: 0,
  });
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
      title: "Paragraph",
    },
  ]);

  function handleAddWidget(widget = "paragraph") {
    const timestamp = new Date().getTime();
    const inputId = `${widget}-${timestamp}}`; // unique name for FormData obj
    switch (widget) {
      case "paragraph":
        setUserContent((prev) => [
          ...prev,
          {
            component: "paragraph",
            id: inputId,
            title: "Paragraph",
          },
        ]);
        break;
      case "image":
        setUserContent((prev) => [
          ...prev,
          {
            component: "image",
            id: inputId,
            title: "Cover image",
          },
        ]);
        break;
      case "block-quote":
        setUserContent((prev) => [
          ...prev,
          {
            component: "block-quote",
            id: inputId,
            title: "Quote",
          },
        ]);
        break;
    }
  }

  function handleToggleTools() {
    setToolsHidden((prev) => !prev);
  }

  // Outsource this function and then import it once complete.
  function handleSubmit(event) {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const entries = formdata.entries();
    const data = {
      title: "",
      paragraphs: [],
      blockQuotes: [],
      images: [], // Use file api to validate.
    };
    for (const [key, value] of entries) {
      if (key === "title") data[key] = value;
      else if (key.includes("paragraph")) {
        data.paragraphs.push(value);
      } else if (key.includes("block-quote")) {
        data.blockQuotes.push(value);
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
        return <ReflectionParagraph key={id} id={id} title={item.title} />;
      case "block-quote":
        return <ReflectionBlockQuote key={id} id={id} title={item.title} />;
      case "image":
        return <ReflectionImage key={id} id={id} />;
    }
  });

  output.push(
    <ReflectionsTools
      key="reflection-tools"
      addWidget={handleAddWidget}
      toggleTools={handleToggleTools}
      hidden={toolsHidden}
    />
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

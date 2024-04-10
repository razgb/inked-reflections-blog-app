import { useState } from "react";
import { AddIcon } from "../../shared/ui/svg/ReflectionsSvg";
import ReflectionTitle from "../../widgets/create-reflection-widgets/ReflectionTitle";
import styles from "./CreateReflectionPage.module.css";
import ReflectionsToolTip from "../../widgets/create-reflection-widgets/ReflectionsToolTip";
import ReflectionParagraph from "../../widgets/create-reflection-widgets/ReflectionParagraph";
import Button from "../../shared/ui/buttons/Button.jsx";
import validateText from "../../features/reflections/validateText.js";
import ReflectionBlockQuote from "../../widgets/create-reflection-widgets/ReflectionBlockQuote.jsx";

export default function CreateReflectionPage() {
  const [toolsHidden, setToolsHidden] = useState(true);
  const [userContent, setUserContent] = useState([
    {
      component: "title",
      value: "",
      id: "title",
    },
    {
      component: "paragraph",
      value: "",
      id: "paragraph-1",
    },
  ]);

  const [error, setError] = useState({
    titleError: false,
    titleMessage: "",
    paragraphError: false,
    paragraphMessage: "",
    imageError: false,
    imageMessage: "",
  });

  /**
   * Takes widget as a value and creates a unique input name based on unix date.
   * @param {string} widget
   */
  function handleAddWidget(widget = "paragraph") {
    const timestamp = new Date().getTime();
    const inputId = `${widget}-${timestamp}}`; // unique name for FormData obj
    switch (widget) {
      case "paragraph":
        setUserContent((prev) => [
          ...prev,
          {
            component: "paragraph",
            value: "",
            id: inputId,
          },
        ]);
        break;
      case "image":
        break;
      case "block-quote":
        setUserContent((prev) => [
          ...prev,
          {
            component: "block-quote",
            value: "",
            id: inputId,
          },
        ]);
        break;
    }
  }

  function handleToggleTools() {
    setToolsHidden((prev) => !prev);
  }

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
    const paragraphsValidated = textToValidate.every((p) => validateText(p));
  }

  // use Memo can definitely be used here in cases (userContent) doesn't change.
  const output = userContent.map((item) => {
    const id = item.id;
    switch (item.component) {
      case "title":
        return <ReflectionTitle key={id} id={id} />;
      case "paragraph":
        return <ReflectionParagraph key={id} id={id} />;
      case "block-quote":
        return <ReflectionBlockQuote key={id} id={id} />;
    }
  });

  output.push(
    <div className={styles["canvas-actions"]} key={"canvas-actions"}>
      <div
        className={styles["add-button-container"]}
        onClick={handleToggleTools}
      >
        <AddIcon size={20} hidden={toolsHidden} />
      </div>

      <ReflectionsToolTip
        handleAddWidget={handleAddWidget}
        handleClose={handleToggleTools}
        hidden={toolsHidden}
      />
    </div>
  );

  return (
    <div>
      <div className={styles["canvas"]}>
        <form onSubmit={handleSubmit} className={styles["canvas-container"]}>
          <div className={styles["heading-container"]}>
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

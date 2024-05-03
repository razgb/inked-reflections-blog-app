import styles from "../../pages/profile-page/CreateReflectionPage.module.css";
import { validateTextWidget } from "../../features/reflections/validateTextWidget.js";
import { useState } from "react";

export default function ReflectionParagraph({ id, title, deleteWidget }) {
  const [value, setValue] = useState("");
  function onValueChange(event) {
    setValue(event.target.value);
  }
  return (
    <div className={styles["paragraph__container"]}>
      {value && (
        <span className={styles["paragraph__heading"]}>{title || "Title"}</span>
      )}
      <label htmlFor={id}></label>
      <textarea
        placeholder="Paragraph..."
        name={id}
        id={id}
        className={styles["paragraph__input"]}
        value={value}
        onChange={onValueChange}
      />

      {id === "paragraph-1" ? null : (
        <button
          className={styles["delete-widget-button"]}
          type="button"
          onClick={() => deleteWidget(title, id)}
        >
          delete
        </button>
      )}
    </div>
  );
}

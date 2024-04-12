import styles from "../../pages/reflections/CreateReflectionPage.module.css";
import validateText from "../../features/reflections/validateText";
import { useState } from "react";

export default function ReflectionParagraph({ id, title, ...props }) {
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
        {...props}
      />
    </div>
  );
}

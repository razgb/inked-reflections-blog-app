import { useState } from "react";
import styles from "../../pages/profile-page/CreateReflectionPage.module.css";
export default function ReflectionTitle({ title, ...props }) {
  const [value, setValue] = useState("");
  function onValueChange(event) {
    setValue(event.target.value);
  }

  function handleKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  return (
    <div className={styles["title__container"]}>
      {value && (
        <span className={styles["title__heading"]}>{title || "Title"}</span>
      )}

      <label
        className={styles["title__label"]}
        htmlFor="reflection-title"
      ></label>
      <input
        // required
        onKeyDown={handleKeydown}
        placeholder="Title..."
        className={styles["title__input"]}
        id="reflection-title"
        name="title"
        type="text"
        value={value}
        onChange={onValueChange}
        {...props}
      />
    </div>
  );
}

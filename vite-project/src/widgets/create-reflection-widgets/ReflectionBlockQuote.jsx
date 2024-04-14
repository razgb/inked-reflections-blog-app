import { useState } from "react";
import styles from "../../pages/reflections/CreateReflectionPage.module.css";

export default function ReflectionBlockQuote({ id, title, deleteWidget }) {
  const [value, setValue] = useState("");
  function onValueChange(event) {
    setValue(event.target.value);
  }

  function handleEnterKey(event) {
    if (event.key === "Enter") event.preventDefault();
  }

  return (
    <div className={styles["block-quote__container"]}>
      {value && <span className={styles["block-quote__heading"]}>{title}</span>}
      <label className={styles["block-quote__label"]} htmlFor={id}></label>
      <input
        // required
        placeholder="Quote..."
        className={styles["block-quote__input"]}
        id={id}
        name={id}
        type="text"
        onKeyDown={handleEnterKey}
        value={value}
        onChange={onValueChange}
      />

      <button
        className={styles["delete-widget-button"]}
        type="button"
        onClick={() => deleteWidget(title, id)}
      >
        delete
      </button>
    </div>
  );
}

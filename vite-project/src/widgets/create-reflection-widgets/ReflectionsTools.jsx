import { useState } from "react";
import styles from "../../pages/profile-page/CreateReflectionPage.module.css";
import {
  AddIcon,
  ImageIcon,
  QuoteIcon,
  TextIcon,
} from "../../shared/ui/svg/ReflectionsSvg";

export default function ReflectionsTools({ addWidget }) {
  const [toolsHidden, setToolsHidden] = useState(true);

  function handleToggleTools() {
    setToolsHidden((prev) => !prev);
  }

  function handleClick(choice) {
    addWidget(choice);
    setTimeout(() => {
      handleToggleTools();
    }, 100); // smoother compared to instantly disappearing.
  }

  return (
    <div className={styles["canvas-actions"]} key={"canvas-actions"}>
      <div
        className={styles["add-button-container"]}
        onClick={handleToggleTools}
      >
        <AddIcon size={20} hidden={toolsHidden} />
      </div>

      <div
        className={`${styles["tooltip-container"]} ${
          toolsHidden ? styles["hidden"] : undefined
        }`}
      >
        <button
          type="button"
          onClick={() => handleClick("paragraph")}
          className={styles["tooltip-button"]}
        >
          <TextIcon size={20} />
        </button>

        <button
          type="button"
          onClick={() => handleClick("image")}
          className={styles["tooltip-button"]}
        >
          <ImageIcon size={20} />
        </button>

        <button
          type="button"
          onClick={() => handleClick("quote")}
          className={styles["tooltip-button"]}
        >
          <QuoteIcon size={20} />
        </button>
      </div>
    </div>
  );
}

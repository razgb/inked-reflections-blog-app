import { ImageIcon } from "../../shared/ui/svg/ReflectionsSvg";
import styles from "../../pages/reflections/CreateReflectionPage.module.css";

import { useRef } from "react";
import useFileValidator from "../../shared/util/fileValidator";

export default function ReflectionsImage({ id, ...props }) {
  const inputRef = useRef();
  const { fileInput, error, handleFileChange } = useFileValidator();
  function handleInputClick() {
    inputRef.current.click();
  }

  return (
    <div>
      <input
        className={styles["image-input"]}
        id={id}
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
      />
      <div
        className={styles["image-input-container"]}
        onClick={handleInputClick}
      >
        <button className={styles["image-icon-container"]}>
          <ImageIcon className="icon" size={48} />
        </button>

        {error.isError ? (
          <p className={styles["image-error-text"]}>{error.message}</p>
        ) : null}

        {/* <p className={styles["image-error-text"]}>
          {error.message || "This is a error message"}
        </p> */}
      </div>
    </div>
  );
}

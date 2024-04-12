import { ImageIcon } from "../../shared/ui/svg/ReflectionsSvg";
import styles from "../../pages/reflections/CreateReflectionPage.module.css";

import { useRef } from "react";
import useFileValidator from "../../shared/util/fileValidator";

export default function ReflectionsImage({ id, title, ...props }) {
  const inputRef = useRef();
  const { fileInput, error, handleFileChange } = useFileValidator();
  function handleInputClick() {
    inputRef.current.click();
  }

  return (
    <div>
      <label htmlFor={id}></label>
      <input
        className={styles["image-input"]}
        id={id}
        name={id}
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
      />
      <div
        className={styles["image-input__container"]}
        onClick={handleInputClick}
      >
        {fileInput.src ? (
          <img
            src={fileInput.src}
            alt={fileInput.file.fileName}
            className={styles["image"]}
          />
        ) : (
          <div className={styles["image-text__container"]}>
            <button className={styles["image-icon-container"]}>
              <ImageIcon className="icon" size={48} />
            </button>
            {error.isError ? (
              <p
                className={`${styles["image-text"]} ${styles["image-error-text"]}`}
              >
                {error.message}
              </p>
            ) : (
              <p className={styles["image-text"]}>Cover image</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

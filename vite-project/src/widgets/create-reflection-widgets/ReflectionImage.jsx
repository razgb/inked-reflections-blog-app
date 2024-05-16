import { ImageIcon } from "../../shared/ui/svg/ReflectionsSvg";
import styles from "../../pages/profile-page/CreateReflectionPage.module.css";

import { useEffect, useRef } from "react";
import useFileValidator from "../../shared/util/useFileValidator";
import Button from "../../shared/ui/buttons/Button";

export default function ReflectionsImage({
  id,
  title,
  deleteWidget,
  addFileToState,
}) {
  const inputRef = useRef();
  const { fileInput, error, handleFileChange } = useFileValidator({
    maxSizeBytes: 2,
  });

  function handleInputClick() {
    inputRef.current.click();
  }

  useEffect(() => {
    if (fileInput.file) {
      addFileToState(fileInput.file, id);
    }
  }, [fileInput, addFileToState, id]);

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

      <div className={styles["image-input__container"]}>
        {fileInput.file ? (
          <ImageOutput fileInput={fileInput} />
        ) : (
          <NoImageOutput error={error} title={title} />
        )}
      </div>

      <div className={styles["image-input__buttons"]}>
        {id === "cover-image" ? null : (
          <button
            className={styles["delete-widget-button"]}
            type="button"
            onClick={() => deleteWidget(title, id)}
          >
            delete
          </button>
        )}

        <Button onClick={handleInputClick} type="button">
          {fileInput.src ? "Change" : "Add"} image
        </Button>
      </div>
    </div>
  );
}

function ImageOutput({ fileInput }) {
  return (
    <img
      src={fileInput.src}
      alt={fileInput.file.name}
      className={styles["image"]}
    />
  );
}

function NoImageOutput({ error, title }) {
  return (
    <div className={styles["no-image__container"]}>
      <div className={styles["image-icon-container"]}>
        <ImageIcon className="icon" size={48} />
      </div>

      {error.isError ? (
        <p className={`${styles["image-text"]} ${styles["image-error-text"]}`}>
          {error.message}
        </p>
      ) : (
        <p className={styles["image-text"]}>{title}</p>
      )}
    </div>
  );
}

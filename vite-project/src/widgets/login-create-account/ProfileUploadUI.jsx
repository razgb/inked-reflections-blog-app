import styles from "./ProfileUploadUI.module.css";
import Button from "../../shared/ui/buttons/default-button/Button";
import Spinner from "../../shared/ui/spinner/Spinner.jsx";
import defaultProfile from "../../../public/default-profile.jpeg";
import { useRef, useState } from "react";
import { AtSymbolIcon } from "../../shared/ui/svg/LoginSvg.jsx";
import { ProfileIcon } from "../../shared/ui/svg/MenuSvg.jsx";
import { validateFile } from "../../features/user-auth/imageAuth.js";
import { uploadImageToFirebase } from "../../features/user-auth/uploadImageToFirebase.js";
import { useNavigate } from "react-router-dom";

export default function ProfileUploadUI() {
  const navigate = useNavigate();
  const [fileInput, setFileInput] = useState({
    src: null,
    file: null,
  });
  const fileInputRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    uploadError: false,
    uploadMessage: "",
    nameError: false,
    nameMessage: "",
    username: false,
    usernameMessage: "",
  });
  function handleUploadButtonRefClick() {
    fileInputRef.current.click();
  }
  function handleContainerClick(containerName) {
    if (containerName === "name") {
      nameRef.current.focus();
    } else {
      usernameRef.current.focus();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const success = await uploadImageToFirebase(fileInput.file);

    // -> Function to validate both displayName & username.

    if (success) {
      console.log("success");
      // navigate("/posts");
    } else {
      //
    }
    setLoading(false);
  }

  function handleFileChange(event) {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const imageURL = event.target.result;
      const image = new Image();

      image.onload = function () {
        const validator = validateFile(file, image);
        console.log("Validator result: ", validator.valid);

        if (validator.valid === false) {
          setError((prevError) => ({
            ...prevError,
            uploadError: true,
            uploadMessage: validator.message,
          }));
          setLoading(false);
          return;
        }

        setError((prevError) => ({
          ...prevError,
          uploadError: false,
          uploadMessage: "",
        }));

        const cleanFile = new File([file], validator.name, {
          type: file.type,
          lastModified: file.lastModified,
        });

        setFileInput({
          src: imageURL,
          file: cleanFile,
        });
        setLoading(false);
      };

      image.onerror = function () {
        setError((prevError) => ({
          ...prevError,
          uploadError: true,
          uploadMessage:
            "There was an error in setting the image, please try again.",
        }));
        setLoading(false);
      };

      image.src = imageURL;
    };

    reader.readAsDataURL(file);
  }

  return (
    <form onSubmit={handleSubmit} className={styles["userinfo"]}>
      <div className={styles["image-container"]}>
        <img
          src={fileInput.src || defaultProfile}
          alt="Default user profile image."
          className={styles["image"]}
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className={styles["upload-button-container"]}>
        <Button onClick={handleUploadButtonRefClick} type="button">
          Set image
        </Button>
      </div>

      {error.uploadError ? (
        <p className={styles["image-disclaimer-error"]}>
          {error.uploadMessage}
        </p>
      ) : (
        <p className={styles["image-disclaimer"]}>Max image size: 5MB</p>
      )}

      <div className={styles["userinfo__inputs"]}>
        <div className={styles["name__container"]}>
          <label className={styles["name__label"]}>Your name</label>
          <div
            className={styles["name__input-container"]}
            onClick={() => handleContainerClick("name")}
          >
            <ProfileIcon size={20} />
            <input
              type="text"
              className={styles["name__input"]}
              ref={nameRef}
            />
          </div>
        </div>

        <div className={styles["username__container"]}>
          <label className={styles["username__label"]}>Your username</label>
          <div
            className={styles["username__input-container"]}
            onClick={() => handleContainerClick("username")}
          >
            <AtSymbolIcon size={20} />
            <input
              type="text"
              className={styles["username__input"]}
              ref={usernameRef}
            />
          </div>
        </div>
      </div>

      <div className={styles["save-button-container"]}></div>

      {loading ? (
        <Button>
          <Spinner size="small" color="light" />
        </Button>
      ) : (
        <Button>Save and continue</Button>
      )}
    </form>
  );
}

/**
  Notes: 

  - The username check should be done per onchange but after a debounce (2 seconds); 
  - The handleSubmit function should also check username. 
  - DisplayName must be min 3 letters, can include 2 words, lower & uppercase letters only. 
  no numbers. 

 */

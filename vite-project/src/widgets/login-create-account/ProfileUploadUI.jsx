import styles from "./ProfileUploadUI.module.css";
import Button from "../../shared/ui/buttons/default-button/Button";
import Spinner from "../../shared/ui/spinner/Spinner.jsx";
import defaultProfile from "../../../public/default-profile.jpeg";
import { useRef, useState } from "react";
import { AtSymbolIcon } from "../../shared/ui/svg/LoginSvg.jsx";
import { ProfileIcon } from "../../shared/ui/svg/MenuSvg.jsx";
import { validateFile } from "../../features/user-auth/validateFile.js";
import { uploadImageToFirebase } from "../../features/user-auth/uploadImageToFirebase.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validateName } from "../../features/user-auth/validateName.js";
import { validateUsername } from "../../features/user-auth/validateUsername.js";
import { updateDisplayNameAndProfile } from "../../features/user-auth/updateDisplayName.js";
import { addUserToState } from "../../entities/user/user-slice.js";

const initialErrorState = {
  imageError: false,
  imageMessage: "",
  nameError: false,
  nameMessage: "",
  username: false,
  usernameMessage: "",
};

export default function ProfileUploadUI() {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();

  const uid = useSelector((state) => state.user.info.uid);
  const navigate = useNavigate();
  const [fileInput, setFileInput] = useState({
    src: null,
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ ...initialErrorState });
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
            imageError: true,
            imageMessage: validator.message,
          }));
          setLoading(false);
          return;
        }

        setError((prevError) => ({
          ...prevError,
          imageError: false,
          imageMessage: "",
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
          imageError: true,
          imageMessage:
            "There was an error in processing the image, please try again.",
        }));
        setLoading(false);
      };

      image.src = imageURL;
    };

    reader.readAsDataURL(file);
  }

  /**
   * Async function that validates the user's image, name, and username on submission. The name and username inputs are required. The image upload is optional as users aren't required to upload an image if they don't want to.
   *
   * Username upload is not available yet as firestore needs restructuring.
   * @param {event} event Prevents default refresh of page.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    // if (!nameRef.current.value || !usernameRef.current.value) return; // guard
    if (!nameRef.current.value) return; // temp guard
    setLoading(true);

    let imageUploadState = null;
    if (fileInput.file) {
      try {
        imageUploadState = await uploadImageToFirebase(fileInput.file, uid);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          imageError: true,
          imageMessage: imageUploadState.message,
        }));
        setLoading(false);
        console.log("image upload error");
        return;
      }
    }

    const nameValidator = validateName(nameRef.current.value);
    if (!nameValidator.success) {
      setError((prev) => ({
        ...prev,
        nameError: true,
        nameMessage: nameValidator.message,
      }));
      setLoading(false);
      console.log("name error");
      return;
    }

    try {
      await updateDisplayNameAndProfile(
        nameRef.current.value,
        imageUploadState ? imageUploadState.fileName : null
      );
    } catch (error) {
      console.log(
        "Raz temporary error: updating name and profile resulted in error."
      );
    }

    // const usernameValidator = await validateUsername("");
    console.log("Passed everything");
    navigate("/posts");
    dispatch(
      addUserToState({
        displayName: nameRef.current.value,
        photoURL: imageUploadState ? imageUploadState.fileName : null,
      })
    );
    setLoading(false);
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

      {error.imageError ? (
        <p className={styles["image-disclaimer-error"]}>{error.imageMessage}</p>
      ) : (
        <p className={styles["image-disclaimer"]}>Max image size: 2MB</p>
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
              required
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


  git commit -m "Development Version 1.2.1: 
dquote> - Created working handleSubmission function for ProfileUploadUI.jsx
dquote>   -> Huge restructure and cleanup of component. 
dquote>   -> Function is structured so that image can be optional upon uploading.
dquote>   -> Provided jsDocs for the 2 async functions used in the component.
dquote>   -> uploadedImage gets a unique name comprised of uid, timestamp, and sanitized image name.
dquote> - Created highly resusable useImageURL custom hook. 

 */

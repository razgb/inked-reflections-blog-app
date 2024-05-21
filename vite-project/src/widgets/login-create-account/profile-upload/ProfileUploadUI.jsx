import styles from "./ProfileUploadUI.module.css";
import Button from "../../../shared/ui/buttons/Button.jsx";
import Spinner from "../../../shared/ui/spinner/Spinner.jsx";

import { useRef, useState } from "react";
import { AtSymbolIcon } from "../../../shared/ui/svg/LoginSvg.jsx";
import { ProfileIcon } from "../../../shared/ui/svg/MenuSvg.jsx";
import { uploadImageToFirebase } from "../../../features/user-general/uploadImageToFirebase.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validateName } from "../../../features/user-auth/validateName.js";
import { updateDisplayNameAndProfile } from "../../../features/user-auth/updateDisplayName.js";
import { addUserToState } from "../../../entities/user/user-slice.js";
import useFileValidator from "../../../shared/util/useFileValidator.jsx";

const initialErrorState = {
  uploadError: false,
  uploadMessage: "",
  nameError: false,
  nameMessage: "",
  usernameError: false,
  usernameMessage: "",
};

export default function ProfileUploadUI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = useSelector((state) => state.user.info.uid);

  const fileInputRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();

  const { fileInput, error: imageError, handleFileChange } = useFileValidator();
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

    let fileUploadState = null;
    if (fileInput.file) {
      try {
        fileUploadState = await uploadImageToFirebase(
          fileInput.file,
          uid,
          "profile"
        );
      } catch (error) {
        setError((prev) => ({
          ...prev,
          uploadError: true,
          uploadMessage: fileUploadState.message,
        }));
        setLoading(false);

        //
        // PLEASE MAKE THE GLOBAL ERROR COMPONENT READ THIS MESSAGE.
        //

        console.log(
          "There has been an error uploading image to our servers. Please try again."
        );
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
        fileUploadState ? fileUploadState.fileName : null
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
        photoURL: fileUploadState ? fileUploadState.fileName : null,
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

      {imageError.isError ? (
        <p className={styles["image-disclaimer-error"]}>{imageError.message}</p>
      ) : (
        <p className={styles["image-disclaimer"]}>Max image size: 2MB</p>
      )}

      <div className={styles["userinfo__inputs"]}>
        <div className={styles["name__container"]}>
          {error.nameError ? (
            <p className={styles["image-disclaimer"]}>{error.nameMessage}</p>
          ) : (
            <label className={styles["name__label"]}>Your name</label>
          )}

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
          {error.usernameError ? (
            <p className={styles["image-disclaimer"]}>
              {error.usernameMessage}
            </p>
          ) : (
            <label className={styles["username__label"]}>Your username</label>
          )}

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

// function handleFileChange(event) {
//   setLoading(true);
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onload = function (event) {
//     const imageURL = event.target.result;
//     const image = new Image();

//     image.onload = function () {
//       const validator = validateFile(file, image);
//       console.log("Validator result: ", validator.valid);

//       if (validator.valid === false) {
//         setError((prevError) => ({
//           ...prevError,
//           imageError: true,
//           imageMessage: validator.message,
//         }));
//         setLoading(false);
//         return;
//       }

//       setError((prevError) => ({
//         ...prevError,
//         imageError: false,
//         imageMessage: "",
//       }));

//       const cleanFile = new File([file], validator.name, {
//         type: file.type,
//         lastModified: file.lastModified,
//       });

//       setFileInput({
//         src: imageURL,
//         file: cleanFile,
//       });
//       setLoading(false);
//     };

//     image.onerror = function () {
//       setError((prevError) => ({
//         ...prevError,
//         imageError: true,
//         imageMessage:
//           "There was an error in processing the image, please try again.",
//       }));
//       setLoading(false);
//     };

//     image.src = imageURL;
//   };

//   reader.readAsDataURL(file);
// }

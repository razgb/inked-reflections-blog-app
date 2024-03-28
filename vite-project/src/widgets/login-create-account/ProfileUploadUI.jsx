import styles from "./ProfileUploadUI.module.css";
import Button from "../../shared/ui/buttons/default-button/Button";
import Spinner from "../../shared/ui/spinner/Spinner.jsx";
import defaultProfile from "../../../public/default-profile.jpeg";
import { useRef, useState } from "react";
import { AtSymbolIcon } from "../../shared/ui/svg/LoginSvg.jsx";
import { ProfileIcon } from "../../shared/ui/svg/MenuSvg.jsx";
import { validateFile } from "../../features/user-auth/imageAuth.js";

export default function ProfileUploadUI() {
  const fileInputRef = useRef();
  const [fileInput, setFileInput] = useState("");
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

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    // Code to send to firebase after validation...
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

        if (!validator.valid) {
          setError((prevError) => ({
            ...prevError,
            uploadError: true,
            uploadMessage: validator.message,
          }));
        } else {
          setError((prevError) => ({
            ...prevError,
            uploadError: false,
            uploadMessage: "",
          }));
          setFileInput(imageURL);
          // -> update fileInput state here.
        }
      };

      // If image is validated.
      image.src = imageURL;
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className={styles["userinfo"]}>
      <div className={styles["image-container"]}>
        <img
          src={fileInput || defaultProfile}
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
        <Button onClick={handleUploadButtonRefClick}>Upload image</Button>
      </div>

      {error.uploadError ? (
        <p className={styles["image-disclaimer-error"]}>
          {error.uploadMessage}
        </p>
      ) : (
        <p className={styles["image-disclaimer"]}>
          Max image size: 400 x 400 {"(2MB)"}
        </p>
      )}

      <div className={styles["name-username-box"]}>
        <div className={styles["label-input-container"]}>
          <label className={styles["name-label"]}>Your name</label>
          <div className={styles["icon-input-container"]}>
            <ProfileIcon size={20} />
            <input
              required
              type="text"
              placeholder="e.g. Yahya Jawad"
              className={styles["name-input"]}
            />
          </div>
        </div>
        <div className={styles["label-input-container"]}>
          <label className={styles["name-label"]}>Your Username</label>
          <div className={styles["icon-input-container"]}>
            <AtSymbolIcon size={20} />
            <input
              required
              placeholder="e.g. yahyaj123"
              type="text"
              className={styles["name-input"]}
            />
          </div>
        </div>
      </div>

      <div className={styles["save-button-container"]}></div>

      <Button>Save and continue</Button>
      {/* <Button>
        <Spinner size="small" color="light" />
      </Button> */}
    </div>
  );
}

/**
  Notes: 

  - The username check should be done per onchange but after a debounce (2 seconds); 
  - The handleSubmit function should also check username. 
  - DisplayName must be min 3 letters, can include 2 words, lower & uppercase letters only. 
  no numbers. 

 */

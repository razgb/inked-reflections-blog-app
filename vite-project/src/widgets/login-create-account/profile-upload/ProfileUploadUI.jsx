import styles from "./ProfileUploadUI.module.css";
import Button from "../../../shared/ui/buttons/Button.jsx";
import Spinner from "../../../shared/ui/spinner/Spinner.jsx";
import UserInfoInput from "./sub-components/UserInfoInput.jsx";
import ImageContainer from "./sub-components/ImageContainer.jsx";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { uploadProfileDetails } from "./uploadProfileDetails.js";
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
  const fileInputRef = useRef();
  const nameRef = useRef();
  const { uid, loginState } = useSelector((state) => state.user.info);
  const { fileInput, error: imageError, handleFileChange } = useFileValidator();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ ...initialErrorState });

  const handleNameContainerClick = () => nameRef.current.focus();
  const handleUploadButtonRefClick = () => fileInputRef.current.click();

  function handleSubmit(event) {
    event.preventDefault();
    uploadProfileDetails({
      displayName: nameRef.current.value,
      uid,
      file: fileInput.file,
      setLoading,
      setError,
      dispatch,
      navigate,
    });
  }

  useEffect(() => {
    if (loginState === false) {
      navigate("/flow/login");
    }
  });

  return (
    <form onSubmit={handleSubmit} className={styles["userinfo"]}>
      <ImageContainer src={fileInput.src} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className={styles["upload-button-container"]}>
        <Button onClick={handleUploadButtonRefClick} type="button">
          {fileInput.src ? "Change image" : "Set image"}
        </Button>
      </div>

      {imageError.isError ? (
        <p className={styles["image-disclaimer-error"]}>{imageError.message}</p>
      ) : (
        <p className={styles["image-disclaimer"]}>Max image size: 2MB</p>
      )}

      <UserInfoInput
        error={error}
        nameRef={nameRef}
        handleClick={handleNameContainerClick}
      />

      <Button type="submit">
        {loading ? <Spinner size="small" color="light" /> : "Save and continue"}
      </Button>
    </form>
  );
}

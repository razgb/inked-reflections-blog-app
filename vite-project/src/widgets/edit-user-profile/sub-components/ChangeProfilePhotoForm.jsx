import styles from "../EditUserProfile.module.css";
import Button from "../../../shared/ui/buttons/Button";
import LazyLoadedImage from "../../../widgets/lazy-loaded-image/LazyLoadedImage.jsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFileValidator from "../../../shared/util/useFileValidator";
import Spinner from "../../../shared/ui/spinner/Spinner.jsx";

import { handleProfilePhotoChange } from "../util/handleProfilePhotoChange.js";

export default function ChangeProfilePhotoForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { photoURL, displayName, uid } = useSelector(
    (state) => state.user.info
  );

  const { fileInput, handleFileChange } = useFileValidator({
    maxSizeBytes: 2,
  });

  let currentPhotoFolder = "assets";
  let currentPhotoReference = "posts/default-profile.jpeg";

  if (photoURL) {
    currentPhotoFolder = "profile";
    currentPhotoReference = photoURL;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      handleProfilePhotoChange({
        file: fileInput.file,
        uid,
        displayName,
        currentPhotoReference,
        dispatch,
        navigate,
        setLoading,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles["profile-photo-form"]}>
      <div className={styles["profile-photo-wrapper"]}>
        {fileInput.src ? (
          <div className={styles["profile-photo-container"]}>
            <img
              src={fileInput.src}
              alt="Potential profile photo"
              className={styles["profile-photo"]}
            />
          </div>
        ) : (
          <div className={styles["profile-photo-placeholder"]}>
            <LazyLoadedImage
              firebaseFolder={currentPhotoFolder}
              reference={currentPhotoReference}
              spinnerSize="medium"
            />
          </div>
        )}
      </div>

      <label htmlFor="profilePhoto"></label>
      <input
        type="file"
        id="profilePhoto"
        className={styles["profile-photo-input"]}
        onChange={handleFileChange}
      />

      <div>
        <div>
          <div className={styles["button-container"]}>
            <Button type="submit">
              {loading ? (
                <Spinner size="small" contrastPrimaryColor />
              ) : (
                "Update Profile Photo"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

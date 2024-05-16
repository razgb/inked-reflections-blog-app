import styles from "../EditUserProfile.module.css";
import Button from "../../../shared/ui/buttons/Button";
import LazyLoadedImage from "../../../widgets/lazy-loaded-image/LazyLoadedImage.jsx";

import { useEffect } from "react";
import useFileValidator from "../../../shared/util/useFileValidator";
import { useSelector } from "react-redux";

export default function ChangeProfilePhotoForm() {
  const { photoURL } = useSelector((state) => state.user.info);
  const { fileInput, handleFileChange } = useFileValidator({
    maxSizeBytes: 2,
  });

  let currentPhotoFolder = "assets";
  let currentPhotoReference = "posts/default-profile.jpeg";

  if (photoURL) {
    currentPhotoFolder = "profile";
    currentPhotoReference = photoURL;
  }

  useEffect(() => {
    if (fileInput.file) {
      console.log("File input has changed:", fileInput.file);
    }
  }, [fileInput]);

  return (
    <div className={styles["profile-photo-form"]}>
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
            <Button type="submit">Update Profile Photo</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from "../UserPostExpanded.module.css";
import LazyLoadedImage from "../../../lazy-loaded-image/LazyLoadedImage";

export default function AuthorContainer({
  profilePhotoReference,
  displayName,
}) {
  return (
    <div className={styles["author__container"]}>
      {profilePhotoReference && (
        <div className={styles["author__image-container"]}>
          <div className={styles["author__image"]}>
            <LazyLoadedImage
              reference={profilePhotoReference}
              firebaseFolder="profile"
              altText="Reflection post's author profile picture"
              spinnerSize="small"
            />
          </div>
        </div>
      )}
      <div className={styles["author__actions"]}>
        <a href="#" className={styles["author__link"]}>
          {displayName}
        </a>
      </div>
    </div>
  );
}

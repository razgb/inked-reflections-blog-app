import styles from "../UserPostExpanded.module.css";
import LazyLoadedImage from "../../../lazy-loaded-image/LazyLoadedImage";

export default function PostImageContainer({ coverPhotoReference }) {
  return (
    <div className={styles["post-image-container"]}>
      <div className={styles["post-image"]}>
        <LazyLoadedImage
          reference={coverPhotoReference}
          firebaseFolder="posts"
          altText="Reflection cover photo"
          spinnerSize="large"
        />
      </div>
    </div>
  );
}

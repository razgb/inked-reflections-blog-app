import styles from "../ProfileUploadUI.module.css";
import LazyLoadedImage from "../../../lazy-loaded-image/LazyLoadedImage";

export default function ImageContainer({ src }) {
  let imageContent;
  if (src) {
    imageContent = (
      <img
        src={src}
        alt="Default user profile image."
        className={styles["image"]}
      />
    );
  } else {
    imageContent = (
      <LazyLoadedImage
        reference="posts/default-profile.jpeg"
        firebaseFolder="assets"
        altText="Default user profile image."
      />
    );
  }

  return <div className={styles["image-container"]}>{imageContent}</div>;
}

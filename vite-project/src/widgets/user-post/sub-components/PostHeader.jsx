import styles from "../UserPost.module.css";
import { Link } from "react-router-dom";
import LazyLoadedImage from "../../../widgets/lazy-loaded-image/LazyLoadedImage";
import { formatDate } from "../../../shared/util/formatDate";

export default function PostHeader({
  profilePhotoReference,
  displayName,
  createdAt,
}) {
  return (
    <div className={styles["post__header"]}>
      <Link to="123" className={styles["post__profile-photo-wrapper"]}>
        <LazyLoadedImage
          reference={profilePhotoReference}
          alt={`${displayName}'s profile photo.`}
          firebaseFolder="profile"
        />
      </Link>
      <h3 className={styles["post__author-name"]}>
        <Link to="/posts" className={styles["post__author-link"]}>
          {displayName}
        </Link>
      </h3>
      <span className={styles["post__date"]}>{formatDate(createdAt)}</span>
    </div>
  );
}

import styles from "./BookmarkedPost.module.css";
import profileImg from "../../../public/default-profile.jpeg";
import { Link } from "react-router-dom";
import LazyLoadedImage from "../lazy-loaded-image/LazyLoadedImage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeCurrentPost } from "../../entities/current-post/currentPostSlice";

export default function BookmarkedPost({
  displayName,
  profilePhotoReference,
  post,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = post?.postContent[1]?.value;

  function onBookmarkClick() {
    dispatch(
      changeCurrentPost({
        ...post,
      })
    );

    navigate(`/posts/${post.id}`);
  }

  return (
    <article onClick={onBookmarkClick} className={styles["bookmark__article"]}>
      <div className={styles["bookmark__content"]}>
        <div className={styles["bookmark__author-image"]}>
          <LazyLoadedImage
            reference={profilePhotoReference}
            altText="Post author profile pic"
            firebaseFolder="profile"
            spinnerSize="small"
          />
        </div>

        <div className={styles["bookmark__author-details"]}>
          <p className={styles["bookmark__author-text"]}>
            <span className={styles["bookmark__author-name"]}>
              {displayName}
            </span>
          </p>

          <h4 className={styles["bookmark__title"]}>{title}</h4>
        </div>
      </div>
    </article>
  );
}

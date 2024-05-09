import styles from "./BookmarkedPost.module.css";
import profileImg from "../../../public/default-profile.jpeg";
import { Link } from "react-router-dom";

export default function BookmarkedPost({
  displayName,
  profilePhotoReference,
  postContent,
}) {
  function handlePostClick(event) {
    if (event.target.tagName === "A") return;
    window.location.href = `/posts/${123}`; // post id instead of 123
  }

  return (
    <article onClick={handlePostClick} className={styles["saved-post"]}>
      <div className={styles["post__container"]}>
        <div className={styles["author__container"]}>
          <Link to="#" className={styles["author__link"]}>
            <img
              src={profileImg}
              alt="Post author profile pic"
              className={styles["author__img"]}
            />
          </Link>
          <Link to="#" className={styles["author__link"]}>
            <span className={styles["author__name"]}>
              {displayName || "test name"}
            </span>
          </Link>
        </div>

        <h4 className={styles["post__title"]}>
          {postContent || "test post title"}
        </h4>
      </div>
    </article>
  );
}

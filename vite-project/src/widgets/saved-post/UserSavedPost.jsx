import styles from "./UserSavedPost.module.css";
import profileImg from "../../../public/default-profile.jpeg";
import { Link } from "react-router-dom";

export default function UserSavedPost() {
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
            <span className={styles["author__name"]}>Dilan Farman</span>
          </Link>
        </div>

        <h4 className={styles["post__title"]}>Lorem ipsum dolor sit amet</h4>
      </div>
    </article>
  );
}

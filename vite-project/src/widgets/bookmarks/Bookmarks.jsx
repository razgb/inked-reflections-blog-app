import styles from "./Bookmarks.module.css";
import coverImage from "../../../public/bookmarks-cover.jpeg";
import UserPost from "../user-post/UserPost";

export default function Bookmarks() {
  return (
    <div className={styles["bookmarks"]}>
      <div className={styles["bookmarks__container"]}>
        <div className={styles["cover-image-container"]}>
          <img
            src={coverImage}
            alt="Bookmark cover image"
            className={styles["cover-image"]}
          />
        </div>

        <h1 className={styles["bookmarks__heading"]}>Your Bookmarks</h1>

        <div className={styles["bookmarks__posts"]}>
          <UserPost />
          <UserPost />
          <UserPost />
        </div>
      </div>
    </div>
  );
}

import BookmarkedPost from "./BookmarkedPost.jsx";
import styles from "./RecentBookmarksContainer.module.css";

export default function RecentBookmarksContainer() {
  return (
    <div className={styles["saved-posts-container"]}>
      <h3 className={styles["saved-posts-heading"]}>Recent bookmarks</h3>

      <ul className={styles["saved-posts-list"]}>
        {/* Should be max 3 */}
        <BookmarkedPost />
        <BookmarkedPost />
        <BookmarkedPost />
      </ul>
    </div>
  );
}

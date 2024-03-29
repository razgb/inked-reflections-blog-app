import UserSavedPost from "./UserSavedPost";
import styles from "./RecentlySavedPosts.module.css";

export default function RecentlySavedPosts() {
  return (
    <div className={styles["saved-posts-container"]}>
      <h3 className={styles["saved-posts-heading"]}>
        Recently saved reflections
      </h3>
      <ul className={styles["saved-posts-list"]}>
        {/* Should be max 3 */}
        <UserSavedPost />
        <UserSavedPost />
        <UserSavedPost />
      </ul>
    </div>
  );
}

/**
 * Notes:
 *
 * Read bookmarks from the user's data.
 * If none then make the component's display none.
 * if there is, simple map function will do (max 3).
 */

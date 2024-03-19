import styles from "./Bookmarks.module.css";
import DummyUserPost from "../user-post/DummyUserPost";
import SearchInput from "../../shared/ui/search-input/SearchInput";
import Select from "../../shared/ui/select-element/Select";

export default function Bookmarks() {
  return (
    <div className={styles["bookmarks"]}>
      <div className={styles["bookmarks__container"]}>
        <div className={styles["bookmarks__actions"]}>
          <h2 className={styles["bookmarks__heading"]}>Your Bookmarks</h2>
          <Select />
        </div>

        <SearchInput placeholder="Search your bookmarks" />

        <div className={styles["bookmarks__posts"]}>
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
        </div>
      </div>
    </div>
  );
}

/*
<div className={styles["cover-image-container"]}>
  <img
    src={coverImage}
    alt="Bookmark cover image"
    className={styles["cover-image"]}
  />
</div>
*/

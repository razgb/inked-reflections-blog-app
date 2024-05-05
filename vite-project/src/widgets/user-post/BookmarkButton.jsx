import styles from "./UserPost.module.css";
import { BookmarksIcon } from "../../shared/ui/svg/PostSvg";
import { BookmarksSolidIcon } from "../../shared/ui/svg/PostSvg";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function BookmarkButton({ postId, isBookmarked }) {
  const dispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState(false);

  function handleBookmarkClick() {
    setBookmarked((prev) => !prev);
    // 2. Turn on application wide modal saying "Are you sure you want to delete?"
    // 3. Send post id to firestore bookmarks collection.
  }

  return (
    <button onClick={handleBookmarkClick} className={styles["bookmark-button"]}>
      <span className={styles["bookmark-icon-container"]}>
        {bookmarked ? (
          <BookmarksSolidIcon size={18} />
        ) : (
          <BookmarksIcon size={18} />
        )}
      </span>
    </button>
  );
}

import styles from "../UserPost.module.css";
import { BookmarksIcon } from "../../../shared/ui/svg/PostSvg";
import { BookmarksSolidIcon } from "../../../shared/ui/svg/PostSvg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleBookmarkClick } from "./util-functions/handleBookmarkClick";

/**
 * A button to bookmark a post that dynamically reflects on the client state.
 * If a user is on expanded post page, it'll also reflect there.
 *
 * @param {object} post - The post to bookmark
 * @param {number} size - The size of the bookmark icon
 * @returns {JSX.Element} - The bookmark button
 */
export default function BookmarkButton({ post, size = 18 }) {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.info.uid);
  const currentPostId = useSelector((state) => state.currentPost.id);

  const { id: postId, isBookmarked } = post;
  const userViewingExpandedPost = currentPostId === postId;

  const handleClick = () => {
    dispatch(
      handleBookmarkClick({
        uid,
        post,
        userViewingExpandedPost,
      })
    );
  };

  return (
    <button onClick={handleClick} className={styles["bookmark-button"]}>
      <span className={styles["bookmark-icon-container"]}>
        {isBookmarked ? (
          <BookmarksSolidIcon size={size} />
        ) : (
          <BookmarksIcon size={size} />
        )}
      </span>
    </button>
  );
}

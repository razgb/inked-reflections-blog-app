import styles from "../UserPost.module.css";
import BookmarkButton from "../action-components/BookmarkButton";
import DeletePostButton from "../action-components/DeletePostButton";

// minutes to read will be part of the post soon so we'll ignore for now.
export default function PostFooter({ post }) {
  const { isProfilePost, readingTime } = post;
  const minutesToRead = `${readingTime}-min read`;

  return (
    <div className={styles["post__footer"]}>
      <span className={styles["post__reading-time"]}>{minutesToRead}</span>

      <BookmarkButton post={post} />

      {isProfilePost && <DeletePostButton post={post} />}
    </div>
  );
}

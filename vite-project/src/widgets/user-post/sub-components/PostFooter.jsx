import styles from "../UserPost.module.css";
import BookmarkButton from "../action-components/BookmarkButton";
import DeletePostButton from "../action-components/DeletePostButton";

export default function PostFooter({
  minutesToRead,
  id,
  isBookmarked,
  postArrayName,
  isProfilePost,
  postUid,
}) {
  return (
    <div className={styles["post__footer"]}>
      <span className={styles["post__reading-time"]}>{minutesToRead}</span>
      <BookmarkButton
        postId={id}
        isBookmarked={isBookmarked}
        postArrayName={postArrayName}
      />
      {isProfilePost && <DeletePostButton postId={id} postUid={postUid} />}
    </div>
  );
}

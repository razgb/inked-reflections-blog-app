import styles from "../UserPost.module.css";
import BookmarkButton from "../action-components/BookmarkButton";
import DeletePostButton from "../action-components/DeletePostButton";

export default function PostFooter({
  id,
  postUid,
  parentArrayName,
  minutesToRead,
  isBookmarked,
  isProfilePost,
}) {
  return (
    <div className={styles["post__footer"]}>
      <span className={styles["post__reading-time"]}>{minutesToRead}</span>
      <BookmarkButton
        postId={id}
        isBookmarked={isBookmarked}
        parentArrayName={parentArrayName}
      />
      {isProfilePost && <DeletePostButton postId={id} postUid={postUid} />}
    </div>
  );
}

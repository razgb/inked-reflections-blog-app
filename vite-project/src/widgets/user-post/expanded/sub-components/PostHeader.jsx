import styles from "../UserPostExpanded.module.css";
import BookmarkButton from "../../action-components/BookmarkButton";
import DeletePostButton from "../../action-components/DeletePostButton";

export default function PostHeader({
  title,
  id,
  isBookmarked,
  parentArrayName,
  isProfilePost,
  uid,
}) {
  return (
    <div className={styles["post__header"]}>
      <h1 className={styles["post__title"]}>{title}</h1>
      <div className={styles["post__actions"]}>
        <BookmarkButton
          postId={id}
          isBookmarked={isBookmarked}
          parentArrayName={parentArrayName}
          size={22}
        />
        {isProfilePost && (
          <DeletePostButton postId={id} postUid={uid} size={22} />
        )}
      </div>
    </div>
  );
}

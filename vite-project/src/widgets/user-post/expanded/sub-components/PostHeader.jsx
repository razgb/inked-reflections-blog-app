import styles from "../UserPostExpanded.module.css";
import BookmarkButton from "../../action-components/BookmarkButton";
import DeletePostButton from "../../action-components/DeletePostButton";

export default function PostHeader({ post, title }) {
  const { isProfilePost } = post;
  console.log(isProfilePost);

  return (
    <div className={styles["post__header"]}>
      <h1 className={styles["post__title"]}>{title}</h1>

      <div className={styles["post__actions"]}>
        <BookmarkButton post={post} size={22} />

        {isProfilePost && <DeletePostButton post={post} size={22} />}
      </div>
    </div>
  );
}

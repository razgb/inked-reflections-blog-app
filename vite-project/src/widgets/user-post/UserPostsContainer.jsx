import styles from "./UserPostsContainer.module.css";
import UserPost from "./UserPost";

export default function UserPostContainer() {
  // jsx code to get all the posts - from the feature folder
  // up to change

  return (
    <div className={styles["user-posts-container"]}>
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
    </div>
  );
}

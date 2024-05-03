import styles from "./UserPostsContainer.module.css";
import { useSelector } from "react-redux";
import { updatePostsFeed } from "../../entities/posts/posts-slice";
import { fetchPosts } from "../../features/user-posts/fetchPosts";
import { ErrorTriangleIcon } from "../../shared/ui/svg/PostSvg.jsx";
import InfiniteScrollContainer from "../../shared/ui/infinite-scroll-container/InfiniteScrollContainer.jsx";

export default function UserPostContainer() {
  const { postsFeed } = useSelector((state) => state.posts);

  return (
    <div className={styles["user-posts-container"]}>
      <InfiniteScrollContainer
        content={postsFeed}
        fn={fetchPosts}
        dispatchFn={updatePostsFeed}
      />
    </div>
  );
}

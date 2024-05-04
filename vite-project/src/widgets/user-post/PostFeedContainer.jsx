import styles from "./PostFeedContainer.module.css";
import { useSelector } from "react-redux";
import { updatePostsFeed } from "../../entities/posts/posts-slice.js";
import { fetchPosts } from "../../features/user-posts/fetchPosts.js";
// import { ErrorTriangleIcon } from "../../shared/ui/svg/PostSvg.jsx";
import InfiniteScrollContainer from "../../shared/ui/infinite-scroll-container/InfiniteScrollContainer.jsx";

export default function PostFeedContainer() {
  const { postFeed } = useSelector((state) => state.posts);

  return (
    <div className={styles["user-posts-container"]}>
      <InfiniteScrollContainer
        content={postFeed}
        fn={fetchPosts}
        dispatchFn={updatePostsFeed}
        observerName={"feed"}
      />
    </div>
  );
}

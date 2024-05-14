import styles from "./MainFeedContainer.module.css";
import { useSelector } from "react-redux";
import { fetchMainFeedPosts } from "../../features/user-posts/fetchMainFeedPosts.js";
// import { ErrorTriangleIcon } from "../../shared/ui/svg/PostSvg.jsx";
import InfiniteScrollContainer from "../../shared/ui/infinite-scroll-container/InfiniteScrollContainer.jsx";

export default function MainFeedContainer() {
  const { posts } = useSelector((state) => state.mainFeed);

  return (
    <div className={styles["user-posts-container"]}>
      <InfiniteScrollContainer
        content={posts}
        fn={fetchMainFeedPosts}
        parentArrayName={"mainFeed"}
      />
    </div>
  );
}

import styles from "./BookmarkFeedContainer.module.css";
import InfiniteScrollContainer from "../../shared/ui/infinite-scroll-container/InfiniteScrollContainer";

import { useSelector } from "react-redux";
import { fetchBookmarkFeedPosts } from "../../features/bookmarks/fetchBookmarkFeedPosts";

export default function BookmarkFeedContainer() {
  const { posts } = useSelector((state) => state.bookmarkFeed);

  return (
    <div className={styles["bookmarks"]}>
      <div className={styles["bookmarks__container"]}>
        <div className={styles["bookmarks__actions"]}>
          <h2 className={styles["bookmarks__heading"]}>Your Bookmarks</h2>
        </div>

        <div className={styles["bookmarks__posts"]}>
          <InfiniteScrollContainer
            content={posts}
            fn={fetchBookmarkFeedPosts}
            parentArrayName={"bookmarkFeed"}
          />
        </div>
      </div>
    </div>
  );
}

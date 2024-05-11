import styles from "./BookmarkFeedContainer.module.css";
import SearchInput from "../../shared/ui/search-input/SearchInput";
import Select from "../../shared/ui/select-element/Select";
import InfiniteScrollContainer from "../../shared/ui/infinite-scroll-container/InfiniteScrollContainer";

import { useSelector } from "react-redux";
import { fetchBookmarkPosts } from "../../features/bookmarks/fetchBookmarkPosts";

export default function BookmarkFeedContainer() {
  const { posts } = useSelector((state) => state.bookmarkFeed);

  return (
    <div className={styles["bookmarks"]}>
      <div className={styles["bookmarks__container"]}>
        <div className={styles["bookmarks__actions"]}>
          <h2 className={styles["bookmarks__heading"]}>Your Bookmarks</h2>
          <Select />
        </div>

        <SearchInput placeholder="Search your bookmarks" />

        <div className={styles["bookmarks__posts"]}>
          <InfiniteScrollContainer
            content={posts}
            fn={fetchBookmarkPosts}
            parentArrayName={"bookmarkFeed"}
          />
        </div>
      </div>
    </div>
  );
}

import styles from "./Bookmarks.module.css";
import SearchInput from "../../shared/ui/search-input/SearchInput";
import Select from "../../shared/ui/select-element/Select";
import InfiniteScrollContainer from "../../shared/ui/infinite-scroll-container/InfiniteScrollContainer";

import { useSelector } from "react-redux";
import { updateBookmarkPosts } from "../../entities/posts/posts-slice";
import { fetchBookmarkPosts } from "../../features/bookmarks/fetchBookmarkPosts";

export default function Bookmarks() {
  const bookmarkPosts = useSelector((state) => state.posts.bookmarkPosts);

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
            content={bookmarkPosts}
            fn={fetchBookmarkPosts}
            dispatchFn={updateBookmarkPosts}
            batchLimit={10}
            observerName="bookmark"
            postArrayName={"bookmarkPosts"}
            isProfilePost={false}
          />
        </div>
      </div>
    </div>
  );
}

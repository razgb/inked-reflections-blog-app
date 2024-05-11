import styles from "./RecentBookmarksContainer.module.css";
import BookmarkedPost from "./BookmarkedPost.jsx";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { activateAppError } from "../../entities/app-error/app-error-slice.js";

import { fetchBookmarkPosts } from "../../features/bookmarks/fetchBookmarkPosts.js";
import { updateBookmarkFeed } from "../../entities/posts/bookmarkFeedSlice.js";
import Spinner from "../../shared/ui/spinner/Spinner.jsx";

export default function RecentBookmarksContainer() {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.info.uid);
  const { userHasBookmarks, posts } = useSelector(
    (state) => state.bookmarkFeed
  );

  const [loading, setLoading] = useState(false);

  const recentThreeBookmarks = posts.slice(-3); // returns empty if none.
  // console.log(recentThreeBookmarks);

  useEffect(() => {
    if (!uid || posts.length || userHasBookmarks === false) return;
    setLoading(true);

    const fetchBookmarkedPosts = async () => {
      try {
        const bookmarkedPosts = await fetchBookmarkPosts(uid);
        dispatch(updateBookmarkFeed(bookmarkedPosts));
      } catch (error) {
        dispatch(activateAppError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedPosts();
  }, [dispatch, uid, posts.length, userHasBookmarks]);

  let content;

  if (loading)
    content = (
      <div className={styles["spinner-container"]}>
        <Spinner size="small" />
      </div>
    );
  else if (userHasBookmarks === false)
    content = (
      <p className={styles["no-bookmarks-text"]}>
        You have no bookmarks, bookmark a post to see it here.
      </p>
    );
  else if (userHasBookmarks === true)
    content = recentThreeBookmarks.map((userPost) => (
      <BookmarkedPost
        key={userPost.id}
        displayName={userPost.displayName}
        profilePhotoReference={userPost.profilePhotoReference}
        post={userPost}
      />
    ));

  return (
    <div className={styles["recent-bookmarks__container"]}>
      <h3 className={styles["recent-bookmarks__heading"]}>Recent bookmarks</h3>
      <ul className={styles["recent-bookmarks__list"]}>{content}</ul>
    </div>
  );
}

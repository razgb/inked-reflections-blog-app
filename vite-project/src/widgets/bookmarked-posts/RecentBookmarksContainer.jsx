import { useDispatch, useSelector } from "react-redux";
import BookmarkedPost from "./BookmarkedPost.jsx";
import styles from "./RecentBookmarksContainer.module.css";
import { useEffect, useState } from "react";
import { fetchBookmarkedPosts } from "../../features/bookmarks/fetchBookmarkedPosts.js";
import { activateAppError } from "../../entities/app-error/app-error-slice.js";

export default function RecentBookmarksContainer() {
  const dispatch = useDispatch();
  const { ids: bookmarkIds, posts: recentThreeBookmarks } = useSelector(
    (state) => state.posts.bookmarks
  );

  const recentThreeBookmarkIds = bookmarkIds.slice(-3); // returns empty if none.

  // const bookmarkContents = recentThreeBookmarks.map((bookmarkPost) => {
  //   const { id, displayName, postContent } = bookmarkPost;

  //   return (
  //     <BookmarkedPost
  //       key={id}
  //       displayName={displayName}
  //       postContent={postContent}
  //     />
  //   );
  // });

  useEffect(() => {
    if (recentThreeBookmarkIds.length) {
      return; // means recent bookmarks exist in redux.
    }

    const getBookmarkContetnt = async () => {
      // try {
      //   const bookmarkContents = await fetchBookmarkedPosts(
      //     recentThreeBookmarkIds
      //   );
      //   console.log(bookmarkContents);
      // } catch (error) {
      //   console.error(error);
      //   dispatch(
      //     activateAppError({
      //       title: "Failed to fetch your recent bookmarks",
      //       message: "Please check your internet connection and try again.",
      //     })
      //   );
      // }
    };
    // getBookmarkContetnt();
  }, [recentThreeBookmarkIds, dispatch]);

  return (
    <div className={styles["saved-posts-container"]}>
      <h3 className={styles["saved-posts-heading"]}>Recent bookmarks</h3>

      <ul className={styles["saved-posts-list"]}>
        {/* Should be max 3 */}
        <BookmarkedPost />
        <BookmarkedPost />
        <BookmarkedPost />
      </ul>
    </div>
  );
}

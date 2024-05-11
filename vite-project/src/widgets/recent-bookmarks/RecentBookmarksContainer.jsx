import { useDispatch, useSelector } from "react-redux";
import BookmarkedPost from "./BookmarkedPost.jsx";
import styles from "./RecentBookmarksContainer.module.css";
import { useEffect, useState } from "react";
import { fetchBookmarkIdsForUser } from "../../features/bookmarks/fetchBookmarkIdsForUser.js";
import { activateAppError } from "../../entities/app-error/app-error-slice.js";

export default function RecentBookmarksContainer() {
  // const dispatch = useDispatch();
  // const bookmarkPostsEmpty = useSelector(
  //   (state) => state.posts.bookmarkPostsEmpty
  // );

  // const bookmarkPosts = useSelector((state) => state.postFeed.bookmarkPosts);
  // const recentThreeBookmarks = bookmarkPosts.slice(-3); // returns empty if none.

  return (
    <div className={styles["saved-posts-container"]}>
      <h3 className={styles["saved-posts-heading"]}>Recent bookmarks</h3>

      <ul className={styles["saved-posts-list"]}></ul>
    </div>
  );
}

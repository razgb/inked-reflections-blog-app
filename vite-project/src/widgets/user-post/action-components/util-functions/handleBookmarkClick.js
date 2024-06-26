import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBookmarkToUsersCollection } from "../../../../features/bookmarks/addBookmarkToUsersCollection";
import { removeBookmarkFromUsersCollection } from "../../../../features/bookmarks/removeBookmarkFromUsersCollection";
import { toggleCurrentBookmark } from "../../../../entities/current-post/currentPostSlice";
import { requestWithRetry } from "../../../../shared/util/requestWithRetry";
import { activateAppError } from "../../../../entities/app-error/app-error-slice";
import {
  removePostFromBookmarkFeed,
  addPostToBookmarkFeed,
} from "../../../../entities/posts/bookmarkFeedSlice";
import { toggleBookmarkInProfileFeed } from "../../../../entities/posts/profileFeedSlice";
import { toggleBookmarkInMainFeed } from "../../../../entities/posts/mainFeedSlice";

/**
 * Thunk function to handle bookmark click asynchronously.
 * Also reflects the app state with optimistic updates.
 * @param {Object} payload - The payload containing uid, post, and userViewingExpandedPost
 * @param {Object} thunkAPI - The Redux Toolkit's `thunkAPI` object
 */
export const handleBookmarkClick = createAsyncThunk(
  "bookmarks/handleBookmarkClick",
  async ({ uid, post, userViewingExpandedPost }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { id: postId, isBookmarked, parentArrayName } = post;

    let promise;
    if (isBookmarked) {
      promise = removeBookmarkFromUsersCollection(uid, postId);
    } else {
      promise = addBookmarkToUsersCollection(uid, postId);
    }

    const actionMap = {
      currentPost: {
        update: userViewingExpandedPost
          ? () => dispatch(toggleCurrentBookmark(!isBookmarked))
          : null,
        reverse: userViewingExpandedPost
          ? () => dispatch(toggleCurrentBookmark(isBookmarked))
          : null,
      },
      mainFeed: {
        update: () =>
          parentArrayName
            ? dispatch(
                toggleBookmarkInMainFeed({
                  postId,
                  toggleState: !isBookmarked,
                })
              )
            : null,
        reverse: () =>
          parentArrayName
            ? dispatch(
                toggleBookmarkInMainFeed({
                  postId,
                  toggleState: isBookmarked,
                })
              )
            : null,
      },
      profileFeed: {
        update: () =>
          parentArrayName
            ? dispatch(
                toggleBookmarkInProfileFeed({
                  postId,
                  toggleState: !isBookmarked,
                })
              )
            : null,
        reverse: () =>
          parentArrayName
            ? dispatch(
                toggleBookmarkInProfileFeed({
                  postId,
                  toggleState: isBookmarked,
                })
              )
            : null,
      },
      bookmarkFeed: {
        update: () => {
          if (isBookmarked) {
            dispatch(removePostFromBookmarkFeed(postId));
          } else {
            dispatch(addPostToBookmarkFeed(post));
          }
        },
        reverse: () => {
          if (isBookmarked) {
            dispatch(addPostToBookmarkFeed(post));
          } else {
            dispatch(removePostFromBookmarkFeed(postId));
          }
        },
      },
    };

    try {
      actionMap.currentPost.update?.();
      actionMap.mainFeed.update?.();
      actionMap.profileFeed.update?.();
      actionMap.bookmarkFeed.update?.();

      await requestWithRetry(promise);
    } catch (error) {
      console.log(error);
      actionMap.currentPost.reverse?.();
      actionMap.mainFeed.reverse?.();
      actionMap.profileFeed.reverse?.();
      actionMap.bookmarkFeed.reverse?.();

      const errorDetails = JSON.parse(error.message);
      const { title, message } = errorDetails;
      dispatch(activateAppError({ title, message }));
    }
  }
);

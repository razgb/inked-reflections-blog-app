import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteReflectionFromFirestore } from "../../../features/reflections/deleteReflectionFromFirestore.js";

import { removePostFromMainFeed } from "../mainFeedSlice";
import { removePostFromProfileFeed } from "../profileFeedSlice";
import { removePostFromBookmarkFeed } from "../bookmarkFeedSlice";

/**
 * Remove a post from all feeds by dispatching actions to update each feed's state.
 * @param {object} args - Arguments object containing postId, uid, postUid
 * @returns {function} - A thunk function that takes a dispatch and getState function from Redux.
 */
export const removePostFromAllFeedsAction = createAsyncThunk(
  "posts/removePostFromAllFeeds",
  async ({ postId, uid, postUid }, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const { mainFeed, bookmarkFeed, profileFeed } = getState();

    try {
      await deleteReflectionFromFirestore({ uid, postId, postUid });

      if (mainFeed.posts.some((post) => post.id === postId)) {
        dispatch(removePostFromMainFeed(postId));
      }

      if (profileFeed.posts.some((post) => post.id === postId)) {
        dispatch(removePostFromProfileFeed(postId));
      }

      if (bookmarkFeed.posts.some((post) => post.id === postId)) {
        dispatch(removePostFromBookmarkFeed(postId));
      }
    } catch (error) {
      console.error("Error deleting post from Firestore:", error);
    }
  }
);

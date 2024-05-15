import { createAsyncThunk } from "@reduxjs/toolkit";
import { activateAppError } from "../../../entities/app-error/app-error-slice";
import { updateMainFeed } from "../../../entities/posts/mainFeedSlice";
import { updateProfileFeed } from "../../../entities/posts/profileFeedSlice";
import { updateBookmarkFeed } from "../../../entities/posts/bookmarkFeedSlice";

const dispatchFunctionMap = {
  mainFeed: updateMainFeed,
  profileFeed: updateProfileFeed,
  bookmarkFeed: updateBookmarkFeed,
};

export const fetchContentUtil = createAsyncThunk(
  "content/fetchContentUtil",
  async ({ fn, uid, parentArrayName }, { dispatch }) => {
    try {
      const newContentArray = await fn(uid);

      const dispatchFn = dispatchFunctionMap[parentArrayName];

      dispatch(dispatchFn(newContentArray));
    } catch (error) {
      console.log(error);
      return dispatch(
        activateAppError({
          title: "Error loading posts",
          message: "Check your internet connection and try again.",
        })
      );
    }
  }
);

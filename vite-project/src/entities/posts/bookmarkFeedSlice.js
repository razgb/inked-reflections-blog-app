import { createSlice } from "@reduxjs/toolkit";

const bookmarkFeedSlice = createSlice({
  name: "bookmarkFeed",
  initialState: {
    postBatchLimit: 5,
    posts: [],
    userHasBookmarks: null,
    intersectionObserverState: true,
  },
  reducers: {
    updateBookmarkObserver(state, action) {
      const { bool } = action.payload;
      state.intersectionObserverState = bool;
    },
    updateBookmarkFeed(state, action) {
      if (!state.posts.length && !action.payload.length) {
        state.userHasBookmarks = false;
      } else {
        state.userHasBookmarks = true;
      }
      state.posts.push(...action.payload);
    },
    addPostToBookmarkFeed(state, action) {
      const post = {
        ...action.payload,
        isBookmarked: true,
      };
      state.posts.push(post);
    },
    removePostFromBookmarkFeed(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
  },
});

export default bookmarkFeedSlice.reducer;
export const {
  updateBookmarkFeed,
  addPostToBookmarkFeed,
  removePostFromBookmarkFeed,
  updateBookmarkObserver,
} = bookmarkFeedSlice.actions;

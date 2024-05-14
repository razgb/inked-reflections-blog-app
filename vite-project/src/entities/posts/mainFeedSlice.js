import { createSlice } from "@reduxjs/toolkit";

const mainFeedSlice = createSlice({
  name: "mainFeed",
  initialState: {
    posts: [],
    postBatchLimit: 10,
    intersectionObserverState: true,
  },
  reducers: {
    updateMainFeed(state, action) {
      state.posts.push(...action.payload);
    },
    removePostFromMainFeed(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    updateFeedObserver(state, action) {
      const { bool } = action.payload;
      state.intersectionObserverState = bool;
    },
    toggleBookmarkInMainFeed(state, action) {
      const { postId, toggleState } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) post.isBookmarked = toggleState;
    },
  },
});

export default mainFeedSlice.reducer;
export const {
  updateMainFeed,
  updateFeedObserver,
  toggleBookmarkInMainFeed,
  removePostFromMainFeed,
} = mainFeedSlice.actions;

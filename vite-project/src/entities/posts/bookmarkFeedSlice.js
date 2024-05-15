import { createSlice } from "@reduxjs/toolkit";

const bookmarkFeedSlice = createSlice({
  name: "bookmarkFeed",
  initialState: {
    postBatchLimit: 5,
    posts: [],
    userHasPosts: null,
    completedFeed: null,
    intersectionObserverState: true,
  },
  reducers: {
    updateBookmarkObserver(state, action) {
      const { bool } = action.payload;
      state.intersectionObserverState = bool;
    },
    updateBookmarkFeed(state, action) {
      if (!state.posts.length && !action.payload.length) {
        state.userHasPosts = false;
        state.completedFeed = true;
        state.intersectionObserverState = false;
      } else if (action.payload.length < state.postBatchLimit) {
        state.completedFeed = true;
        state.userHasPosts = true;
        state.intersectionObserverState = false;
      } else {
        state.userHasPosts = true;
        state.completedFeed = false;
      }

      const existingPostIds = new Set(state.posts.map((post) => post.id));
      const newPosts = action.payload.filter(
        (newPost) => !existingPostIds.has(newPost.id)
      );

      state.posts.push(...newPosts);
    },
    addPostToBookmarkFeed(state, action) {
      const post = {
        ...action.payload,
        isBookmarked: true,
      };
      state.posts.push(post);

      if (!state.userHasPosts) {
        state.userHasPosts = true;
      }
    },
    removePostFromBookmarkFeed(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);

      if (!state.posts.length) {
        state.userHasPosts = false;
      }
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

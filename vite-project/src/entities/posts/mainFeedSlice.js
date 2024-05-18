import { createSlice } from "@reduxjs/toolkit";

const mainFeedSlice = createSlice({
  name: "mainFeed",
  initialState: {
    posts: [],
    postBatchLimit: 10,
    completedFeed: null,
    intersectionObserverState: true,
  },
  reducers: {
    updateMainFeed(state, action) {
      if (!state.posts.length && !action.payload.length) {
        state.completedFeed = true;
        state.intersectionObserverState = false;
      } else if (action.payload.length < state.postBatchLimit) {
        state.completedFeed = true;
        state.intersectionObserverState = false;
      } else {
        state.completedFeed = false;
      }

      const existingPostIds = new Set(state.posts.map((post) => post.id));
      const newPosts = action.payload.filter(
        (newPost) => !existingPostIds.has(newPost.id)
      );

      state.posts.push(...newPosts);
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
    addNewUserValueToMainFeed(state, action) {
      const { uid, ...userValues } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.uid === uid) {
          return {
            ...post,
            ...userValues,
          };
        } else return post;
      });
    },
  },
});

export default mainFeedSlice.reducer;
export const {
  updateMainFeed,
  updateFeedObserver,
  toggleBookmarkInMainFeed,
  removePostFromMainFeed,
  addNewUserValueToMainFeed,
} = mainFeedSlice.actions;

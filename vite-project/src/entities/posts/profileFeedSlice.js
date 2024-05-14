import { createSlice } from "@reduxjs/toolkit";

const profileFeedSlice = createSlice({
  name: "profileFeed",
  initialState: {
    postBatchLimit: 5,
    posts: [],
    postsEmpty: null,
    intersectionObserverState: true,
  },
  reducers: {
    updateProfileObserver(state, action) {
      const { bool } = action.payload;
      state.intersectionObserverState = bool;
    },
    updateProfileFeed(state, action) {
      if (!state.posts.length && !action.payload.length) {
        state.postsEmpty = true;
      } else {
        state.postsEmpty = false;
      }
      state.posts.push(...action.payload);
    },
    toggleBookmarkInProfileFeed(state, action) {
      const { postId, toggleState } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) post.isBookmarked = toggleState;
    },
    addPostToProfileFeed(state, action) {
      const post = action.payload;
      state.posts.unshift(post);
    },
    removePostFromProfileFeed(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
  },
});

export default profileFeedSlice.reducer;
export const {
  updateProfileObserver,
  updateProfileFeed,
  toggleBookmarkInProfileFeed,
  addPostToProfileFeed,
  removePostFromProfileFeed,
} = profileFeedSlice.actions;

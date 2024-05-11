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
  },
});

export default profileFeedSlice.reducer;
export const {
  updateProfileObserver,
  updateProfileFeed,
  toggleBookmarkInProfileFeed,
} = profileFeedSlice.actions;

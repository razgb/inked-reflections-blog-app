import { createSlice } from "@reduxjs/toolkit";

const profileFeedSlice = createSlice({
  name: "profileFeed",
  initialState: {
    postBatchLimit: 5,
    posts: [],
    userHasPosts: null,
    completedFeed: null,
    intersectionObserverState: true,
  },
  reducers: {
    updateProfileObserver(state, action) {
      const { bool } = action.payload;
      state.intersectionObserverState = bool;
    },
    updateProfileFeed(state, action) {
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

      const postIds = state.posts.map((post) => post.id);
      const newPosts = action.payload.filter(
        (newPost) => !postIds.includes(newPost.id)
      );

      state.posts.push(...newPosts);
    },
    toggleBookmarkInProfileFeed(state, action) {
      const { postId, toggleState } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) post.isBookmarked = toggleState;
    },
    addPostToProfileFeed(state, action) {
      const post = action.payload;
      state.posts.unshift(post);

      if (!state.userHasPosts) {
        state.userHasPosts = true;
      }
    },
    removePostFromProfileFeed(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);

      if (!state.posts.length) {
        state.userHasPosts = false;
      }
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

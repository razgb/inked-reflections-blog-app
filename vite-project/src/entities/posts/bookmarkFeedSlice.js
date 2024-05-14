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

        const existingPostIds = new Set(state.posts.map((post) => post.id));
        const newPosts = action.payload.filter(
          (newPost) => !existingPostIds.has(newPost.id)
        );

        state.posts.push(...newPosts);
      }
    },
    addPostToBookmarkFeed(state, action) {
      const post = {
        ...action.payload,
        isBookmarked: true,
      };
      state.posts.push(post);

      if (!state.userHasBookmarks) {
        state.userHasBookmarks = true;
      }
    },
    removePostFromBookmarkFeed(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);

      if (state.posts.length === 0) {
        state.userHasBookmarks = false;
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

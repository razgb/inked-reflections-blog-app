import { createSlice } from "@reduxjs/toolkit";

const bookmarkFeedSlice = createSlice({
  name: "bookmarkFeed",
  initialState: {
    postBatchLimit: 5,
    posts: [],
    userHasBookmarks: null,
    deletedPosts: [],
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
    toggleBookmarkInBookmarkFeed(state, action) {
      const { postId, toggleState } = action.payload;

      if (toggleState) {
        const { post, previousIndex } = state.deletedPosts.find(
          (post) => post.id === postId
        );

        if (post) {
          post.isBookmarked = true;
          state.posts.splice(previousIndex, 1, post);
        }
      } else {
        state.posts = state.posts.filter((post, index) => {
          if (post.id === postId) {
            state.deletedPosts.push({
              previousIndex: index,
              post,
            });

            return false; // filter out
          }

          return true; // keep
        });
      }
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
  toggleBookmarkInBookmarkFeed,
  updateBookmarkObserver,
  removePostFromBookmarkFeed,
} = bookmarkFeedSlice.actions;

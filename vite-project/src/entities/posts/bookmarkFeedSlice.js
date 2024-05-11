import { createSlice } from "@reduxjs/toolkit";

const bookmarkFeedSlice = createSlice({
  name: "bookmarkFeed",
  initialState: {
    postBatchLimit: 5,
    posts: [],
    postsEmpty: null,
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
        state.postsEmpty = true;
      } else {
        state.postsEmpty = false;
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
  },
});

export default bookmarkFeedSlice.reducer;
export const {
  updateBookmarkFeed,
  toggleBookmarkInBookmarkFeed,
  updateBookmarkObserver,
} = bookmarkFeedSlice.actions;
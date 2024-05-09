import { createSlice } from "@reduxjs/toolkit";

// Basic structure of an user post
// {
//   createdAt: 0,
//   updatedAt: 0,
//   uid: 'string',
//   profilePhotoReference: 'name_of_image.jpeg',
//   displayName: 'Raz Neaiz',
//   postContent: [{title, component, value, id}, {}],
// };

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    currentPost: {
      displayName: null,
      createdAt: null,
      postContent: null,
      profilePhotoReference: null,
      minutesToRead: null,
      isBookmarked: null,
    },
    postFeed: [],
    profilePosts: [],
    bookmarkPosts: [],
    deletedBookmarkPosts: [],
    observers: {
      feed: true,
      profile: true,
      bookmark: true,
    },
  },
  reducers: {
    changeCurrentPost(state, action) {
      state.currentPost = { ...action.payload };
    },
    updatePostsFeed(state, action) {
      state.postFeed.push(...action.payload);
    },
    updateProfilePosts(state, action) {
      state.profilePosts.push(...action.payload);
    },
    updateBookmarkPosts(state, action) {
      state.bookmarkPosts.push(...action.payload);
    },
    addBookmarkPost(state, action) {
      // Must be one of these three: ['postFeed', 'profilePosts', 'bookmarkPosts']
      const { postId, postArrayName } = action.payload;

      if (postArrayName === "postFeed" || postArrayName === "profilePosts") {
        const post = state[postArrayName].find((post) => post.id === postId);
        if (post) post.isBookmarked = true;
      }

      // Optimistic update safeguard for adding posts back due to request error.
      else if (postArrayName === "bookmarkPosts") {
        const { postId } = action.payload;

        const removedPost = state.deletedBookmarkPosts.find(
          (bookmark) => bookmark.post.id === postId
        );
        state.bookmarkPosts.splice(removedPost.index, 0, removedPost.post);
      }

      // edge case handling for current post being open
      if (state.currentPost.id === postId) {
        state.currentPost.isBookmarked = true;
      }
    },
    removeBookmarkPost(state, action) {
      const { postId, postArrayName } = action.payload;

      if (postArrayName === "postFeed" || postArrayName === "profilePosts") {
        const post = state[postArrayName].find((post) => post.id === postId);
        if (post) post.isBookmarked = false;
      }

      // Optimistic update safeguard for deleting posts in bookmarks page.
      else if (postArrayName === "bookmarkPosts") {
        console.log("inside else block for bookmarks");
        state.bookmarkPosts = state.bookmarkPosts.filter((post, index) => {
          if (post.id === postId) {
            state.deletedBookmarkPosts.push({
              index,
              post,
            });
            return false; // filter (a delete)
          }
          return true; // pass
        });
      }

      // edge case handling for current post being open
      if (state.currentPost.id === postId) {
        state.currentPost.isBookmarked = false;
      }
    },
    updateObserver(state, action) {
      const { name, bool } = action.payload;

      // Gives the 'this' keyword to state.observers.
      if (Object.prototype.hasOwnProperty.call(state.observers, name)) {
        state.observers[name] = bool;
      } else {
        console.warn(`Invalid observer name: ${name}`);
      }
    },
  },
});

export const {
  changeCurrentPost,
  updatePostsFeed,
  updateProfilePosts,
  updateBookmarkIds,
  updateBookmarkPosts,
  removeBookmarkPost,
  addBookmarkPost,
  updateObserver,
} = postsSlice.actions;
export default postsSlice.reducer;

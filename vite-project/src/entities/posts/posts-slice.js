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
    },
    postFeed: [],
    profilePosts: [],
    bookmarks: {
      ids: [],
      posts: [],
    },
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
    updateBookmarkIds(state, action) {
      state.bookmarks.ids.push(...action.payload);
    },
    updateBookmarkPosts(state, action) {
      state.bookmarks.posts.push(...action.payload);
    },
    addBookmarkPost(state, action) {
      const postId = action.payload;
      state.bookmarks.ids.push(postId);
    },
    removeBookmarkPost(state, action) {
      const postId = action.payload;
      state.bookmarks.ids = state.bookmarks.ids.filter((id) => id !== postId);
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

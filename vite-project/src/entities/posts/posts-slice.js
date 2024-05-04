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
    currentPost: {},
    postFeed: [],
    profilePosts: [],
    bookmarkPosts: [],
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
  updateBookmarkPosts,
  updateObserver,
} = postsSlice.actions;
export default postsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Basic structure of user posts.
// {
//   createAt: 0,
//   firstName: "",
//   lastName: "",
//   paragraphs: [],
//   tags: [],
// };

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    currentPost: {},
    postsFeed: [],
    lastVisibleDoc: null,
  },
  reducers: {
    /*  
    Receives posts from the fetchPosts.js feature (async function).
    The payload is an array of post objects.  
    */
    updatePostsFeed(state, action) {
      state.postsFeed = [...state.postsFeed, ...action.payload];
    },
    // uploadPost(state, action) {},
    // editPost(state, action) {},
    // deletePost(state, action) {},
  },
});

export const { updatePostsFeed } = postsSlice.actions;
export default postsSlice;

/**
 * Notes:
 *
 * Think of creating a UI slice for errors, upload successes, and other messages
 * instead of setting the loading and error states here in this slice.
 */

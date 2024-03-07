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
  // Array of objects (posts)
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
});

// remember to make a custom post action for adding, updating, deleting post
export default postsSlice;

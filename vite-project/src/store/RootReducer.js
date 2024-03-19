import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "../entities/menu/menu-slice.js";
import postsSlice from "../entities/posts/posts-slice.js";
import { userSlice } from "../entities/user/user-slice.js";

// Combines all the reducers in the app into one single store location.
const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    posts: postsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;

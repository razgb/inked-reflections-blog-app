import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../entities/posts/posts-slice.js";
import userSlice from "../entities/user/user-slice.js";
import errorSlice from "../entities/app-error/app-error-slice.js";
import locationSlice from "../entities/url-location/location-slice.js";

const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    posts: postsSlice.reducer,
    user: userSlice.reducer,
    error: errorSlice.reducer,
  },
});
export default store;

import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../entities/posts/posts-slice.js";
import userReducer from "../entities/user/user-slice.js";
import errorReducer from "../entities/app-error/app-error-slice.js";
import locationReducer from "../entities/url-location/location-slice.js";
import imageCacheReducer from "../entities/image-cache/image-cache-slice.js";

const store = configureStore({
  reducer: {
    location: locationReducer,
    posts: postsReducer,
    user: userReducer,
    error: errorReducer,
    imageCache: imageCacheReducer,
  },
});
export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../entities/user/user-slice.js";
import currentPostReducer from "../entities/current-post/currentPostSlice.js";
import mainFeedReducer from "../entities/posts/mainFeedSlice.js";
import profileFeedReducer from "../entities/posts/profileFeedSlice.js";
import bookmarkFeedReducer from "../entities/posts/bookmarkFeedSlice.js";
import imageCacheReducer from "../entities/image-cache/image-cache-slice.js";
import errorReducer from "../entities/app-error/app-error-slice.js";
import dangerModalReducer from "../entities/danger-modal/danger-modal-slice.js";
import locationReducer from "../entities/url-location/location-slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    currentPost: currentPostReducer,
    mainFeed: mainFeedReducer,
    profileFeed: profileFeedReducer,
    bookmarkFeed: bookmarkFeedReducer,
    imageCache: imageCacheReducer,
    error: errorReducer,
    danger: dangerModalReducer,
    location: locationReducer,
  },
});
export default store;

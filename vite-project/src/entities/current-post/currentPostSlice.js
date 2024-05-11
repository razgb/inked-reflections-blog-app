import { createSlice } from "@reduxjs/toolkit";

const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: {
    id: null,
    postUid: null,
    displayName: null,
    createdAt: null,
    postContent: null,
    profilePhotoReference: null,
    readingTime: null,
    isBookmarked: null,
  },
  reducers: {
    changeCurrentPost: (_, action) => {
      return { ...action.payload };
    },
    toggleCurrentBookmark: (state, action) => {
      state.isBookmarked = action.payload;
    },
  },
});

export default currentPostSlice.reducer;
export const { changeCurrentPost, toggleCurrentBookmark } =
  currentPostSlice.actions;

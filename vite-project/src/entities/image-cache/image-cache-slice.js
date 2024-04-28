import { createSlice } from "@reduxjs/toolkit";

const imageCacheSlice = createSlice({
  name: "imageCache",
  initialState: {},
  reducers: {
    addImageToCache(state, action) {
      const { reference, src } = action.payload;
      state[reference] = src;
    },
  },
});

export const { addImageToCache } = imageCacheSlice.actions;
export default imageCacheSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "../entities/menu/menu-slice.js";

// Combines all the reducers in the app into one single store location.
const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
  },
});

export default store;

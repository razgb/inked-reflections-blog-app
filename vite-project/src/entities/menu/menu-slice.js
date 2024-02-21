import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuOpenState: false,
  },
  reducers: {
    toggleMenu(state) {
      state.menuOpenState = !state.menuOpenState;
    },
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;

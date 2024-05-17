import { createSlice } from "@reduxjs/toolkit";

const overlaySlice = createSlice({
  name: "overlay",
  initialState: {
    isOpen: false,
    modalToClose: "",
  },
  reducers: {
    openAppOverlay(state, action) {
      state.isOpen = true;
      state.modalToClose = action.payload.modalToClose;
    },
    closeAppOverlay(state) {
      state.isOpen = false;
      state.modalToClose = "";
    },
  },
});

export default overlaySlice.reducer;
export const { openAppOverlay, closeAppOverlay } = overlaySlice.actions;

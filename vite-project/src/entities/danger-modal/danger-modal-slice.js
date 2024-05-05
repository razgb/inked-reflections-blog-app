import { createSlice } from "@reduxjs/toolkit";

const dangerModalSlice = createSlice({
  name: "danger",
  initialState: {
    showModal: false,
    dangerFunction: null,
    title: "",
    message: "",
  },
  reducers: {
    activateDangerModal(state, action) {
      const { title, message, dangerFunction } = action.payload;

      state.showModal = true;
      state.dangerFunction = dangerFunction;
      state.title = title;
      state.message = message;
    },
    resetDangerModal() {
      return {
        showModal: false,
        title: "",
        message: "",
        dangerFunction: null,
      };
    },
  },
});

export const { activateDangerModal, resetDangerModal } =
  dangerModalSlice.actions;

export default dangerModalSlice.reducer;

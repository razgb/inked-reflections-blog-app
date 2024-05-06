import { createSlice } from "@reduxjs/toolkit";

/**
 * showModal: if true DangerModal renders in the top level of the application.
 * dangerFunctionReference: reference to a function contained in a registry inside DangerModal.jsx.
 * title: heading message telling users what the danger function will do.
 * message: optional sub-heading message telling users extra information about the danger function.
 */
const dangerModalSlice = createSlice({
  name: "danger",
  initialState: {
    showModal: false,
    title: "",
    message: "",
    dangerFunctionReference: "",
    dataToSend: null,
  },
  reducers: {
    activateDangerModal(state, action) {
      const { title, message, dangerFunctionReference, dataToSend } =
        action.payload;

      return {
        showModal: true,
        title,
        message,
        dangerFunctionReference,
        dataToSend,
      };
    },
    resetDangerModal() {
      return {
        showModal: false,
        title: "",
        message: "",
        dangerFunctionReference: "",
        dataToSend: null,
      };
    },
  },
});

export const { activateDangerModal, resetDangerModal } =
  dangerModalSlice.actions;

export default dangerModalSlice.reducer;

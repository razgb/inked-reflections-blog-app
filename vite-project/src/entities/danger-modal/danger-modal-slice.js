import { createSlice } from "@reduxjs/toolkit";

/**
 * showModal: if true DangerModal renders in the top level of the application.
 * title: heading message telling users what the danger function will do.
 * message: optional sub-heading message telling users extra information about the danger function.
 * dangerFunctionReference: reference to a function contained in a registry inside DangerModal.jsx.
 * dangerFunctionInput: single argument will be put into array as a payload and then spread apart as if directly calling the function referenced.
 *   -> issue: multiple arguments such as (hello, hi, how, are, you) must be put into objects & respective danger functions should accept 1 object arg.
 */
const dangerModalSlice = createSlice({
  name: "danger",
  initialState: {
    showModal: false,
    title: "",
    message: "",
    dangerFunctionReference: "",
    dangerFunctionInput: {
      payload: null,
    },
  },
  reducers: {
    activateDangerModal(state, action) {
      const { title, message, dangerFunctionReference, dangerFunctionInput } =
        action.payload;

      return {
        ...state,
        showModal: true,
        title,
        message,
        dangerFunctionReference,
        dangerFunctionInput: {
          payload: dangerFunctionInput,
        },
      };
    },
    resetDangerModal(state) {
      return {
        ...state,
        showModal: false,
        title: "",
        message: "",
        dangerFunctionReference: "",
        dangerFunctionInput: {
          payload: null,
        },
      };
    },
  },
});

export const { activateDangerModal, resetDangerModal } =
  dangerModalSlice.actions;

export default dangerModalSlice.reducer;

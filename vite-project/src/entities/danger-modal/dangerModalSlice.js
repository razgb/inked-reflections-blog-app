import { createSlice } from "@reduxjs/toolkit";

/**
 * showModal: Controls the visibility of DangerModal at the application's top level.
 * title: Describes the action the danger function will perform.
 * message: Provides additional details about the danger function (optional).
 * dangerFunctionReference: Points to a function in DangerModal.jsx's function registry.
 * dangerFunctionInput: Contains arguments for the danger function, structured for direct application.
 * usesReduxDispatch: Enables Redux dispatch for asynchronous execution of the danger function.
 * successRedirectPath: If provided, the user will be redirected to this path upon successful execution of the danger function.
 */
const dangerModalSlice = createSlice({
  name: "danger",
  initialState: {
    showModal: false,
    title: "",
    message: "",
    usesReduxDispatch: false,
    dangerFunctionReference: "",
    dangerFunctionInput: {
      payload: null,
    },
    successRedirectPath: "",
  },
  reducers: {
    /**
     * Danger function input is structured this way so that regardless of what data
     * the arguments passed through are, the payload matches the argmument(s) structure.
     */
    activateDangerModal(state, action) {
      return {
        ...state,
        showModal: true,
        ...action.payload,
        dangerFunctionInput: {
          payload: action.payload.dangerFunctionInput,
        },
      };
    },
    resetDangerModal(state) {
      state.showModal = false;
      state.title = "";
      state.message = "";
      state.usesReduxDispatch = false;
      state.dangerFunctionReference = "";
      state.dangerFunctionInput.payload = null;
      state.successRedirectPath = "";
    },
  },
});

export const { activateDangerModal, resetDangerModal } =
  dangerModalSlice.actions;

export default dangerModalSlice.reducer;

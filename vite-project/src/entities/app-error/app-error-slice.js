import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorState: false,
  title: "",
  message: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState: { ...initialState },
  reducers: {
    activateAppError(state, action) {
      return {
        ...state,
        errorState: true,
        ...action.payload,
      };
    },
    resetAppError() {
      return {
        ...initialState,
      };
    },
  },
});

export const { activateAppError, resetAppError } = errorSlice.actions;
export default errorSlice.reducer;

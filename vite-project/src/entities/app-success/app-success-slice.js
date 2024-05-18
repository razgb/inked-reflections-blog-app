import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successState: false,
  title: "",
  message: "",
};

const successSlice = createSlice({
  name: "success",
  initialState: { ...initialState },
  reducers: {
    activateAppSuccess(state, action) {
      return {
        ...state,
        successState: true,
        ...action.payload,
      };
    },
    resetAppSuccess() {
      return {
        ...initialState,
      };
    },
  },
});

export const { activateAppSuccess, resetAppSuccess } = successSlice.actions;
export default successSlice.reducer;

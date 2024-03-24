import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locationName:
      window.location.pathname === "/" ? "/posts" : window.location.pathname,
  },
  reducers: {
    changeLocationState(state, action = "/posts") {
      state.locationName = action.payload;
    },
  },
});

export const { changeLocationState } = locationSlice.actions;
export default locationSlice;

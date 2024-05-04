import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    uid: "",
    loginState: false,
    email: "",
    displayName: "",
    emailVerified: false,
    photoURL: "",
    createdAt: 0,
    dateAccountedCreated: "month year",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: { ...initialState },
  reducers: {
    addUserToState(state, action) {
      state.info = action.payload;
    },
    removeUserFromState() {
      return {
        ...initialState,
      };
    },
  },
});

export const { addUserToState, removeUserFromState } = userSlice.actions;
export default userSlice.reducer;

/**
 *  These functions should not be in the state slice. Create feature functions instead: 
 *   
    // sendVerificationEmail(state, action) {},
    // resetUserEmail(state, action) {},
    // resetUserPassword(state, action) {},
    // reAuthenticateUser(state, action) {},
    // deleteUser(state, action) {},
 * 
 * */

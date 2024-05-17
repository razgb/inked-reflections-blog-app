import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    uid: "",
    loginState: null,
    email: "",
    displayName: "",
    emailVerified: false,
    photoURL: "",
    createdAt: 0,
    dateAccountedCreated: "month year",
  },
  edit: {
    showLoginModal: false,
    reAuthed: false,
    newPhotoURL: "",
    newPhotoFile: "",
    newEmail: "",
    newDisplayName: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: { ...initialState },
  reducers: {
    addUserToState(state, action) {
      state.info = action.payload;
    },
    removeUserFromState(state) {
      state.info = {
        ...initialState.info,
        loginState: false,
      };
    },
    setLoginModal(state, action) {
      state.edit.showLoginModal = action.payload;
    },
  },
});

export const { addUserToState, removeUserFromState, setLoginModal } =
  userSlice.actions;
export default userSlice.reducer;

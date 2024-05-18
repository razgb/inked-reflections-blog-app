import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    loginState: null,
    uid: "",
    email: "",
    displayName: "",
    emailVerified: false,
    photoURL: "",
    createdAt: 0,
    dateAccountedCreated: "month year",
  },
  edit: {
    showLoginModal: false,
    // reAuthed: false,
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
    // General single updates inside profile/edit path.
    addNewUserDetail(state, action) {
      state.info = { ...state.info, ...action.payload };
    },
  },
});

export const {
  addUserToState,
  removeUserFromState,
  setLoginModal,
  addNewUserDetail,
} = userSlice.actions;
export default userSlice.reducer;

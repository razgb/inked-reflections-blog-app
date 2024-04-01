import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    uid: "",
    loginState: false,
    email: "",
    displayName: "",
    // Restricts most app features except viewing posts until verification by email.
    emailVerified: false,
    // Link to photo saved in firebase storage.
    photoURL: "",
  },
  // extraInfo: {
  //   username: '',
  //
  // },
  // Would be a list of bookmarked post ids.
  bookmarks: [],
  // Would be a list of post ids. -> Dynamically fetched through api using unfinished function.
  posts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: { ...initialState },
  reducers: {
    addUserToState(state, action) {
      state.info = {
        ...action.payload,
      };
    },
    removeUserFromState() {
      return {
        ...initialState,
      };
    },
  },
});

export const { addUserToState, removeUserFromState } = userSlice.actions;
export default userSlice;

/**
 * Notes :
 * 
 * PROBLEM: Since firebase doesn't allow adding extra user data. 
 * 
 * -> We have to create an entire collection in the firestore database just for 
 * users. With their own UIDs that store information such as posts bookmarks, posts 
 * they have created, posts in drafts (incomplete posts)...etc. And for efficiency 
 * we want them all to be saved in IDs so that then we can use another functio to 
 * fetch the data upon the user either searching for it using the URL or in their 
 * bookmarks page.   
 * 
 * -> function to create: Firebase query function. 
 * 
 * 
 *  These functions should not be in the state slice. Create feature functions instead: 
 *   
    // updateUserProfile(state, action) {},
    // sendVerificationEmail(state, action) {},
    // resetUserEmail(state, action) {},
    // resetUserPassword(state, action) {},
    // reAuthenticateUser(state, action) {},
    // deleteUser(state, action) {},
 * 
 * */

// const userSlice = createSlice({
//   name: "user",
//   initialState: { ...initialState },
//   reducers: {
//     addUserToState(state, action) {
//       // console.log(action.payload);
//       // state = {
//       //   ...action.payload,
//       // };

//       // state = action.payload;
//       state.info = {
//         ...action.payload,
//       };
//     },
//   },
// });

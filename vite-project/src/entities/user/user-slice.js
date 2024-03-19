import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../main";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// function handleUserAuthStateChange() {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // Code for sign in.
//       userSlice.addUserToState({
//       });
//     } else {
//       // Code for sign out
//     }
//   });
// }

const initialState = {
  email: "",
  username: "",
  displayName: "",
  // Restricts most app features except viewing posts util verification by email.
  isValidated: false,
  // Link to photo saved in firebase storage.
  photoURL: "",
  // Would be a list of bookmarked post ids.
  bookmarks: [],
  // Would be a list of post ids. -> Dynamically fetched through api using unfinished function.
  posts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: { ...initialState },
  reducers: {
    addUserToState(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
    },
    removeUserFromState(state) {
      state = initialState;
    },
  },
});

export const { addUserToState, removeUserFromState } = userSlice.actions;

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

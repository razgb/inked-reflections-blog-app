import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setLoginModal,
  addNewUserDetail,
} from "../../../entities/user/user-slice.js";
import { activateAppError } from "../../../entities/app-error/app-error-slice.js";
import { addNewUserValueToMainFeed } from "../../../entities/posts/mainFeedSlice.js";
import { addNewUserValueToProfileFeed } from "../../../entities/posts/profileFeedSlice.js";
import { addNewUserValueToBookmarkFeed } from "../../../entities/posts/bookmarkFeedSlice.js";

import { openAppOverlay } from "../../../entities/overlay/overlaySlice.js";

import { updateDisplayNameAndProfile } from "../../../features/user-auth/updateDisplayName.js";
import { updateAllPostsWithNewValues } from "../../../features/edit-profile/user-collection/updateAllPostsWithNewValues.js";
import { uploadImageToFirebase } from "../../../features/user-general/uploadImageToFirebase.js";
import { deleteImageFromFirebase } from "../../../features/user-general/deleteImageFromFirebase.js";
import { requestWithRetry } from "../../../shared/util/requestWithRetry.js";
import { setDefaultAppError } from "./setDefaultAppError.js";

/**
 * Uploads image to firebase, deletes current image from firebase,
 * updates user profile, and updates all posts with new values
 * @param {Object} event - The event object
 * @param {Object} fileInput - The file input object
 * @param {string} uid - The user id
 * @param {string} displayName - The display name
 * @param {string} currentPhotoReference - The current photo reference
 * @param {function} dispatch - The dispatch function
 * @param {function} navigate - The navigate function
 * @param {function} setLoading - The set loading function
 */
export const handleProfilePhotoChange = createAsyncThunk(
  "user/handleProfilePhotoChange",
  async ({
    file,
    uid,
    displayName,
    currentPhotoReference,
    dispatch,
    navigate,
    setLoading,
  }) => {
    setLoading(true);
    if (!file) {
      dispatch(
        activateAppError({
          title: "No photo selected",
          message: "Please select a photo to update your profile.",
        })
      );

      setLoading(false);
      return;
    }

    const { fileName } = await uploadImageToFirebase(file, uid, "profile");

    if (!fileName) {
      setDefaultAppError(dispatch);
      setLoading(false);
      return;
    } else {
      await deleteImageFromFirebase("profile", currentPhotoReference);
    }

    const result = await updateDisplayNameAndProfile(
      uid,
      displayName,
      fileName
    );

    if (result === "invalid-credential") {
      dispatch(openAppOverlay({ modalToClose: "editUserProfile" }));
      dispatch(setLoginModal(true));

      await deleteImageFromFirebase("profile", fileName);
      return;
    } else if (result === "error") {
      setDefaultAppError(dispatch);
      setLoading(false);
      return;
    }

    dispatch(addNewUserDetail({ photoURL: fileName }));

    try {
      await requestWithRetry(
        updateAllPostsWithNewValues({
          uid,
          profilePhotoReference: fileName,
        })
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      setDefaultAppError(dispatch);
      return;
    }

    dispatch(
      addNewUserValueToProfileFeed({ uid, profilePhotoReference: fileName })
    );
    dispatch(
      addNewUserValueToMainFeed({ uid, profilePhotoReference: fileName })
    );
    dispatch(
      addNewUserValueToBookmarkFeed({ uid, profilePhotoReference: fileName })
    );

    navigate("/profile");
    setLoading(false);
  }
);

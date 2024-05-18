import { createAsyncThunk } from "@reduxjs/toolkit";
import { validateName } from "../../../features/user-auth/validateName";
import { activateAppError } from "../../../entities/app-error/app-error-slice";
import { updateDisplayNameAndProfile } from "../../../features/user-auth/updateDisplayName";
import { openAppOverlay } from "../../../entities/overlay/overlaySlice";
import {
  addNewUserDetail,
  setLoginModal,
} from "../../../entities/user/user-slice";
import { setDefaultAppError } from "./setDefaultAppError";
import { updateAllPostsWithNewValues } from "../../../features/edit-profile/user-collection/updateAllPostsWithNewValues";
import { addNewUserValueToProfileFeed } from "../../../entities/posts/profileFeedSlice";
import { addNewUserValueToMainFeed } from "../../../entities/posts/mainFeedSlice";
import { addNewUserValueToBookmarkFeed } from "../../../entities/posts/bookmarkFeedSlice";

export const handleDisplayNameChange = createAsyncThunk(
  "edit-user-profile/handleDisplayNameChange",
  async (
    { uid, newDisplayName, photoURL, navigate, setLoading },
    { dispatch }
  ) => {
    setLoading(true);
    const nameValidator = validateName(newDisplayName);
    if (!nameValidator.success) {
      dispatch(
        activateAppError({
          title: "Invalid display name",
          message: nameValidator.message,
        })
      );

      setLoading(false);
      return;
    }

    const result = await updateDisplayNameAndProfile(
      uid,
      newDisplayName,
      photoURL
    );

    if (result === "invalid-credentials") {
      dispatch(openAppOverlay({ modalToClose: "editUserProfile" }));
      dispatch(setLoginModal(true));
      setLoading(false);
      return;
    } else if (result === "error") {
      setDefaultAppError(dispatch);
      setLoading(false);
      return;
    }

    try {
      await updateAllPostsWithNewValues({
        uid,
        displayName: newDisplayName,
      });
    } catch (error) {
      setDefaultAppError(dispatch);
    }

    dispatch(
      addNewUserValueToProfileFeed({
        uid,
        displayName: newDisplayName,
      })
    );
    dispatch(
      addNewUserValueToMainFeed({
        uid,
        displayName: newDisplayName,
      })
    );
    dispatch(
      addNewUserValueToBookmarkFeed({
        uid,
        displayName: newDisplayName,
      })
    );
    dispatch(
      addNewUserDetail({
        displayName: newDisplayName,
      })
    );

    setLoading(false);
    navigate("/profile");
  }
);

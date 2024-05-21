import { activateAppError } from "../../../entities/app-error/app-error-slice";
import { activateAppSuccess } from "../../../entities/app-success/app-success-slice";
import { addNewUserDetail } from "../../../entities/user/user-slice";
import { updateDisplayNameAndProfile } from "../../../features/user-auth/updateDisplayName";
import { validateName } from "../../../features/user-auth/validateName";
import { uploadImageToFirebase } from "../../../features/user-general/uploadImageToFirebase";

export async function uploadProfileDetails({
  uid,
  displayName,
  file,
  setLoading,
  setError,
  dispatch,
  navigate,
}) {
  if (!displayName) return; // temp guard
  setLoading(true);

  let fileUploadState = null;
  if (file) {
    try {
      fileUploadState = await uploadImageToFirebase(file, uid, "profile");
    } catch (error) {
      setError((prev) => ({
        ...prev,
        uploadError: true,
        uploadMessage: fileUploadState.message,
      }));
      setLoading(false);
      return;
    }
  }

  const nameValidator = validateName(displayName);
  if (!nameValidator.success) {
    setError((prev) => ({
      ...prev,
      nameError: true,
      nameMessage: nameValidator.message,
    }));

    setLoading(false);
    console.log("name error");
    return;
  }

  try {
    await updateDisplayNameAndProfile(
      uid,
      displayName,
      fileUploadState ? fileUploadState.fileName : null
    );

    navigate("/profile");
    dispatch(
      addNewUserDetail({
        displayName: displayName,
        photoURL: fileUploadState ? fileUploadState.fileName : null,
      })
    );

    dispatch(
      activateAppSuccess({
        title: "Welcome to Inked Reflections!",
        message: "Please verify your email to enable all app features. ",
      })
    );
  } catch (error) {
    console.log("Updating name and profile resulted in error.");
    dispatch(
      activateAppError({
        title: "Error updating your display name",
        message: "Check your internet connection and try again. ",
      })
    );
  }

  setLoading(false);
}

import { activateAppError } from "../../../entities/app-error/app-error-slice";

export function setDefaultAppError(dispatch) {
  dispatch(
    activateAppError({
      title: "Error updating your profile",
      description: "Please check your internet connection and try again.",
    })
  );
}

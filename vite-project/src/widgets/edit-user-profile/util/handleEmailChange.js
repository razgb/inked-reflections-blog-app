import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateEmail } from "firebase/auth";
import { auth } from "../../../main";
import { addNewUserDetail } from "../../../entities/user/user-slice";
import { activateAppError } from "../../../entities/app-error/app-error-slice";

export const handleEmailChange = createAsyncThunk(
  "edit-user-profile/handleEmailChange",
  async ({ newEmail, setLoading, navigate }, { dispatch }) => {
    setLoading(true);

    let passed = true;
    const mandatoryValues = ["@", "."];
    mandatoryValues.forEach((value) => {
      if (!newEmail.includes(value)) passed = false;
    });

    if (!passed) {
      dispatch(
        activateAppError({
          title: "Invalid email address",
          message:
            "Please enter a valid email address that includes an @ and dot.",
        })
      );
      setLoading(false);
      return;
    }

    try {
      updateEmail(auth.currentUser, newEmail);
      dispatch(addNewUserDetail({ email: newEmail }));
      navigate("/profile");
    } catch (error) {
      dispatch(
        activateAppError({
          title: "Error updating your email",
          message: "Please check your internet connection and try again.",
        })
      );
    } finally {
      setLoading(false);
    }
  }
);

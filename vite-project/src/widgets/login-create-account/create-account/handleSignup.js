import { activateAppSuccess } from "../../../entities/app-success/app-success-slice";
import { addUserToState } from "../../../entities/user/user-slice";
import { validateSignupCredentials } from "../../../features/user-auth/validateSignupCredentials";
import { signupUser } from "../../../features/user-auth/signupUser";

import { createUserToFirestore } from "../../../features/user-general/createUserToFirestore.js";
import { activateAppError } from "../../../entities/app-error/app-error-slice.js";

export async function handleSignup({
  signupState,
  dispatchSignupState,
  dispatch,
  navigate,
}) {
  dispatchSignupState({ type: "loading", payload: true });
  const { email, password, confirmPassword } = signupState;

  const validationObj = validateSignupCredentials(
    email,
    password,
    confirmPassword
  );

  if (!validationObj.valid) {
    const { emailError, passwordError, emailMessage, passwordMessage } =
      validationObj;

    dispatchSignupState({
      type: "error",
      payload: {
        emailError,
        passwordError,
        emailMessage,
        passwordMessage,
      },
    });

    dispatchSignupState({ type: "loading", payload: false });
    return;
  }

  try {
    const user = await signupUser(email, password);
    const { uid, emailVerified, photoURL } = user;
    const createdAt = Number(user.metadata.createdAt);

    const essentialUserInfo = {
      uid,
      emailVerified,
      photoURL,
      createdAt,
      displayName: null,
    };

    dispatch(addUserToState(essentialUserInfo));

    await createUserToFirestore(essentialUserInfo);
    navigate("/flow/userinfo");
  } catch (error) {
    console.log(error);

    dispatch(
      activateAppError({
        title: "Connection problem",
        message: "Please check your internet connection and try again.",
      })
    );
  } finally {
    dispatchSignupState({ type: "loading", payload: false });
  }
}

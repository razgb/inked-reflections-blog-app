import { activateAppSuccess } from "../../../entities/app-success/app-success-slice";
import { addUserToState } from "../../../entities/user/user-slice";
import { validateSignupCredentials } from "../../../features/user-auth/validateSignupCredentials";
import { signupUser } from "../../../features/user-auth/signupUser";

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

    dispatch(addUserToState(user));

    dispatch(
      activateAppSuccess({
        title: "Welcome to Inked Reflections!",
        message: "Please verify your email to enable all app features. ",
      })
    );

    navigate("/posts");
  } catch (error) {
    console.log(error);
  } finally {
    dispatchSignupState({ type: "loading", payload: false });
  }
}

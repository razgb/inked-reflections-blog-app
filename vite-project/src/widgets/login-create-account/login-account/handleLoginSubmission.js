import { loginUser } from "../../../features/user-auth/loginUser";
import { reAuthenticateUser } from "../../../features/user-auth/reAuthenticateUser";

export async function handleLoginSubmission({
  setError,
  setLoading,
  functionRef,
  navigate,
  loginDetails,
  navigatePath,
  dispatch,
}) {
  setError(false);
  setLoading(true);

  const { email, password } = loginDetails;

  try {
    if (functionRef === "login") {
      await loginUser(email, password);
    } else if (functionRef === "reauth") {
      await reAuthenticateUser(email, password);
    } else {
      throw new Error("Invalid function reference.");
    }

    navigate(navigatePath);
  } catch (error) {
    dispatch({
      title: "Error logging you in",
      message: "Please check your internet connection and try again.",
    });
  }

  setLoading(false);
  return null;
}

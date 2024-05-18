import styles from "./LoginAccountUI.module.css";
import Button from "../../shared/ui/buttons/Button";
import Spinner from "../../shared/ui/spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { validateEmail } from "../../features/user-auth/loginFlowUtil";
import { loginUser } from "../../features/user-auth/loginUser";
import { reAuthenticateUser } from "../../features/user-auth/reAuthenticateUser";

/**
 * This component renders different UIs depending on the 'parent' container received from the overlaySlice.
 * The parent can either be login or editUserProfile.
 * The login parent is the initial login form in the flow path.
 * The editUserProfile parent is the form to edit the user's profile.
 *
 * @param {string} navigatePath - The path to navigate to after successful login.
 * @param {string} functionRef - The function reference to use.
 * @returns {JSX.Element} - The JSX element.
 */
export default function LoginAccountUI({
  navigatePath = "/profile",
  functionRef = "login",
}) {
  const navigate = useNavigate();
  const emailRef = useRef(null); // used to auto focus email input (UX)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    initialEmailFocus: true,
    email: "",
    password: "",
  });

  const buttonText = functionRef === "login" ? "Sign in" : "Authenticate";

  function onEmailClick(event) {
    setLoginDetails((prev) => ({ ...prev, email: event.target.value }));
  }
  function onPasswordClick(event) {
    setLoginDetails((prev) => ({ ...prev, password: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(false);
    setLoading(true);

    const { email, password } = loginDetails;
    let loginState = false;

    if (functionRef === "login") {
      loginState = await loginUser(email, password);
    } else if (functionRef === "reauth") {
      loginState = await reAuthenticateUser(email, password);
    } else {
      throw new Error("Invalid function reference.");
    }

    if (loginState.success) {
      navigate(navigatePath);
    } else {
      setError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (loginDetails.initialEmailFocus) {
      setLoginDetails((prev) => ({ ...prev, initialEmailFocus: false }));
      emailRef.current.focus();
    }
  }, [loginDetails.initialEmailFocus]);

  return (
    <div>
      {functionRef === "login" && (
        <h2 className={styles["login__heading"]}>Start reflecting</h2>
      )}

      <div className={styles["login"]}>
        <h2 className={styles["login__heading"]}>
          Apologies, we just need to know it&apos;s you again
        </h2>

        <form onSubmit={handleSubmit} className={styles["login__container"]}>
          <div className={styles["label-input-container"]}>
            <label className={styles["label-email"]} htmlFor="email">
              Email
            </label>
            <input
              required
              className={styles["input-email"]}
              type="email"
              value={loginDetails.email}
              onChange={onEmailClick}
              onBlur={() => validateEmail(loginDetails.email)}
              ref={emailRef}
            />
          </div>

          <div className={styles["label-input-container"]}>
            <label className={styles["label-password"]} htmlFor="password">
              Password
            </label>
            <input
              required
              className={styles["input-password"]}
              type="password"
              value={loginDetails.password}
              onChange={onPasswordClick}
            />
          </div>

          <div className={styles["forgot-password__container"]}>
            {error && (
              <p className={styles["invalid-credentials"]}>
                Invalid Credentials, try again
              </p>
            )}

            <div className={styles["forgot-password"]}>
              <Link className={styles["forgot-password-text"]}>
                Forgot password?
              </Link>
            </div>
          </div>

          <Button disabled={loading}>
            {loading ? (
              <Spinner size="small" contrastPrimaryColor />
            ) : (
              buttonText
            )}
          </Button>

          {functionRef === "login" && (
            <div>
              <span className={styles["no-account-text"]}>
                Don&apos;t have an account?
              </span>

              <Link to="/flow/signup" className={styles["no-account-link"]}>
                Sign up
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

/**
 * Notes & todo:
 *
 * Import eye and crossed-eye icons for the password section.
 *
 * If user doesn't have a username -> send user to flow/userinfo.
 * If user tries to navigate to another tab -> navigate user on every component page
 * towards flow/userinfo.
 *
 */

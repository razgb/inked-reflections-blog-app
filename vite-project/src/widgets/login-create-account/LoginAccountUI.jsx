import Button from "../../shared/ui/buttons/default-button/Button";
import styles from "./LoginAccountUI.module.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { validateEmail } from "../../features/user-auth/loginFlowUtil";
import Spinner from "../../shared/ui/spinner/Spinner";
import { loginUser } from "../../features/user-auth/loginUser";

export default function LoginAccountUI() {
  const emailRef = useRef(null); // used to auto focus email input (UX)
  const [loginDetails, setLoginDetails] = useState({
    initialEmailFocus: true,
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    const loginState = await loginUser(
      loginDetails.email,
      loginDetails.password
    );
    if (loginState.success) {
      console.log("Login successful");
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
      <h2 className={styles["login__heading"]}>Start reflecting</h2>

      <div className={styles["login"]}>
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
            {loading ? <Spinner size="small" color="light" /> : "Sign in"}
          </Button>

          <div>
            <span className={styles["no-account-text"]}>
              Don&apos;t have an account?
            </span>
            <Link to="/flow/signup" className={styles["no-account-link"]}>
              Sign up
            </Link>
          </div>
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

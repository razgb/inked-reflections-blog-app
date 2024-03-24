import Button from "../../shared/ui/buttons/default-button/Button";
import styles from "./LoginAccountUI.module.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { validateEmail } from "../../shared/util/loginFlowUtil";
import Spinner from "../../shared/ui/spinner/Spinner";

export default function LoginAccountUI() {
  const emailRef = useRef(null); // used to auto focus email input (UX)
  const [loginDetails, setLoginDetails] = useState({
    initialEmailFocus: true,
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    emailError: false, // email doesn't exist, if error
    emailMessage: "",
    passwordError: false,
    passwordMessage: "", // wrong password, if error
  });

  function onEmailClick(event) {
    setLoginDetails((prev) => ({ ...prev, email: event.target.value }));
  }
  function onPasswordClick(event) {
    setLoginDetails((prev) => ({ ...prev, password: event.target.value }));
  }

  useEffect(() => {
    if (loginDetails.initialEmailFocus) {
      setLoginDetails((prev) => ({ ...prev, initialEmailFocus: false }));
      emailRef.current.focus();
    }
  }, [loginDetails]);

  return (
    <div>
      <h2 className={styles["login__heading"]}>Start reflecting</h2>

      <div className={styles["login"]}>
        <form className={styles["login__container"]}>
          <div className={styles["label-input-container"]}>
            <label className={styles["label-email"]} htmlFor="email">
              Email / Username
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

          <div className={styles["forgot-password"]}>
            <Link className={styles["forgot-password-text"]}>
              Forgot password?
            </Link>
          </div>

          <Button disabled={!loading}>
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
 * After sign up, make sure that the user owns the email.
 *  -> Send verification email.
 *  -> Upon verification, allow user to use appliction features.
 *  -> If not verified, disable any feature such as bookmarks,
 *      commenting, applying for subscriptions...etc.
 *
 *
 * Spinner/button notes:
 *
 * upon async requests, toggle spinner.
 *
 */

import styles from "./CreateAccountUI.module.css";
import Button from "../../shared/ui/buttons/default-button/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateSignupDetails,
} from "../../shared/util/loginFlowUtil";
import { useState, useEffect, useRef } from "react";
import { signupUser } from "../../features/user-auth/signupUser";
import { addUserToState } from "../../entities/user/user-slice";
import { useDispatch } from "react-redux";
import Spinner from "../../shared/ui/spinner/Spinner";

export default function CreateAccountUI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null); // used to auto focus email input (UX)
  const [signupDetails, setSignupDetails] = useState({
    initialEmailFocus: true,
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    emailError: false,
    emailMessage: "",
    passwordError: false,
    passwordMessage: "",
  });

  const [loading, setLoading] = useState(null);
  const [strength, setStrength] = useState("");

  async function dummyFunction() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  async function handleSignup(event, email, password, confirmPassword) {
    event.preventDefault();
    setLoading(true);

    const validationState = validateSignupDetails(
      email,
      password,
      confirmPassword
    );

    if (!validationState.valid) {
      console.log("Validation state not valid");
      setError({
        emailError: validationState.emailError,
        emailMessage: validationState.emailMessage,
        passwordError: validationState.passwordError,
        passwordMessage: validationState.passwordMessage,
      });
      setLoading(false);
      return; // exits function before try block.
    }

    try {
      // const user = await signupUser(email, password);
      // dispatch(
      //   addUserToState({
      //     email: user.email,
      //     username: user.displayName,
      //     uid: user.uid,
      //     photoURL: user.providerData[0].photoURL,
      //     isVerified: user.emailVerified,
      //     accessToken: user.stsTokenManage.accessToken,
      //     refreshToken: user.stsTokenManage.refreshToken,
      //   })
      // );
      await dummyFunction();
    } catch (error) {
      // Edge case error: What if the user has already signed up? Need UI for this.
      // -> Maybe reuseable error component like a modal towards the top of the app?
      console.log(error);
    }
    // Reset everything upon success.
    setLoading(false);
    setStrength("");
    navigate("/posts");
  }

  function onEmailClick(event) {
    setSignupDetails((prev) => ({ ...prev, email: event.target.value }));
    setError((prevError) => ({
      ...prevError,
      emailError: false,
      emailMessage: "",
    }));
  }
  function onPasswordClick(event) {
    setSignupDetails((prev) => ({ ...prev, password: event.target.value }));
    const length = event.target.value.length;
    if (length < 8) {
      setStrength("weak");
    } else if (length >= 8 && length < 12) {
      setStrength("good");
    } else if (length >= 12) {
      setStrength("strong");
    }

    setError((prevError) => ({
      ...prevError,
      passwordError: false,
      passwordMessage: "",
    }));
  }
  function onConfirmPasswordClick(event) {
    setSignupDetails((prev) => ({
      ...prev,
      confirmPassword: event.target.value,
    }));
  }

  useEffect(() => {
    if (signupDetails.initialEmailFocus) {
      setSignupDetails((prev) => ({ ...prev, initialEmailFocus: false }));
      emailRef.current.focus();
    }
  }, [signupDetails]);

  return (
    <div>
      <h2 className={styles["signup__heading"]}>Join today</h2>

      <div className={styles["signup"]}>
        <div className={styles["signup__container"]}>
          <form
            onSubmit={(event) =>
              handleSignup(
                event,
                signupDetails.email,
                signupDetails.password,
                signupDetails.confirmPassword
              )
            }
            className={styles["signup__form"]}
          >
            <div className={styles["label-input-container"]}>
              {error.emailError ? (
                <label
                  className={`${styles["label-email-error"]}`}
                  htmlFor="email"
                >
                  {error.emailMessage}
                </label>
              ) : (
                <label className={`${styles["label-email"]}`} htmlFor="email">
                  Email
                </label>
              )}
              <input
                required
                className={styles["input-email"]}
                type="email"
                value={signupDetails.email}
                onChange={onEmailClick}
                ref={emailRef}
              />
            </div>

            <div className={styles["label-input-container"]}>
              {error.passwordError ? (
                <label
                  className={styles["label-password-error"]}
                  htmlFor="password"
                >
                  {error.passwordMessage}
                </label>
              ) : (
                <label className={styles["label-password"]} htmlFor="password">
                  Password
                </label>
              )}
              <input
                required
                className={styles["input-password"]}
                type="password"
                value={signupDetails.password}
                onChange={onPasswordClick}
                onBlur={() => validatePassword(signupDetails.password)}
              />
            </div>

            <div className={styles["label-input-container"]}>
              <label className={styles["label-password"]} htmlFor="password">
                Confirm password
              </label>
              <input
                required
                className={styles["input-password"]}
                type="password"
                value={signupDetails.confirmPassword}
                onChange={onConfirmPasswordClick}
                onBlur={() => validatePassword(signupDetails.password)}
              />
            </div>

            <div className={styles["strength-forgot-box"]}>
              <p className={`${styles["strength"]} ${styles[`${strength}`]}`}>
                {/* Maybe use an ICON instead? looks like shit */}
                {strength}
              </p>

              <Link className={styles["forgot-password-text"]}>
                Forgot password?
              </Link>
            </div>

            <Button type="submit">
              {loading ? <Spinner size="small" color="light" /> : "Sign up"}
            </Button>

            <div>
              <span className={styles["no-account-text"]}>
                Already have an account?
              </span>
              <Link to="/flow/login" className={styles["no-account-link"]}>
                Sign in
              </Link>
            </div>
          </form>

          <div className={styles["rules"]}>
            <div className={styles["rules__container"]}>
              <h3 className={styles["rules__heading"]}>
                Suggestions for password:
              </h3>
              <ul className={styles["rules__list"]}>
                <li className={styles["rules__item"]}>
                  <p>Minimum 8 characters</p>
                </li>
                <li className={styles["rules__item"]}>
                  <p>One special character</p>
                </li>
                <li className={styles["rules__item"]}>
                  <p>One uppercase letter</p>
                </li>
                <li className={styles["rules__item"]}>
                  <p>One number</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Note Board:
 *
 * -> Loading state works due to the nature of async functions.
 *    -> The call stack doesn't actually wait for the function to run therefore,
 *       the state is instantly reflected in the UI showing to the user that something
 *       is happening in the background! (loading, setLoading)
 */

/*
  function handleAuthSuccess() {
    // 1. Change the app user state with username, email, displayName, and profile picture.
    // 2. Navigate user to /posts so they can start scrolling.
    // 3. Send/show (not sure which one yet) notification to user that if they don't verify email,
    // they will not be able to interact with anything and only view. (one day expiry date)
  }
  // function handleAuthError() {}

*/

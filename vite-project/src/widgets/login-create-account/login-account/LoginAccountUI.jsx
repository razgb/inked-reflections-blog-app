import styles from "./LoginAccountUI.module.css";
import Button from "../../../shared/ui/buttons/Button";
import Spinner from "../../../shared/ui/spinner/Spinner";
import PasswordInput from "./sub-components/PasswordInput.jsx";
import EmailInput from "./sub-components/EmailInput.jsx";
import NoAccountContainer from "./sub-components/NoAccountContainer.jsx";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { validateEmail } from "../../../features/user-auth/validateSignupCredentials";
import { useDispatch, useSelector } from "react-redux";

import { ForgotPasswordContainer } from "./sub-components/ForgotPasswordContainer";
import { handleLoginSubmission } from "./handleLoginSubmission.js";

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
  const uid = useSelector((state) => state.user.info.uid);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null); // auto focus email input on mount.
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

  function handleSubmit(event) {
    event.preventDefault();
    handleLoginSubmission({
      setError,
      setLoading,
      functionRef,
      navigate,
      loginDetails,
      navigatePath,
      dispatch,
    });
  }

  useEffect(() => {
    if (uid && functionRef === "login") {
      navigate(navigatePath);
    }

    if (loginDetails.initialEmailFocus) {
      setLoginDetails((prev) => ({ ...prev, initialEmailFocus: false }));
      emailRef.current.focus();
    }
  }, [
    loginDetails.initialEmailFocus,
    uid,
    navigate,
    functionRef,
    navigatePath,
  ]);

  return (
    <div>
      {functionRef === "login" && (
        <h2 className={styles["login__heading"]}>Start reflecting</h2>
      )}

      <div className={styles["login"]}>
        {functionRef === "editUserProfile" && (
          <h2 className={styles["login__heading"]}>
            Apologies, we just need to know it&apos;s you again
          </h2>
        )}

        <form onSubmit={handleSubmit} className={styles["login__container"]}>
          <EmailInput
            loginDetails={loginDetails}
            onValueChange={onEmailClick}
            emailRef={emailRef}
            validateEmail={validateEmail}
          />

          <PasswordInput
            loginDetails={loginDetails}
            onValueChange={onPasswordClick}
          />

          <ForgotPasswordContainer error={error} />

          <Button disabled={loading}>
            {loading ? (
              <Spinner size="small" contrastPrimaryColor />
            ) : (
              buttonText
            )}
          </Button>

          <NoAccountContainer functionRef={functionRef} />
        </form>
      </div>
    </div>
  );
}

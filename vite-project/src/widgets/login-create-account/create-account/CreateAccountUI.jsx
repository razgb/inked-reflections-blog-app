import styles from "./CreateAccountUI.module.css";
import Button from "../../../shared/ui/buttons/Button";
import Spinner from "../../../shared/ui/spinner/Spinner";
import PasswordRules from "./sub-components/PasswordRules";
import PasswordInput from "./sub-components/PasswordInput";
import EmailInput from "./sub-components/EmailInput";
import NoAccountContainer from "./sub-components/NoAccountContainer";

import { Link, useNavigate } from "react-router-dom";
import { useReducer, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { initialState, signupReducer } from "./signupReducer";
import { handleSignup } from "./handleSignup";

export default function CreateAccountUI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null); // used to auto focus email input (UX)

  const [signupState, dispatchSignupState] = useReducer(
    signupReducer,
    initialState
  );

  function onEmailValueChange(event) {
    dispatchSignupState({
      type: "changeEmail",
      payload: event.target.value,
    });
  }
  function onPasswordValueChange(event) {
    dispatchSignupState({
      type: "changePassword",
      payload: event.target.value,
    });
  }
  function onConfirmPasswordValueChange(event) {
    dispatchSignupState({
      type: "changeConfirmPassword",
      payload: event.target.value,
    });
  }

  function submitForm(event) {
    event.preventDefault();
    handleSignup({
      signupState,
      dispatchSignupState,
      dispatch,
      navigate,
    });
  }

  useEffect(() => {
    if (signupState.initialEmailFocus) {
      dispatchSignupState({ type: "initialEmailFocus", payload: false });
      emailRef.current.focus();
    }
  }, [signupState]);

  return (
    <div className={styles["signup"]}>
      <h2 className={styles["signup__heading"]}>Join today</h2>

      <div className={styles["signup__container"]}>
        <form onSubmit={submitForm} className={styles["signup__form"]}>
          <EmailInput
            signupState={signupState}
            onEmailClick={onEmailValueChange}
            emailRef={emailRef}
          />

          <PasswordInput
            signupState={signupState}
            onValueChange={onPasswordValueChange}
            labelText="password"
          />

          <PasswordInput
            signupState={signupState}
            onValueChange={onConfirmPasswordValueChange}
            labelText="confirmPassword"
          />

          <Link className={styles["forgot-password-text"]}>
            Forgot password?
          </Link>

          <Button type="submit">
            {signupState.loading ? (
              <Spinner size="small" contrastPrimaryColor />
            ) : (
              "Sign up"
            )}
          </Button>

          <NoAccountContainer />
        </form>

        <PasswordRules />
      </div>
    </div>
  );
}

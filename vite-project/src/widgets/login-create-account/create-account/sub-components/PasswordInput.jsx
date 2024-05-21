import styles from "../CreateAccountUI.module.css";
import {
  EyeIcon,
  EyeCrossedIcon,
} from "../../../../shared/ui/svg/LoginSvg.jsx";
import { useState } from "react";

export default function PasswordInput({
  signupState,
  onValueChange,
  labelText,
}) {
  const [showPassword, setShowPassword] = useState(false);

  function handleEyeClick() {
    setShowPassword((prev) => !prev);
  }

  const passwordText =
    labelText === "password" ? "Password" : "Confirm password";

  let label;
  if (labelText === "password") {
    label = signupState.passwordError ? (
      <label className={styles["label-password-error"]} htmlFor="password">
        {signupState.passwordMessage}
      </label>
    ) : (
      <label className={styles["label-password"]} htmlFor="password">
        {passwordText}
      </label>
    );
  } else {
    label = (
      <label className={styles["label-password"]} htmlFor="password">
        {passwordText}
      </label>
    );
  }

  return (
    <div className={styles["label-input-container"]}>
      {label}

      <div className={styles["input-icon-container"]}>
        <input
          required
          className={styles["input-password"]}
          type={showPassword ? "text" : "password"}
          value={signupState[labelText]}
          onChange={onValueChange}
        />

        <button
          type="button"
          className={styles["eye-button"]}
          onClick={handleEyeClick}
        >
          {showPassword ? <EyeIcon size={20} /> : <EyeCrossedIcon size={20} />}
        </button>
      </div>
    </div>
  );
}

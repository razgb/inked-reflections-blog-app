import styles from "../LoginAccountUI.module.css";
import { Link } from "react-router-dom";

export const ForgotPasswordContainer = ({ error }) => {
  return (
    <div className={styles["forgot-password__container"]}>
      {error && (
        <p className={styles["invalid-credentials"]}>
          Invalid Credentials, try again
        </p>
      )}

      <div className={styles["forgot-password"]}>
        <Link className={styles["forgot-password-text"]}>Forgot password?</Link>
      </div>
    </div>
  );
};

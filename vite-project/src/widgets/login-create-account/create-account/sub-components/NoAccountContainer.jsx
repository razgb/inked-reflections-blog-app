import styles from "../CreateAccountUI.module.css";
import { Link } from "react-router-dom";

export default function NoAccountContainer() {
  return (
    <div className={styles["no-account-container"]}>
      <span className={styles["no-account-text"]}>
        Already have an account?
      </span>

      <Link to="/flow/login" className={styles["no-account-link"]}>
        Sign in
      </Link>
    </div>
  );
}

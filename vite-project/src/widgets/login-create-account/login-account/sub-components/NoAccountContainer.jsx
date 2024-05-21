import styles from "../LoginAccountUI.module.css";
import { Link } from "react-router-dom";

export default function NoAccountContainer({ functionRef }) {
  return (
    functionRef === "login" && (
      <div>
        <span className={styles["no-account-text"]}>
          Don&apos;t have an account?
        </span>

        <Link to="/flow/signup" className={styles["no-account-link"]}>
          Sign up
        </Link>
      </div>
    )
  );
}

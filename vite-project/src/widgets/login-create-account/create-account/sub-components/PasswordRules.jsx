import styles from "../CreateAccountUI.module.css";

export default function PasswordRules() {
  return (
    <div className={styles["rules"]}>
      <div className={styles["rules__container"]}>
        <h3 className={styles["rules__heading"]}>Password suggestions:</h3>
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
  );
}

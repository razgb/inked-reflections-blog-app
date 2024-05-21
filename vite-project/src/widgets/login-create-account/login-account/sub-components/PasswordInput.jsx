import styles from "../LoginAccountUI.module.css";

export default function PasswordInput({ loginDetails, onValueChange }) {
  return (
    <div className={styles["label-input-container"]}>
      <label className={styles["label-password"]} htmlFor="password">
        Password
      </label>

      <input
        required
        className={styles["input-password"]}
        type="password"
        value={loginDetails.password}
        onChange={onValueChange}
      />
    </div>
  );
}

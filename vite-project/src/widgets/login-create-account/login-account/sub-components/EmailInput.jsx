import styles from "../LoginAccountUI.module.css";

export default function EmailInput({
  loginDetails,
  onValueChange,
  emailRef,
  validateEmail,
}) {
  return (
    <div className={styles["label-input-container"]}>
      <label className={styles["label-email"]} htmlFor="email">
        Email
      </label>
      <input
        required
        className={styles["input-email"]}
        type="email"
        value={loginDetails.email}
        onChange={onValueChange}
        onBlur={() => validateEmail(loginDetails.email)}
        ref={emailRef}
      />
    </div>
  );
}

import styles from "../CreateAccountUI.module.css";

export default function EmailInput({ onEmailClick, emailRef, signupState }) {
  const { email, emailError, emailMessage } = signupState;

  return (
    <div className={styles["label-input-container"]}>
      {emailError ? (
        <label className={`${styles["label-email-error"]}`} htmlFor="email">
          {emailMessage}
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
        value={email}
        onChange={onEmailClick}
        ref={emailRef}
      />
    </div>
  );
}

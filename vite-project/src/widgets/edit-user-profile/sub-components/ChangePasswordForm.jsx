import styles from "../EditUserProfile.module.css";
import Button from "../../../shared/ui/buttons/Button";

export default function ChangePasswordForm() {
  return (
    <form className={styles["form-item"]}>
      <div className={styles["input-container"]}>
        <label className={styles["label"]} htmlFor="password">
          Change Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="min length 8"
          className={styles["input"]}
        />
      </div>

      <div className={styles["button-container"]}>
        <Button type="submit">Update Password</Button>
      </div>
    </form>
  );
}

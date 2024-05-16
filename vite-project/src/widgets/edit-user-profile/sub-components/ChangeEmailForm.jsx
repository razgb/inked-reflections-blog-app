import styles from "../EditUserProfile.module.css";
import Button from "../../../shared/ui/buttons/Button";
import { useSelector } from "react-redux";

export default function ChangeEmailForm() {
  const { email } = useSelector((state) => state.user.info);

  return (
    <form className={styles["form-item"]}>
      <div className={styles["input-container"]}>
        <label className={styles["label"]} htmlFor="email">
          Change Email
        </label>
        <input
          type="email"
          id="email"
          placeholder={email}
          className={styles["input"]}
        />
      </div>

      <div className={styles["button-container"]}>
        <Button type="submit">Update Email</Button>
      </div>
    </form>
  );
}

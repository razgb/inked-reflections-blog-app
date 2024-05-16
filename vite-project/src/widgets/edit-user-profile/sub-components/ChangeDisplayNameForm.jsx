import styles from "../EditUserProfile.module.css";
import Button from "../../../shared/ui/buttons/Button";
import { useSelector } from "react-redux";

export default function ChangeDisplayNameForm() {
  const { displayName } = useSelector((state) => state.user.info);

  return (
    <form className={styles["form-item"]}>
      <div className={styles["input-container"]}>
        <label className={styles["label"]} htmlFor="displayName">
          Change Display Name
        </label>
        <input
          type="text"
          id="displayName"
          placeholder={displayName}
          className={styles["input"]}
        />
      </div>

      <div className={styles["button-container"]}>
        <Button type="submit">Update Display Name</Button>
      </div>
    </form>
  );
}

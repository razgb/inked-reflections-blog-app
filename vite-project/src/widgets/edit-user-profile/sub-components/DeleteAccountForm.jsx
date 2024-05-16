import styles from "../EditUserProfile.module.css";
import Button from "../../../shared/ui/buttons/Button";

export default function DeleteAccountForm() {
  return (
    <form className={styles["delete-account-form"]}>
      <Button type="submit" buttonType="danger">
        Delete Account
      </Button>
    </form>
  );
}

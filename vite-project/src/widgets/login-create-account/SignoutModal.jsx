import styles from "./SignoutModal.module.css";
import Button from "../../shared/ui/buttons/Button";
import { useNavigate } from "react-router-dom";
import { signoutUser } from "../../features/user-auth/signout";
import { useDispatch } from "react-redux";
import { removeUserFromState } from "../../entities/user/user-slice";
import { activateAppError } from "../../entities/app-error/app-error-slice";

export default function SignoutModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSignout() {
    const signoutSuccess = await signoutUser();
    if (signoutSuccess) {
      dispatch(removeUserFromState());
      navigate("/flow/login");
    } else {
      dispatch(
        activateAppError({
          errorState: true,
          title: "Error: Sign out unsuccessful",
          message: "There seems to be a network issue, please try again",
        })
      );
      onClose("close");
    }
  }

  return (
    <div className={styles["modal"]}>
      <h2 className={styles["heading"]}>Are you sure you want to sign out?</h2>
      <button
        className={styles["close-button"]}
        onClick={() => onClose("close")}
      >
        Cancel
      </button>
      <Button onClick={handleSignout}>Yes i&apos;m sure</Button>
    </div>
  );
}

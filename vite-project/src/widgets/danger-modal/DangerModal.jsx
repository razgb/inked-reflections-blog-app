import styles from "./DangerModal.module.css";
import Button from "../../shared/ui/buttons/Button";

import { useDispatch, useSelector } from "react-redux";
import { activateAppError } from "../../entities/app-error/app-error-slice";
import { resetDangerModal } from "../../entities/danger-modal/danger-modal-slice";

export default function DangerModal() {
  const dispatch = useDispatch();
  const { showModal, dangerFunction, title, message } = useSelector(
    (state) => state.danger
  );

  const handleClose = () => dispatch(resetDangerModal());

  /**
   * Assumes dangerFunction is async. (Doesn't have to be)
   */
  const handleDangerFunction = async () => {
    try {
      dangerFunction && dangerFunction();
    } catch (error) {
      dispatch(
        activateAppError({
          title: "Sign out unsuccessful",
          message:
            "Seems to be a network issue, check your internet connection and try again.",
        })
      );
    }
  };

  return (
    <dialog open={showModal} className={styles["modal"]}>
      <h2 className={styles["title"]}>{title || "testing title"}</h2>
      <p className={styles["message"]}>{message || "testing message"}</p>

      <button className={styles["close-button"]} onClick={handleClose}>
        Cancel
      </button>
      <Button onClick={handleDangerFunction}>Yes i&apos;m sure</Button>
    </dialog>
  );
}

// async function handleSignout() {
//   const signoutSuccess = await signoutUser();
//   if (signoutSuccess) {
//     navigate("/flow/login");
//   } else {
//     dispatch(
//       activateAppError({
//         title: "Sign out unsuccessful",
//         message:
//           "Seems to be a network issue, check your internet connection and try again.",
//       })
//     );
//     // hideModal("close");
//   }
// }

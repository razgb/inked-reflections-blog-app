import styles from "./DangerModal.module.css";
import Button from "../../shared/ui/buttons/Button";

import { useDispatch, useSelector } from "react-redux";
import { activateAppError } from "../../entities/app-error/app-error-slice";
import { resetDangerModal } from "../../entities/danger-modal/danger-modal-slice";

// Danger functions:
import { signoutUser } from "../../features/user-auth/signoutUser";
import { deleteReflectionFromFirestore } from "../../features/reflections/deleteReflectionFromFirestore";

/**
 * Registry that contains functions that are considered 'dangerous'
 * within the application. Functions are non-serializable, therefore,
 * this approach is appropriate.
 */
const dangerFunctionRegistry = {
  logout: signoutUser,
  // deletePost: deleteReflectionFromFirestore,
  deletePost: () => console.log("Registry functions work!"), // testing
};

export default function DangerModal() {
  const dispatch = useDispatch();
  const { showModal, dangerFunctionReference, title, message, dataToSend } =
    useSelector((state) => state.danger);

  const handleClose = () => dispatch(resetDangerModal());

  const handleDangerFunction = async () => {
    try {
      const dangerFunction = dangerFunctionRegistry[dangerFunctionReference];
      dangerFunction();
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
      <h2 className={styles["title"]}>{title}</h2>
      <p className={styles["message"]}>{message}</p>

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

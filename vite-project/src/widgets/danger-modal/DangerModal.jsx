import styles from "./DangerModal.module.css";
import Button from "../../shared/ui/buttons/Button";
import Spinner from "../../shared/ui/spinner/Spinner.jsx";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { activateAppError } from "../../entities/app-error/app-error-slice";
import { resetDangerModal } from "../../entities/danger-modal/dangerModalSlice.js";

// Danger functions:
import { signoutUser } from "../../features/user-auth/signoutUser.js";
import { removePostFromAllFeedsAction } from "../../entities/posts/util-functions/removePostFromAllFeedsAction.js";
import { closeAppOverlay } from "../../entities/overlay/overlaySlice.js";

// Args need to be wrapped in an object and destructured in the danger function.
const dangerFunctionRegistry = {
  signout: signoutUser,
  deletePost: removePostFromAllFeedsAction,
};

export default function DangerModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    showModal,
    title,
    message,
    dangerFunctionReference,
    dangerFunctionInput,
    usesReduxDispatch,
    successRedirectPath,
  } = useSelector((state) => state.danger);

  const handleCloseModal = () => {
    dispatch(closeAppOverlay());
    dispatch(resetDangerModal());
  };
  const handleDangerFunction = async () => {
    setLoading(true);

    try {
      const dangerFunction = dangerFunctionRegistry[dangerFunctionReference];
      const args = dangerFunctionInput.payload;

      if (usesReduxDispatch && args) {
        await dispatch(dangerFunction(args));
      } else if (args) {
        await dangerFunction(args);
      } else {
        await dangerFunction();
      }

      handleCloseModal();

      if (successRedirectPath) {
        navigate(successRedirectPath);
      }
    } catch (error) {
      console.log(error);
      handleCloseModal();
      dispatch(
        activateAppError({
          title: "Connection error",
          message:
            "Seems to be a network issue, please check your internet connection and try again.",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open={showModal} className={styles["modal"]}>
      <h2 className={styles["title"]}>{title}</h2>
      <p className={styles["message"]}>{message}</p>

      <button className={styles["close-button"]} onClick={handleCloseModal}>
        Cancel
      </button>

      <Button onClick={handleDangerFunction}>
        {loading ? (
          <Spinner size="small" contrastPrimaryColor={true} />
        ) : (
          "Yes I'm sure"
        )}
      </Button>
    </dialog>
  );
}

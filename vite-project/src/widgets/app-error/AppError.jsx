import { useRef } from "react";
import Button from "../../shared/ui/buttons/default-button/Button";
import styles from "./AppError.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetAppError } from "../../entities/app-error/app-error-slice";

/* Component gives rendering control to the parent element. */
export default function AppError() {
  const dispatch = useDispatch();
  const { title, message } = useSelector((state) => state.error);

  function handleClose() {
    dispatch(resetAppError());
  }

  return (
    <div className={styles["error"]}>
      <div className={styles["error-container"]}>
        <h3 className={styles["heading"]}>{title || "Error"}</h3>
        <p className={styles["message"]}>{message || "Something went wrong"}</p>
        <Button onClick={handleClose}>Close</Button>
      </div>
    </div>
  );
}

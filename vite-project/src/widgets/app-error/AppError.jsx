import Button from "../../shared/ui/buttons/Button";
import styles from "./AppError.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetAppError } from "../../entities/app-error/app-error-slice";
import { CrossIcon } from "../../shared/ui/svg/ErrorSvg.jsx";

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
        <div>
          <h3 className={styles["heading"]}>{title || "Error"}</h3>
          <p className={styles["message"]}>
            {message || "Something went wrong"}
          </p>
        </div>

        <button className={styles["cross-button"]} onClick={handleClose}>
          <CrossIcon size={32} />
        </button>
      </div>
    </div>
  );
}

/* 
<Button buttonType="error" onClick={handleClose}>
  Close
</Button>
*/

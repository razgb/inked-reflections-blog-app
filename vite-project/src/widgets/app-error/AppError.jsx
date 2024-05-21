import styles from "./AppError.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetAppError } from "../../entities/app-error/app-error-slice";
import { CrossIcon } from "../../shared/ui/svg/ErrorSvg.jsx";

export default function AppError({ parentContainer = "rootPage" }) {
  const dispatch = useDispatch();
  const { title, message } = useSelector((state) => state.error);

  function handleClose() {
    dispatch(resetAppError());
  }

  let extraStyles = null;
  if (parentContainer === "flowPage") {
    extraStyles = styles["flow"];
  }

  return (
    <div className={`${styles["error"]} ${extraStyles}`}>
      <div className={styles["error-container"]}>
        <div>
          <h3 className={styles["title"]}>{title || "Connection Problem"}</h3>
          <p className={styles["message"]}>
            {message || "Please check your internet."}
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

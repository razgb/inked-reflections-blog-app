import styles from "./AppSuccess.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetAppSuccess } from "../../entities/app-success/app-success-slice";
import { CrossIcon } from "../../shared/ui/svg/ErrorSvg.jsx";

export default function AppSuccess() {
  const dispatch = useDispatch();
  const { title, message } = useSelector((state) => state.success);

  function handleClose() {
    dispatch(resetAppSuccess());
  }

  return (
    <div className={styles["success"]}>
      <div className={styles["success-container"]}>
        <div>
          <h3 className={styles["heading"]}>{title || "Success!"}</h3>
          <p className={styles["message"]}>
            {message || "Please verify your email to enable all app features."}
          </p>
        </div>

        <button className={styles["cross-button"]} onClick={handleClose}>
          <CrossIcon size={32} />
        </button>
      </div>
    </div>
  );
}

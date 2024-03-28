import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./ErrorMessage.module.css";
import { changeLocationState } from "../../entities/url-location/location-slice";

export default function ErrorMessage({
  title = "Error 404",
  message = "This page does not exist!",
  destination = "/posts",
  buttonText = "Back",
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleBackButton() {
    dispatch(changeLocationState("/posts"));
    navigate("/posts");
  }

  return (
    <div className={styles["error-container"]}>
      <div className={styles["error-box"]}>
        <div className={`${styles["face2"]}`}>
          <div className={styles["eye"]}></div>
          <div className={`${styles["eye"]} ${styles["right"]}`}></div>
          <div className={`${styles["mouth"]} ${styles["sad"]}`}></div>
        </div>

        <div className={`${styles["shadow"]} ${styles["move"]}`}></div>

        <div className={styles["message"]}>
          <h1 className={styles["alert"]}>{title}</h1>
          <p className={styles["sub-alert"]}>{message}</p>
          <a onClick={handleBackButton} className={styles["button"]}>
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Notes
 *
 * I used <a> instead of react router's <Link> to force a page upon
 * loading the link reload so that my menu component's useEffect
 * function can catch the pathname being '/posts' and correct the UI
 * error!
 *
 * Thinking of possible fixes...
 *
 * */

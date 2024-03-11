import styles from "./ErrorMessage.module.css";
import { Link } from "react-router-dom";

export default function ErrorMessage() {
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
          <h1 className={styles["alert"]}>Error 404</h1>
          <p className={styles["sub-alert"]}>This page doesn&apos;t exist!</p>
          <Link to="/posts" className={styles["button-box"]}>
            back
          </Link>
        </div>
      </div>
    </div>
  );
}

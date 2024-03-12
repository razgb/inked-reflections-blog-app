import { WriteIcon } from "../../svg/NavigationSvg";
import styles from "./WriteButton.module.css";

export default function WriteButton({ size }) {
  return (
    <button className={styles["write-button"]}>
      <span>
        <WriteIcon size={size} className={styles["write-icon"]} />
      </span>
      <span className={styles["write-text"]}>Write</span>
    </button>
  );
}

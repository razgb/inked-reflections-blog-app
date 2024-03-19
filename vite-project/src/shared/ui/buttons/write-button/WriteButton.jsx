import { WriteIcon } from "../../svg/NavigationSvg";
import styles from "./WriteButton.module.css";
import { Link } from "react-router-dom";

export default function WriteButton({ size }) {
  return (
    <Link to="/write" className={styles["write-button"]}>
      <span>
        <WriteIcon size={size} className={styles["write-icon"]} />
      </span>
      <span className={styles["write-text"]}>Write</span>
    </Link>
  );
}

/**
 * Notes:
 *
 * Would be nice to find a way to cache unsaved user posts in a
 * sections called 'drafts' so that the user can pick off where they
 * left off at. Super UX friendly and nice challenge.
 */

import styles from "../UserPostExpanded.module.css";
import { formatDate } from "../../../../shared/util/formatDate";

export default function PostInfo({ minutesToRead, createdAt }) {
  return (
    <div className={styles["post__info"]}>
      <span className={styles["post__minutes"]}>{minutesToRead}</span>
      <span className={styles["post__date-published"]}>
        {formatDate(createdAt)}
      </span>
    </div>
  );
}

import styles from "./TrendingItem.module.css";
import { Link } from "react-router-dom";

export default function TrendingItem({ title }) {
  return (
    <li>
      <Link to="#" className={styles["link"]}>
        <h3 className={styles["title"]}>{title}</h3>
      </Link>
    </li>
  );
}

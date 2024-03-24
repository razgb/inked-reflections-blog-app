import { useSelector } from "react-redux";
import styles from "./MenuActionButton.module.css";

export default function MenuActionButton({
  children,
  title,
  menuOpenState,
  onClick,
}) {
  return (
    <button className={styles["button"]} onClick={onClick}>
      {children}
      {menuOpenState && <span>{title}</span>}
    </button>
  );
}

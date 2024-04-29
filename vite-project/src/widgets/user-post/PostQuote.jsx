import { QuoteIcon } from "../../shared/ui/svg/PostSvg.jsx";
import styles from "./UserPostExpanded.module.css";

export default function PostQuote({ children }) {
  return (
    <div className={styles["block-quote"]}>
      <div className={styles["block-quote__icon"]}>
        <QuoteIcon size={24} />
      </div>
      <p className={styles["block-quote__content"]}>{children}</p>
    </div>
  );
}

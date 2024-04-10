import styles from "./PageLayoutTemplate.module.css";

export default function PageLayoutTemplate({ children }) {
  return <div className={styles["page-layout"]}>{children}</div>;
}

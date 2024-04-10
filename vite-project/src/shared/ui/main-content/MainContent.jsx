import styles from "./MainContent.module.css";

export default function MainContent({ children }) {
  return <main className={styles["main-content"]}>{children}</main>;
}

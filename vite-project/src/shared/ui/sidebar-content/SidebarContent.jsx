import styles from "./SidebarContent.module.css";

export default function SidebarContent({ children }) {
  return <aside className={styles["sidebar-content"]}>{children}</aside>;
}

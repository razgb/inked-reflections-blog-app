import styles from "./PageLayoutTemplate.module.css";
import { MainContent } from "../main-content/MainContent.jsx";
import { SidebarContent } from "../sidebar-content/SidebarContent.jsx";

export default function PageLayoutTemplate({ children }) {
  return <div className={styles["page-layout"]}>{children}</div>;
}

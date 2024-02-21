import styles from "./RootPage.module.css";
import { Outlet } from "react-router-dom";
import MainNavigation from "../widgets/main-navigation/MainNavigation";
import Menu from "../widgets/menu/Menu";

import { useSelector } from "react-redux";

export default function RootLayout() {
  const { menuOpenState } = useSelector((state) => state.menu);
  let menuClasses = `${styles["layout"]}`;
  if (menuOpenState) menuClasses += ` ${styles["layout-open"]}`;

  return (
    <div className={menuClasses}>
      <div className={styles["layout__menu"]}>
        <Menu />
      </div>

      <div className={styles["layout__nav"]}>
        <MainNavigation />
      </div>

      <div className={styles["layout__outlet"]}>
        <Outlet />
      </div>
    </div>
  );
}

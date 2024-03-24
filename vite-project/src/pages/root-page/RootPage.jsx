import styles from "./RootPage.module.css";
import { Outlet } from "react-router-dom";
import MainNavigation from "../../widgets/main-navigation/MainNavigation";
import Menu from "../../widgets/menu/Menu";
import { useState } from "react";

export default function RootLayout() {
  const [menuOpenState, setMenuOpenState] = useState(false);
  function handleToggleMenuState() {
    setMenuOpenState((prev) => !prev);
  }
  let menuClasses = `${styles["layout"]}`;
  if (menuOpenState) menuClasses += ` ${styles["layout-open"]}`;

  return (
    <div className={`${menuClasses} layout__container`}>
      <div className={styles["layout__menu"]}>
        <Menu
          menuOpenState={menuOpenState}
          handleToggleMenuState={handleToggleMenuState}
        />
      </div>

      <div className={styles["layout__nav"]}>
        <MainNavigation />
      </div>

      <div className={`${styles["layout__outlet"]} scrollContainer`}>
        <Outlet />
      </div>
    </div>
  );
}

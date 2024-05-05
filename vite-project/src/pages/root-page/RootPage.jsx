import styles from "./RootPage.module.css";
import { Outlet } from "react-router-dom";
import MainNavigation from "../../widgets/main-navigation/MainNavigation";
import Menu from "../../widgets/menu/Menu";
import DangerModal from "../../widgets/danger-modal/DangerModal";

import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../entities/theme/ThemeContext";
import Overlay from "./Overlay";

export default function RootLayout() {
  // Causes issues with css conflicting with body element.
  // const { theme } = useContext(ThemeContext);

  const [menuOpenState, setMenuOpenState] = useState(false);
  function handleToggleMenuState() {
    setMenuOpenState((prev) => !prev);
  }
  let menuClasses = `${styles["layout"]}`;
  if (menuOpenState) menuClasses += ` ${styles["layout-open"]}`;

  return (
    <div className={`${""} ${menuClasses} layout__container`}>
      <Overlay />

      <div className={styles["layout__menu"]}>
        <Menu
          menuOpenState={menuOpenState}
          handleToggleMenuState={handleToggleMenuState}
        />
      </div>

      <div className={styles["layout__nav"]}>
        <DangerModal />
        <MainNavigation />
      </div>

      <div className={`${styles["layout__outlet"]} scrollContainer`}>
        <Outlet />
      </div>
    </div>
  );
}

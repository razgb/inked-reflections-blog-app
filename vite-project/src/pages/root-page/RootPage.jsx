import styles from "./RootPage.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import MainNavigation from "../../widgets/main-navigation/MainNavigation";
import Menu from "../../widgets/menu/Menu";
import DangerModal from "../../widgets/danger-modal/DangerModal";

import { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { BackButton } from "./BackButton";
import { useSelector } from "react-redux";

export default function RootLayout() {
  const navigate = useNavigate();
  const { loginState, uid, displayName } = useSelector(
    (state) => state.user.info
  );

  const [menuOpenState, setMenuOpenState] = useState(false);
  function handleToggleMenuState() {
    setMenuOpenState((prev) => !prev);
  }
  let menuClasses = `${styles["layout"]}`;
  if (menuOpenState) menuClasses += ` ${styles["layout-open"]}`;

  useEffect(() => {
    if (loginState === false) {
      navigate("/flow/login");
    }

    if (uid && !displayName) {
      navigate("/flow/userinfo");
      return;
    }
  }, [navigate, loginState, uid, displayName]);

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
        <BackButton />
        <DangerModal />
        <MainNavigation />
      </div>

      <div className={`${styles["layout__outlet"]} scrollContainer`}>
        <Outlet />
      </div>
    </div>
  );
}

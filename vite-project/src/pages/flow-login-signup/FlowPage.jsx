import styles from "./FlowPage.module.css";
import appLogo from "../../../public/inked-reflections-logo-w-heading.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function FlowPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.info);
  useEffect(() => {
    // So user doesn't have login option when already logged in.
    if (userInfo.loginState) {
      navigate("/posts");
    }
  });

  return (
    <div className={styles["flow"]}>
      <div className={styles["flow__container"]}>
        <div className={styles["half-1"]}>
          <img
            src={appLogo}
            alt="Inked Reflections App Logo"
            className={styles["app-logo"]}
          />
        </div>
        <div className={styles["half-2"]}>
          <h1 className={styles["primary-heading"]}>Express yourself</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/**
 * Notes:
 *
 * The outlet here shows the LoginAccountUI by defauly and upon pressing the link
 * inside the LoginAccountUI, the user gets navigated to SignupAccountUI.
 */

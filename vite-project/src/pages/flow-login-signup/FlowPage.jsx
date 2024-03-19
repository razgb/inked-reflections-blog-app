import styles from "./FlowPage.module.css";
import appLogo from "../../../public/inked-reflections-logo-w-heading.png";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function FlowPage() {
  // const [page, setPage] = useState("login");
  // const subHeading = page === "login" ? "Start reflecting" : "Join today";

  // useEffect(() => {
  //   const url = window.location.pathname;
  //   if (url.includes("signup")) {
  //     setPage("sign up");
  //   }
  // }, [page]);

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

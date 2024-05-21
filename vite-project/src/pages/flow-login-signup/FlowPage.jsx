import styles from "./FlowPage.module.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LazyLoadedImage from "../../widgets/lazy-loaded-image/LazyLoadedImage";
import AppError from "../../widgets/app-error/AppError";

export default function FlowPage() {
  const { errorState } = useSelector((state) => state.error);

  return (
    <div className={styles["flow"]}>
      <div className={styles["flow__container"]}>
        {errorState && <AppError parentContainer="flowPage" />}

        <div className={styles["flow__container-left"]}>
          <div className={styles["logo__container"]}>
            <LazyLoadedImage
              reference="light/logo_with_heading.jpg"
              firebaseFolder="assets"
              altText="Inked Reflections App Logo"
              spinnerSize="large"
            />
          </div>
        </div>

        <div className={styles["flow__container-right"]}>
          <h1 className={styles["flow__heading"]}>Express yourself</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

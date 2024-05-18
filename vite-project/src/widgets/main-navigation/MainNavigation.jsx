import styles from "./MainNavigation.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppError from "../app-error/AppError.jsx";
import AppSuccess from "../app-success/AppSuccess.jsx";
import { changeLocationState } from "../../entities/url-location/location-slice";
import LazyLoadedImage from "../lazy-loaded-image/LazyLoadedImage.jsx";
import ReflectButton from "../../shared/ui/buttons/ReflectButton.jsx";

// const theme = "dark";
const theme = "light";

export default function MainNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appErrorObj = useSelector((state) => state.error);
  const appSuccessObj = useSelector((state) => state.success);

  function handleLocationChange() {
    dispatch(changeLocationState("/posts"));
    navigate("/posts");
  }

  return (
    <nav className={styles["main-nav"]}>
      <div className={styles["logo__container"]}>
        <div
          onClick={handleLocationChange}
          className={styles["main-nav__logo"]}
        >
          <LazyLoadedImage
            reference={`${theme}/logo_with_heading_horizontal.jpg`}
            firebaseFolder="assets"
            altText="Application Logo & link to home page."
            spinnerSize="medium"
          />
        </div>
      </div>

      <div className={styles["main-nav-actions"]}>
        <ReflectButton size={20} />
      </div>

      {appErrorObj.errorState && <AppError />}
      {appSuccessObj.successState && <AppSuccess />}
    </nav>
  );
}

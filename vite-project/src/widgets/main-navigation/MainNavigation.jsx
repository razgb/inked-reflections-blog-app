import styles from "./MainNavigation.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppError from "../app-error/AppError";
import { changeLocationState } from "../../entities/url-location/location-slice";
import useImageURL from "../../shared/hooks/useImageURL";
import LazyLoadedImage from "../lazy-loaded-image/LazyLoadedImage.jsx";
import ReflectButton from "../../shared/ui/buttons/ReflectButton.jsx";

// const theme = "dark";
const theme = "light";

export default function MainNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appErrorObj = useSelector((state) => state.error);
  const { photoURL: profilePhotoReference } = useSelector(
    (state) => state.user.info
  );

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

        <button className={styles["main-nav-profile__button"]}>
          <div className={styles["profile-image-container"]}>
            <LazyLoadedImage
              reference={profilePhotoReference}
              firebaseFolder="profile"
              altText="User profile photo"
            />
          </div>
        </button>
      </div>

      {appErrorObj.errorState && <AppError />}
    </nav>
  );
}

/**
 * Note for future me: 
 *  - Use this layout for the footer navigation. I always wanted to create one of those.  
 *  - and don't fucking say uhgh. do it.  
 * 
 * <ul className={styles["main-nav__links"]}>
      <li className={styles["main-nav__link"]}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles["main-nav__link"]}>
        <Link to="/about">About</Link>
      </li>
      <li className={styles["main-nav__link"]}>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
 */

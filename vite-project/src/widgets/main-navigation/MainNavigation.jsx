import styles from "./MainNavigation.module.css";
import defaultProfileImage from "../../../public/default-profile.jpeg";
import { Link } from "react-router-dom";
import WriteButton from "../../shared/ui/buttons/ReflectButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import AppError from "../app-error/AppError";
import { changeLocationState } from "../../entities/url-location/location-slice";
import useImageURL from "../../shared/hooks/useImageURL";
import Spinner from "../../shared/ui/spinner/Spinner";
import LazyLoadedImage from "../lazy-loaded-image/LazyLoadedImage.jsx";

// const theme = "dark";
const theme = "light";

export default function MainNavigation() {
  const dispatch = useDispatch();
  const appErrorObj = useSelector((state) => state.error);
  const {
    email,
    displayName,
    photoURL: profilePhotoReference,
  } = useSelector((state) => state.user.info);

  const { imageURL: logoURL, loading } = useImageURL(
    "assets",
    `${theme}/logo_with_heading_horizontal.jpg`
  );
  function handleLocationChange() {
    dispatch(changeLocationState("/posts"));
  }

  return (
    <nav className={styles["main-nav"]}>
      <div className={styles["logo__container"]}>
        {/* <Link to="/posts" onClick={handleLocationChange}>
          {loading ? (
            <Spinner />
          ) : (
            <img
              className={styles["main-nav__logo"]}
              src={logoURL}
              alt="Application Logo & link to home page."
            />
          )}
        </Link> */}
      </div>

      <div className={styles["main-nav-actions"]}>
        <WriteButton size={20} />

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

import styles from "./MainNavigation.module.css";
import appLogo from "../../../public/inked-reflections-wide-logo.jpg";
import defaultProfileImage from "../../../public/default-profile.jpeg";
import { BellIcon } from "../../shared/ui/svg/NavigationSvg";
import { Link } from "react-router-dom";
import WriteButton from "../../shared/ui/buttons/write-button/WriteButton";
import { useDispatch, useSelector } from "react-redux";
import AppError from "../app-error/AppError";
import { changeLocationState } from "../../entities/url-location/location-slice";
import useImageURL from "../../shared/hooks/useImageURL";

const theme = "dark";

export default function MainNavigation() {
  const logoURL = useImageURL(
    "assets",
    `${theme}/logo_with_heading_horizontal.jpg`
  );
  const appErrorObj = useSelector((state) => state.error);
  const { email, displayName, photoURL } = useSelector(
    (state) => state.user.info
  );
  const dispatch = useDispatch();
  function handleLocationChange() {
    dispatch(changeLocationState("/posts"));
  }

  return (
    <nav className={styles["main-nav"]}>
      <div className={styles["main-nav-logo"]}>
        <Link to="/posts" onClick={handleLocationChange}>
          <img
            className={styles["main-nav__logo"]}
            src={logoURL}
            alt="Application Logo & link to home page."
          />
        </Link>
      </div>

      <div className={styles["main-nav-actions"]}>
        {displayName ? (
          <span className={styles["email"]}>{displayName}</span>
        ) : (
          <span className={styles["email"]}>No user signed in</span>
        )}

        <WriteButton size={20} />

        <button className={styles["bell-button"]}>
          <span>
            <BellIcon size={20} className={styles["bell-icon"]} />
          </span>
        </button>

        <button className={styles["main-nav-profile__button"]}>
          <img
            className={styles["main-nav-profile__image"]}
            src={defaultProfileImage}
            alt="User profile image"
          />
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

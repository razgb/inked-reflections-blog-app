import appLogo from "../../../public/inked-reflections-wide-logo.jpg";
import defaultProfileImage from "../../../public/default-profile.jpeg";
import styles from "./MainNavigation.module.css";
import { BellIcon, WriteIcon } from "../../shared/ui/svg/NavigationSvg";
import { Link } from "react-router-dom";

export default function MainNavigation() {
  return (
    <nav className={styles["main-nav"]}>
      <div className={styles["main-nav-logo"]}>
        <Link to="/">
          <img
            className={styles["main-nav__logo"]}
            src={appLogo}
            alt="Application Logo & link to home page."
          />
        </Link>
      </div>

      <div className={styles["main-nav-actions"]}>
        <button className={styles["write-button"]}>
          <span>
            <WriteIcon size={20} className={styles["write-icon"]} />
          </span>
          <span>Write</span>
        </button>

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

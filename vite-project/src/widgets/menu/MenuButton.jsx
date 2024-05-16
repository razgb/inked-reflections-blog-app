import { useDispatch, useSelector } from "react-redux";
import styles from "./Menu.module.css";
import { Link } from "react-router-dom";
import { changeLocationState } from "../../entities/url-location/location-slice";

export default function MenuButton({
  children,
  title,
  destination,
  toggleMenu,
  open,
}) {
  const dispatch = useDispatch();
  const locationName = useSelector((state) => state.location.locationName);

  function handleLocationChange() {
    dispatch(changeLocationState(destination));
  }

  let cssClasses = `${styles["menu-button"]}`;
  if (!title && !destination) {
    // Code for the menu hamburger button. SHOULD HAVE IT'S OWN COMPONENT.
    cssClasses += ` ${styles["menu-button__no-content"]}`;
    return (
      <button onClick={toggleMenu} className={cssClasses}>
        <span>{children}</span>
      </button>
    );
  }

  cssClasses += ` ${
    locationName.includes(destination)
      ? styles["menu-button__active"]
      : undefined
  }`;

  return (
    <Link
      onClick={handleLocationChange}
      to={destination}
      className={cssClasses}
    >
      <span>{children}</span>
      {open && title && (
        <p
          className={`${styles["menu-button__title"]} ${
            open && styles["menu-open"]
          }`}
        >
          {title}
        </p>
      )}
    </Link>
  );
}

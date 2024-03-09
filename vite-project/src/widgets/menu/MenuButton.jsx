import styles from "./MenuButton.module.css";
import { Link } from "react-router-dom";

export default function MenuButton({
  children,
  activeLink,
  title,
  destination,
  toggleMenu,
  open,
  handleUrlChange,
}) {
  if (!children) {
    return <p>Please enter button content as JSX children prop.</p>;
  }
  let cssClasses = `${styles["menu-button"]}`;

  if (!title && !destination) {
    // Code for the menu hamburger button.
    cssClasses += ` ${styles["menu-button__no-content"]}`;
    return (
      <button onClick={toggleMenu} className={cssClasses}>
        <span>{children}</span>
      </button>
    );
  }
  if (!destination) {
    // Sloppy solve for the theme and sign out button.
    return (
      <button className={cssClasses}>
        <span>{children}</span>
      </button>
    );
  }
  cssClasses += ` ${
    activeLink.includes(destination) ? styles["menu-button__active"] : undefined
  }`;

  return (
    <Link
      onClick={() => handleUrlChange(destination)}
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

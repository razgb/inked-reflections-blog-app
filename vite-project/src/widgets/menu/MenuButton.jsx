import { useSelector } from "react-redux";
import styles from "./MenuButton.module.css";

export default function MenuButton({ children, fn, active, title }) {
  const menuOpenState = useSelector((state) => state.menu.menuOpenState);

  if (!children)
    return <p>Please enter button content as JSX children prop.</p>;

  let cssClasses = `${styles["menu-button"]}`;

  // seems too excessive when it comes to the css, realised after i wrote the code.
  if (!title) {
    cssClasses += ` ${styles["menu-button__no-content"]}`;
    return (
      <button onClick={fn} className={cssClasses}>
        <span>{children}</span>
      </button>
    );
  }

  cssClasses += ` ${active ? styles["menu-button__active"] : undefined}`;

  return (
    <button onClick={fn} className={cssClasses}>
      <span>{children}</span>
      {menuOpenState && title && (
        <p
          className={`${styles["menu-button__title"]} ${
            menuOpenState && styles["menu-open"]
          }`}
        >
          {title}
        </p>
      )}
    </button>
  );
}

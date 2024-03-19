import styles from "./Spinner.module.css";

export default function Spinner({ size = "large", color = "dark" }) {
  let spinnerStyles = `${styles["spinner"]}`;
  if (size === "large") {
    spinnerStyles += ` ${styles["large"]}`;
  } else if (size === "medium") {
    spinnerStyles += ` ${styles["medium"]}`;
  } else if (size === "small") {
    spinnerStyles += ` ${styles["small"]}`;
  }

  let colorStyles = `${styles["path"]}`;
  if (color === "dark") {
    colorStyles += ` ${styles["dark"]}`;
  } else if (color === "light") {
    colorStyles += ` ${styles["light"]}`;
  }

  return (
    <div className={styles["loader"]}>
      <svg className={spinnerStyles} viewBox="0 0 50 50">
        <circle
          className={colorStyles}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
}

/*
<svg
  version="1.1"
  id="loader-1"
  xmlns="http://www.w3.org/2000/svg"
  // xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  width="56px"
  height="56px"
  viewBox="0 0 50 50"
  // style="enable-background:new 0 0 50 50;"
  // xml:space="preserve"
  fill="#31240c"
  >
  <path
    fill="#31240c"
    d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
  >
    <animateTransform
      attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="0.5s"
      repeatCount="indefinite"
    />
  </path>
  </svg>
*/

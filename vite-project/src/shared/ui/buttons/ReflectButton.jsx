import styles from "../../../widgets/user-profile/ProfileFeedContainer.module.css";
import { WriteIcon } from "../svg/NavigationSvg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeLocationState } from "../../../entities/url-location/location-slice";

export default function ReflectButton({ size, children }) {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(changeLocationState("reflections"));
  }

  return (
    <Link
      to="/profile/reflect"
      onClick={handleClick}
      className={styles["reflect-button"]}
    >
      <span>
        <WriteIcon size={size} className={styles["write-icon"]} />
      </span>
      <span className={styles["reflect-text"]}>{children || "Reflect"}</span>
    </Link>
  );
}

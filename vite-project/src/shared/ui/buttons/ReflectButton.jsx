import { WriteIcon } from "../svg/NavigationSvg";
import styles from "../../../widgets/user-reflections/UserReflections.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeLocationState } from "../../../entities/url-location/location-slice";

export default function ReflectButton({ size }) {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(changeLocationState("reflections"));
  }

  return (
    <Link
      to="/reflections/reflect"
      onClick={handleClick}
      className={styles["reflect-button"]}
    >
      <span>
        <WriteIcon size={size} className={styles["write-icon"]} />
      </span>
      {/* <span className={styles["reflect-text"]}>Reflect</span> */}
    </Link>
  );
}

import { ImageIcon } from "../../shared/ui/svg/ReflectionsSvg";
import styles from "../../pages/reflections/CreateReflectionPage.module.css";

export default function ReflectionsImage({ id, ...props }) {
  return (
    <div>
      <input className={styles["image-input"]} id={id} type="file" />
      <div className={styles["image-input-container"]}>
        <button className={styles["image-icon-container"]}>
          <ImageIcon className="icon" size={48} />
        </button>
      </div>
    </div>
  );
}

import styles from "../../pages/reflections/CreateReflectionPage.module.css";
import {
  ImageIcon,
  QuoteIcon,
  TextIcon,
} from "../../shared/ui/svg/ReflectionsSvg";

export default function ReflectionsToolTip({
  handleAddWidget,
  hidden,
  handleClose,
}) {
  function handleClick(choice) {
    handleAddWidget(choice);
    setTimeout(() => {
      handleClose();
    }, 100); // smoother compared to instantly disappearing.
  }

  return (
    <div
      className={`${styles["tooltip-container"]} ${
        hidden ? styles["hidden"] : undefined
      }`}
    >
      <button
        type="button"
        onClick={() => handleClick("paragraph")}
        className={styles["tooltip-button"]}
      >
        <TextIcon size={20} />
      </button>

      <button
        type="button"
        onClick={() => handleClick("image")}
        className={styles["tooltip-button"]}
      >
        <ImageIcon size={20} />
      </button>

      <button
        type="button"
        onClick={() => handleClick("block-quote")}
        className={styles["tooltip-button"]}
      >
        <QuoteIcon size={20} />
      </button>
    </div>
  );
}

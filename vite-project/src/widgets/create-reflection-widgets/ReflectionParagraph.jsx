import styles from "../../pages/reflections/CreateReflectionPage.module.css";
import validateText from "../../features/reflections/validateText";

export default function ReflectionParagraph({ id, ...props }) {
  return (
    <div>
      <label htmlFor={id}></label>
      <textarea
        placeholder="Paragraph..."
        name={id}
        id={id}
        className={styles["paragraph-input"]}
        {...props}
      />
    </div>
  );
}
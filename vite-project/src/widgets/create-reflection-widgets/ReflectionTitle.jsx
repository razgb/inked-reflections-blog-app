import styles from "../../pages/reflections/CreateReflectionPage.module.css";
export default function ReflectionTitle({ ...props }) {
  function handleKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  return (
    <div>
      <label
        className={styles["title-label"]}
        htmlFor="reflection-title"
      ></label>
      <input
        // required
        onKeyDown={handleKeydown}
        placeholder="Title..."
        className={styles["title-input"]}
        id="reflection-title"
        name="title"
        type="text"
        {...props}
        // onKeyDown={}
      />
    </div>
  );
}

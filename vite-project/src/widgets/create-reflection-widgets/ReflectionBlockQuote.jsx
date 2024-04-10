import styles from "../../pages/reflections/CreateReflectionPage.module.css";
export default function ReflectionBlockQuote({ name, ...props }) {
  function handleEnterKey(event) {
    if (event.key === "Enter") event.preventDefault();
  }

  return (
    <div>
      <label className={styles["block-quote-label"]} htmlFor={name}></label>
      <input
        // required
        placeholder="Quote..."
        className={styles["block-quote-input"]}
        id={name}
        name={name}
        type="text"
        {...props}
        onKeyDown={handleEnterKey}
      />
    </div>
  );
}

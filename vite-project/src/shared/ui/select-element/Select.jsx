import styles from "./Select.module.css";
export default function Select() {
  return (
    <select className={styles["select"]}>
      <option value="Default" className={styles["option"]}>
        -- Sort --
      </option>
      <option value="Default" className={styles["option"]}>
        Date created
      </option>
      <option value="last-modified" className={styles["option"]}>
        Last modified
      </option>
      <option value="name_a-z" className={styles["option"]}>
        Name {"(a-z)"}
      </option>
      <option value="name_z-a" className={styles["option"]}>
        Name {"(z-a)"}
      </option>
    </select>
  );
}

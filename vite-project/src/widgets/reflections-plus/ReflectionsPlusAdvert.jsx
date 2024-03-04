import styles from "./ReflectionsPlusAdvert.module.css";

export default function ReflectionsPlusAdvert() {
  return (
    <div className={styles["reflections-plus-advert"]}>
      <h3 className={styles["advert__heading"]}>Subscribe to Reflections+</h3>
      <ul className={styles["advert__list"]}>
        <li className={styles["advert__item"]}>Zero advertisements</li>

        <li className={styles["advert__item"]}>
          Supports your favourite authors
        </li>

        <li className={styles["advert__item"]}>
          Access <strong>Reflections+</strong> articles and more
        </li>

        <li className={styles["advert__item"]}>
          Special badge to show your support
        </li>
      </ul>

      <button className={styles["advert__button"]}>Subscribe</button>
    </div>
  );
}

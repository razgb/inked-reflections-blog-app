import styles from "./PostDetails.module.css";

import profileImg from "../../../public/default-profile.jpeg";

export default function PostDetails() {
  return (
    <article className={styles["post"]}>
      <div className={styles["post__container"]}>
        {/* Must be 16:9 ratio with 100% width */}
        <div className={styles["cover-image"]}>
          {/* <img src="" alt="" /> */}
        </div>

        <div className={styles["author"]}>
          <div className={styles["author__container"]}>
            <img src={profileImg} alt="Default profile img" />
            <span>Dilan Farman</span>
            <span>10/07/2024</span>
          </div>
        </div>

        <div className={styles["details"]}>
          <div className={styles["details__container"]}></div>
        </div>

        <div className={styles["comments"]}>
          <div className={styles["comments__container"]}></div>
        </div>
      </div>
    </article>
  );
}

import { BookmarksIcon } from "../../shared/ui/svg/MenuSvg";
import { ActionDotsIcon } from "../../shared/ui/svg/PostSvg";
import styles from "./UserPost.module.css";
import coverImage from "../../../public/post-image.jpg";
import profileImage from "../../../public/default-profile.jpeg";

export default function DummyUserPost() {
  return (
    <div className={styles["user-post"]}>
      <div className={styles["post__container"]}>
        <div className={styles["post__row--1"]}>
          <a to="123">
            <img
              className={styles["post__author-img"]}
              src={profileImage}
              alt="Profile pic of author"
            />
          </a>

          <h3 className={styles["post__author-name"]}>
            <a to="/" className={styles["post__author-link"]}>
              Dilan Farman
            </a>
          </h3>

          <span className={styles["post__author-date"]}>22/02/2024</span>
        </div>

        <div className={styles["post__row--2"]}>
          <div className={styles["post__link"]}>
            <div className={styles["post__link-half--1"]}>
              <h3 className={styles["post__title"]}>Lorem ipsum dolor</h3>
              <p className={styles["post__abstract"]}>
                The DRY principle, which stands for &quot;Don&apos;t Repeat
                Yourself,&quot; is a cornerstone of efficient software
                development. It advocates for eliminating redundancy in your
                codebase...
              </p>
            </div>

            <div className={styles["post__link-half--2"]}>
              <img
                className={styles["post__img"]}
                src={coverImage}
                alt="Post thumbnail"
              />
            </div>
          </div>
        </div>

        <div className={styles["post__row--3"]}>
          <span className={styles["post__minutes"]}>7 min read</span>

          <button className={styles["post__action-button"]}>
            <span className={styles["post__icon-holder"]}>
              <BookmarksIcon size={16} />
            </span>
          </button>

          <button className={styles["post__action-button"]}>
            <span className={styles["post__icon-holder"]}>
              <ActionDotsIcon size={16} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

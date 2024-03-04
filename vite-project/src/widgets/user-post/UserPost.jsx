import styles from "./UserPost.module.css";
import { Link, redirect } from "react-router-dom";

// Temp
import profileImage from "../../../public/default-profile.jpeg";
//

import { ActionDotsIcon, BookmarksIcon } from "../../shared/ui/svg/PostSvg";

/*
{
  postId,
  authorName,
  authorImg,
  datePublished,
  dateUpdated,
  postTitle,
  postAbstract,
  postImg,
  postMinutes,
  postBookmarked,
}
*/

export default function UserPost() {
  function handlePostClick(event) {
    if (event.target.tagName === "A") return;
    window.location.href = `/posts/${123}`; // post id instead of 123
    // redirect(`/posts/${123}`);
  }

  return (
    <div onClick={handlePostClick} className={styles["user-post"]}>
      <div className={styles["post__container"]}>
        <div className={styles["post__row--1"]}>
          <Link to="123">
            <img
              className={styles["post__author-img"]}
              src={profileImage}
              alt="Profile pic of author"
            />
          </Link>

          <h3 className={styles["post__author-name"]}>
            {/* Change to author's page. */}
            <Link to="/" className={styles["post__author-link"]}>
              Dilan Farman
            </Link>
          </h3>

          <span className={styles["post__author-date"]}>22/02/2024</span>
        </div>

        <div className={styles["post__row--2"]}>
          <div className={styles["post__link"]}>
            <div className={styles["post__link-half--1"]}>
              <h3 className={styles["post__title"]}>Lorem ipsum dolor</h3>
              <p className={styles["post__abstract"]}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Inventore consectetur quaerat nam aliquam harum ullam quo
                laborum non eligendi, eius expedita ex maxime...
              </p>
            </div>

            <div className={styles["post__link-half--2"]}>
              <img
                className={styles["post__img"]}
                src={profileImage}
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

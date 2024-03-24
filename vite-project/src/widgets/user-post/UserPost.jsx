import styles from "./UserPost.module.css";
import { Link, useNavigate } from "react-router-dom";

// Temp
import profileImage from "../../../public/default-profile.jpeg";
import coverImage from "../../../public/post-image.jpg";
//

import { ActionDotsIcon, BookmarksIcon } from "../../shared/ui/svg/PostSvg";

import { changeCurrentPost } from "../../entities/posts/posts-slice";
import { useDispatch } from "react-redux";
import { formatDate } from "../../shared/util/formatDate";

/*
{
  postId,
  authorName,
  authorImg,
  datePublished,
  dateUpdated,
  postTitle,
  postImg,
  postMinutes,
  postBookmarked,
}
*/

export default function UserPost({
  firstName,
  lastName,
  title,
  datePublished,
  paragraphs,
  id,
  tags,
  email,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePostClick(event) {
    if (event.target.tagName === "A") return;
    dispatch(
      changeCurrentPost({
        firstName,
        lastName,
        title,
        datePublished,
        paragraphs,
        id,
        tags,
      })
    );

    navigate(`/posts/${id}`);
  }

  // Needs fine tuning.
  function formatAbstractParagraph(p) {
    const length = p.split("").length;
    if (length <= 240) return p;
    else {
      return p.split("").splice(0, 180).join("") + "...";
    }
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
              {firstName} {lastName}
            </Link>
          </h3>

          <span className={styles["post__author-date"]}>
            {formatDate(datePublished)}
          </span>

          <span className={styles["bot"]}>{email ? null : "BOT"}</span>
        </div>

        <div className={styles["post__row--2"]}>
          <div className={styles["post__link"]}>
            <div className={styles["post__link-half--1"]}>
              <h3 className={styles["post__title"]}>{title}</h3>
              <p className={styles["post__abstract"]}>
                {formatAbstractParagraph(paragraphs[0])}
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
          {/* Thinking of using useMemo for minutes calculation function in the future. */}
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

// DUMMY DATA SAVE
/*
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
*/

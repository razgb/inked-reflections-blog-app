import styles from "./UserPost.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ActionDotsIcon, BookmarksIcon } from "../../shared/ui/svg/PostSvg";
import { changeCurrentPost } from "../../entities/posts/posts-slice";
import { useDispatch } from "react-redux";
import { formatDate } from "../../shared/util/formatDate";
import LazyLoadedImage from "../lazy-loaded-image/LazyLoadedImage";

/**
 * Formats the first paragraph of the post as an abstract by showing the first 30 words with an ending trail of '...'
 * @param {string} paragraph
 * @returns {string} formated paragraph
 */
function formatAbstractParagraph(paragraph) {
  const length = paragraph.split("").length;
  if (length <= 180) return paragraph + "...";
  else {
    const abstractArray = paragraph.split(" ").splice(0, 30);
    const lastWord = abstractArray.pop().trim();
    abstractArray.push(lastWord);
    return abstractArray.join(" ") + "...";
  }
}

export default function UserPost({
  id,
  displayName,
  createdAt,
  postContent,
  profilePhotoReference,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coverPhotoReference = postContent[0].firebaseStorageReference;

  function handlePostClick(event) {
    if (event.target.tagName === "A") return;
    dispatch(
      changeCurrentPost({
        id,
        displayName,
        createdAt,
        postContent,
        profilePhotoReference,
      })
    );
    navigate(`/posts/${id}`);
  }

  const title = postContent[1].value;
  const abstractParagraph = postContent[2].value;

  return (
    <div onClick={handlePostClick} className={styles["user-post"]}>
      <div className={styles["post__container"]}>
        <div className={styles["post__row--1"]}>
          <Link to="123" className={styles["profile-photo__container"]}>
            <LazyLoadedImage
              reference={profilePhotoReference}
              alt={`${displayName}'s profile photo.`}
              firebaseFolder="profile"
            />
          </Link>

          <h3 className={styles["post__author-name"]}>
            {/* Link to author's page. */}
            <Link to="/" className={styles["post__author-link"]}>
              {displayName}
            </Link>
          </h3>

          <span className={styles["post__author-date"]}>
            {formatDate(createdAt)}
          </span>

          {/* <span className={styles["bot"]}>{email ? null : "BOT"}</span> */}
        </div>

        <div className={styles["post__row--2"]}>
          <div className={styles["post__link"]}>
            <div className={styles["post__link-half--1"]}>
              <h3 className={styles["post__title"]}>{title}</h3>
              <p className={styles["post__abstract"]}>
                {formatAbstractParagraph(abstractParagraph)}
              </p>
            </div>

            {coverPhotoReference && (
              <div className={styles["post__link-half--2"]}>
                <div className={styles["post__img-container"]}>
                  <LazyLoadedImage
                    reference={coverPhotoReference}
                    altText={`Post cover photo for title: ${title}`}
                    firebaseFolder="posts"
                    spinnerSize="large"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles["post__row--3"]}>
          <span className={styles["post__minutes"]}>7 min read</span>

          <button className={styles["post__action-button"]}>
            <span className={styles["post__icon-holder"]}>
              <BookmarksIcon size={18} />
            </span>
          </button>

          {/* <button className={styles["post__action-button"]}>
            <span className={styles["post__icon-holder"]}>
              <ActionDotsIcon size={18} />
            </span>
          </button> */}
        </div>
      </div>
    </div>
  );
}
/*

            {profileLoading ? (
              <Spinner size="small" />
            ) : (
              <img
                className={styles["post__author-img"]}
                src={profilePhotoURL}
                alt="Profile pic of author"
              />
            )}
*/

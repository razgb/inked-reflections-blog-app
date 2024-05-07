import styles from "./UserPost.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeCurrentPost } from "../../entities/posts/posts-slice";
import { useDispatch } from "react-redux";
import { formatDate } from "../../shared/util/formatDate";
import LazyLoadedImage from "../lazy-loaded-image/LazyLoadedImage";
import DeletePostButton from "./DeletePostButton.jsx";
import BookmarkButton from "./BookmarkButton.jsx";

export default function UserPost({
  id,
  postUid,
  displayName,
  createdAt,
  postContent,
  profilePhotoReference,
  readingTime,
  isProfilePost,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coverPhotoReference = postContent[0].firebaseStorageReference;

  const title = postContent[1].value;
  const abstractParagraph = postContent[2].value;
  const minutesToRead = `${readingTime}-min read`;

  function handlePostClick(event) {
    event.preventDefault();
    const tagName = event.target.tagName.toLowerCase();
    const ignoreElements = ["button", "span", "rect", "a", "svg", "path"];
    // Return on profile link clicks, action button, and delete button (if user owns the post).
    if (ignoreElements.includes(tagName)) return;

    dispatch(
      changeCurrentPost({
        id,
        postUid,
        displayName,
        createdAt,
        postContent,
        profilePhotoReference,
        minutesToRead,
      })
    );
    navigate(`/posts/${id}`);
  }

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
            <Link to="/posts" className={styles["post__author-link"]}>
              {displayName}
            </Link>
          </h3>

          <span className={styles["post__author-date"]}>
            {formatDate(createdAt)}
          </span>
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
          <span className={styles["post__minutes"]}>{minutesToRead}</span>

          <BookmarkButton postId={id} />

          {isProfilePost && <DeletePostButton postId={id} postUid={postUid} />}
        </div>
      </div>
    </div>
  );
}

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
